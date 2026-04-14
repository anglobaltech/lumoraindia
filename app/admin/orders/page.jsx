"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Search, Edit, Package, CheckCircle, XCircle, Clock, X, MapPin } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [editingOrder, setEditingOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch Orders
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, orderBy("createdAt", "desc")); 
      const querySnapshot = await getDocs(q);
      
      const ordersData = [];
      querySnapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
      
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders. Make sure your orders collection exists.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update Order Status & Tracking
  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    if (!editingOrder) return;
    setIsUpdating(true);

    try {
      const orderRef = doc(db, "orders", editingOrder.id);
      await updateDoc(orderRef, {
        status: newStatus,
        trackingUrl: trackingUrl || null,
        updatedAt: new Date().toISOString()
      });

      toast.success(`Order ${editingOrder.id} updated!`);
      setEditingOrder(null);
      fetchOrders(); 
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Open Modal Helper
  const openEditModal = (order) => {
    setEditingOrder(order);
    setNewStatus(order.status || "processing");
    setTrackingUrl(order.trackingUrl || "");
  };

  // Filter Orders
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    const matchesId = order.id && order.id.toLowerCase().includes(searchLower);
    const matchesEmail = order.customerEmail && order.customerEmail.toLowerCase().includes(searchLower);
    const matchesPhone = order.customerPhone && String(order.customerPhone).includes(searchLower);
    return matchesId || matchesEmail || matchesPhone;
  });

  // Premium Status Badge Helper
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      processing: { color: "bg-orange-50 text-orange-600 border-orange-200", icon: Clock },
      shipped: { color: "bg-blue-50 text-blue-600 border-blue-200", icon: Package },
      delivered: { color: "bg-emerald-50 text-emerald-600 border-emerald-200", icon: CheckCircle },
      cancelled: { color: "bg-red-50 text-red-600 border-red-200", icon: XCircle },
    };
    const config = statusConfig[status?.toLowerCase()] || statusConfig.processing;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest border shadow-sm ${config.color}`}>
        <Icon size={14} /> {status || "Processing"}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
        <Loader2 className="animate-spin text-pink-500 mb-5" size={48} />
        <p className="text-gray-500 font-semibold text-sm tracking-widest uppercase">Loading order logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative pb-10">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-6 lg:p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 tracking-tight">Order Management</h1>
          <p className="text-gray-500 text-sm mt-1.5 font-medium">View, filter, and update all customer orders across the platform.</p>
        </div>
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search ID, Email, or Phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-sm font-semibold transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
            <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-400 uppercase text-[10px] font-semibold tracking-widest">
              <tr>
                <th className="px-6 py-5">Order ID & Date</th>
                <th className="px-6 py-5">Customer Info</th>
                <th className="px-6 py-5">Total Value</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/80">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Package size={40} className="text-gray-300 mb-3" />
                      <p className="text-gray-500 font-semibold text-base">No orders found.</p>
                      <p className="text-gray-400 text-xs mt-1">Try adjusting your search criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-pink-50/30 transition-colors duration-200 group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-700 font-mono text-sm">#{order.id.slice(0, 8).toUpperCase()}</div>
                      <div className="text-xs text-gray-400 font-semibold mt-1 flex items-center gap-1">
                        <Clock size={12} />
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', {day: '2-digit', month: 'short', year: 'numeric'}) : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-700">{order.user?.name || order.customerEmail || "Guest User"}</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">{order.user?.phone || order.customerPhone || "No Phone"}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-700 text-base">
                      ₹{order.totals?.finalAmount || order.totalAmount || order.cartTotal || 0}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => openEditModal(order)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 rounded-xl font-semibold transition-all shadow-sm hover:shadow cursor-pointer"
                      >
                        <Edit size={16} /> Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Subtle footer to ground the table */}
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-xs font-semibold text-gray-500">
           <span>Showing {filteredOrders.length} results</span>
        </div>
      </div>

      {/* --- EDIT ORDER MODAL (Comprehensive View) --- */}
      {editingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100 animate-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 tracking-tight">
                  Order <span className="text-pink-600">#{editingOrder.id.slice(0, 8).toUpperCase()}</span>
                </h2>
                <p className="text-sm font-semibold text-gray-500 mt-1 flex items-center gap-2">
                  <Clock size={14} /> 
                  {editingOrder.createdAt ? new Date(editingOrder.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : "Recent"}
                </p>
              </div>
              <button 
                onClick={() => setEditingOrder(null)} 
                className="p-2 bg-white border border-gray-200 text-gray-500 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 rounded-full transition-all cursor-pointer shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="p-6 overflow-y-auto custom-scrollbar space-y-8 bg-white flex-1">

              {/* --- CUSTOMER & DELIVERY GRID --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Customer Info */}
                <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4">Customer Info</h3>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700 text-lg">{editingOrder.user?.name || "Guest User"}</p>
                    <p className="text-gray-600 font-medium text-sm flex items-center gap-2">📧 {editingOrder.customerEmail || editingOrder.user?.email || "No email"}</p>
                    <p className="text-gray-600 font-medium text-sm flex items-center gap-2">📞 {editingOrder.customerPhone || editingOrder.user?.phone || "No phone provided"}</p>
                  </div>
                </div>

                {/* Delivery Address (Frozen from Checkout) */}
                <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm bg-gradient-to-br from-pink-50/30 to-white">
                  <h3 className="text-[11px] font-semibold text-pink-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <MapPin size={14} className="text-pink-500"/> Delivery Address
                  </h3>
                  <p className="text-gray-700 font-medium text-sm leading-relaxed">
                    {editingOrder.address || editingOrder.shippingAddress || "No address provided"}
                  </p>
                  <p className="mt-4 pt-4 border-t border-pink-100/50 text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
                    Payment: <span className="text-pink-600 font-bold">{editingOrder.paymentMethod || "COD"}</span>
                  </p>
                </div>
              </div>

              {/* --- PRODUCTS ORDERED LIST --- */}
              <div>
                <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Package size={14} /> Items to Fulfill ({editingOrder.cartItems?.length || 0})
                </h3>
                <div className="space-y-3">
                  {editingOrder.cartItems?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:border-pink-200 transition-colors">
                      <div className="flex gap-4 items-center">
                        <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-inner">
                          <img src={item.image || item.images?.[0] || "/placeholder.jpg"} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700 text-sm">{item.name || item.title}</p>
                          <div className="flex flex-wrap gap-2 mt-1.5">
                            {item.size && <span className="text-[10px] uppercase tracking-wider bg-pink-50 text-pink-600 px-2 py-0.5 rounded-md font-semibold border border-pink-100">Size: {item.size}</span>}
                            {item.pack && <span className="text-[10px] uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-semibold border border-blue-100">Pack: {item.pack}</span>}
                            <span className="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-semibold border border-gray-200">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-700 text-sm">₹{item.price}</p>
                        <p className="text-[11px] font-semibold text-gray-400 mt-0.5">Total: <span className="text-gray-600">₹{item.price * item.quantity}</span></p>
                      </div>
                    </div>
                  ))}
                  {(!editingOrder.cartItems || editingOrder.cartItems.length === 0) && (
                    <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl text-center border border-gray-100">No items found for this order.</p>
                  )}
                </div>
              </div>

              {/* --- FINANCIAL SUMMARY --- */}
              <div className="flex justify-end">
                <div className="w-full md:w-1/2 bg-gray-50/80 p-5 rounded-2xl border border-gray-100">
                  <div className="flex justify-between text-sm text-gray-500 font-semibold mb-3">
                      <span>Subtotal</span>
                      <span className="text-gray-700">₹{editingOrder.totals?.totalAmount || editingOrder.subtotal || editingOrder.totalAmount || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 font-semibold mb-3">
                      <span>Shipping Fee</span>
                      <span className={editingOrder.totals?.shippingFee === 0 ? "text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md" : "text-gray-700"}>
                        {editingOrder.totals?.shippingFee === 0 ? "FREE" : `₹${editingOrder.totals?.shippingFee || 0}`}
                      </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-gray-800 mt-4 pt-4 border-t border-gray-200">
                      <span>Total Amount</span>
                      <span className="text-pink-600">₹{editingOrder.totals?.finalAmount || editingOrder.totalAmount || editingOrder.cartTotal || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- ADMIN ACTION FOOTER (Form) --- */}
            <form onSubmit={handleUpdateOrder} className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 items-end justify-between shrink-0">
              
              <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Status Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest ml-1">Update Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none cursor-pointer shadow-sm transition-all"
                  >
                    <option value="processing">Processing (Preparing)</option>
                    <option value="shipped">Shipped (In Transit)</option>
                    <option value="delivered">Delivered (Completed)</option>
                    <option value="cancelled">Cancelled (Refunded)</option>
                  </select>
                </div>

                {/* Tracking URL Input */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest ml-1">Tracking URL (Optional)</label>
                  <input 
                    type="url" 
                    value={trackingUrl}
                    onChange={(e) => setTrackingUrl(e.target.value)}
                    placeholder="e.g. https://track.shiprocket.com/..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none text-gray-700 font-semibold text-sm transition-all shadow-sm"
                  />
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  type="button" 
                  onClick={() => setEditingOrder(null)}
                  className="px-6 py-3 bg-white border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-pink-600 shadow-md shadow-pink-200 hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isUpdating ? <Loader2 className="animate-spin" size={18} /> : "Save Changes"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}