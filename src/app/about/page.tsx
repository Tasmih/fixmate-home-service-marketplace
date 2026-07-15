"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, Clock, Home } from "lucide-react";


const features = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description: "Connect with trusted and skilled service providers."
  },
  {
    icon: Users,
    title: "Customer First",
    description: "We focus on delivering reliable home services."
  },
  {
    icon: Clock,
    title: "Quick Response",
    description: "Book services easily and get support faster."
  },
  {
    icon: Home,
    title: "All Home Solutions",
    description: "From repair to personal care, everything in one platform."
  }
];


export default function AboutPage(){

return (

<div className="min-h-screen bg-[#F8FAFC] px-5 py-10">


<div className="max-w-7xl mx-auto">


<motion.section initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="text-center">


<h1 className="text-4xl md:text-5xl font-bold text-[#14213D]">
About FixMate
</h1>


<p className="mt-5 max-w-3xl mx-auto text-gray-600 text-lg">
FixMate is a home service marketplace platform that connects customers with reliable professionals for everyday household needs.
</p>


</motion.section>



<motion.section initial={{opacity:0}} whileInView={{opacity:1}} className="mt-12 bg-white rounded-2xl shadow p-8">


<h2 className="text-3xl font-bold text-[#14213D]">
Our Mission
</h2>


<p className="mt-4 text-gray-600 leading-relaxed">
Our mission is to make home services simple, secure, and accessible by creating a trusted connection between customers and professional service providers.
</p>


</motion.section>





<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">


{
features.map((item,index)=>{

const Icon=item.icon;

return (

<motion.div key={index} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{delay:index*0.1}} className="bg-white rounded-2xl shadow p-6">


<Icon size={35} className="text-[#2563EB]"/>


<h3 className="mt-4 text-xl font-bold text-[#14213D]">
{item.title}
</h3>


<p className="mt-2 text-gray-600">
{item.description}
</p>


</motion.div>

)

})

}


</div>


</div>


</div>

);

}
