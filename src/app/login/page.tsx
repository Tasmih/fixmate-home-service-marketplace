"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

import {
  FaUserCheck,
  FaBolt,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import React from "react";

export default function LoginPage() {
  const router = useRouter();

  const {
    data: session,
    isPending
  } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fillDemo = (type: "customer" | "provider") => {
    if (type === "customer") {
      setEmail("Ayra@gmail.com");
      setPassword("Ayra@123");
    } else {
      setEmail("ayan@gmail.com");
      setPassword("Ayan@123");
    }
  };

  useEffect(()=>{

    if(!isPending && session?.user){

      const user =
      session.user as typeof session.user & {

        role?:
        "customer"
        |
        "provider"
        |
        "admin";

      };

      const role =
      user.role || "customer";

      if(
        role === "provider" ||
        role === "admin"
      ){

        router.push("/dashboard");

      }

      else{

        router.push("/");

      }

    }

  },[
    session,
    isPending,
    router
  ]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  )=>{

    e.preventDefault();

    const { data, error } =
    await authClient.signIn.email({

      email,

      password,

      callbackURL:"/dashboard"

    });

    if(error){

      toast.error(
        error.message ||
        "Login failed"
      );

      return;

    }

    if(data){

      toast.success(
        "Login successful",
        {
          icon:<FaCheckCircle/>
        }
      );

      router.refresh();

    }

  };

  const googleLogin = async()=>{

    await authClient.signIn.social({

      provider:"google",

      callbackURL:"/select-role"

    });

  };

  if(isPending){

    return (

      <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#F8FAFC]
      "
      >

        Loading...

      </div>

    );

  }

  return (

    <div
    className="
    min-h-screen
    bg-[#F8FAFC]
    flex
    items-center
    justify-center
    px-4
    py-10
    "
    >

      <div
      className="
      w-full
      max-w-4xl
      grid
      md:grid-cols-2
      bg-white
      rounded-3xl
      shadow-xl
      overflow-hidden
      "
      >

        {/* LEFT SIDE */}

        <div
        className="
        hidden
        md:flex
        flex-col
        justify-center
        bg-gradient-to-br
        from-[#14213D]
        to-[#2563EB]
        px-10
        py-10
        text-white
        "
        >

          <h1
          className="
          text-3xl
          font-bold
          "
          >

            Welcome Back
            <br/>
            To FixMate

          </h1>

          <p
          className="
          mt-4
          text-sm
          text-white/80
          "
          >

            Login to find trusted local service providers and manage your bookings easily.

          </p>

          <div
          className="
          mt-8
          space-y-5
          "
          >

            <Feature
            icon={<FaUserCheck/>}
            text="Verified Professionals"
            />

            <Feature
            icon={<FaBolt/>}
            text="Quick Service Booking"
            />

            <Feature
            icon={<FaShieldAlt/>}
            text="Secure Account"
            />

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div
        className="
        px-10
        py-8
        flex
        flex-col
        justify-center
        "
        >

          <div
          className="
          text-center
          mb-6
          "
          >

            <h2
            className="
            text-3xl
            font-bold
            text-[#14213D]
            "
            >

              Welcome Back

            </h2>

            <p
            className="
            text-gray-500
            text-sm
            mt-2
            "
            >

              Login to your FixMate account

            </p>

          </div>

          {/* Demo login buttons */}

          <div className="flex gap-2 mb-4">

            <Button
            type="button"
            onClick={()=>fillDemo("customer")}
            className="
            flex-1
            h-10
            rounded-xl
            border
            border-gray-200
            text-xs
            bg-white
            text-[#14213D]
            font-medium
            "
            >

              Customer

            </Button>

            <Button
            type="button"
            onClick={()=>fillDemo("provider")}
            className="
            flex-1
            h-10
            rounded-xl
            border
            border-gray-200
            text-xs
            bg-white
            text-[#14213D]
            font-medium
            "
            >

             Provider

            </Button>

          </div>

          <form
          onSubmit={handleSubmit}
          className="
          space-y-4
          "
          >

            <Input
            className="w-full"
            name="email"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="example@gmail.com"
            />

            <Input
            className="w-full"
            name="password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter password"
            />

            <Button
            type="submit"
            className="
            w-full
            h-11
            rounded-xl
            bg-[#2563EB]
            text-white
            "
            >

              Login

            </Button>

          </form>

          <div
          className="
          flex
          items-center
          gap-3
          my-4
          "
          >

            <div className="flex-1 h-px bg-gray-200"/>

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200"/>

          </div>

        <Button
onClick={googleLogin}
className="
w-full
h-11
rounded-xl
border
bg-white
text-[#14213D]
font-medium
flex
items-center
justify-center
gap-2
"
>

  <FcGoogle size={22}/>

  Continue with Google

</Button>

          <p
          className="
          text-center
          text-sm
          text-gray-900
          mt-5
          "
          >

            Don't have an account?

            <Link
            href="/register"
            className="
            ml-1
            text-[#2563EB]
            font-semibold
            "
            >

              Create Account

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

function Feature({

icon,
text

}:{

icon:React.ReactNode;
text:string;

}){

return (

<div
className="
flex
items-center
gap-4
"
>

<div
className="
w-10
h-10
rounded-full
bg-[#F4B400]
flex
items-center
justify-center
text-[#14213D]
"
>

{icon}

</div>

<span>
{text}
</span>

</div>

);

}
