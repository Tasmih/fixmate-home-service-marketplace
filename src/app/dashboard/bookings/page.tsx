"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { protectedFetch, serverMutation } from "@/lib/api";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  XCircle,
} from "lucide-react";


interface Booking {

  _id:string;

  serviceTitle:string;

  bookingDate:string;

  paymentAmount:number;

  paymentStatus:string;

  bookingStatus:string;

}



export default function MyBookingsPage(){


const [bookings,setBookings] = 
useState<Booking[]>([]);


const [loading,setLoading] =
useState(true);



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


console.log(error);


toast.error(
"Failed to load bookings"
);


}
finally{


setLoading(false);


}


};






useEffect(()=>{


fetchBookings();


},[]);








const handleCancel = async(
id:string
)=>{


try{


const result = await serverMutation(

`/api/bookings/${id}/cancel`,

null,

"PATCH"

);



if(result.success){


toast.success(
"Booking cancelled"
);



fetchBookings();


}
else{


toast.error(
result.message || "Cancel failed"
);


}



}catch(error){


console.log(error);


toast.error(
"Cancel failed"
);


}


};







return (


<main className="
min-h-screen
bg-[#F8FAFC]
px-5
py-10
">


<div className="
max-w-5xl
mx-auto
">





<Link

href="/dashboard"

className="
inline-flex
items-center
gap-2
text-[#2563EB]
mb-6
hover:underline
"

>

<ArrowLeft size={18}/>

Back Dashboard

</Link>







<h1 className="
text-3xl
font-bold
text-[#14213D]
">

My Bookings

</h1>


<p className="
mt-2
text-gray-500
">

Manage your service bookings

</p>









{

loading

?


<div className="
mt-8
bg-white
rounded-2xl
p-8
text-center
">

Loading bookings...

</div>





:

bookings.length===0


?


<div className="
mt-8
bg-white
rounded-2xl
shadow
p-10
text-center
">


<h2 className="
text-xl
font-bold
text-[#14213D]
">

No Booking Found

</h2>


<p className="
mt-2
text-gray-500
">

Book a service from FixMate.

</p>


<Link

href="/services"

className="
inline-block
mt-5
bg-[#2563EB]
text-white
px-6
py-3
rounded-xl
"

>

Explore Services

</Link>



</div>







:


<div className="
mt-8
space-y-5
">


{


bookings.map((booking)=>(


<div

key={booking._id}

className="
bg-white
rounded-2xl
shadow-sm
border
p-6
"

>



<div className="
flex
justify-between
gap-5
flex-wrap
">


<div>


<h2 className="
text-xl
font-bold
text-[#14213D]
">

{booking.serviceTitle}

</h2>



<div className="
mt-4
space-y-2
text-gray-600
">


<p className="
flex
items-center
gap-2
">

<CalendarDays size={18}/>

{booking.bookingDate}

</p>



<p className="
flex
items-center
gap-2
">

<CreditCard size={18}/>

৳ {booking.paymentAmount}

</p>



</div>


</div>









<div className="
text-right
">


<p className="
text-sm
text-gray-500
">

Payment

</p>


<span className="
font-semibold
text-[#2563EB]
">

{booking.paymentStatus}

</span>




<p className="
text-sm
text-gray-500
mt-3
">

Status

</p>


<span className="
font-semibold
capitalize
">

{booking.bookingStatus}

</span>



</div>


</div>








{

booking.bookingStatus==="pending"

&&


<button

onClick={()=>handleCancel(booking._id)}

className="
mt-6
flex
items-center
gap-2
bg-red-500
hover:bg-red-600
text-white
px-5
py-2.5
rounded-xl
transition
"

>


<XCircle size={18}/>

Cancel Booking


</button>


}






</div>


))


}



</div>



}



</div>


</main>


);


}