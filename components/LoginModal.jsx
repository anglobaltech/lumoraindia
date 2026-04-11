"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { X, Mail, Lock, User, Phone, MapPin, Map, Loader2, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

export default function LoginModal({ isOpen, onClose }) {
  // Steps: 1 = SignIn, 2 = SignUp(Email), 3 = Details, 4 = Success
  const [step, setStep] = useState(1);
  const { login, signUp, completeProfile } = useAuthStore();

  // THE FIX: Added local loading state to safely control the UI spinner
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Profile State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [locLoading, setLocLoading] = useState(false);

  // Temporary UID storage
  const [tempUid, setTempUid] = useState(null);

  if (!isOpen) return null;

  // --- ACTIONS ---

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start spinner
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success("Welcome back!");
        onClose();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("An error occurred during sign in.");
    } finally {
      setIsLoading(false); // THE FIX: Guarantee spinner stops
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be at least 6 characters.");
    
    setIsLoading(true); // Start spinner
    try {
      const result = await signUp(email, password);
      if (result.success) {
        setTempUid(result.uid);
        setStep(3); // Move to Details form
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("An error occurred during sign up.");
    } finally {
      setIsLoading(false); // THE FIX: Guarantee spinner stops
    }
  };

  const handleGetLocation = () => {
    setLocLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({ lat: position.coords.latitude, lng: position.coords.longitude });
          toast.success("Live location captured!");
          setLocLoading(false);
        },
        (error) => {
          toast.error("Could not get location. Please allow permissions.");
          setLocLoading(false);
        }
      );
    } else {
      toast.error("Geolocation not supported by your browser.");
      setLocLoading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start spinner
    
    try {
      const profileData = { name, phone, age, address, coordinates };
      const result = await completeProfile(tempUid, profileData);
      
      if (result.success) {
        setStep(4); // Move to Success Animation
        setTimeout(() => {
          onClose(); // Auto close after 3 seconds
          setStep(1); // Reset for next time
        }, 3000);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to complete profile.");
    } finally {
      setIsLoading(false); // THE FIX: Guarantee spinner stops
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative transition-all duration-300">
        
        {step !== 4 && step !== 3 && (
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-200 rounded-full p-2 transition">
            <X size={20} />
          </button>
        )}

        <div className="p-8">
          <div className="text-center mb-6">
            <Image src="/logo2.png" alt="Lumora" width={100} height={35} className="mx-auto mb-4 h-10 w-auto" />
            
            {step === 1 && <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>}
            {step === 2 && <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>}
            {step === 3 && <h2 className="text-2xl font-bold text-gray-900">Complete Profile</h2>}
            
            <p className="text-gray-500 text-sm mt-1">
              {step === 1 && "Log in to access your orders."}
              {step === 2 && "Join Lumora for a premium experience."}
              {step === 3 && "Just a few details for faster delivery."}
            </p>
          </div>

          {/* STEP 1: SIGN IN */}
          {step === 1 && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-4 text-gray-400" />
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" required />
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-4 text-gray-400" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" required />
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-xl flex justify-center items-center">
                {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
              </button>
              <p className="text-center text-sm text-gray-600 mt-4">
                New here? <button type="button" onClick={() => setStep(2)} className="text-pink-600 font-bold hover:underline">Create Account</button>
              </p>
            </form>
          )}

          {/* STEP 2: SIGN UP */}
          {step === 2 && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-4 text-gray-400" />
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" required />
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-4 text-gray-400" />
                <input type="password" placeholder="Password (Min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" required />
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-xl flex justify-center items-center">
                {isLoading ? <Loader2 className="animate-spin" /> : "Next Step ➔"}
              </button>
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account? <button type="button" onClick={() => setStep(1)} className="text-pink-600 font-bold hover:underline">Log In</button>
              </p>
            </form>
          )}

          {/* STEP 3: DETAILS */}
          {step === 3 && (
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div className="flex gap-3">
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-2/3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500" required />
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="w-1/3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500" required />
              </div>
              <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500" required />
              <textarea placeholder="Full Delivery Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 h-20 resize-none" required />
              
              <button type="button" onClick={handleGetLocation} className={`w-full py-3 rounded-xl border-2 flex justify-center items-center gap-2 font-semibold transition ${coordinates ? 'bg-green-50 border-green-500 text-green-700' : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'}`}>
                {locLoading ? <Loader2 className="animate-spin" /> : <MapPin size={18} />}
                {coordinates ? "Location Captured ✓" : "Get Live Location"}
              </button>

              <button type="submit" disabled={isLoading} className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl flex justify-center items-center mt-2">
                {isLoading ? <Loader2 className="animate-spin" /> : "Complete Account"}
              </button>
            </form>
          )}

          {/* STEP 4: SUCCESS ANIMATION */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h3>
              <p className="text-gray-500">Welcome to the Lumora Family.</p>
              <p className="text-sm text-gray-400 mt-6 animate-pulse">Redirecting to store...</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}