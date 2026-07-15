"use client";

import Link from "next/link";

import {
  MapPin,
  Star,
  Tag
} from "lucide-react";

import { IService } from "@/types/service";


export default function ServiceCard({
  service
}: {
  service: IService;
}) {


  return (

    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      hover:shadow-xl
      transition
      duration-300
      overflow-hidden
      flex
      flex-col
      h-full
      border
      border-gray-100
      "
    >


      {/* Image */}

      <div className="relative overflow-hidden">


        <img
          src={
            service.image ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={service.title}
          className="
          w-full
          h-52
          object-cover
          hover:scale-110
          transition
          duration-500
          "
        />


        {/* Category Badge */}

        {
          service.category &&
          <div
            className="
            absolute
            top-4
            left-4
            bg-white
            px-3
            py-1
            rounded-full
            shadow
            text-xs
            font-semibold
            text-[#2563EB]
            flex
            items-center
            gap-1
            "
          >

            <Tag size={14}/>

            {service.category}

          </div>
        }


      </div>





      {/* Content */}

      <div
        className="
        p-5
        flex
        flex-col
        flex-1
        "
      >



        <h3
          className="
          text-xl
          font-bold
          text-[#14213D]
          line-clamp-2
          min-h-[56px]
          "
        >

          {service.title}

        </h3>




        <p
          className="
          text-gray-600
          text-sm
          mt-3
          line-clamp-3
          min-h-[60px]
          "
        >

          {service.shortDescription}

        </p>





        {/* Price + Rating */}

        <div
          className="
          mt-5
          flex
          items-center
          justify-between
          "
        >



          <div>

            <p
              className="
              text-sm
              text-gray-500
              "
            >
              Starting From
            </p>


            <p
              className="
              text-xl
              font-bold
              text-[#14213D]
              "
            >

              ৳ {service.price}

            </p>


          </div>





          <div
            className="
            flex
            items-center
            gap-1
            bg-yellow-50
            px-3
            py-1.5
            rounded-full
            text-[#F4B400]
            font-semibold
            "
          >

            <Star
              size={16}
              fill="currentColor"
            />

            <span>

              {service.rating || 0}

            </span>


          </div>


        </div>






        {/* Location */}

        {
          service.location &&

          <div
            className="
            mt-4
            flex
            items-center
            gap-2
            text-sm
            text-gray-500
            "
          >

            <MapPin size={16}/>

            <span>

              {service.location}

            </span>


          </div>

        }







        {/* Button */}

        <div
          className="
          mt-auto
          pt-5
          "
        >


          <Link

            href={`/services/${service._id}`}

            className="
            block
            text-center
            bg-[#2563EB]
            text-white
            py-3
            rounded-xl
            font-medium
            hover:bg-[#14213D]
            transition
            duration-300
            "

          >

            View Details

          </Link>


        </div>



      </div>



    </div>


  );

}