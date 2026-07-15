"use client";

import EarningsChart from "@/components/provider/EarningsChart";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import BookingRequests from "@/components/provider/BookingRequests";



export default function ProviderDashboard() {


 const {
  data: session,
  isPending
} = useSession();

if(isPending){

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#F8FAFC]
    ">

      <p className="
        text-xl
        font-semibold
        text-[#14213D]
      ">
        Loading Dashboard...
      </p>

    </div>

  );

}

  return (

    <div className="
      min-h-screen
      bg-[#F8FAFC]
      p-6
    ">


      <div className="
        max-w-6xl
        mx-auto
      ">


        {/* Header */}

        <h1 className="
          text-3xl
          font-bold
          text-[#14213D]
        ">

          Provider Dashboard

        </h1>



        <p className="
          mt-2
          text-gray-500
        ">

          Welcome, {session?.user?.name}

        </p>





        {/* Dashboard Cards */}


        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mt-8
        ">



          <DashboardCard

            title="Add Service"

            description="Create a new service listing"

            link="/dashboard/provider/add-service"

          />





          <DashboardCard

            title="Manage Services"

            description="Edit or delete your services"

            link="/dashboard/provider/services"

          />





          <DashboardCard

            title="Booking Requests"

            description="Check customer bookings"

            link="#booking-requests"

          />



        </div>





<EarningsChart/>

        {/* Booking Requests */}


        <section

          id="booking-requests"

          className="
            mt-12
          "

        >



          <h2 className="
            mb-5
            text-2xl
            font-bold
            text-[#14213D]
          ">

            Booking Requests

          </h2>




          <BookingRequests />



        </section>





      </div>


    </div>

  );

}








interface DashboardCardProps {


  title:string;

  description:string;

  link:string;


}





function DashboardCard({

  title,

  description,

  link,

}:DashboardCardProps){



  return (


    <Link href={link}>


      <div className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
        transition
        hover:shadow-lg
      ">



        <h2 className="
          text-xl
          font-bold
          text-[#14213D]
        ">

          {title}

        </h2>




        <p className="
          mt-2
          text-gray-500
        ">

          {description}

        </p>




        <button className="
          mt-5
          font-semibold
          text-[#2563EB]
        ">

          Open →

        </button>



      </div>



    </Link>


  );


}