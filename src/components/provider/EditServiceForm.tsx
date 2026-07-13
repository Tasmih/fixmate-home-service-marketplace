"use client";

import React, {
  useEffect,
  useState
} from "react";


import {
  useRouter
} from "next/navigation";


import {
  Button
} from "@heroui/react";


import {
  toast
} from "react-toastify";


import {
  BriefcaseBusiness,
  FileText,
  MapPin,
  DollarSign,
  Layers,
  Send,
  Loader2
} from "lucide-react";


import {
  serviceCategories
} from "@/constants/serviceCategories";


import {
  getServiceById,
  updateService
} from "@/lib/actions/service.actions";




interface IService {


  title:string;


  shortDescription:string;


  description:string;


  category:string;


  price:string;


  location:string;


  image:string;


}






export default function EditServiceForm({

  id

}:{

  id:string;

}) {



const router = useRouter();





const [formData,setFormData] =

useState<IService>({


  title:"",


  shortDescription:"",


  description:"",


  category:"",


  price:"",


  location:"",


  image:""


});





const [loading,setLoading] =

useState(true);





const [updating,setUpdating] =

useState(false);








// Load Service Data

useEffect(()=>{


const fetchService = async()=>{


try{


const result = await getServiceById(id);




if(result.success){



setFormData({


title:result.data.title,


shortDescription:
result.data.shortDescription,


description:
result.data.description,


category:
result.data.category,


price:
String(result.data.price),


location:
result.data.location,


image:
result.data.image,


});



}else{


toast.error(
"Failed to load service"
);


}



}catch(error){


console.log(error);


toast.error(
"Something went wrong"
);


}finally{


setLoading(false);


}



};



if(id){

fetchService();

}



},[id]);










const handleChange = (

e:
React.ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement |
HTMLSelectElement
>

)=>{


setFormData({


...formData,


[e.target.name]:
e.target.value


});


};










const handleSubmit = async(


e:React.FormEvent<HTMLFormElement>


)=>{


e.preventDefault();



setUpdating(true);




try{


const result = await updateService(


id,


{


...formData,


price:String(formData.price)


}


);





if(result.success){


toast.success(

"Service updated successfully"

);



router.push(

"/dashboard/provider/services"

);



}else{


toast.error(

"Update failed"

);


}




}catch(error){


console.log(error);


toast.error(

"Something went wrong"

);



}finally{


setUpdating(false);


}



};









if(loading){


return (

<div className="
flex
min-h-[400px]
items-center
justify-center
">


<Loader2

className="
animate-spin
text-[#2563EB]
"

/>


</div>

);


}










return (


<form


onSubmit={handleSubmit}



className="
space-y-6
rounded-3xl
border
border-gray-200
bg-white
p-5
shadow-sm
sm:p-8
"



>





<InputField


label="Service Title"


name="title"


value={formData.title}


onChange={handleChange}


icon={
<BriefcaseBusiness size={18}/>
}



/>









<InputField


label="Short Description"


name="shortDescription"


value={formData.shortDescription}


onChange={handleChange}


icon={
<FileText size={18}/>
}



/>









<div>


<label className="
mb-2
block
text-sm
font-semibold
text-[#14213D]
">


Description


</label>





<textarea


name="description"


value={formData.description}


onChange={handleChange}


rows={5}


className="
w-full
rounded-xl
border
border-gray-200
p-4
text-sm
outline-none
focus:border-[#2563EB]
"



/>



</div>









<div>


<label className="
mb-2
block
text-sm
font-semibold
text-[#14213D]
">


Category


</label>






<select


name="category"


value={formData.category}


onChange={handleChange}



className="
h-12
w-full
rounded-xl
border
border-gray-200
px-4
text-sm
outline-none
focus:border-[#2563EB]
"



>


<option value="">


Select Category


</option>



{


serviceCategories.map((item)=>(


<option

key={item}

value={item}

>


{item}


</option>



))


}



</select>



</div>









<div className="
grid
grid-cols-1
gap-5
md:grid-cols-2
">


<InputField


label="Price"


name="price"


value={formData.price}


onChange={handleChange}


icon={
<DollarSign size={18}/>
}



/>





<InputField


label="Location"


name="location"


value={formData.location}


onChange={handleChange}


icon={
<MapPin size={18}/>
}



/>



</div>









<InputField


label="Image URL"


name="image"


value={formData.image}


onChange={handleChange}


icon={
<Layers size={18}/>
}



/>









{
formData.image && (


<div className="
overflow-hidden
rounded-xl
border
">


<img


src={formData.image}


alt="preview"


className="
h-48
w-full
object-cover
object-center
"



/>


</div>


)

}









<Button


type="submit"


isLoading={updating}


className="
flex
h-12
w-full
items-center
justify-center
gap-2
rounded-xl
bg-[#2563EB]
font-semibold
text-white
"



>


<Send size={18}/>


{
updating
?
"Updating..."
:
"Update Service"
}



</Button>








</form>


);



}









function InputField({


label,


name,


value,


onChange,


icon


}:any){



return (


<div>



<label className="
mb-2
block
text-sm
font-semibold
text-[#14213D]
">


{label}


</label>





<div className="
relative
">



<div className="
absolute
left-3
top-3.5
text-gray-400
">


{icon}


</div>





<input



name={name}



value={value}



onChange={onChange}



className="
h-12
w-full
rounded-xl
border
border-gray-200
pl-10
pr-4
text-sm
outline-none
focus:border-[#2563EB]
"



/>





</div>



</div>



);


}