"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaUserCheck, FaBolt, FaShieldAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import React from "react";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      role,
    });

    if (data) {
      toast.success("Account created successfully", {
        icon: <FaCheckCircle />,
      });

      router.push("/");
      router.refresh();
    }

    if (error) {
      toast.error(error.message || "Registration failed", {
        icon: <FaTimesCircle />,
      });
    }
  };


  const googleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };


  return (
    <div className="bg-[#F8FAFC] flex justify-center px-4 py-8">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white border border-gray-200 rounded-3xl overflow-hidden">


        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-[#14213D] to-[#2563EB] px-10 py-10 text-white">

          <h1 className="text-4xl font-bold leading-tight">
            Trusted Services
            <br />
            At Your Doorste
          </h1>


          <p className="mt-5 text-white/80 leading-7">
            Find verified professionals for electrician, plumbing, cleaning and other home services.
          </p>


          <div className="mt-8 space-y-5">

            <Feature icon={<FaUserCheck />} text="Verified Providers" />

            <Feature icon={<FaBolt />} text="Fast Booking" />

            <Feature icon={<FaShieldAlt />} text="Secure Platform" />

          </div>


        </div>



        <div className="px-8 sm:px-12 py-8 flex flex-col justify-center">


          <div className="text-center mb-6">

            <h2 className="text-3xl font-bold text-[#14213D]">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Join FixMate today
            </p>

          </div>



          <form onSubmit={handleSubmit} className="space-y-4">


            <Input
              name="name"
              label="Full Name"
              placeholder="Enter your name"
              className="w-full"
            />



            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="example@gmail.com"
              className="w-full"
            />



            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Create password"
              className="w-full"
            />



            <p className="text-xs text-gray-400 -mt-2">
              Minimum 6 characters
            </p>




            <div>

              <label className="text-sm font-semibold">
                Account Type
              </label>


              <select
                name="role"
                defaultValue="customer"
                className="mt-2 w-full h-11 rounded-xl border border-gray-200 px-4 outline-none"
              >

                <option value="customer">
                  Customer
                </option>


                <option value="provider">
                  Service Provider
                </option>


              </select>


            </div>




            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#2563EB] text-white font-semibold"
            >
              Create Account
            </Button>


          </form>





          <div className="flex items-center gap-3 my-5">

            <div className="flex-1 h-px bg-gray-200" />

            <span className="text-sm text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200" />

          </div>





          <Button
            onClick={googleLogin}
            className="w-full h-11 rounded-xl border bg-white text-[#14213D]"
          >

            <FcGoogle size={22} />

            Continue with Google

          </Button>





          <p className="text-center text-sm text-gray-500 mt-5">

            Already have account?

            <Link
              href="/login"
              className="ml-1 text-[#2563EB] font-semibold"
            >
              Login
            </Link>

          </p>



        </div>


      </div>


    </div>
  );
}



function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {

  return (

    <div className="flex items-center gap-4">

      <div className="w-11 h-11 rounded-full bg-[#F4B400] text-[#14213D] flex items-center justify-center">

        {icon}

      </div>


      <span className="text-lg">
        {text}
      </span>


    </div>

  );

}