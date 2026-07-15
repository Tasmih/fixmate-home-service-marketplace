"use client";

import AdminDashboard from "@/components/dashboard/AdminDashboard";
import CustomerDashboard from "@/components/dashboard/CustomerDashboard";
import ProviderDashboard from "@/components/dashboard/ProviderDashboard";

import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import { protectedFetch } from "@/lib/api";


export default function DashboardPage(){


const {
data:session,
isPending
}=useSession();



useEffect(()=>{


const loadBookings=async()=>{

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

console.log(error);

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




const user=session.user as {

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



default:

return <CustomerDashboard/>;


}


}