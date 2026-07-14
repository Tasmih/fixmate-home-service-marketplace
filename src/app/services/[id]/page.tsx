import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Tag,
  CalendarDays,
} from "lucide-react";

import { getServiceById } from "@/lib/actions/service.actions";
import BookServiceButton from "@/components/services/BookServiceButton";

interface Props {

  params: Promise<{
    id: string;
  }>;

}



export default async function ServiceDetailsPage({

  params

}: Props) {


  const { id } = await params;


  const result = await getServiceById(id);


  const service = result?.data;



  if (!service) {


    return (

      <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#F8FAFC]
      px-4
      ">


        <div className="
        text-center
        ">


          <h2 className="
          text-2xl
          font-bold
          text-[#14213D]
          ">

            Service Not Found

          </h2>



        </div>


      </div>

    );

  }





return (

<div className="
min-h-screen
bg-[#F8FAFC]
p-4
md:p-8
">


<div className="
max-w-6xl
mx-auto
">



<Link

href="/services"

className="
inline-flex
items-center
gap-2
mb-6
text-[#2563EB]
hover:underline
"

>

<ArrowLeft size={18}/>

Back to Services

</Link>





<div className="
bg-white
rounded-2xl
shadow-sm
overflow-hidden
grid
grid-cols-1
lg:grid-cols-2
">





{/* Image Section */}


<div className="
relative
h-[280px]
sm:h-[350px]
lg:h-full
min-h-[420px]
">


<Image

src={
service.image ||
"https://placehold.co/600x400?text=No+Image"
}

alt={service.title}

fill

className="
object-cover
"

/>


</div>







{/* Details Section */}


<div className="
p-6
md:p-8
">



<div>

<h1 className="
text-2xl
md:text-3xl
font-bold
text-[#14213D]
">

{service.title}

</h1>



<p className="
mt-4
text-gray-600
leading-relaxed
">

{service.description}

</p>


</div>







{/* Info Grid */}


<div className="
mt-8
grid
grid-cols-1
sm:grid-cols-2
gap-5
">





<div className="
flex
gap-3
items-center
">

<Tag

size={22}

className="
text-[#2563EB]
"

/>


<div>

<p className="
text-sm
text-gray-500
">

Category

</p>


<p className="
font-semibold
text-[#14213D]
">

{service.category}

</p>


</div>


</div>







<div className="
flex
gap-3
items-center
">


<MapPin

size={22}

className="
text-[#2563EB]
"

/>


<div>

<p className="
text-sm
text-gray-500
">

Location

</p>


<p className="
font-semibold
text-[#14213D]
">

{service.location}

</p>


</div>


</div>








<div className="
flex
gap-3
items-center
">


<Clock

size={22}

className="
text-[#2563EB]
"

/>


<div>

<p className="
text-sm
text-gray-500
">

Duration

</p>


<p className="
font-semibold
text-[#14213D]
">

{service.duration}

</p>


</div>


</div>


<div className="
flex
gap-3
items-center
">


<CalendarDays

size={22}

className="
text-[#2563EB]
"

/>


<div>

<p className="
text-sm
text-gray-500
">

Availability

</p>


<p className="
font-semibold
text-[#14213D]
">

{
service.availability?.join(", ")
}

</p>


</div>


</div>




</div>









{/* Price Rating */}


<div className="
mt-8
border-t
pt-6
flex
items-center
justify-between
">


<div>


<p className="
text-sm
text-gray-500
">

Starting Price

</p>



<p className="
text-3xl
font-bold
text-[#14213D]
">

৳ {service.price}

</p>


</div>





<div className="
flex
items-center
gap-2
">


<Star

size={20}

className="
text-[#F4B400]
"

fill="#F4B400"

/>


<span className="
font-semibold
text-[#14213D]
">

{service.rating}

</span>


<span className="
text-gray-500
text-sm
">

({service.totalReviews})

</span>


</div>



</div>



{/* Action Buttons */}

<div className="
mt-8
grid
grid-cols-1
sm:grid-cols-2
gap-4
">


<Link

href="/services"

className="
w-full
flex
items-center
justify-center
gap-2
border
border-[#2563EB]
text-[#2563EB]
py-3
rounded-xl
font-medium
hover:bg-blue-50
transition
"

>

<ArrowLeft size={18}/>

Back to Services

</Link>



<BookServiceButton

serviceId={service._id.toString()}

/>


</div>





</div>



</div>


</div>


</div>

);

}