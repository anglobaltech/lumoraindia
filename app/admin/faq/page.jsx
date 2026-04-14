"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Plus, Edit2, Trash2, HelpCircle, X, Check, MessageSquareHeart } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ question: "", answer: "" });

  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const faqsRef = collection(db, "faqs");
      const q = query(faqsRef, orderBy("createdAt", "asc"));
      const snapshot = await getDocs(q);
      
      const faqsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFaqs(faqsList);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      // Fallback if index doesn't exist yet
      try {
        const fallbackSnap = await getDocs(collection(db, "faqs"));
        const fallbackList = fallbackSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFaqs(fallbackList);
      } catch (fallbackError) {
        toast.error("Failed to load FAQs.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openAddModal = () => {
    setEditingFaq(null);
    setFormData({ question: "", answer: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (faq) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
    setFormData({ question: "", answer: "" });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      return toast.error("Both question and answer are required.");
    }

    setIsSaving(true);
    try {
      if (editingFaq) {
        // Update existing
        const faqRef = doc(db, "faqs", editingFaq.id);
        await updateDoc(faqRef, {
          question: formData.question,
          answer: formData.answer,
          updatedAt: serverTimestamp()
        });
        toast.success("FAQ updated successfully!");
      } else {
        // Add new
        await addDoc(collection(db, "faqs"), {
          question: formData.question,
          answer: formData.answer,
          createdAt: serverTimestamp()
        });
        toast.success("New FAQ added!");
      }
      closeModal();
      fetchFaqs();
    } catch (error) {
      console.error("Error saving FAQ:", error);
      toast.error("Failed to save FAQ.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this FAQ? It will be removed from the Home Page instantly.")) return;
    
    try {
      await deleteDoc(doc(db, "faqs", id));
      toast.success("FAQ deleted.");
      setFaqs(faqs.filter(f => f.id !== id));
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("Failed to delete FAQ.");
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
        <Loader2 className="animate-spin text-pink-500 mb-5" size={48} />
        <p className="text-gray-500 font-semibold text-sm tracking-widest uppercase">Loading FAQs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative pb-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-6 lg:p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 tracking-tight flex items-center gap-3">
             <div className="p-2 bg-pink-100 text-pink-600 rounded-xl shadow-inner">
               <HelpCircle size={28} />
             </div>
             FAQs Management
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">Manage the Frequently Asked Questions displayed on the Home Page.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-pink-600 shadow-lg shadow-pink-200 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          <Plus size={20} /> Add New FAQ
        </button>
      </div>

      {/* FAQs List */}
      <div className="grid grid-cols-1 gap-5">
        {faqs.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-[2rem] border-2 border-dashed border-gray-200 shadow-sm">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-gray-100 mb-5">
               <MessageSquareHeart size={36} className="text-pink-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No FAQs found</h3>
            <p className="text-sm text-gray-500 font-medium max-w-sm mx-auto mb-6">Create your first FAQ to help customers find answers quickly on your website.</p>
            <button onClick={openAddModal} className="px-6 py-3 bg-white border-2 border-pink-100 text-pink-600 font-semibold rounded-xl hover:bg-pink-50 transition-all cursor-pointer shadow-sm">
               Add First Question
            </button>
          </div>
        ) : (
          faqs.map((faq) => (
            <div key={faq.id} className="group bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-700 mb-2 flex items-start gap-3">
                  <span className="text-pink-500 text-xl leading-none font-semibold">Q.</span> 
                  {faq.question}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed flex items-start gap-3 pl-1">
                  <span className="text-gray-300 text-xl leading-none font-semibold opacity-50">A.</span> 
                  {faq.answer}
                </p>
              </div>
              <div className="flex items-start gap-3 shrink-0 pt-1">
                <button 
                  onClick={() => openEditModal(faq)}
                  className="px-4 py-2 bg-pink-50 text-pink-600 rounded-xl font-semibold hover:bg-pink-100 hover:text-pink-700 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(faq.id)}
                  className="px-4 py-2 bg-red-50 text-red-500 rounded-xl font-semibold hover:bg-red-100 hover:text-red-600 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full p-6 md:p-8 animate-in zoom-in-95 duration-300 border border-gray-100 relative">
            
            <button 
              onClick={closeModal} 
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
              <HelpCircle className="text-pink-500" />
              {editingFaq ? "Edit FAQ" : "Add New FAQ"}
            </h2>

            <form onSubmit={handleSave} className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest ml-1">The Question</label>
                <input 
                  type="text" 
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  placeholder="e.g., Does it cause rashes?"
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none text-gray-700 font-semibold transition-all shadow-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest ml-1">The Answer</label>
                <textarea 
                  value={formData.answer}
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  placeholder="e.g., No, Lumora pads are dermatologically tested..."
                  rows="4"
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none text-gray-700 font-medium transition-all shadow-sm resize-none custom-scrollbar"
                  required
                />
              </div>

              <div className="flex gap-3 pt-6 mt-2 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="flex-1 px-4 py-3.5 bg-white border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex-[2] px-4 py-3.5 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-pink-600 shadow-lg shadow-pink-200 hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
                  {isSaving ? "Saving..." : "Save FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}