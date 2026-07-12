"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";


export default function CustomerDashboard(){

const {data:session}=useSession();


return (

<div className="min-h-screen bg-[#F8FAFC] p-6">


<div className="max-w-6xl mx-auto">


<h1 className="
text-3xl
font-bold
text-[#14213D]
">

Customer Dashboard

</h1>


<p className="text-gray-500 mt-2">
Welcome, {session?.user?.name}
</p>




<div className="
grid
md:grid-cols-3
gap-6
mt-8
">


<Card
title="Explore Services"
description="Find trusted local providers"
link="/services"
/>


<Card
title="My Bookings"
description="View your service bookings"
link="/bookings"
/>


<Card
title="Profile"
description="Manage your account"
link="/profile"
/>


</div>



</div>


</div>

);


}




function Card({
title,
description,
link,
}:{
title:string;
description:string;
link:string;
}){


return(

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