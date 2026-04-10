"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IndianRupee, ShoppingCart, Users, Package, ArrowRight, Loader2, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    stockLevel: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const ordersRef = collection(db, "orders");
        const ordersSnap = await getDocs(ordersRef);
        
        let revenue = 0;
        ordersSnap.forEach((doc) => {
          const data = doc.data();
          revenue += data.totalAmount || data.cartTotal || 0; 
        });

        const usersRef = collection(db, "users");
        const usersSnap = await getDocs(usersRef);

        let currentStock = "N/A";
        try {
          const productSnap = await getDoc(doc(db, "products", "master_product"));
          if (productSnap.exists()) {
            currentStock = productSnap.data().stock || 0;
          }
        } catch (e) {
          console.warn("Product collection not set up yet.");
        }

        setStats({
          totalRevenue: revenue,
          totalOrders: ordersSnap.size,
          totalUsers: usersSnap.size,
          stockLevel: currentStock,
        });

      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardStats();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
        <Loader2 className="animate-spin text-pink-500 mb-5" size={48} />
        <p className="text-gray-500 font-bold text-sm tracking-widest uppercase">Crunching your numbers...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      glow: "shadow-emerald-200/50"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      glow: "shadow-blue-200/50"
    },
    {
      title: "Active Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      glow: "shadow-purple-200/50"
    },
    {
      title: "Stock Level",
      value: stats.stockLevel,
      icon: Package,
      color: stats.stockLevel < 50 ? "text-red-600" : "text-amber-600",
      bgColor: stats.stockLevel < 50 ? "bg-red-50" : "bg-amber-50",
      borderColor: stats.stockLevel < 50 ? "border-red-100" : "border-amber-100",
      glow: stats.stockLevel < 50 ? "shadow-red-200/50" : "shadow-amber-200/50"
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-[10px] font-black uppercase tracking-widest mb-3">
            <Sparkles size={12} className="text-pink-500" /> Executive Summary
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2 font-medium">Welcome back! Here is what's happening with Lumora today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle accent line on top */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${stat.bgColor.replace('50', '400')}`}></div>
              
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
                </div>
                <div className={`p-3.5 rounded-2xl ${stat.bgColor} ${stat.color} border ${stat.borderColor} shadow-lg ${stat.glow} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        
        {/* Orders Card */}
        <div className="group bg-gradient-to-br from-pink-50/50 to-white p-8 rounded-[2rem] shadow-sm border border-pink-100 hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <TrendingUp size={120} />
          </div>
          
          <div className="flex items-center gap-3 mb-4 text-pink-600 relative z-10">
            <div className="p-3 bg-pink-100 rounded-xl shadow-inner group-hover:scale-110 transition-transform">
              <TrendingUp size={24} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recent Activity</h2>
          </div>
          
          <p className="text-gray-600 font-medium mb-8 relative z-10 flex-grow">
            Manage your latest customer orders, update shipping statuses, and process refunds quickly.
          </p>
          
          <Link 
            href="/admin/orders" 
            className="w-fit inline-flex items-center gap-2 px-6 py-3.5 bg-white text-pink-600 font-bold border-2 border-pink-100 rounded-xl hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all shadow-sm cursor-pointer relative z-10"
          >
            View All Orders <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Card */}
        <div className="group bg-gradient-to-br from-blue-50/50 to-white p-8 rounded-[2rem] shadow-sm border border-blue-100 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Package size={120} />
          </div>

          <div className="flex items-center gap-3 mb-4 text-blue-600 relative z-10">
            <div className="p-3 bg-blue-100 rounded-xl shadow-inner group-hover:scale-110 transition-transform">
              <Package size={24} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Inventory Health</h2>
          </div>
          
          <p className="text-gray-600 font-medium mb-8 relative z-10 flex-grow">
            Update your product pricing, restock quantities, manage image galleries, and add new variants.
          </p>
          
          <Link 
            href="/admin/products" 
            className="w-fit inline-flex items-center gap-2 px-6 py-3.5 bg-white text-blue-600 font-bold border-2 border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm cursor-pointer relative z-10"
          >
            Manage Product <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}