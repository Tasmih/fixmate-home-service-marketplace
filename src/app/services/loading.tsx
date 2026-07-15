import ServiceCardSkeleton from "@/components/services/ServiceCardSkeleton";



export default function Loading(){


return (

<div className="
min-h-screen
bg-[#F8FAFC]
px-5
py-10
">


<div className="
max-w-7xl
mx-auto
">


<h1 className="
text-3xl
font-bold
text-[#14213D]
mb-8
">

Services

</h1>



<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
">


{

Array.from({
length:6

}).map((_,index)=>(


<ServiceCardSkeleton

key={index}

/>


))


}


</div>


</div>


</div>

);


}