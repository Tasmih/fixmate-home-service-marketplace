"use client";


import {
  useState
} from "react";


import {
  createBooking
} from "@/lib/actions/service.actions";


import {
  createCheckoutSession
} from "@/lib/actions/payment.actions";


import {
  useSession
} from "@/lib/auth-client";


import Swal from "sweetalert2";


import {
  toast
} from "react-toastify";


import {
  IService
} from "@/types/service";



interface Props {

  service:IService;

}



export default function BookingForm({

  service

}:Props){



const {
  data: session
} = useSession();




const [loading,setLoading] = useState(false);




const [form,setForm] = useState({


  bookingDate:"",


  address:"",


  phone:"",


  paymentAmount:500


});







const handleSubmit = async()=>{



// Check Login

if(!session?.user?.id){


toast.error(
"Please login first"
);


return;


}





const confirm = await Swal.fire({


title:"Confirm Booking?",


text:"Are you sure you want to book this service?",


icon:"question",


showCancelButton:true,


confirmButtonText:"Yes, Book Now",


cancelButtonText:"Cancel",


confirmButtonColor:"#2563EB",


cancelButtonColor:"#DC2626"


});







if(!confirm.isConfirmed){

return;

}







if(form.paymentAmount < 500){


Swal.fire({


icon:"warning",


title:"Minimum Payment Required",


text:"Minimum advance payment is 500 taka",


confirmButtonColor:"#2563EB"


});


return;


}








if(
!form.bookingDate ||
!form.address ||
!form.phone
){


Swal.fire({


icon:"warning",


title:"Incomplete Information",


text:"Please fill all required information",


confirmButtonColor:"#2563EB"


});


return;


}








try{


setLoading(true);







// Create Booking


const result = await createBooking({



serviceId:service._id,



customerId:session.user.id,



bookingDate:form.bookingDate,



address:form.address,



phone:form.phone,



paymentAmount:Number(form.paymentAmount)



});









if(!result.success){



toast.error(

result.message ||

"Booking failed"

);



return;


}








toast.success(

"Booking created successfully"

);









// Create Stripe Checkout


const payment = await createCheckoutSession({



bookingId:

result.data._id,



amount:

Number(form.paymentAmount),



serviceName:

service.title



});








if(!payment.success){


Swal.fire({


icon:"error",


title:"Payment Failed",


text:"Unable to create Stripe payment session",


confirmButtonColor:"#DC2626"


});


return;


}








await Swal.fire({


icon:"success",


title:"Booking Created!",


text:"Redirecting to secure payment...",


timer:2000,


showConfirmButton:false


});

if(payment.url){

  window.location.href = payment.url;

}







}catch(error:unknown){



console.error(
error
);





Swal.fire({


icon:"error",


title:"Booking Failed",


text:

error instanceof Error

?

error.message

:

"Something went wrong",


confirmButtonColor:"#DC2626"


});




toast.error(
"Booking failed"
);





}finally{


setLoading(false);


}



};









return (


<div className="mt-6 space-y-4">





<input


type="date"


className="
w-full
border
rounded-xl
p-3
"


onChange={(e)=>


setForm({

...form,


bookingDate:e.target.value


})


}


/>







<input


placeholder="Address"


className="
w-full
border
rounded-xl
p-3
"



onChange={(e)=>


setForm({

...form,


address:e.target.value


})


}


/>









<input


placeholder="Phone"


className="
w-full
border
rounded-xl
p-3
"



onChange={(e)=>


setForm({

...form,


phone:e.target.value


})


}


/>









<input


type="number"


value={form.paymentAmount}



className="
w-full
border
rounded-xl
p-3
"



onChange={(e)=>


setForm({

...form,


paymentAmount:Number(e.target.value)


})


}


/>









<button


disabled={loading}


onClick={handleSubmit}



className="
w-full
bg-[#2563EB]
text-white
py-3
rounded-xl
font-medium
disabled:opacity-50
"



>


{

loading

?

"Processing..."

:

"Confirm Booking"

}


</button>







</div>


);


}