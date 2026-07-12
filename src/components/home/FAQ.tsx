"use client";

import { Plus } from "lucide-react";
import { useState } from "react";


const faqs = [
  {
    question: "How can I book a service?",
    answer:
      "Select your required service, choose a professional, and confirm your booking through FixMate.",
  },
  {
    question: "Are service providers verified?",
    answer:
      "Yes, FixMate connects customers with verified professionals to ensure safe and reliable services.",
  },
  {
    question: "Can I become a service provider?",
    answer:
      "Yes, professionals can register as providers and grow their service business through FixMate.",
  },
  {
    question: "How do I know the service price?",
    answer:
      "Service prices may vary depending on the work. You can discuss details with the provider before confirmation.",
  },
  {
    question: "Is customer support available?",
    answer:
      "Yes, FixMate provides support to help customers and providers with their service needs.",
  },
];


export default function FAQ() {

  const [active, setActive] = useState<number | null>(null);


  return (

    <section className="py-20 bg-white">

      <div className="max-w-5xl mx-auto px-5">


        <div className="text-center mb-12">

          <p className="text-[#2563EB] font-semibold">
            FAQ
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#14213D] mt-3">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-500 mt-3">
            Find answers about FixMate services and booking.
          </p>

        </div>




        <div className="space-y-4">


          {faqs.map((faq,index)=>(

            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >

              <button
                onClick={()=>setActive(active===index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >

                <span className="font-semibold text-[#14213D]">
                  {faq.question}
                </span>


                <Plus
                  size={22}
                  className={`text-[#2563EB] transition ${
                    active===index ? "rotate-45" : ""
                  }`}
                />

              </button>



              {active===index && (

                <div className="px-5 pb-5 text-gray-500 text-sm leading-6">
                  {faq.answer}
                </div>

              )}


            </div>

          ))}


        </div>


      </div>

    </section>

  );

}