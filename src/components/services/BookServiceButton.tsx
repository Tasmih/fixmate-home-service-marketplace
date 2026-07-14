"use client";


import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";


interface Props {

  serviceId:string;

}



export default function BookServiceButton({

serviceId

}:Props){


const router = useRouter();


const { data:session } = useSession();




const handleBooking =()=>{


if(!session){


router.push(
`/login?callbackUrl=/services/${serviceId}/booking`
);


return;


}



router.push(
`/services/${serviceId}/booking`
);



};



return (

<button

onClick={handleBooking}

className="
w-full
bg-[#2563EB]
text-white
py-3
rounded-xl
font-medium
hover:bg-blue-700
transition
"

>

Book Service

</button>

);


}