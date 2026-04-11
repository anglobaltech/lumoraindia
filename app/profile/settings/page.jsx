"use client";
import React, { useState, useEffect } from "react";
import { Bell, Mail, MessageSquare, Loader2 } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { toast } from "react-toastify";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Default states
  const [notifications, setNotifications] = useState({
    orderUpdatesSMS: true,
    promotionsEmail: false,
  });

  // Sync state from Firebase/Zustand user object when component loads
  useEffect(() => {
    if (user && user.notifications) {
      setNotifications({
        orderUpdatesSMS: user.notifications.orderUpdatesSMS ?? true,
        promotionsEmail: user.notifications.promotionsEmail ?? false,
      });
    }
  }, [user]);

  // Handle the toggle and save to Firebase dynamically
  const toggleToggle = async (key) => {
    if (!user) return toast.error("Please log in to save settings.");
    if (isUpdating) return; // Prevent double-clicking

    const newValue = !notifications[key];
    const newNotifications = { ...notifications, [key]: newValue };

    // Optimistic UI update (feels instant to the user)
    setNotifications(newNotifications);
    setIsUpdating(true);

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { notifications: newNotifications });

      // Update Zustand global store so it persists locally without refreshing
      useAuthStore.setState({ user: { ...user, notifications: newNotifications } });
      
      toast.success("Settings updated!", { autoClose: 1500, hideProgressBar: true });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update setting.");
      
      // Revert the toggle if the database save failed
      setNotifications((prev) => ({ ...prev, [key]: !newValue }));
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
        <p className="text-gray-500 font-bold animate-pulse text-lg tracking-wide">Authenticating...</p>
    </div>
  );

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-xl shadow-pink-100/50 border border-pink-100 relative overflow-hidden">
        
        {/* Subtle Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-400 to-pink-600"></div>

        <div className="mb-8 pb-6 border-b border-pink-100/50">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
             <div className="p-2.5 bg-pink-100 rounded-xl text-pink-600 shadow-inner">
                <Bell size={24} />
             </div>
             Notification Settings
          </h2>
          <p className="text-gray-500 text-sm mt-2 font-medium">Control how we communicate with you regarding orders and promotions.</p>
        </div>

        <div className="space-y-4">
          
          {/* SMS Toggle */}
          <div className="flex items-center justify-between p-5 sm:p-6 bg-gradient-to-br from-gray-50/50 to-white border-2 border-gray-100 rounded-2xl hover:border-pink-200 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:text-pink-500 transition-colors">
                 <MessageSquare size={22} className="text-gray-400 group-hover:text-pink-500 transition-colors" />
              </div>
              <div>
                <p className="font-extrabold text-gray-900 text-base">SMS Order Updates</p>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Receive tracking links directly to your phone.</p>
              </div>
            </div>
            <button 
              onClick={() => toggleToggle('orderUpdatesSMS')} 
              disabled={isUpdating}
              className={`w-14 h-7 rounded-full flex items-center px-1 transition-colors duration-300 ease-in-out cursor-pointer shrink-0 disabled:opacity-70 disabled:cursor-not-allowed ${notifications.orderUpdatesSMS ? 'bg-gradient-to-r from-pink-500 to-pink-600 shadow-inner' : 'bg-gray-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${notifications.orderUpdatesSMS ? 'translate-x-7' : 'translate-x-0'}`}></div>
            </button>
          </div>

          {/* Email Toggle */}
          <div className="flex items-center justify-between p-5 sm:p-6 bg-gradient-to-br from-gray-50/50 to-white border-2 border-gray-100 rounded-2xl hover:border-pink-200 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:text-pink-500 transition-colors">
                 <Mail size={22} className="text-gray-400 group-hover:text-pink-500 transition-colors" />
              </div>
              <div>
                <p className="font-extrabold text-gray-900 text-base">Email Promotions</p>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Exclusive discounts and new product launches.</p>
              </div>
            </div>
            <button 
              onClick={() => toggleToggle('promotionsEmail')} 
              disabled={isUpdating}
              className={`w-14 h-7 rounded-full flex items-center px-1 transition-colors duration-300 ease-in-out cursor-pointer shrink-0 disabled:opacity-70 disabled:cursor-not-allowed ${notifications.promotionsEmail ? 'bg-gradient-to-r from-pink-500 to-pink-600 shadow-inner' : 'bg-gray-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${notifications.promotionsEmail ? 'translate-x-7' : 'translate-x-0'}`}></div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}