import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-5 text-center bg-gray-50">
      <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-pink-100">
        <FileQuestion size={48} className="text-pink-500" />
      </div>
      <h1 className="text-4xl font-black text-gray-900 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
        Oops! It looks like the page you are looking for has been moved, deleted, or never existed in the first place.
      </p>
      <Link href="/">
        <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition flex items-center gap-2 shadow-md hover:shadow-lg">
          <Home size={20} /> Back to Store
        </button>
      </Link>
    </div>
  );
}