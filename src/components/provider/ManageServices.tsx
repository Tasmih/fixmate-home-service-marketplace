"use client";

import React, {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Edit,
  Trash2,
  MapPin,
  Layers,
  Banknote,
} from "lucide-react";

import Swal from "sweetalert2";

import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

import {
  getProviderServices,
  deleteService,
} from "@/lib/actions/service.actions";




interface IService {

  _id:string;

  title:string;

  shortDescription:string;

  category:string;

  price:number;

  location:string;

  image:string;

}





export default function ManageServices(){



const [services,setServices] =

useState<IService[]>([]);




const [loading,setLoading] =

useState(true);




const [deletingId,setDeletingId] =

useState<string | null>(null);






const fetchServices = async()=>{


try{


const {

data:session

} = await authClient.getSession();





if(!session?.user){


toast.error(
"Please login first"
);


return;


}

const result = await getProviderServices(

session.user.id

);






if(result.success){


setServices(

result.data

);


}else{


toast.error(

"Failed to load services"

);


}



}catch(error){


console.log(error);


toast.error(

"Failed to load services"

);



}finally{


setLoading(false);


}


};


useEffect(() => {
  const loadData = async () => {
    await fetchServices(); 
  };

  loadData();
}, []);



const handleDelete = async(


id:string


)=>{





const confirm = await Swal.fire({


title:"Are you sure?",


text:"This service will be permanently deleted.",


icon:"warning",


showCancelButton:true,


confirmButtonText:"Yes, Delete",


cancelButtonText:"Cancel",


confirmButtonColor:"#2563EB",


cancelButtonColor:"#EF4444",


});






if(!confirm.isConfirmed){

return;

}







try{


setDeletingId(id);





const result = await deleteService(id);






if(result.success){



await Swal.fire({


title:"Deleted!",


text:"Service deleted successfully.",


icon:"success",


confirmButtonColor:"#2563EB",


});





await fetchServices();






}else{


Swal.fire({


title:"Failed",


text:"Unable to delete service.",


icon:"error",


});



}





}catch(error){



console.log(error);



Swal.fire({


title:"Error",


text:"Something went wrong.",


icon:"error",


});




}finally{


setDeletingId(null);


}



};









if(loading){


return (

<div

className="
flex
min-h-[300px]
items-center
justify-center
text-gray-500
"

>

Loading services...

</div>

);


}









if(services.length===0){


return (

<div

className="
rounded-3xl
border
border-gray-200
bg-white
p-10
text-center
"

>


<h2

className="
text-xl
font-bold
text-[#14213D]
"

>

No Services Found

</h2>



<p

className="
mt-2
text-gray-500
"

>

Add your first service to start receiving bookings.

</p>



</div>

);


}






return (

<div

className="
grid
grid-cols-1
gap-6
sm:grid-cols-2
lg:grid-cols-3
"

>


{
services.map((service)=>(


<div

key={service._id}

className="
overflow-hidden
rounded-3xl
border
border-gray-200
bg-white
shadow-sm
transition
hover:shadow-md
"

>





<div

className="
h-52
w-full
overflow-hidden
"

>


<img


src={

service.image ||

"/placeholder-service.png"

}


alt={service.title}


className="
h-full
w-full
object-cover
object-center
"


/>


</div>
<div

className="
p-5
"

>


<h3

className="
text-xl
font-bold
text-[#14213D]
"

>

{service.title}

</h3>






<p

className="
mt-2
line-clamp-2
text-sm
text-gray-500
"

>

{service.shortDescription}

</p>







<div

className="
mt-5
space-y-3
text-sm
text-gray-600
"

>




<div

className="
flex
items-center
gap-2
"

>

<Layers size={16}/>


<span>

{service.category}

</span>


</div>








<div

className="
flex
items-center
gap-2
"

>

<Banknote size={16}/>
৳{service.price}


<span>

৳ {service.price}

</span>


</div>







<div

className="
flex
items-center
gap-2
"

>

<MapPin size={16}/>


<span>

{service.location}

</span>


</div>






</div>









<div

className="
mt-6
flex
flex-col
gap-3
sm:flex-row
"

>





<Link


href={`/dashboard/provider/services/edit/${service._id}`}


className="
flex
flex-1
items-center
justify-center
gap-2
rounded-xl
bg-[#2563EB]
py-3
text-sm
font-semibold
text-white
transition
hover:bg-blue-700
"


>


<Edit size={17}/>


Edit


</Link>









<button


onClick={()=>handleDelete(service._id)}


disabled={deletingId===service._id}



className="
flex
flex-1
items-center
justify-center
gap-2
rounded-xl
bg-red-500
py-3
text-sm
font-semibold
text-white
transition
hover:bg-red-600
disabled:cursor-not-allowed
disabled:opacity-50
"


>



<Trash2 size={17}/>





{

deletingId===service._id

?

"Deleting..."

:

"Delete"

}




</button>







</div>






</div>





</div>



))

}







</div>

);


}