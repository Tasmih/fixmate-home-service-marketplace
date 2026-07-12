"use client";

import { Star, Quote, UserRound } from "lucide-react";


const testimonials = [
  {
    name: "Rahim Ahmed",
    role: "Customer",
    review:
      "FixMate helped me find a reliable electrician quickly. The service quality was excellent.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Customer",
    review:
      "I booked a home cleaning service and the professional was very punctual and friendly.",
    rating: 5,
  },
  {
    name: "Karim Hasan",
    role: "Service Provider",
    review:
      "FixMate helps me connect with customers and grow my service business easily.",
    rating: 4,
  },
];


export default function Testimonials() {

  return (

    <section className="py-20 bg-[#F8FAFC]">

      <div className="max-w-7xl mx-auto px-5">


        <div className="text-center mb-12">

          <p className="text-[#2563EB] font-semibold">
            Testimonials
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#14213D] mt-3">
            What Our Customers Say
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Real experiences from customers and service providers using FixMate.
          </p>

        </div>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


          {testimonials.map((item,index)=>(
            
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:-translate-y-2 hover:shadow-xl transition duration-300"
            >


              <Quote className="text-[#2563EB]" size={32}/>


              <p className="text-gray-600 text-sm leading-6 mt-4">
                {item.review}
              </p>



              <div className="flex items-center gap-1 mt-5">

                {[...Array(item.rating)].map((_,i)=>(
                  <Star
                    key={i}
                    size={18}
                    className="text-[#F4B400]"
                    fill="currentColor"
                  />
                ))}

              </div>




              <div className="flex items-center gap-3 mt-6">


                <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">

                  <UserRound size={24}/>

                </div>



                <div>

                  <h3 className="font-bold text-[#14213D]">
                    {item.name}
                  </h3>


                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>

                </div>


              </div>


            </div>

          ))}


        </div>


      </div>


    </section>

  );

}