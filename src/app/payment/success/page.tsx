"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage(){

  const router = useRouter();

  useEffect(()=>{

    const timer = setTimeout(()=>{

      router.push("/services");

    }, 2500);

    return ()=> clearTimeout(timer);

  },[router]);

return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-[#F8FAFC]
">

<div className="
bg-white
p-8
rounded-xl
shadow
text-center
">


<h1 className="
text-3xl
font-bold
text-green-600
">

Payment Successful

</h1>


<p className="
mt-3
text-gray-600
">

Your booking payment has been completed.

</p>

<p className="
mt-2
text-sm
text-gray-400
">

Redirecting to services...

</p>


</div>

</div>

);

}
