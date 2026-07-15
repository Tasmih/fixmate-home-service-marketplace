"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { protectedFetch, serverMutation } from "@/lib/api";
import { toast } from "react-toastify";

interface Booking{
  _id:string;
  serviceTitle:string;
  bookingDate:string;
  paymentAmount:number;
  paymentStatus:string;
  bookingStatus:string;
}

export default function CustomerDashboard(){

  const {
  data:session,
  isPending
}=useSession();

  const [bookings,setBookings]=useState<Booking[]>([]);
  const [loading,setLoading]=useState(true);



useEffect(()=>{

  if(!session?.user){
    return;
  }


  const fetchBookings = async()=>{

    try{

      const result = await protectedFetch(
        "/api/bookings/my"
      );


      if(result.success){

        setBookings(
          result.data || []
        );

      }


    }catch(error){

      console.log(
        "Booking Load Error:",
        error
      );


      toast.error(
        "Failed to load bookings"
      );


    }finally{

      setLoading(false);

    }

  };


  fetchBookings();


},[session]);



  const handleCancel=async(id:string)=>{

    try{

      const result=await serverMutation(
        `/api/bookings/${id}/cancel`,
        null,
        "PATCH"
      );


      if(result.success){

        toast.success("Booking cancelled successfully");

        setBookings(prev=>
          prev.map(item=>
            item._id===id
            ? {...item,bookingStatus:"cancelled"}
            : item
          )
        );

      }else{

        toast.error(result.message || "Cancel failed");

      }


    }catch(error){

      console.log(error);
      toast.error("Cancel failed");

    }

  };

if(isPending){

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#F8FAFC]
    ">

      <div className="
        text-xl
        font-semibold
        text-[#14213D]
      ">
        Loading Dashboard...
      </div>

    </div>

  );

}

  return(
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-[#14213D]">
          Customer Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome, {session?.user?.name}
        </p>


        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <DashboardCard
            title="Explore Services"
            description="Find trusted local providers"
            link="/services"
          />

          <DashboardCard
            title="My Bookings"
            description="View and manage your service bookings"
            link="/dashboard/bookings"
          />

          <DashboardCard
            title="My Profile"
            description="Manage your account"
            link="/profile"
          />

        </div>



        <div className="mt-12">

          <h2 className="text-2xl font-bold text-[#14213D] mb-6">
            Recent Bookings
          </h2>


          {
            loading ?

            <div className="bg-white rounded-xl p-6">
              Loading bookings...
            </div>


            :

            bookings.length===0 ?


            <div className="bg-white rounded-xl shadow p-8 text-center">

              <h3 className="text-xl font-bold text-[#14213D]">
                No Booking Found
              </h3>

              <p className="text-gray-500 mt-2">
                You have not booked any service yet.
              </p>


              <Link
                href="/services"
                className="inline-block mt-5 bg-[#2563EB] text-white px-6 py-3 rounded-xl"
              >
                Explore Services
              </Link>


            </div>


            :


            <div className="space-y-5">


              {
                bookings.map((booking)=>(

                  <div
                    key={booking._id}
                    className="bg-white rounded-2xl shadow-sm border p-6"
                  >

                    <div className="flex justify-between items-start flex-wrap gap-4">

                      <div>

                        <h3 className="text-xl font-bold text-[#14213D]">
                          {booking.serviceTitle}
                        </h3>

                        <p className="text-gray-500 mt-2">
                          Booking Date: {booking.bookingDate}
                        </p>

                        <p className="text-gray-700 mt-2">
                          Payment: ৳ {booking.paymentAmount}
                        </p>

                      </div>


                      <div className="text-right">

                        <p className="text-sm text-gray-500">
                          Payment Status
                        </p>

                        <span className="font-semibold text-[#2563EB]">
                          {booking.paymentStatus}
                        </span>


                        <p className="text-sm text-gray-500 mt-3">
                          Booking Status
                        </p>

                        <span className="font-semibold">
                          {booking.bookingStatus}
                        </span>

                      </div>


                    </div>



                    {
                      booking.bookingStatus==="pending" &&

                      <button
                        onClick={()=>handleCancel(booking._id)}
                        className="mt-5 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                      >
                        Cancel Booking
                      </button>

                    }


                  </div>

                ))
              }


            </div>

          }


        </div>


      </div>

    </div>
  );

}



function DashboardCard({
  title,
  description,
  link,
}:{
  title:string;
  description:string;
  link:string;
}){


  return(

    <Link href={link}>

      <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition">

        <h2 className="text-xl font-bold text-[#14213D]">
          {title}
        </h2>

        <p className="mt-2 text-gray-500">
          {description}
        </p>

        <button className="mt-5 text-[#2563EB] font-semibold">
          Open →
        </button>

      </div>

    </Link>

  );

}