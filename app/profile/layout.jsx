import Sidebar from "../../components/dashboard/Sidebar";
import Link from "next/link";
import { ArrowLeft, UserCircle } from "lucide-react";

export default function ProfileLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 relative overflow-hidden text-gray-900">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-pink-300/20 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12 relative z-10">
        
        {/* Sleek Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-pink-100 text-pink-600 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:bg-pink-600 hover:text-white hover:scale-105 transition-all duration-300 font-bold text-sm mb-8"
        >
          <ArrowLeft size={18} /> Back to Store
        </Link>

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8 lg:mb-12 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center text-pink-600 shadow-inner border border-pink-50">
            <UserCircle size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            My Account
          </h1>
        </div>
        
        {/* Responsive Sidebar & Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <Sidebar />
          </div>
          
          {/* Dynamic Content Area */}
          <div className="flex-1 w-full min-w-0">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}