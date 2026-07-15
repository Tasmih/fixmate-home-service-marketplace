"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";


export default function SelectRolePage(){

  const router = useRouter();

  const [loading,setLoading]=useState(false);

  const updateRole = async(role:string)=>{

    setLoading(true);


    const res = await fetch("/api/user/role",{

      method:"PATCH",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify({
        role,
      }),

    });



    const data = await res.json();


    if(data.success){

      toast.success("Account setup completed");


      if(role==="provider"){

        router.push("/dashboard");

      }

      else{

        router.push("/");

      }


      router.refresh();

    }


    setLoading(false);

  };



  return(

    <div className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-[#F8FAFC]
    px-4
    ">


      <div className="
      bg-white
      shadow-xl
      rounded-3xl
      p-8
      w-full
      max-w-md
      text-center
      ">


        <h1 className="
        text-2xl
        font-bold
        text-[#14213D]
        ">
          Choose Account Type
        </h1>


        <p className="
        text-gray-500
        mt-2
        mb-6
        ">
          Select how you want to use FixMate
        </p>



        <div className="space-y-4">


          <Button

          isDisabled={loading}

          onClick={()=>updateRole("customer")}

          className="
          w-full
          h-12
          bg-[#2563EB]
          text-white
          rounded-xl
          "
          >

            Continue as Customer

          </Button>




          <Button

          isDisabled={loading}

          onClick={()=>updateRole("provider")}

          className="
          w-full
          h-12
          bg-[#F4B400]
          text-[#14213D]
          rounded-xl
          "
          >

            Continue as Provider

          </Button>


        </div>


      </div>


    </div>

  );

}