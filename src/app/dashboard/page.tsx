"use client";

import AdminDashboard from "@/components/dashboard/AdminDashboard";
import CustomerDashboard from "@/components/dashboard/CustomerDashboard";
import ProviderDashboard from "@/components/dashboard/ProviderDashboard";

import { useSession } from "@/lib/auth-client";


export default function DashboardPage(){


  const {
    data:session,
    isPending
  } = useSession();





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





  const user = session.user as {

    id:string;

    name:string;

    email:string;

    role?:
    "customer"
    |
    "provider"
    |
    "admin";

  };






  switch(user.role){


    case "admin":

      return <AdminDashboard/>;



    case "provider":

      return <ProviderDashboard/>;



    case "customer":

    default:

      return <CustomerDashboard/>;


  }


}