import BookingForm from "@/components/services/BookingForm";
import { getServiceById } from "@/lib/actions/service.actions";



interface Props {

params: Promise<{
  id:string;
}>;

}


export default async function BookingPage({

params

}:Props){


const { id } = await params;


const result = await getServiceById(
id
);


const service = result.data;



if(!service){

return (

<div>
Service not found
</div>

);

}



return (

<div className="
min-h-screen
bg-[#F8FAFC]
p-6
">


<div className="
max-w-4xl
mx-auto
bg-white
rounded-2xl
p-6
shadow-sm
">


<h1 className="
text-2xl
font-bold
text-[#14213D]
">

Book Service

</h1>


<div className="
mt-5
border-b
pb-5
">


<h2 className="
text-xl
font-semibold
">

{service.title}

</h2>


<p className="
text-gray-500
mt-2
">

৳ {service.price}

</p>


</div>



<BookingForm

service={service}

/>


</div>


</div>

);


}