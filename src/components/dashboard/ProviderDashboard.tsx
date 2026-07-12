"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";


export default function ProviderDashboard() {

  const { data: session } = useSession();


  return (

    <div className="min-h-screen bg-[#F8FAFC] p-6">


      <div className="max-w-6xl mx-auto">


        <h1 className="
        text-3xl
        font-bold
        text-[#14213D]
        ">
          Provider Dashboard
        </h1>


        <p className="text-gray-500 mt-2">
          Welcome, {session?.user?.name}
        </p>




        <div className="
        grid
        md:grid-cols-3
        gap-6
        mt-8
        ">


          <DashboardCard
            title="Add Service"
            description="Create a new service listing"
            link="/services/add"
          />


          <DashboardCard
            title="Manage Services"
            description="Edit or delete your services"
            link="/services/manage"
          />


          <DashboardCard
            title="Booking Requests"
            description="Check customer bookings"
            link="/bookings"
          />


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


return (

<Link href={link}>

<div className="
bg-white
rounded-2xl
shadow
p-6
hover:shadow-lg
transition
border
">

<h2 className="
text-xl
font-bold
text-[#14213D]
">

{title}

</h2>


<p className="
text-gray-500
mt-2
">

{description}

</p>


<button className="
mt-5
text-[#2563EB]
font-semibold
">

Open →

</button>


</div>

</Link>

);


}