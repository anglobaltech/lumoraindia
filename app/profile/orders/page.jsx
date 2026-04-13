"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import OrderCard from "../../../components/dashboard/OrderCard";
import { X, Package, MapPin, Calendar, Receipt, Truck, CheckCircle, Loader2 } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function OrdersPage() {
  const user = useAuthStore((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!user?.uid) {
        setIsLoading(false);
        return;
      }

      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const fetchedOrders = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          fetchedOrders.push({
            id: data.orderId,
            date: data.createdAt 
              ? new Date(data.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) 
              : "Recent",
            status: data.status || "Order Placed",
            itemsList: data.cartItems || [], 
            shippingAddress: data.address || "No address provided",
            total: data.totals?.finalAmount || 0,
            subtotal: data.totals?.totalAmount || 0,
            shippingFee: data.totals?.shippingFee || 0,
            timestamp: data.createdAt ? new Date(data.createdAt).getTime() : 0, 
          });
        });

        fetchedOrders.sort((a, b) => b.timestamp - a.timestamp);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyOrders();
  }, [user]);

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
        <p className="text-gray-500 font-semibold animate-pulse text-lg tracking-wide">Authenticating...</p>
    </div>
  );

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      
      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 max-w-2xl w-full shadow-2xl shadow-pink-900/20 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 border border-pink-50 custom-scrollbar">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-pink-100/50">
              <div>
                <h3 className="text-xl font-semibold text-gray-700 tracking-tight">Order Details</h3>
                <p className="text-sm text-gray-500 font-semibold mt-1.5 flex items-center gap-1.5">
                  <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md font-mono text-xs">ID: {selectedOrder.id}</span>
                </p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="p-2.5 bg-gray-50 text-gray-500 hover:bg-pink-50 hover:text-pink-600 rounded-full transition-all duration-300 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Status & Date */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl shadow-sm">
                <Calendar size={18} className="text-gray-400" />
                <span className="text-sm font-semibold text-gray-700">{selectedOrder.date}</span>
              </div>
              <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm border ${
                selectedOrder.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' : 
                selectedOrder.status === 'Order Placed' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                'bg-orange-50 text-orange-700 border-orange-100'
              }`}>
                {selectedOrder.status === 'Delivered' ? <CheckCircle size={18} /> : <Truck size={18} />}
                {selectedOrder.status}
              </div>
            </div>

            {/* Items List */}
            <div className="mb-8 bg-gray-50/50 p-5 md:p-6 rounded-3xl border border-gray-100">
              <h4 className="text-[11px] font-semibold text-gray-500 mb-5 flex items-center gap-2 uppercase tracking-widest">
                <Package size={16} className="text-pink-500" /> Items in this Order
              </h4>
              <div className="space-y-4">
                {selectedOrder.itemsList && selectedOrder.itemsList.length > 0 ? (
                  selectedOrder.itemsList.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border border-gray-100 rounded-2xl bg-white shadow-sm hover:border-pink-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                           <img src={item.image || item.images?.[0] || "/placeholder.jpg"} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700 text-sm md:text-base line-clamp-1">{item.name}</p>
                          <p className="text-xs font-semibold text-gray-500 mt-1 bg-gray-100 inline-block px-2 py-0.5 rounded-md">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-700 text-base md:text-lg">₹{item.price * item.quantity}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm font-medium text-gray-600 p-4 bg-white rounded-xl border border-gray-100 text-center">Item details unavailable.</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div className="p-6 border border-gray-100 rounded-3xl bg-white shadow-sm flex flex-col">
                <h4 className="text-[11px] font-semibold text-gray-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={16} className="text-pink-400" /> Shipping Address
                </h4>
                <p className="text-sm text-gray-700 font-semibold leading-relaxed flex-grow">
                  {selectedOrder.shippingAddress}
                </p>
              </div>

              {/* Order Summary */}
              <div className="p-6 border border-pink-100 rounded-3xl bg-gradient-to-br from-pink-50/50 to-white shadow-sm">
                <h4 className="text-[11px] font-semibold text-gray-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                  <Receipt size={16} className="text-pink-400" /> Payment Summary
                </h4>
                <div className="space-y-3 text-sm text-gray-600 font-semibold mb-4 pb-4 border-b border-pink-100/50">
                  <div className="flex justify-between"><span>Subtotal</span> <span className="text-gray-700">₹{selectedOrder.subtotal}</span></div>
                  <div className="flex justify-between">
                    <span>Shipping</span> 
                    <span className={selectedOrder.shippingFee === 0 ? "text-green-600 bg-green-50 px-2 py-0.5 rounded-md" : "text-gray-700"}>
                      {selectedOrder.shippingFee === 0 ? "FREE" : `₹${selectedOrder.shippingFee}`}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold text-gray-700 text-lg md:text-xl items-center">
                  <span>Total</span>
                  <span className="text-pink-600">₹{selectedOrder.total}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MAIN PAGE CONTENT */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-xl shadow-pink-100/50 border border-pink-100 relative overflow-hidden">
        
        {/* Subtle Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-400 to-pink-600"></div>

        <div className="mb-8 pb-6 border-b border-pink-100/50">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 tracking-tight">My Orders</h2>
          <p className="text-gray-500 text-sm mt-1.5 font-medium">Track your active shipments and view past purchases.</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-pink-500 mb-5" size={48} />
            <p className="text-gray-500 font-semibold text-sm tracking-widest uppercase">Fetching your orders...</p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="group transition-all duration-300 hover:-translate-y-1">
                  <OrderCard 
                    order={order} 
                    onViewDetails={() => setSelectedOrder(order)} 
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-pink-50/30 rounded-[2rem] border-2 border-dashed border-pink-100">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-pink-100 mb-5">
                   <Package size={36} className="text-pink-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders yet</h3>
                <p className="text-sm text-gray-500 font-medium max-w-sm mx-auto">Looks like you haven't made a premium purchase yet. Your orders will appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}