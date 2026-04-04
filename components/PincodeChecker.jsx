"use client";
import React, { useState } from "react";
import { MapPin, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const PincodeChecker = () => {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleCheck = () => {
    // Basic validation
    if (pincode.length !== 6 || isNaN(pincode)) {
      setStatus("error");
      setMessage("Please enter a valid 6-digit Pincode.");
      return;
    }

    setStatus("loading");

    // Simulate API Call to Shiprocket/Delhivery (We will replace this with real API in Phase 5)
    setTimeout(() => {
      // Mock Logic: Let's pretend we don't deliver to pincodes starting with '9'
      if (pincode.startsWith("9")) {
        setStatus("error");
        setMessage("Sorry, we do not deliver to this location yet.");
      } else {
        setStatus("success");
        // Calculate a random delivery date 3-5 days from now
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
        const formattedDate = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
        
        setMessage(`Free Delivery by ${formattedDate}`);
      }
    }, 1200);
  };

  return (
    <div className="mt-4 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={18} className="text-gray-500" />
        <span className="text-sm font-semibold text-gray-700">Check Delivery</span>
      </div>
      
      <div className="relative flex items-center max-w-sm">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit Pincode"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value);
            if (status !== "idle") setStatus("idle"); // Reset on type
          }}
          className="w-full border border-gray-300 rounded-lg py-3 pl-4 pr-20 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition font-medium text-gray-900"
        />
        <button
          onClick={handleCheck}
          disabled={status === "loading" || !pincode}
          className="absolute right-2 text-pink-600 font-bold text-sm hover:text-pink-800 transition disabled:opacity-50"
        >
          {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : "Check"}
        </button>
      </div>

      {/* Feedback Messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 mt-2 text-green-600 text-sm font-medium animate-fade-in-down">
          <CheckCircle2 size={16} />
          {message}
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 mt-2 text-red-500 text-sm font-medium animate-fade-in-down">
          <XCircle size={16} />
          {message}
        </div>
      )}
    </div>
  );
};

export default PincodeChecker;