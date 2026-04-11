"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Search, Edit, ExternalLink, Package, CheckCircle, XCircle, Clock, X } from "lucide-react";
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
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border shadow-sm ${config.color}`}>
        <Icon size={14} /> {status || "Processing"}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
        <Loader2 className="animate-spin text-pink-500 mb-5" size={48} />
        <p className="text-gray-500 font-bold text-sm tracking-widest uppercase">Loading order logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative pb-10">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-6 lg:p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Order Management</h1>
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
            <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-400 uppercase text-[10px] font-black tracking-widest">
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
                      <p className="text-gray-500 font-bold text-base">No orders found.</p>
                      <p className="text-gray-400 text-xs mt-1">Try adjusting your search criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-pink-50/30 transition-colors duration-200 group">
                    <td className="px-6 py-4">
                      <div className="font-extrabold text-gray-900 font-mono text-sm">#{order.id.slice(0, 8).toUpperCase()}</div>
                      <div className="text-xs text-gray-400 font-semibold mt-1 flex items-center gap-1">
                        <Clock size={12} />
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', {day: '2-digit', month: 'short', year: 'numeric'}) : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{order.customerEmail || "Guest User"}</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">{order.customerPhone || "No Phone"}</div>
                    </td>
                    <td className="px-6 py-4 font-black text-gray-900 text-base">
                      ₹{order.totalAmount || order.cartTotal || 0}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => openEditModal(order)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 rounded-xl font-bold transition-all shadow-sm hover:shadow cursor-pointer"
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
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-gray-500">
           <span>Showing {filteredOrders.length} results</span>
        </div>
      </div>

      {/* --- EDIT ORDER MODAL (Glassmorphic & Animated) --- */}
      {editingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-300 border border-gray-100 relative">
            
            <button 
              onClick={() => setEditingOrder(null)} 
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-1">Update Status</h2>
            <p className="text-sm font-bold text-gray-500 mb-8 font-mono bg-gray-50 inline-block px-3 py-1 rounded-lg border border-gray-100">
              ID: #{editingOrder.id}
            </p>

            <form onSubmit={handleUpdateOrder} className="space-y-6">
              
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Order Status</label>
                <div className="relative">
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none text-gray-900 font-bold transition-all cursor-pointer appearance-none"
                  >
                    <option value="processing">Processing (Preparing)</option>
                    <option value="shipped">Shipped (In Transit)</option>
                    <option value="delivered">Delivered (Completed)</option>
                    <option value="cancelled">Cancelled (Refunded)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Tracking URL (Optional)</label>
                <input 
                  type="url" 
                  value={trackingUrl}
                  onChange={(e) => setTrackingUrl(e.target.value)}
                  placeholder="https://track.shiprocket.com/..."
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none text-gray-900 font-semibold text-sm transition-all"
                />
              </div>

              <div className="flex gap-3 pt-6 mt-2">
                <button 
                  type="button" 
                  onClick={() => setEditingOrder(null)}
                  className="flex-1 px-4 py-3.5 bg-white border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="flex-[2] px-4 py-3.5 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold rounded-xl hover:from-pink-700 hover:to-pink-600 shadow-lg shadow-pink-200 hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isUpdating ? <Loader2 className="animate-spin" size={18} /> : "Save Updates"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}