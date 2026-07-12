"use client";

import {
  Search,
  UserCheck,
  CheckCircle,
} from "lucide-react";


const steps = [
  {
    title: "Search Service",
    description:
      "Find the right service according to your home and personal needs.",
    icon: Search,
  },
  {
    title: "Choose Professional",
    description:
      "Select verified professionals based on rating, experience and service quality.",
    icon: UserCheck,
  },
  {
    title: "Get Service",
    description:
      "Book your service and get professional help at your doorstep.",
    icon: CheckCircle,
  },
];


export default function HowItWorks() {

  return (

    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-5">


        <div className="text-center mb-12">

          <p className="text-[#2563EB] font-semibold">
            How It Works
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#14213D] mt-3">
            Get Your Service In 3 Simple Steps
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            FixMate makes finding and booking trusted professionals
            simple and convenient.
          </p>

        </div>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


          {steps.map((step,index)=>{

            const Icon = step.icon;


            return (

              <div
                key={index}
                className="relative bg-[#F8FAFC] rounded-2xl border border-gray-100 p-8 text-center hover:-translate-y-2 hover:shadow-xl transition duration-300"
              >


                <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>



                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F4B400]/20 flex items-center justify-center text-[#14213D]">

                  <Icon size={32}/>

                </div>



                <h3 className="text-xl font-bold text-[#14213D] mt-6">
                  {step.title}
                </h3>



                <p className="text-gray-500 text-sm leading-6 mt-3">
                  {step.description}
                </p>


              </div>

            );

          })}


        </div>


      </div>

    </section>

  );

}