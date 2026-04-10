"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Shield, Plus, Trash2, Mail, Loader2, ShieldCheck, Users } from "lucide-react";
import { toast } from "react-toastify";

export default function TeamManagementPage() {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const adminSnap = await getDocs(collection(db, "admins"));
      const adminList = adminSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAdmins(adminList);
    } catch (error) {
      toast.error("Failed to load team members");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!newEmail) return;

    setIsAdding(true);
    try {
      await setDoc(doc(db, "admins", newEmail.toLowerCase()), {
        email: newEmail.toLowerCase(),
        role: "admin",
        createdAt: new Date().toISOString()
      });
      
      toast.success(`${newEmail} has been granted Admin access!`);
      setNewEmail("");
      fetchAdmins(); 
    } catch (error) {
      toast.error("Failed to add admin");
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveAdmin = async (emailId) => {
    if(!confirm("Are you sure you want to revoke admin access for this user?")) return;
    
    try {
      await deleteDoc(doc(db, "admins", emailId));
      toast.success("Admin access revoked.");
      setAdmins(admins.filter(a => a.id !== emailId));
    } catch (error) {
      toast.error("Failed to remove admin");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl p-6 lg:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Team Management</h2>
          <p className="text-gray-500 text-sm mt-1.5 font-medium">Add or revoke administrative privileges for your staff.</p>
        </div>
        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shadow-inner hidden md:block">
           <Users size={28} />
        </div>
      </div>

      {/* Add New Admin Form */}
      <div className="bg-gradient-to-br from-white to-purple-50/30 p-6 lg:p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/50 rounded-full blur-[80px] pointer-events-none"></div>
        
        <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3 relative z-10">
          <div className="p-2.5 bg-pink-100 rounded-xl text-pink-600 shadow-inner">
             <Shield size={20} />
          </div>
          Grant Admin Access
        </h3>
        
        <form onSubmit={handleAddAdmin} className="flex flex-col sm:flex-row gap-4 relative z-10">
          <div className="relative flex-1 group">
            <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
            <input 
              type="email" 
              placeholder="employee@lumora.in" 
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-xl text-base font-bold focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all shadow-sm placeholder-gray-300"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isAdding}
            className="px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer shadow-md"
          >
            {isAdding ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
            Authorize Staff
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 font-medium relative z-10">
          <span className="font-bold text-gray-700">Note:</span> Once added, tell your employee to sign up on the main website with this exact email. They will automatically bypass the standard customer profile and gain access to this dashboard.
        </p>
      </div>

      {/* Admin List Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 lg:px-8 border-b border-gray-50">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck size={20} className="text-green-500" /> Active Administrators
          </h3>
        </div>

        {isLoading ? (
          <div className="p-16 text-center text-gray-500 flex flex-col items-center">
            <Loader2 className="animate-spin text-pink-500 mb-4" size={32} /> 
            <span className="font-bold text-sm tracking-widest uppercase">Loading Roster...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-50/80 border-b border-gray-100">
                <tr>
                  <th className="py-5 px-6 lg:px-8 text-[11px] font-black text-gray-400 uppercase tracking-widest">User Email</th>
                  <th className="py-5 px-6 lg:px-8 text-[11px] font-black text-gray-400 uppercase tracking-widest">Role Privileges</th>
                  <th className="py-5 px-6 lg:px-8 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-pink-50/30 transition-colors group">
                    <td className="py-5 px-6 lg:px-8">
                      <div className="font-bold text-gray-900 text-base">{admin.email}</div>
                    </td>
                    <td className="py-5 px-6 lg:px-8">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm ${
                        admin.role === "superadmin" 
                        ? "bg-purple-50 text-purple-600 border-purple-200" 
                        : "bg-emerald-50 text-emerald-600 border-emerald-200"
                      }`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className="py-5 px-6 lg:px-8 text-right">
                      {admin.role !== "superadmin" ? (
                        <button 
                          onClick={() => handleRemoveAdmin(admin.id)}
                          className="inline-flex items-center justify-center p-2.5 text-red-400 hover:text-red-600 bg-white border border-gray-200 hover:border-red-200 hover:bg-red-50 rounded-xl transition-all shadow-sm cursor-pointer"
                          title="Revoke Access"
                        >
                          <Trash2 size={18} />
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wider mr-2">Immutable</span>
                      )}
                    </td>
                  </tr>
                ))}
                {admins.length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-12 text-center text-gray-500 font-medium">No administrators found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}