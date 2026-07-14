"use client";


import Link from "next/link";

import {
MapPin,
Star,
DollarSign
} from "lucide-react";


import { IService } from "@/types/service";



export default function ServiceCard({

service

}:{
service:IService
}){


return (

<div
className="
bg-white
rounded-xl
shadow
overflow-hidden
flex
flex-col
h-full
"
>

<div className="overflow-hidden rounded-t-xl">

<img
src={
service.image ||
"https://placehold.co/600x400?text=No+Image"
}
alt={service.title}
className="
w-full
h-52
object-cover
hover:scale-105
transition
duration-300
"
/>

</div>


<div
className="
p-5
flex
flex-col
flex-1
"
>

<h3
className="
text-xl
font-bold
text-[#14213D]
line-clamp-2
min-h-[56px]
"
>
{service.title}
</h3>


<p
className="
text-gray-600
mt-2
line-clamp-2
min-h-[48px]
"
>
{service.shortDescription}
</p>


<div
className="
mt-auto
pt-5
"
>

<button
className="
w-full
bg-[#2563EB]
text-white
py-3
rounded-lg
"
>
View Details
</button>

</div>


</div>

</div>


);


}