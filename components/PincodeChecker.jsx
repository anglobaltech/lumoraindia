"use client";
import React, { useState } from "react";
import { MapPin, CheckCircle2, XCircle, Loader2, CalendarDays } from "lucide-react";

const PincodeChecker = () => {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState({ city: "", state: "" });

  const handleCheck = async () => {
    // Basic validation
    if (pincode.length !== 6 || isNaN(pincode)) {
      setStatus("error");
      setMessage("Please enter a valid 6-digit Pincode.");
      return;
    }

    setStatus("loading");

    try {
      // Fetching real location data from Indian Postal API
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data && data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        
        // Grab real District and State
        const fetchedCity = postOffice.District || postOffice.Block;
        const fetchedState = postOffice.State;

        // Calculate a dynamic delivery date (3-5 days from now)
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
        const formattedDate = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
        
        setLocation({ city: fetchedCity, state: fetchedState });
        setMessage(formattedDate);
        setStatus("success");
      } else {
        // If API says pincode is invalid
        setStatus("error");
        setMessage("Invalid Pincode. Please check and try again.");
        setLocation({ city: "", state: "" });
      }
    } catch (error) {
      console.error("Error fetching pincode:", error);
      setStatus("error");
      setMessage("Unable to verify pincode at the moment.");
      setLocation({ city: "", state: "" });
    }
  };

  return (
    <div className="mt-4 mb-6 bg-gray-50/50 p-4 sm:p-5 rounded-2xl border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <MapPin size={18} className="text-pink-500" />
        <span className="text-sm font-bold text-gray-900">Check Delivery Availability</span>
      </div>
      
      {/* Input Field Area */}
      <div className="relative flex items-center w-full">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit Pincode"
          value={pincode}
          onChange={(e) => {
            // Only allow numbers
            const val = e.target.value.replace(/\D/g, '');
            setPincode(val);
            if (status !== "idle") setStatus("idle"); // Reset on type
          }}
          className="w-full border border-gray-200 bg-white rounded-xl py-3.5 pl-4 pr-24 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition shadow-sm font-medium text-gray-900"
        />
        <button
          onClick={handleCheck}
          disabled={status === "loading" || pincode.length !== 6}
          className="absolute right-2 text-white bg-gray-900 hover:bg-black px-4 py-2 rounded-lg font-bold text-xs transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[70px] cursor-pointer"
        >
          {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : "Check"}
        </button>
      </div>

      {/* Feedback Messages */}
      {status === "error" && (
        <div className="flex items-center gap-2 mt-3 text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-1">
          <XCircle size={16} />
          {message}
        </div>
      )}

      {/* Dynamic Success Box with Real City & State */}
      {status === "success" && (
        <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-xl animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-green-800 leading-tight">Delivery Available!</p>
              
              {/* Displaying the Fetched Dynamic City and State */}
              <p className="text-xs font-semibold text-green-700 mt-1 mb-3">
                {location.city}, {location.state} {pincode}
              </p>
              
              {/* Simplified date display, removed Free Standard */}
              <div className="flex flex-wrap items-center gap-2 bg-white px-3 py-2 rounded-lg border border-green-100 shadow-sm w-fit">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                  <CalendarDays size={14} className="text-pink-500" /> Delivery by {message}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PincodeChecker;