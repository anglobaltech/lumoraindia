import React from "react";
import { Package, ChevronRight, XCircle } from "lucide-react";

const OrderCard = ({ order, onViewDetails, onCancelPrompt }) => {
  // Helper to pick colors based on status
  const statusColors = {
    "Order Placed": "bg-blue-50 text-blue-600 border-blue-200",
    "Processing": "bg-orange-50 text-orange-600 border-orange-200",
    "processing": "bg-orange-50 text-orange-600 border-orange-200",
    "Shipped": "bg-indigo-50 text-indigo-600 border-indigo-200",
    "shipped": "bg-indigo-50 text-indigo-600 border-indigo-200",
    "Delivered": "bg-green-50 text-green-600 border-green-200",
    "delivered": "bg-green-50 text-green-600 border-green-200",
    "Cancelled": "bg-red-50 text-red-600 border-red-200",
    "cancelled": "bg-red-50 text-red-600 border-red-200",
  };

  // Only allow cancellation if order hasn't been shipped yet
  const canCancel = order.status === "Order Placed" || order.status === "Processing" || order.status === "processing";

  return (
    <div className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition bg-white flex flex-col sm:flex-row gap-6 items-center">
      {/* Product Image Placeholder or Real Image */}
      <div className="w-24 h-24 bg-pink-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
        {order.itemsList && order.itemsList[0]?.image ? (
          <img 
            src={order.itemsList[0].image} 
            alt="Product" 
            className="w-full h-full object-cover" 
          />
        ) : (
          <Package size={32} className="text-pink-300" />
        )}
      </div>

      {/* Order Info */}
      <div className="flex-1 text-center sm:text-left w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
          <h3 className="font-semibold text-gray-700 text-lg">Order #{order.id}</h3>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border mt-2 sm:mt-0 w-fit mx-auto sm:mx-0 ${statusColors[order.status] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
            {order.status}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-1">
          Placed on: <span className="font-medium text-gray-700">{order.date}</span>
        </p>
        <p className="text-sm text-gray-500">
          Items: <span className="font-medium text-gray-700">
            {order.itemsList ? `${order.itemsList.length} items` : order.items}
          </span>
        </p>
      </div>

      {/* Price & Actions */}
      <div className="flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">
        <span className="font-semibold text-xl text-gray-700">₹{order.total}</span>
        
        <div className="flex items-center gap-4 mt-2">
          {/* Cancel Button (Only visible if order is eligible) */}
          {canCancel && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onCancelPrompt(order); // Triggers the beautiful modal in parent
              }}
              className="flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-700 transition cursor-pointer"
            >
              <XCircle size={16} /> Cancel
            </button>
          )}

          {/* View Details Button */}
          <button 
            onClick={onViewDetails}
            className="flex items-center gap-1 text-sm font-semibold text-pink-600 hover:text-pink-800 transition cursor-pointer"
          >
            View Details <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;