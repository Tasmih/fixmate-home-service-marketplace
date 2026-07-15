"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  protectedFetch,
  serverMutation
} from "@/lib/api";


interface Booking{

  _id:string;

  serviceTitle:string;

  bookingDate:string;

  address:string;

  phone:string;

  paymentAmount:number;

  paymentStatus:string;

  bookingStatus:string;

}



export default function BookingRequests(){


const [bookings,setBookings]=useState<Booking[]>([]);

const [loading,setLoading]=useState(true);



const loadBookings=async()=>{


try{


const result = await protectedFetch(
"/api/bookings/provider"
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

loadBookings();

},[]);






const updateBooking=async(

id:string,

action:"accept"|"reject"

)=>{


try{


const result = await serverMutation(

`/api/bookings/${id}/${action}`,

null,

"PATCH"

);



if(result.success){


toast.success(
`Booking ${action}ed successfully`
);



setBookings(prev=>

prev.map(item=>

item._id===id

?

{

...item,

bookingStatus:
action==="accept"
?
"accepted"
:
"rejected"

}

:

item

)

);



}else{


toast.error(
result.message || "Failed"
);


}



}catch(error){


console.log(error);


toast.error(
"Something went wrong"
);


}



};







if(loading){


return(

<div className="bg-white rounded-xl p-6">

Loading booking requests...

</div>

);


}







if(bookings.length===0){


return(

<div className="
bg-white
rounded-2xl
border
p-8
text-center
">


<h2 className="
text-xl
font-bold
text-[#14213D]
">

No Booking Requests

</h2>


<p className="
text-gray-500
mt-2
">

No customer has booked your services yet.

</p>


</div>

);


}







return(

<div className="space-y-5">


{

bookings.map((booking)=>(


<div

key={booking._id}

className="
bg-white
rounded-2xl
border
shadow-sm
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



<p className="
mt-2
text-gray-600
">

Booking Date:
{" "}
{booking.bookingDate}

</p>



<p className="
text-gray-600
">

Address:
{" "}
{booking.address}

</p>



<p className="
text-gray-600
">

Phone:
{" "}
{booking.phone}

</p>



<p className="
font-semibold
mt-3
">

Payment:
৳ {booking.paymentAmount}

</p>


</div>





<div className="
text-right
">


<p className="
text-sm
text-gray-500
">

Payment Status

</p>


<p className="
font-semibold
text-blue-600
">

{booking.paymentStatus}

</p>



<p className="
text-sm
text-gray-500
mt-3
">

Booking Status

</p>


<p className="
font-semibold
">

{booking.bookingStatus}

</p>



</div>



</div>






{

booking.bookingStatus==="pending"

&&


<div className="
mt-5
flex
gap-3
">


<button

onClick={()=>updateBooking(
booking._id,
"accept"
)}

className="
bg-green-600
text-white
px-5
py-2
rounded-xl
hover:bg-green-700
"

>

Accept

</button>



<button

onClick={()=>updateBooking(
booking._id,
"reject"
)}

className="
bg-red-500
text-white
px-5
py-2
rounded-xl
hover:bg-red-600
"

>

Reject

</button>


</div>


}




</div>


))


}



</div>


);


}