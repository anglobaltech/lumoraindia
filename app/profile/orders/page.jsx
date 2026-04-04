"use client";
import React from "react";
import OrderCard from "../../../components/dashboard/OrderCard";

// Mock Data: We will replace this with real Firebase data in Phase 5
const MOCK_ORDERS = [
  {
    id: "LUM-98234",
    date: "12 Oct 2024",
    items: "2x Lumora Premium Soft Pads",
    total: 398,
    status: "Processing"
  },
  {
    id: "LUM-88120",
    date: "28 Sep 2024",
    items: "1x Lumora Overnight Protection",
    total: 249,
    status: "Delivered"
  }
];

export default function OrdersPage() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">My Orders</h2>
        <p className="text-sm text-gray-500 mt-1">Track your active shipments and view past purchases.</p>
      </div>

      <div className="space-y-4">
        {MOCK_ORDERS.length > 0 ? (
          MOCK_ORDERS.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-700">No orders yet</h3>
            <p className="text-sm text-gray-500 mt-2">When you buy something, it will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}