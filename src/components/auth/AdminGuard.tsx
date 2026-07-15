"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function AdminGuard({
children
}:{
children:React.ReactNode
}){


const {
data:session,
isPending
}=useSession();


const router=useRouter();



useEffect(()=>{


if(!isPending){


const user=session?.user as {

role?:
"customer" |
"provider" |
"admin";


};


if(!user || user.role !== "admin"){


router.push("/");


}


}


},[
session,
isPending,
router
]);




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

Checking Permission...

</p>


</div>

);


}




return <>{children}</>


}