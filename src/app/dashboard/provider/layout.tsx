"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const {
    data: session,
    isPending,
  } = useSession();


  useEffect(()=>{

    if(!isPending){

      if(!session?.user){

        router.push("/login");

        return;

      }


      const user = session.user as {
        role?: "customer" | "provider" | "admin";
      };


      if(user.role !== "provider"){

        router.push("/dashboard");

      }

    }


  },[
    session,
    isPending,
    router
  ]);



  if(isPending){

    return (

      <div className="
      min-h-screen
      flex
      items-center
      justify-center
      ">

        Checking permission...

      </div>

    );

  }



  return children;

}