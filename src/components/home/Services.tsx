"use client";

import Link from "next/link";
import {
  Zap,
  Snowflake,
  Droplets,
  Sparkles,
  HeartPulse,
  Wrench,
  ChefHat,
  Scissors,
  Star,
} from "lucide-react";


const services = [
  {
    title: "Electrical Repair",
    description: "Expert electricians for wiring, installation and repair services.",
    price: "Starting ৳500",
    rating: "4.9",
    icon: Zap,
  },
  {
    title: "AC Service",
    description: "Professional AC cleaning, repair and maintenance service.",
    price: "Starting ৳800",
    rating: "4.8",
    icon: Snowflake,
  },
  {
    title: "Plumbing",
    description: "Fix leakage, pipe problems and bathroom plumbing issues.",
    price: "Starting ৳400",
    rating: "4.9",
    icon: Droplets,
  },
  {
    title: "Home Cleaning",
    description: "Deep cleaning service from trusted professionals.",
    price: "Starting ৳1000",
    rating: "4.8",
    icon: Sparkles,
  },
  {
    title: "Nurse & Caregiver",
    description: "Reliable healthcare and elderly care support at home.",
    price: "Starting ৳700/day",
    rating: "5.0",
    icon: HeartPulse,
  },
  {
    title: "Appliance Repair",
    description: "Repair service for fridge, washing machine and appliances.",
    price: "Starting ৳500",
    rating: "4.7",
    icon: Wrench,
  },
  {
    title: "Home Cook",
    description: "Experienced cooks for daily meals and special occasions.",
    price: "Custom Price",
    rating: "4.7",
    icon: ChefHat,
  },
  {
    title: "Beautician",
    description: "Professional beauty and personal care service at home.",
    price: "Starting ৳600",
    rating: "4.8",
    icon: Scissors,
  },
];


export default function Services() {

  return (

    <section id="services" className="py-20 bg-[#F8FAFC]">

      <div className="max-w-7xl mx-auto px-5">


        <div className="text-center mb-12">

          <p className="text-[#2563EB] font-semibold">
            Featured Services
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#14213D] mt-3">
            Popular Services For Your Home
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Choose from our most requested services and connect
            with trusted professionals.
          </p>

        </div>



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


          {services.map((service,index)=>{

            const Icon = service.icon;


            return (

              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:-translate-y-2 hover:shadow-xl transition duration-300 flex flex-col"
              >


                <div className="w-14 h-14 rounded-2xl bg-[#F4B400]/20 flex items-center justify-center text-[#14213D]">

                  <Icon size={28}/>

                </div>



                <h3 className="text-xl font-bold text-[#14213D] mt-5">
                  {service.title}
                </h3>



                <p className="text-gray-500 text-sm mt-3 leading-6 flex-1">
                  {service.description}
                </p>



                <div className="flex items-center justify-between mt-5">

                  <span className="text-[#2563EB] font-semibold text-sm">
                    {service.price}
                  </span>


                  <div className="flex items-center gap-1 text-[#65B741] text-sm font-semibold">

                    <Star size={16} fill="currentColor"/>

                    {service.rating}

                  </div>

                </div>



                <Link
                  href="/services"
                  className="mt-6 text-center bg-[#2563EB] text-white py-3 rounded-xl font-semibold hover:bg-[#14213D] transition"
                >
                  View All Services
                </Link>


              </div>

            );

          })}


        </div>


      </div>


    </section>

  );

}