"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import { User, MapPin, Package, LogOut, Star, Settings, Heart, AlertTriangle } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter(); 
  
  // THE FIX: Pull 'logout' from the store, not 'logoutUser'
  const { logout } = useAuthStore();
  
  // State to control the modal visibility
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // THE FIX: Make this async and await the new logout function
  const handleLogout = async () => {
    try {
      await logout();       
      router.push("/");   
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    { name: "My Profile", href: "/profile", icon: <User size={20} /> },
    { name: "My Orders", href: "/profile/orders", icon: <Package size={20} /> },
    { name: "My Wishlist", href: "/profile/wishlist", icon: <Heart size={20} /> },
    { name: "My Reviews", href: "/profile/reviews", icon: <Star size={20} /> },
    { name: "Addresses", href: "/profile/addresses", icon: <MapPin size={20} /> },
    { name: "Settings", href: "/profile/settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      <div className="w-full md:w-64 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-pink-50 text-pink-600 font-bold" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
          
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all mt-4 cursor-pointer" 
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* The Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 transition-opacity">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl transform transition-all">
            <div className="flex flex-col items-center text-center">
              
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertTriangle size={28} className="text-red-500" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to leave?</h3>
              <p className="text-sm text-gray-500 mb-8 px-2">
                Are you sure you want to log out of your account?
              </p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition shadow-sm cursor-pointer"
                >
                  Yes, Log out
                </button>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;