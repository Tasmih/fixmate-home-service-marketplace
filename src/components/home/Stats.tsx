"use client";

import {
  Users,
  BriefcaseBusiness,
  CheckCircle,
  Layers,
} from "lucide-react";


const stats = [
  {
    title: "500+",
    description: "Verified Providers",
    icon: Users,
  },
  {
    title: "2500+",
    description: "Completed Services",
    icon: CheckCircle,
  },
  {
    title: "100+",
    description: "Service Categories",
    icon: Layers,
  },
  {
    title: "98%",
    description: "Customer Satisfaction",
    icon: BriefcaseBusiness,
  },
];


export default function Stats() {

  return (

    <section className="py-20 bg-[#14213D]">

      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-12">

          <p className="text-[#F4B400] font-semibold">
            Our Achievement
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Trusted By Thousands Of Customers
          </h2>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


          {stats.map((item,index)=>{

            const Icon = item.icon;


            return (

              <div
                key={index}
                className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition"
              >

                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F4B400] flex items-center justify-center text-[#14213D]">

                  <Icon size={28}/>

                </div>


                <h3 className="text-3xl font-bold text-white mt-5">
                  {item.title}
                </h3>


                <p className="text-white/70 mt-2">
                  {item.description}
                </p>


              </div>

            );

          })}


        </div>


      </div>

    </section>

  );

}