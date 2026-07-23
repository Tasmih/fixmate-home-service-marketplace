"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

function PaymentCancelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service_id");

  useEffect(() => {
    // Clear active payment session/states
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("active_booking_id");
      sessionStorage.removeItem("active_payment_session");
      localStorage.removeItem("pending_booking");
    }

    // Show error alert and redirect back to checkout/payment page
    Swal.fire({
      icon: "error",
      title: "Payment Cancelled",
      text: "Your advance payment was cancelled or failed. Please try booking again.",
      confirmButtonText: "Return to Booking",
      confirmButtonColor: "#2563EB"
    }).then(() => {
      if (serviceId) {
        router.push(`/services/${serviceId}/booking`);
      } else {
        router.push("/services");
      }
    });
  }, [router, serviceId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="bg-white p-8 rounded-2xl shadow-sm border text-center max-w-md w-full">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          ✕
        </div>
        <h1 className="text-2xl font-bold text-red-600">
          Payment Cancelled
        </h1>
        <p className="mt-3 text-gray-600">
          Redirecting back to the checkout page...
        </p>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <p className="text-gray-500">Processing cancellation...</p>
      </div>
    }>
      <PaymentCancelContent />
    </Suspense>
  );
}