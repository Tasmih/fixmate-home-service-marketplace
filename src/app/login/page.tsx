"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaUserCheck, FaBolt, FaShieldAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import React from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

  const { data, error } = await authClient.signIn.email({
  email,
  password,
  callbackURL: "/dashboard",
});

if (data) {

  toast.success("Login successful", {
    icon:<FaCheckCircle/>
  });


  const role = data.user.role;


  if(role === "provider" || role === "admin"){

    router.push("/dashboard");

  }
  else{

    router.push("/");

  }


  router.refresh();

}
  }


 const googleLogin = async () => {

  await authClient.signIn.social({

    provider: "google",

    callbackURL: "/select-role",

  });

};
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-[#14213D] to-[#2563EB] px-10 py-10 text-white">
          <h1 className="text-3xl font-bold leading-tight">
            Welcome Back
            <br />
            To FixMate
          </h1>

          <p className="mt-4 text-sm text-white/80 leading-6">
            Login to find trusted local service providers and manage your bookings easily.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4B400] flex items-center justify-center text-[#14213D]">
                <FaUserCheck />
              </div>
              <span>Verified </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4B400] flex items-center justify-center text-[#14213D]">
                <FaBolt />
              </div>
              <span>Quick Service Booking</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4B400] flex items-center justify-center text-[#14213D]">
                <FaShieldAlt />
              </div>
              <span>Secure Account</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="px-10 py-8 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#14213D]">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-2">Login to your FixMate account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Email *</label>
              <Input className="w-full" name="email" type="email" placeholder="example@gmail.com" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password *</label>
              <Input className="w-full" name="password" type="password" placeholder="Enter password" />
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-[#14213D]"
            >
              Login
            </Button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Button
            onClick={googleLogin}
            className="w-full h-11 rounded-xl border border-gray-200 bg-white text-[#14213D]"
          >
            <FcGoogle size={22} />
            Continue with Google
          </Button>

          <p className="text-center text-sm text-gray-500 mt-5">
            Don't have an account?
            <Link href="/register" className="ml-1 text-[#2563EB] font-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}