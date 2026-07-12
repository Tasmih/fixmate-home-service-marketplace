"use client";

import {
  ShieldCheck,
  UserCheck,
  Clock3,
  BadgeCheck,
} from "lucide-react";


const features = [
  {
    title: "Verified Professionals",
    description:
      "All service providers are verified to ensure safe and reliable service.",
    icon: UserCheck,
  },
  {
    title: "Secure Booking",
    description:
      "Book your required service easily with a secure and trusted platform.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Response",
    description:
      "Get quick support and connect with professionals whenever you need.",
    icon: Clock3,
  },
  {
    title: "Quality Guaranteed",
    description:
      "Enjoy quality service with customer ratings and trusted providers.",
    icon: BadgeCheck,
  },
];


export default function WhyChoose() {

  return (

    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-5">


        <div className="text-center mb-12">

          <p className="text-[#2563EB] font-semibold">
            Why Choose FixMate
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#14213D] mt-3">
            Reliable Service With Complete Trust
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            We connect customers with trusted professionals
            to make everyday services easier and safer.
          </p>

        </div>




        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


          {features.map((item,index)=>{

            const Icon = item.icon;


            return (

              <div
                key={index}
                className="bg-[#F8FAFC] rounded-2xl border border-gray-100 p-6 hover:-translate-y-2 hover:shadow-xl transition duration-300"
              >


                <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">

                  <Icon size={28}/>

                </div>



                <h3 className="text-xl font-bold text-[#14213D] mt-5">
                  {item.title}
                </h3>



                <p className="text-gray-500 text-sm mt-3 leading-6">
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