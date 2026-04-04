// "use client";
// import React, { useState } from "react";
// import { Globe, Bell, Mail, MessageSquare } from "lucide-react";

// export default function SettingsPage() {
//   const [language, setLanguage] = useState("English");
//   const [notifications, setNotifications] = useState({
//     orderUpdatesSMS: true,
//     promotionsEmail: false,
//     whatsappAlerts: true,
//   });

//   const toggleToggle = (key) => {
//     setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-8">
      
//       {/* Language Section */}
//       <div>
//         <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Globe size={22} className="text-pink-500"/> Language Preferences</h2>
//         <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Select App Language</label>
//           <select 
//             value={language} 
//             onChange={(e) => setLanguage(e.target.value)}
//             className="w-full md:w-1/2 p-3 rounded-lg border border-gray-200 outline-none focus:border-pink-400 bg-white"
//           >
//             <option value="English">English</option>
//             <option value="Hindi">हिन्दी (Hindi)</option>
//             <option value="Marathi">मराठी (Marathi)</option>
//             <option value="Gujarati">ગુજરાતી (Gujarati)</option>
//           </select>
//           <p className="text-xs text-gray-500 mt-2">Product descriptions will be automatically translated.</p>
//         </div>
//       </div>

//       {/* Notifications Section */}
//       <div>
//         <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Bell size={22} className="text-pink-500"/> Notification Settings</h2>
//         <div className="space-y-3">
          
//           {/* SMS Toggle */}
//           <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
//             <div className="flex items-center gap-3">
//               <MessageSquare size={20} className="text-gray-500" />
//               <div>
//                 <p className="font-semibold text-gray-900">SMS Order Updates</p>
//                 <p className="text-xs text-gray-500">Receive tracking links directly to your phone.</p>
//               </div>
//             </div>
//             <button onClick={() => toggleToggle('orderUpdatesSMS')} className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${notifications.orderUpdatesSMS ? 'bg-pink-500' : 'bg-gray-300'}`}>
//               <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${notifications.orderUpdatesSMS ? 'translate-x-6' : 'translate-x-0'}`}></div>
//             </button>
//           </div>

//           {/* Email Toggle */}
//           <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
//             <div className="flex items-center gap-3">
//               <Mail size={20} className="text-gray-500" />
//               <div>
//                 <p className="font-semibold text-gray-900">Email Promotions</p>
//                 <p className="text-xs text-gray-500">Exclusive discounts and new product launches.</p>
//               </div>
//             </div>
//             <button onClick={() => toggleToggle('promotionsEmail')} className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${notifications.promotionsEmail ? 'bg-pink-500' : 'bg-gray-300'}`}>
//               <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${notifications.promotionsEmail ? 'translate-x-6' : 'translate-x-0'}`}></div>
//             </button>
//           </div>

//         </div>
//       </div>
      
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { Globe, Bell, Mail, MessageSquare } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    orderUpdatesSMS: true,
    promotionsEmail: false,
    whatsappAlerts: true,
  });

  // State to hold the current language so the dropdown reflects reality
  const [currentLang, setCurrentLang] = useState("en");

  // Check the current Google Translate cookie on mount
  useEffect(() => {
    const match = document.cookie.match(/(?:^|;)\s*googtrans=([^;]*)/);
    if (match) {
      const parts = match[1].split('/'); // e.g., '/en/hi'
      if (parts.length > 2) {
        setCurrentLang(parts[2]);
      }
    }
  }, []);

  const toggleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // --- LANGUAGE TRANSLATION LOGIC ---
  const allLanguages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी (Hindi)" },
    { code: "bn", name: "বাংলা (Bengali)" },
    { code: "te", name: "తెలుగు (Telugu)" },
    { code: "mr", name: "मराठी (Marathi)" },
    { code: "ta", name: "தமிழ் (Tamil)" },
    { code: "gu", name: "ગુજરાતી (Gujarati)" },
    { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
    { code: "ml", name: "മലയാളം (Malayalam)" },
    { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
    { code: "or", name: "ଓଡ଼ିଆ (Odia)" },
    { code: "as", name: "অসমীয়া (Assamese)" },
    { code: "ur", name: "اردو (Urdu)" },
    { code: "sa", name: "संस्कृतम् (Sanskrit)" },
    { code: "mai", name: "मैथिली (Maithili)" },
    { code: "bho", name: "भोजपुरी (Bhojpuri)" },
    { code: "sd", name: "سنڌي (Sindhi)" },
    { code: "ne", name: "नेपाली (Nepali)" },
    { code: "es", name: "Español (Spanish)" },
    { code: "fr", name: "Français (French)" },
    { code: "ar", name: "العربية (Arabic)" }
  ];

  const handleLanguageChange = (langCode) => {
    // 1. Delete existing cookies to prevent conflicts
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;
    
    // 2. Set the new language cookie
    if (langCode !== "en") {
      document.cookie = `googtrans=/en/${langCode}; path=/`;
      document.cookie = `googtrans=/en/${langCode}; domain=.${window.location.hostname}; path=/`;
    }

    // 3. Hard reload to apply the translation
    window.location.reload();
  };
  // ----------------------------------

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-8">
      
      {/* Language Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Globe size={22} className="text-pink-500"/> Language Preferences
        </h2>
        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select App Language</label>
          <select 
            value={currentLang} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="w-full md:w-1/2 p-3 rounded-lg border border-gray-200 outline-none focus:border-pink-400 bg-white"
          >
            {allLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">Product descriptions will be automatically translated.</p>
        </div>
      </div>

      {/* Notifications Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Bell size={22} className="text-pink-500"/> Notification Settings
        </h2>
        <div className="space-y-3">
          
          {/* SMS Toggle */}
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <MessageSquare size={20} className="text-gray-500" />
              <div>
                <p className="font-semibold text-gray-900">SMS Order Updates</p>
                <p className="text-xs text-gray-500">Receive tracking links directly to your phone.</p>
              </div>
            </div>
            <button onClick={() => toggleToggle('orderUpdatesSMS')} className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${notifications.orderUpdatesSMS ? 'bg-pink-500' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${notifications.orderUpdatesSMS ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>

          {/* Email Toggle */}
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gray-500" />
              <div>
                <p className="font-semibold text-gray-900">Email Promotions</p>
                <p className="text-xs text-gray-500">Exclusive discounts and new product launches.</p>
              </div>
            </div>
            <button onClick={() => toggleToggle('promotionsEmail')} className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${notifications.promotionsEmail ? 'bg-pink-500' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${notifications.promotionsEmail ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
}