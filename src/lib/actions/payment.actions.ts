import { baseUrl } from "../core/config";


interface CheckoutData {
  bookingId: string;
  amount: number;
  serviceName: string;
  userId?: string;
  serviceId?: string;
}


interface CheckoutResponse {
  success: boolean;
  url?: string;
  sessionId?: string;
  message?: string;
}


export const createCheckoutSession = async (
  data: CheckoutData
): Promise<CheckoutResponse> => {
  try {
    const res = await fetch(
      `${baseUrl}/api/payment/create-checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result.message || "Payment session failed"
      );
    }

    return result;
  } catch (error) {
    console.error("Checkout Session Error:", error);
    throw error;
  }
};


export const verifyPaymentSession = async (
  sessionId: string
): Promise<{ success: boolean; message?: string; bookingId?: string }> => {
  try {
    const res = await fetch(
      `${baseUrl}/api/payment/verify-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ sessionId })
      }
    );

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Verify Payment Session Error:", error);
    return { success: false, message: "Verification failed" };
  }
};