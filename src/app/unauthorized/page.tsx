"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft } from "lucide-react";


export default function UnauthorizedPage(){

return (

<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-5">


<motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center max-w-md w-full">


<motion.div animate={{rotate:[0,10,-10,0]}} transition={{repeat:Infinity,duration:2}} className="flex justify-center mb-5">

<ShieldAlert size={70} className="text-[#F4B400]"/>

</motion.div>


<h1 className="text-5xl font-bold text-[#14213D]">
403
</h1>


<h2 className="text-2xl font-semibold text-[#14213D] mt-4">
Access Denied
</h2>


<p className="text-gray-500 mt-3">
You don't have permission to access this page
</p>


<Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-xl hover:bg-[#14213D] transition">

<ArrowLeft size={18}/>

Go Dashboard

</Link>


</motion.div>


</div>

);

}