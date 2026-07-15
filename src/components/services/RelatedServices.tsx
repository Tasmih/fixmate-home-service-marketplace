"use client";

import Link from "next/link";
import { IService } from "@/types/service";
import { Star } from "lucide-react";

interface Props {
  services: IService[];
}

export default function RelatedServices({ services }: Props) {

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">

      <h2 className="text-2xl font-bold text-[#14213D] mb-6">
        Related Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.map((service) => (

          <div
            key={service._id}
            className="bg-white rounded-2xl shadow border overflow-hidden"
          >

            <img
              src={
                service.image ||
                "https://placehold.co/600x400"
              }
              alt={service.title}
              className="w-full h-44 object-cover"
            />

            <div className="p-5">

              <h3 className="font-bold text-lg text-[#14213D] line-clamp-1">
                {service.title}
              </h3>

              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {service.shortDescription}
              </p>

              <div className="flex justify-between items-center mt-4">

                <span className="font-bold text-[#14213D]">
                  ৳ {service.price}
                </span>

                <div className="flex items-center gap-1 text-[#F4B400]">

                  <Star size={16} fill="currentColor" />

                  <span>
                    {service.rating || 0}
                  </span>

                </div>

              </div>


              <Link
                href={`/services/${service._id}`}
                className="block text-center mt-5 bg-[#2563EB] text-white py-2.5 rounded-xl hover:bg-[#14213D] transition"
              >
                View Details
              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}