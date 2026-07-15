"use client";


import Link from "next/link";
import {
  Users,
  Wrench,
  BarChart3,
  ShieldCheck,
  Settings,
  UserCog
} from "lucide-react";

import { useSession } from "@/lib/auth-client";



export default function AdminDashboard(){


const {
data:session,
isPending
}=useSession();



if(isPending){


return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-[#F8FAFC]
">

<p className="
text-xl
font-semibold
text-[#14213D]
">

Loading Admin Panel...

</p>

</div>

);


}





return(


<div className="
min-h-screen
bg-[#F8FAFC]
p-5
">


<div className="
max-w-7xl
mx-auto
grid
grid-cols-1
lg:grid-cols-[260px_1fr]
gap-6
">



{/* Sidebar */}


<aside className="
bg-[#14213D]
rounded-2xl
p-6
text-white
h-fit
">


<h2 className="
text-2xl
font-bold
mb-8
">

FixMate Admin

</h2>



<nav className="
space-y-3
">


<SideLink
icon={<BarChart3 size={20}/>}
title="Dashboard"
link="/admin"
/>


<SideLink
icon={<Users size={20}/>}
title="Manage Users"
link="/admin/users"
/>



<SideLink
icon={<Wrench size={20}/>}
title="Manage Services"
link="/admin/services"
/>



<SideLink
icon={<ShieldCheck size={20}/>}
title="Reports"
link="/admin/reports"
/>


<SideLink
icon={<Settings size={20}/>}
title="Settings"
link="/admin/settings"
/>



</nav>



</aside>






{/* Main Content */}


<section>



<div className="
bg-white
rounded-2xl
shadow-sm
border
p-6
mb-6
">


<h1 className="
text-3xl
font-bold
text-[#14213D]
">

Admin Dashboard

</h1>


<p className="
text-gray-500
mt-2
">

Welcome back, 
{" "}
{session?.user?.name}

</p>


</div>






{/* Statistics */}


<div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
">



<StatCard

title="Total Users"

value="120"

icon={<Users/>}

/>




<StatCard

title="Providers"

value="45"

icon={<UserCog/>}

/>




<StatCard

title="Services"

value="83"

icon={<Wrench/>}

/>




<StatCard

title="Reports"

value="12"

icon={<BarChart3/>}

/>




</div>







{/* Action Cards */}


<div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
mt-8
">



<ActionCard

title="Manage Users"

description="Change role, remove provider accounts"

link="/admin/users"

/>



<ActionCard

title="Manage Services"

description="Approve or control services"

link="/admin/services"

/>



<ActionCard

title="View Reports"

description="Monitor platform activity"

link="/admin/reports"

/>



</div>




</section>




</div>



</div>



);


}





function SideLink({

icon,
title,
link

}:{

icon:React.ReactNode;
title:string;
link:string;

}){


return(

<Link href={link}>


<div className="
flex
items-center
gap-3
px-4
py-3
rounded-xl
hover:bg-white/10
transition
cursor-pointer
">


{icon}

<span>

{title}

</span>


</div>


</Link>

);


}






function StatCard({

title,
value,
icon

}:{

title:string;
value:string;
icon:React.ReactNode;

}){


return(

<div className="
bg-white
border
rounded-2xl
p-5
shadow-sm
hover:shadow-md
transition
">


<div className="
flex
justify-between
items-center
">


<div>


<p className="
text-gray-500
text-sm
">

{title}

</p>



<h3 className="
text-3xl
font-bold
text-[#14213D]
mt-2
">

{value}

</h3>


</div>



<div className="
text-[#2563EB]
">

{icon}

</div>


</div>


</div>


);


}







function ActionCard({

title,
description,
link

}:{

title:string;
description:string;
link:string;

}){


return(

<Link href={link}>


<div className="
bg-white
border
rounded-2xl
p-6
shadow-sm
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



<button className="
mt-5
text-[#2563EB]
font-semibold
">

Open →

</button>


</div>


</Link>


);


}