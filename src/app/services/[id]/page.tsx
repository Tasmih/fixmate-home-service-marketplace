import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Tag,
  CalendarDays,
} from "lucide-react";

import {
  getServiceById,
  getServices,
} from "@/lib/actions/service.actions";

import BookServiceButton from "@/components/services/BookServiceButton";
import RelatedServices from "@/components/services/RelatedServices";


interface Props {
  params: Promise<{
    id:string;
  }>;
}



export default async function ServiceDetailsPage({ params }:Props) {


  const { id } = await params;


  const result = await getServiceById(id);


  const service = result?.data;



  if(!service){

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">

        <h2 className="text-2xl font-bold text-[#14213D]">
          Service Not Found
        </h2>

      </div>

    );

  }



  const relatedResult = await getServices(
    `category=${service.category}&limit=4`
  );


  const relatedServices =
    relatedResult?.data?.filter(
      (item)=>item._id !== service._id
    ) || [];





  return (

    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">


      <div className="max-w-6xl mx-auto">


        <Link
          href="/services"
          className="inline-flex items-center gap-2 mb-6 text-[#2563EB] hover:underline"
        >

          <ArrowLeft size={18}/>

          Back to Services

        </Link>





        <div className="
          bg-white
          rounded-2xl
          shadow-sm
          overflow-hidden
          grid
          grid-cols-1
          lg:grid-cols-2
        ">


          {/* Image */}

          <div className="
            relative
            min-h-[350px]
            lg:min-h-[520px]
          ">


            <Image

              src={
                service.image ||
                "https://placehold.co/600x400"
              }

              alt={service.title}

              fill

              sizes="(max-width:1024px) 100vw, 50vw"

              className="object-cover"

              priority

            />


          </div>






          {/* Details */}


          <div className="p-6 md:p-8">


            <h1 className="
              text-3xl
              font-bold
              text-[#14213D]
            ">

              {service.title}

            </h1>




            <p className="
              mt-4
              text-gray-600
              leading-relaxed
            ">

              {service.description}

            </p>







            <div className="
              mt-8
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-5
            ">


              <InfoItem
                icon={<Tag size={22}/>}
                title="Category"
                value={service.category}
              />



              <InfoItem
                icon={<MapPin size={22}/>}
                title="Location"
                value={service.location}
              />



              <InfoItem
                icon={<Clock size={22}/>}
                title="Duration"
                value={service.duration}
              />



              <InfoItem
                icon={<CalendarDays size={22}/>}
                title="Availability"
                value={service.availability?.join(", ")}
              />



            </div>







            <div className="
              mt-8
              border-t
              pt-6
              flex
              items-center
              justify-between
            ">


              <div>

                <p className="text-sm text-gray-500">
                  Starting Price
                </p>


                <p className="
                  text-3xl
                  font-bold
                  text-[#14213D]
                ">

                  ৳ {service.price}

                </p>


              </div>






              <div className="
                flex
                items-center
                gap-2
              ">


                <Star
                  size={20}
                  fill="#F4B400"
                  className="text-[#F4B400]"
                />


                <span className="font-semibold">

                  {service.rating}

                </span>


                <span className="text-gray-500 text-sm">

                  ({service.totalReviews})

                </span>


              </div>



            </div>






            <div className="
              mt-8
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
            ">



              <Link

                href="/services"

                className="
                  flex
                  justify-center
                  items-center
                  gap-2
                  border
                  border-[#2563EB]
                  text-[#2563EB]
                  py-3
                  rounded-xl
                "

              >

                <ArrowLeft size={18}/>

                Back

              </Link>




              <BookServiceButton

                serviceId={service._id.toString()}

              />



            </div>



          </div>


        </div>





        <RelatedServices

          services={relatedServices}

        />




      </div>


    </div>

  );

}







function InfoItem({

  icon,
  title,
  value,

}:{

  icon:React.ReactNode;

  title:string;

  value:string;

}){


return (

<div className="flex gap-3 items-center">


  <div className="text-[#2563EB]">

    {icon}

  </div>


  <div>

    <p className="text-sm text-gray-500">

      {title}

    </p>


    <p className="font-semibold text-[#14213D]">

      {value}

    </p>


  </div>


</div>

);


}