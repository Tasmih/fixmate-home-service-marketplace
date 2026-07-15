"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, SearchX } from "lucide-react";


export default function NotFound(){

return (

<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-5">

<motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:0.4}} className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center max-w-md w-full">

<motion.div animate={{y:[0,-10,0]}} transition={{repeat:Infinity,duration:2}} className="flex justify-center mb-5">

<SearchX size={70} className="text-[#2563EB]"/>

</motion.div>


<h1 className="text-6xl font-bold text-[#14213D]">
404
</h1>


<h2 className="text-2xl font-semibold text-[#14213D] mt-4">
Page Not Found
</h2>


<p className="text-gray-500 mt-3">
Sorry, the page you are looking for does not exist or has been moved.
</p>


<Link href="/" className="mt-6 inline-flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-xl hover:bg-[#14213D] transition">

<Home size={18}/>

Back To Home

</Link>


</motion.div>

</div>

);

}