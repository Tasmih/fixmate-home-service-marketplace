"use client";


import {
useState
} from "react";


import {
motion
} from "framer-motion";


import {
Mail,
Phone,
MapPin,
Send
} from "lucide-react";


import {
toast
} from "react-toastify";


import {
sendContactMessage
} from "@/lib/actions/contact.action";





export default function ContactPage(){


const [loading,setLoading]=useState(false);



const [form,setForm]=useState({

name:"",

email:"",

message:""

});





const handleChange=(

e:React.ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement
>

)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};






const handleSubmit=async(

e:React.FormEvent

)=>{


e.preventDefault();



try{


setLoading(true);



const result =
await sendContactMessage(form);





if(result.success){


toast.success(
"Message sent successfully"
);



setForm({

name:"",

email:"",

message:""

});


}



}catch(error){


toast.error(

"Failed to send message"

);


}

finally{


setLoading(false);


}


};







return (

<main className="
min-h-screen
bg-[#F8FAFC]
px-4
py-10
sm:px-6
lg:px-8
">


<div className="
max-w-6xl
mx-auto
">





{/* Header */}


<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.5
}}

className="
text-center
mb-10
"

>


<h1 className="
text-3xl
md:text-4xl
font-bold
text-[#14213D]
">

Contact FixMate

</h1>



<p className="
mt-3
text-gray-600
max-w-2xl
mx-auto
">

Have questions or need support?
Send us a message and our team will get back to you.

</p>


</motion.div>









<div className="
grid
grid-cols-1
lg:grid-cols-3
gap-8
">







{/* Contact Info */}


<motion.div

initial={{
opacity:0,
x:-30
}}

animate={{
opacity:1,
x:0
}}

className="
space-y-5
"


>


<div className="
bg-white
rounded-2xl
shadow-sm
p-6
border
"


>


<h2 className="
text-xl
font-bold
text-[#14213D]
mb-5
">

Get In Touch

</h2>





<div className="
space-y-5
">


<div className="
flex
gap-4
items-center
">


<div className="
bg-blue-50
p-3
rounded-xl
">

<Mail
className="text-[#2563EB]"
/>

</div>


<div>

<p className="
text-sm
text-gray-500
">

Email

</p>

<p className="
font-medium
">

support@fixmate.com

</p>

</div>


</div>








<div className="
flex
gap-4
items-center
">


<div className="
bg-blue-50
p-3
rounded-xl
">

<Phone
className="text-[#2563EB]"
/>

</div>


<div>

<p className="
text-sm
text-gray-500
">

Phone

</p>

<p className="
font-medium
">

+880 1234-567890

</p>

</div>


</div>







<div className="
flex
gap-4
items-center
">


<div className="
bg-blue-50
p-3
rounded-xl
">

<MapPin

className="text-[#2563EB]"

/>

</div>


<div>

<p className="
text-sm
text-gray-500
">

Location

</p>

<p className="
font-medium
">

Dhaka, Bangladesh

</p>

</div>


</div>



</div>


</div>



</motion.div>









{/* Form */}


<motion.div

initial={{
opacity:0,
x:30
}}

animate={{
opacity:1,
x:0
}}

transition={{
duration:.5
}}

className="
lg:col-span-2
bg-white
rounded-2xl
shadow-sm
p-6
md:p-8
border
"


>


<h2 className="
text-2xl
font-bold
text-[#14213D]
mb-6
">

Send Message

</h2>





<form

onSubmit={handleSubmit}

className="
space-y-5
"

>



<div className="
grid
grid-cols-1
md:grid-cols-2
gap-5
">


<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Your Name"

required

className="
w-full
rounded-xl
border
px-4
py-3
outline-none
focus:ring-2
focus:ring-blue-200
"

/>




<input

name="email"

type="email"

value={form.email}

onChange={handleChange}

placeholder="Your Email"

required

className="
w-full
rounded-xl
border
px-4
py-3
outline-none
focus:ring-2
focus:ring-blue-200
"

/>


</div>





<textarea

name="message"

value={form.message}

onChange={handleChange}

placeholder="Write your message..."

rows={6}

required

className="
w-full
rounded-xl
border
px-4
py-3
outline-none
resize-none
focus:ring-2
focus:ring-blue-200
"

/>






<button

disabled={loading}

className="
w-full
flex
items-center
justify-center
gap-2
bg-[#2563EB]
text-white
py-3
rounded-xl
font-medium
hover:bg-[#14213D]
transition
disabled:opacity-50
"

>


<Send size={18}/>


{
loading
?
"Sending..."
:
"Send Message"
}


</button>




</form>


</motion.div>






</div>






</div>


</main>

);


}