"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkoutStatus = searchParams.get("checkout");

    if (checkoutStatus === "success") {
      setMessage("🎉 Your subscription was successful!");
    } else if (checkoutStatus === "cancelled") {
      setMessage("❌ Checkout was cancelled. Feel free to try again.");
    }
  }, [searchParams]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {message && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-6">
          {message}
        </div>
      )}
      <p>Welcome to your dashboard. (Add dashboard functionality here)</p>
    </div>
  );
}
