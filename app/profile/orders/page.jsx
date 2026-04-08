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

  // Automatically fetch real orders from Firebase
  useEffect(() => {
    const fetchMyOrders = async () => {
      // If no user is logged in yet, stop here
      if (!user?.uid) {
        setIsLoading(false);
        return;
      }

      try {
        // Query the 'orders' collection where userId matches the logged-in user
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const fetchedOrders = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Format the raw DB data to match what the UI (OrderCard & Modal) expects
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
            timestamp: data.createdAt ? new Date(data.createdAt).getTime() : 0, // Used for sorting
          });
        });

        // Sort orders by newest first
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

  if (!user) return <div className="p-8 text-center bg-white rounded-2xl shadow-sm mt-10">Please log in to view your orders.</div>;

  return (
    <>
      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900">Order Details</h3>
                <p className="text-sm text-gray-500 font-medium mt-1">ID: {selectedOrder.id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="p-2 bg-gray-50 text-gray-500 hover:text-gray-900 rounded-full transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Status & Date */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm font-semibold text-gray-700">{selectedOrder.date}</span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${
                selectedOrder.status === 'Delivered' ? 'bg-green-50 text-green-600' : 
                selectedOrder.status === 'Order Placed' ? 'bg-blue-50 text-blue-600' : 
                'bg-orange-50 text-orange-600'
              }`}>
                {selectedOrder.status === 'Delivered' ? <CheckCircle size={16} /> : <Truck size={16} />}
                {selectedOrder.status}
              </div>
            </div>

            {/* Items List */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Package size={16} className="text-pink-500" /> Items in this Order
              </h4>
              <div className="space-y-3">
                {selectedOrder.itemsList && selectedOrder.itemsList.length > 0 ? (
                  selectedOrder.itemsList.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                           {/* Assuming item.image or item.images[0] exists from your cart store */}
                           <img src={item.image || item.images?.[0] || "/placeholder.jpg"} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600 p-4 bg-gray-50 rounded-xl">Item details unavailable.</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Shipping Address */}
              <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={14} /> Shipping Address
                </h4>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  {selectedOrder.shippingAddress}
                </p>
              </div>

              {/* Order Summary */}
              <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <Receipt size={14} /> Payment Summary
                </h4>
                <div className="space-y-2 text-sm text-gray-600 font-medium mb-3 pb-3 border-b border-gray-100">
                  <div className="flex justify-between"><span>Subtotal</span> <span>₹{selectedOrder.subtotal}</span></div>
                  <div className="flex justify-between">
                    <span>Shipping</span> 
                    <span className={selectedOrder.shippingFee === 0 ? "text-green-500" : "text-gray-900"}>
                      {selectedOrder.shippingFee === 0 ? "Free" : `₹${selectedOrder.shippingFee}`}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span>
                  <span>₹{selectedOrder.total}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MAIN PAGE CONTENT */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
        <div className="mb-8 pb-6 border-b border-gray-100">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">My Orders</h2>
          <p className="text-gray-500 text-sm mt-1">Track your active shipments and view past purchases.</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="animate-spin text-pink-500 mb-4" size={40} />
            <p className="text-gray-500 font-medium text-sm">Fetching your orders...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onViewDetails={() => setSelectedOrder(order)} 
                />
              ))
            ) : (
              <div className="text-center py-16 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100">
                <Package size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">No orders yet</h3>
                <p className="text-sm text-gray-500 font-medium">When you buy something, it will appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}