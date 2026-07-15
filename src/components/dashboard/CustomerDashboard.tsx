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


const {data:session}=useSession();


const [bookings,setBookings]=useState<Booking[]>([]);

const [loading,setLoading]=useState(true);




useEffect(()=>{


const loadBookings=async()=>{


try{


const result=await protectedFetch(
"/api/bookings/my"
);


setBookings(
result.data || []
);



}catch(error){


console.log(error);


}
finally{


setLoading(false);


}


};


loadBookings();


},[]);





const handleCancel=async(id:string)=>{


try{


const result=await serverMutation(

`/api/bookings/${id}/cancel`,

null,

"PATCH"

);



if(result.success){


toast.success(
"Booking cancelled successfully"
);



setBookings(prev=>

prev.map(item=>

item._id===id

?

{
...item,
bookingStatus:"cancelled"
}

:

item

)

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

<div className="
min-h-screen
bg-[#F8FAFC]
p-6
">


<div className="
max-w-6xl
mx-auto
">


<h1 className="
text-3xl
font-bold
text-[#14213D]
">

Customer Dashboard

</h1>



<p className="
text-gray-500
mt-2
">

Welcome, {session?.user?.name}

</p>





<div className="
grid
md:grid-cols-3
gap-6
mt-8
">


<DashboardCard

title="Explore Services"

description="Find trusted local providers"

link="/services"

/>



<DashboardCard

title="My Profile"

description="Manage your account"

link="/profile"

/>



<DashboardCard

title="Support"

description="Need help?"

link="/support"

/>



</div>





<div className="
mt-10
">


<h2 className="
text-2xl
font-bold
text-[#14213D]
mb-5
">

My Bookings

</h2>




{

loading

?

<p>
Loading...
</p>


:

bookings.length===0

?

<div className="
bg-white
p-6
rounded-xl
">

No bookings found

</div>


:


bookings.map(booking=>(


<div

key={booking._id}

className="
bg-white
rounded-xl
shadow
p-6
mb-5
"

>


<h3 className="
text-xl
font-bold
">

{booking.serviceTitle}

</h3>


<p>
Date: {booking.bookingDate}
</p>


<p>
Payment: ৳{booking.paymentAmount}
</p>


<p>
Payment Status: {booking.paymentStatus}
</p>


<p>
Booking Status: {booking.bookingStatus}
</p>



{

booking.bookingStatus==="pending"

&&

<button

onClick={()=>handleCancel(booking._id)}

className="
mt-3
bg-red-500
text-white
px-5
py-2
rounded-xl
"

>

Cancel

</button>


}



</div>


))


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


return (

<Link href={link}>


<div className="
bg-white
rounded-2xl
shadow
p-6
border
hover:shadow-lg
transition
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


</div>


</Link>

);


}