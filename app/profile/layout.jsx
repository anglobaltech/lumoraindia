import Sidebar from "../../components/dashboard/Sidebar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProfileLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-10 text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* New Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-pink-600 font-bold mb-6 hover:text-pink-800 transition">
          <ArrowLeft size={18} /> Back to Store
        </Link>
        
        <h1 className="text-3xl font-bold mb-8 text-gray-900">My Account</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}