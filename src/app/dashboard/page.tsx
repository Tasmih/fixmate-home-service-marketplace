"use client";

import AdminDashboard from "@/components/dashboard/AdminDashboard";
import CustomerDashboard from "@/components/dashboard/CustomerDashboard";
import ProviderDashboard from "@/components/dashboard/ProviderDashboard";

import { useSession, authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { protectedFetch } from "@/lib/api";


export default function DashboardPage() {


  const { data: session, isPending } = useSession();



  // Test Token

  useEffect(()=>{


    const getToken = async()=>{


      const {data} = await authClient.token();


      console.log(
        "TOKEN:",
        data?.token
      );


    };


    getToken();


  },[]);





  // Test Booking API

  useEffect(()=>{


    const loadBookings = async()=>{


      try{


        const result =
        await protectedFetch(
          "/api/bookings/my"
        );


        console.log(
          "MY BOOKINGS:",
          result
        );


      }catch(error){


        console.log(
          "BOOKING ERROR:",
          error
        );


      }


    };


    if(session?.user){

      loadBookings();

    }


  },[session]);







  if(isPending){


    return (

      <div className="
      min-h-screen
      flex
      items-center
      justify-center
      ">

        Loading...

      </div>

    );

  }







  if(!session?.user){


    return (

      <div className="
      min-h-screen
      flex
      items-center
      justify-center
      ">


        Please login first


      </div>

    );


  }





  const user =
  session.user as typeof session.user & {

    role?:
    "customer"
    |
    "provider"
    |
    "admin";

  };




  const role =
  user.role || "customer";







  if(role==="admin"){


    return <AdminDashboard />;


  }







  if(role==="provider"){


    return <ProviderDashboard />;


  }






  return <CustomerDashboard />;


}