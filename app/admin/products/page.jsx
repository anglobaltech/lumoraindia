"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase"; 
import { Loader2, Save, Package, IndianRupee, Tag, Image as ImageIcon, X, Plus } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminProduct() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Multiple Image States
  const [newImages, setNewImages] = useState([]); // Actual File objects
  const [previewUrls, setPreviewUrls] = useState([]); // Blob URLs for preview

  const [product, setProduct] = useState({
    name: "Lumora Device",
    price: 0,
    mrp: 0,
    stock: 0,
    description: "",
    images: [], // Changed to array to support multiple images
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(db, "products", "master_product");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct({
            ...data,
            // Fallback for older DB structure that used a single imageUrl
            images: data.images || (data.imageUrl ? [data.imageUrl] : [])
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product data.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: ["price", "mrp", "stock"].includes(name) ? Number(value) : value,
    }));
  };

  // Handle multiple file selections
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setNewImages((prev) => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeExistingImage = (indexToRemove) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const removeNewImage = (indexToRemove) => {
    setNewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setPreviewUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let uploadedUrls = [];

      // Upload newly added images
      if (newImages.length > 0) {
        toast.info("Uploading new images...");
        for (let i = 0; i < newImages.length; i++) {
          const file = newImages[i];
          const storageRef = ref(storage, `products/master_product_${Date.now()}_${i}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          uploadedUrls.push(url);
        }
      }

      // Combine old images kept with newly uploaded ones
      const finalImages = [...(product.images || []), ...uploadedUrls];

      const docRef = doc(db, "products", "master_product");
      await setDoc(docRef, {
        ...product,
        images: finalImages,
        updatedAt: new Date().toISOString(),
      }, { merge: true }); 

      // Sync state and clear previews
      setProduct((prev) => ({ ...prev, images: finalImages }));
      setNewImages([]);
      setPreviewUrls([]);
      
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to update product.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
        <Loader2 className="animate-spin text-pink-500 mb-5" size={48} />
        <p className="text-gray-500 font-semibold text-sm tracking-widest uppercase">Fetching Product Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-6 lg:p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 tracking-tight">Product Control</h1>
          <p className="text-gray-500 text-sm mt-1.5 font-medium">Manage pricing, inventory, and dynamic image galleries.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-pink-600 shadow-lg shadow-pink-200 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 cursor-pointer"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {isSaving ? "Publishing..." : "Publish Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column: Image Gallery Management */}
        <div className="lg:col-span-1 bg-white p-6 lg:p-8 rounded-[2rem] shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-semibold text-gray-700 mb-6 flex items-center gap-3">
             <div className="p-2.5 bg-pink-50 rounded-xl text-pink-500 shadow-inner">
               <ImageIcon size={22} /> 
             </div>
             Media Gallery
          </h2>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Display Existing Images */}
            {product.images?.map((imgUrl, index) => (
              <div key={`existing-${index}`} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={imgUrl} alt={`Product ${index}`} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => removeExistingImage(index)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 hover:scale-110 transition-transform cursor-pointer shadow-lg"
                    title="Remove Image"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}

            {/* Display New Image Previews */}
            {previewUrls.map((url, index) => (
              <div key={`new-${index}`} className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-pink-400 shadow-sm">
                <div className="absolute top-1 left-1 bg-pink-500 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-md z-10 uppercase tracking-widest shadow-sm">New</div>
                <img src={url} alt={`Preview ${index}`} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <button 
                    onClick={() => removeNewImage(index)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 hover:scale-110 transition-transform cursor-pointer shadow-lg"
                    title="Remove Image"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}

            {/* Add New Image Button */}
            <label className="aspect-square border-2 border-dashed border-gray-200 hover:border-pink-400 hover:bg-pink-50 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:text-pink-500 transition-colors cursor-pointer group shadow-sm">
              <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform mb-2">
                 <Plus size={24} />
              </div>
              <span className="text-xs font-semibold">Add Image</span>
              <input 
                type="file" 
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-gray-400 font-medium text-center">First image will be used as the main thumbnail.</p>
        </div>

        {/* Right Column: Product Details Form */}
        <div className="lg:col-span-2 bg-white p-6 lg:p-8 rounded-[2rem] shadow-sm border border-gray-100">
           <h2 className="text-lg font-semibold text-gray-700 mb-6 flex items-center gap-3">
             <div className="p-2.5 bg-blue-50 rounded-xl text-blue-500 shadow-inner">
               <Tag size={22} /> 
             </div>
             Product Details
          </h2>

          <form className="space-y-6">
            {/* Product Name */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest ml-1">Product Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Tag size={18} className="text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                </div>
                <input 
                  type="text" 
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none bg-gray-50 font-semibold text-gray-700 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Selling Price */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest ml-1">Selling Price (₹)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IndianRupee size={18} className="text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                  </div>
                  <input 
                    type="number" 
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none bg-gray-50 font-semibold text-gray-700 text-lg transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* MRP */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest ml-1">MRP (₹)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IndianRupee size={18} className="text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                  </div>
                  <input 
                    type="number" 
                    name="mrp"
                    value={product.mrp}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-gray-200 focus:border-gray-400 outline-none bg-gray-50 text-gray-500 font-semibold line-through transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Stock Level */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest ml-1">Current Stock Level</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Package size={18} className="text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                </div>
                <input 
                  type="number" 
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none bg-gray-50 font-semibold text-gray-700 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest ml-1">Product Description</label>
              <textarea 
                name="description"
                value={product.description}
                onChange={handleChange}
                rows={5}
                className="w-full p-4 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none bg-gray-50 resize-none font-medium text-gray-700 transition-all shadow-sm custom-scrollbar"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}