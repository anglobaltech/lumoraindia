"use client";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Loader2, LayoutDashboard, ShoppingCart, Package, MessageSquare, LogOut, Users, Menu, X, ShieldCheck, HelpCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminLayout({ children }) {
  const { adminUser, adminProfile, adminLoading, adminLogout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Only check permissions if we are completely done loading the state
    if (!adminLoading) {
      if (pathname === "/admin/login") return;
      
      if (adminProfile?.role !== "admin") {
        router.push("/admin/login");
      }
    }
  }, [adminProfile, adminLoading, router, pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (adminLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-pink-500 mb-5" size={48} />
        <p className="text-gray-500 font-black text-sm tracking-widest uppercase animate-pulse">Verifying Admin Access...</p>
      </div>
    );
  }

  if (pathname === "/admin/login") return <>{children}</>;
  // Prevent flashing content while router pushes
  if (adminProfile?.role !== "admin") return null; 

  const handleLogout = async () => {
    await adminLogout();
    toast.success("Logged out of Admin Portal");
    router.push("/admin/login");
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Reviews", href: "/admin/reviews-faq", icon: MessageSquare }, 
    { name: "FAQs", href: "/admin/faq", icon: HelpCircle }, 
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-200/20 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/20 blur-[100px] pointer-events-none rounded-full"></div>

      {/* Mobile Dark Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300 cursor-pointer" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`bg-white/90 backdrop-blur-xl border-r border-gray-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col fixed h-full z-50 w-72 transform transition-transform duration-500 ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <div className="p-6 lg:p-8 border-b border-gray-100 flex justify-between items-center bg-white/50">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="text-pink-600" size={28} /> Lumora
            </h1>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 ml-9">Admin Portal</p>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 text-gray-400 hover:text-gray-700 bg-gray-50 rounded-full transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 lg:p-6 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-2">Menu</p>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 group cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md shadow-pink-200"
                    : "text-gray-500 hover:bg-pink-50 hover:text-pink-600"
                }`}
              >
                <Icon size={20} className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-white" : "text-gray-400 group-hover:text-pink-500"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 lg:p-6 border-t border-gray-100 bg-white/50">
          <div className="px-4 py-3.5 mb-3 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Logged in as</p>
            <p className="text-sm font-bold text-gray-900 truncate mt-0.5">{adminProfile?.email || adminUser?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-red-600 bg-red-50 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Secure Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-72 transition-all duration-300 relative z-10">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-xl transition-colors cursor-pointer"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <ShieldCheck className="text-pink-600" size={20} /> Admin Portal
            </h1>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-x-hidden w-full">
          <div className="max-w-[1600px] mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}