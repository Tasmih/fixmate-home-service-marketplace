"use client";

import {
  useEffect,
  useState,
  useCallback
} from "react";

import { X } from "lucide-react";
import ServiceCard from "@/components/services/ServiceCard";
import { getServices } from "@/lib/actions/service.actions";
import { IService } from "@/types/service";
import ServiceCardSkeleton from "@/components/services/ServiceCardSkeleton";







const categories = [

"All",

"Beautician",

"Hourly Housekeeper",

"Nurse",

"Caregiver",

"AC Repair",

"Electrician",

"Plumber",

"Mechanic",

"Carpenter",

"Painter",

"Cleaner",

"Home Tutor",

"Computer Repair",

"Appliance Repair",

"Gardener",

"Pest Control",

"Security Guard",

"Moving Service",

"Laundry Service",

"Cooking Service"

];





export default function ServicesContainer({


initialData


}:{

initialData:IService[]

}){


const [services,setServices] =useState(initialData);

const [loading,setLoading] = useState(false);

const [search,setSearch] =useState("");



const [category,setCategory] =useState("All");



const [sort,setSort] =useState("");



const [page,setPage] = useState(1);



const [totalPages,setTotalPages] =useState(1);

const fetchServices = useCallback(async()=>{


const params = new URLSearchParams();


if(search){

params.append(
"search",
search
);

}


if(category !== "All"){

params.append(
"category",
category
);

}


if(sort){

params.append(
"sort",
sort
);

}


params.append(
"page",
String(page)
);


params.append(
"limit",
"8"
);



const result = await getServices(
params.toString()
);


return result;


},[
search,
category,
sort,
page
]);

useEffect(()=>{


let ignore = false;


const loadServices = async()=>{

setLoading(true);

const result = await fetchServices();

if(!ignore){

setServices(result.data || []);

setTotalPages(result.pagination?.totalPages || 1);

}

setLoading(false);

};

loadServices();


return()=>{

ignore=true;

};


},[
fetchServices
]);



return (

<div className="
min-h-screen
bg-[#F8FAFC]
p-6
">


<div className="
max-w-7xl
mx-auto
">
<h1 className="
text-3xl
font-bold
text-[#14213D]
mb-6
">
Explore Services
</h1>

<div className="
grid
md:grid-cols-4
gap-4
mb-8
">
<div className="relative">

<input

value={search}

onChange={(e)=>{

setSearch(e.target.value);

setPage(1);

}}

placeholder="Search service..."

className="
w-full
rounded-xl
border
px-4
py-3
pr-10
outline-none
"

/>


{
search && (

<button

type="button"

onClick={()=>{

setSearch("");

setPage(1);

}}

className="
absolute
right-3
top-1/2
-translate-y-1/2
text-gray-500
hover:text-red-500
"

>

<X size={18}/>


</button>

)

}


</div>

<select

value={category}

onChange={(e)=>{

setCategory(e.target.value);

setPage(1);

}}

className="
rounded-xl
border
px-4
py-3
"

>


{
categories.map((item)=>(

<option

key={item}

value={item}

>

{item}

</option>

))

}


</select>

<select

value={sort}

onChange={(e)=>
{

setSort(e.target.value);

setPage(1);

}}

className="
rounded-xl
border
px-4
py-3
"

>


<option value="">

Newest

</option>


<option value="low">

Price Low - High

</option>


<option value="high">

Price High - Low

</option>


</select>

<button

type="button"

onClick={()=>{

setSearch("");

setCategory("All");

setSort("");

setPage(1);

}}

className="
rounded-xl
border
px-4
py-3
text-sm
hover:bg-gray-100
"

>
Clear Filters
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

{
loading ?

Array.from({length:8}).map((_,index)=>(

<ServiceCardSkeleton key={index}/>

))

:

services.map((service)=>(

<ServiceCard
key={service._id}
service={service}
/>

))

}

</div>

<div className="
flex
justify-center
gap-3
mt-10
">
<button

disabled={page===1}

onClick={()=>setPage(page-1)}

className="
px-4
py-2
rounded-lg
border
disabled:opacity-50
"

>

Previous

</button>

{

Array.from(
{
length:totalPages
},
(_,i)=>i+1
).map(num=>(


<button

key={num}

onClick={()=>setPage(num)}

className={`

px-4
py-2
rounded-lg
border

${

page===num

?

"bg-[#2563EB] text-white"

:

""

}

`}

>

{num}

</button>



))

}





<button

disabled={page===totalPages}

onClick={()=>setPage(page+1)}

className="
px-4
py-2
rounded-lg
border
disabled:opacity-50
"

>

Next

</button>






</div>





</div>

</div>

);


}