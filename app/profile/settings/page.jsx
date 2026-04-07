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
import React, { useState } from "react";
import { Bell, Mail, MessageSquare } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    orderUpdatesSMS: true,
    promotionsEmail: false,
    whatsappAlerts: true,
  });

  const toggleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-8">
      
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