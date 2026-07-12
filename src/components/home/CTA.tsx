"use client";

import Link from "next/link";
import { ArrowRight, UserPlus } from "lucide-react";


export default function CTA() {

  return (

    <section className="py-20 bg-[#F8FAFC]">

      <div className="max-w-7xl mx-auto px-5">


        <div className="rounded-3xl bg-gradient-to-r from-blue-50 to-white border border-blue-100 p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">


          {/* LEFT CONTENT */}

          <div className="flex-1">


            <h2 className="text-3xl md:text-4xl font-bold text-[#14213D]">
              Need A Service Today?
            </h2>



            {/* Desktop */}

            <p className="hidden md:block text-gray-600 mt-4 leading-7 whitespace-nowrap">
              Find trusted professionals near you and get quality service at your doorstep with FixMate.
            </p>



            {/* Mobile */}

            <p className="md:hidden text-gray-600 mt-4 leading-7">
              Find trusted professionals near you and get quality service at your doorstep with FixMate.
            </p>


          </div>





          {/* BUTTONS */}

          <div className="flex flex-wrap justify-center gap-4">


            <Link
              href="/services"
              className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#14213D] transition"
            >

              Explore Services

              <ArrowRight size={18}/>

            </Link>





            <Link
              href="/register"
              className="flex items-center gap-2 bg-[#F4B400] text-[#14213D] px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
            >

              Become Provider

              <UserPlus size={18}/>

            </Link>



          </div>



        </div>


      </div>


    </section>

  );

}