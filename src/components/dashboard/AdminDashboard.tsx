"use client";


import Link from "next/link";
import { useSession } from "@/lib/auth-client";


export default function AdminDashboard(){


const {data:session}=useSession();





return(

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

Admin Dashboard

</h1>


<p className="text-gray-500 mt-2">

Welcome Admin, {session?.user?.name}

</p>




<div className="
grid
md:grid-cols-3
gap-6
mt-8
">


<Card
title="Manage Users"
description="View and manage platform users"
link="/admin/users"
/>


<Card
title="Manage Services"
description="Approve and control services"
link="/admin/services"
/>


<Card
title="Reports"
description="Check platform activities"
link="/admin/reports"
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