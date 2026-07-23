"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyPaymentSession } from "@/lib/actions/payment.actions";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("booking_id");
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        if (sessionId) {
          await verifyPaymentSession(sessionId);
        }

        // Clear active payment session/states
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("active_booking_id");
          sessionStorage.removeItem("active_payment_session");
          localStorage.removeItem("pending_booking");
        }

        // Immediately redirect to customer dashboard with success flag
        router.push("/dashboard/customer?payment_success=true&amount=500");
      } catch (error) {
        console.error("Success verification error:", error);
        router.push("/dashboard/customer?payment_success=true&amount=500");
      } finally {
        setVerifying(false);
      }
    };

    handleSuccess();
  }, [router, sessionId, bookingId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="bg-white p-8 rounded-2xl shadow-sm border text-center max-w-md w-full">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-[#14213D]">
          Payment Successful!
        </h1>
        <p className="mt-3 text-gray-600">
          Your advance payment of 500 BDT has been received successfully.
        </p>
        <p className="mt-4 text-sm text-gray-400">
          {verifying ? "Verifying transaction..." : "Redirecting to your dashboard..."}
        </p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <p className="text-gray-500">Processing payment confirmation...</p>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}

