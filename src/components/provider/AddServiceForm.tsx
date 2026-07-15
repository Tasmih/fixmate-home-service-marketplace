"use client";

import React, {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  uploadImage,
  uploadImageFromUrl,
} from "@/lib/actions/upload.actions";

import {
  authClient,
} from "@/lib/auth-client";

import {
  BriefcaseBusiness,
  FileText,
  MapPin,
  Image as ImageIcon,
  DollarSign,
  Layers,
  Send,
  X,
} from "lucide-react";

import {
  Button,
} from "@heroui/react";

import {
  toast,
} from "react-toastify";

import {
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import {
  serviceCategories,
} from "@/constants/serviceCategories";

import {
  IServiceFormData,
} from "@/types/service";

import {
  createService,
} from "@/lib/actions/service.actions";



const initialState:IServiceFormData = {

  title:"",

  shortDescription:"",

  description:"",

  category:"",

  subcategory:"",

  tags:[],

  price:"",

  location:"",

  availability:[],

  duration:"",

  image:"",

};




export default function AddServiceForm(){


  const router = useRouter();


  const [tagInput,setTagInput] = useState("");

  const [availabilityInput,setAvailabilityInput] = useState("");



  const [
    formData,
    setFormData
  ] = useState<IServiceFormData>(
    initialState
  );



  const [
    imageFile,
    setImageFile
  ] = useState<File | null>(
    null
  );



  const [
    imagePreview,
    setImagePreview
  ] = useState<string>("");



  const [
    loading,
    setLoading
  ] = useState(false);
    const handleChange = (

    e:React.ChangeEvent<

      HTMLInputElement |

      HTMLTextAreaElement |

      HTMLSelectElement

    >

  )=>{


    setFormData({

      ...formData,

      [e.target.name]:

        e.target.value,

    });


  };







  const handleImageChange = (

    e:React.ChangeEvent<HTMLInputElement>

  )=>{


    const file =

      e.target.files?.[0];



    if(!file){

      return;

    }



    setImageFile(file);



    const previewURL =

      URL.createObjectURL(file);



    setImagePreview(

      previewURL

    );


  };







  const removeImage = ()=>{


    setImageFile(null);



    setImagePreview("");



    setFormData({

      ...formData,

      image:"",

    });


  };







  const addTag = ()=>{


    if(!tagInput.trim()) return;



    setFormData({


      ...formData,


      tags:[

        ...formData.tags,

        tagInput.trim()

      ]

    });



    setTagInput("");


  };







  const addAvailability = ()=>{


    if(!availabilityInput.trim()) return;



    setFormData({


      ...formData,


      availability:[

        ...formData.availability,

        availabilityInput.trim()

      ]

    });



    setAvailabilityInput("");


  };







  const handleSubmit = async (

    e:React.SubmitEvent<HTMLFormElement>

  )=>{


    e.preventDefault();


    setLoading(true);



    try {



      const {

        data:session

      } =

      await authClient.getSession();





      if(!session?.user){


        toast.error(

          "Please login first",

          {

            icon:<FaTimesCircle />,

          }

        );


        setLoading(false);


        return;


      }







      let imageUrl =

        formData.image;







      if(imageFile){



        imageUrl =

          await uploadImage(

            imageFile

          );


      }

      else if(formData.image){



        imageUrl =

          await uploadImageFromUrl(

            formData.image

          );


      }








      const result =

      await createService({



        ...formData,



        image:imageUrl,



        providerId:

          session.user.id,



      });







      if(result.success){



        toast.success(

          "Service created successfully",

          {

            icon:<FaCheckCircle />,

          }

        );



        setFormData(

          initialState

        );



        setImageFile(null);



        setImagePreview("");



        router.push(

          "/dashboard"

        );



      }

      else{



        toast.error(

          "Service creation failed",

          {

            icon:<FaTimesCircle />,

          }

        );



      }





    }


    catch(error){



      console.log(error);



      toast.error(

        "Something went wrong",

        {

          icon:<FaTimesCircle />,

        }

      );



    }


    finally{


      setLoading(false);


    }


  };

    return (


    <form

      onSubmit={handleSubmit}

      className="space-y-6 rounded-3xl border border-gray-400 bg-white p-5 shadow-sm sm:p-8"

    >



      <InputField


        label="Service Title"


        name="title"


        placeholder="AC Repair Service"


        value={formData.title}


        onChange={handleChange}


        icon={
          <BriefcaseBusiness size={18}/>
        }


      />






      <InputField


        label="Short Description"


        name="shortDescription"


        placeholder="Professional home service"


        value={formData.shortDescription}


        onChange={handleChange}


        icon={
          <FileText size={18}/>
        }


      />







      <div>


        <label className="mb-2 block text-sm font-semibold text-[#14213D]">


          Full Description


        </label>




        <textarea


          name="description"


          value={formData.description}


          onChange={handleChange}


          rows={5}


          placeholder="Describe your service details"


          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2563EB]"


        />


      </div>







      <div>


        <label className="mb-2 block text-sm font-semibold text-[#14213D]">


          Category


        </label>



        <div className="relative">


          <Layers


            size={18}

            className="absolute left-3 top-3.5 text-gray-400"

          />



          <select


            name="category"


            value={formData.category}


            onChange={handleChange}


            className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-800 outline-none focus:border-[#2563EB]"


          >



            <option value="">


              Select Category


            </option>



            {
              serviceCategories.map(

                (category)=>(


                  <option

                    key={category}

                    value={category}

                  >

                    {category}

                  </option>


                )

              )
            }



          </select>


        </div>


      </div>









      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


        <InputField


          label="Subcategory"


          name="subcategory"


          placeholder="Example: Split AC Repair"


          value={formData.subcategory}


          onChange={handleChange}


          icon={<Layers size={18}/>}


        />




        <InputField


          label="Service Duration"


          name="duration"


          placeholder="Example: 2 Hours"


          value={formData.duration}


          onChange={handleChange}


          icon={<FileText size={18}/>}


        />





        <InputField


          label="Service Price"


          name="price"


          type="number"


          placeholder="1200"


          value={formData.price}


          onChange={handleChange}


          icon={<DollarSign size={18}/>}


        />





        <InputField


          label="Service Location"


          name="location"


          placeholder="Dhaka"


          value={formData.location}


          onChange={handleChange}


          icon={<MapPin size={18}/>}


        />



      </div>







      <div>


        <label className="mb-2 block text-sm font-semibold text-[#14213D]">


          Tags


        </label>




        <div className="flex gap-3">



          <input


            value={tagInput}


            onChange={(e)=>setTagInput(e.target.value)}


            placeholder="Example: AC, Cooling"


            className="h-12 flex-1 rounded-xl border px-4"


          />




          <button


            type="button"


            onClick={addTag}


            className="rounded-xl bg-[#2563EB] px-5 text-white"


          >

            Add

          </button>



        </div>





        <div className="mt-3 flex flex-wrap gap-2">



          {
            formData.tags.map((tag,index)=>(


              <span


                key={index}


                className="rounded-full bg-blue-100 px-3 py-1 text-sm"


              >

                {tag}

              </span>


            ))
          }



        </div>



      </div>







      <div>


        <label className="mb-2 block text-sm font-semibold text-[#14213D]">


          Availability


        </label>



        <div className="flex gap-3">


          <input


            value={availabilityInput}


            onChange={(e)=>setAvailabilityInput(e.target.value)}


            placeholder="Example: Sunday"


            className="h-12 flex-1 rounded-xl border px-4"


          />



          <button


            type="button"


            onClick={addAvailability}


            className="rounded-xl bg-[#2563EB] px-5 text-white"


          >

            Add

          </button>



        </div>





        <div className="mt-3 flex flex-wrap gap-2">



          {
            formData.availability.map((day,index)=>(


              <span


                key={index}


                className="rounded-full bg-green-100 px-3 py-1 text-sm"


              >

                {day}

              </span>


            ))
          }



        </div>



      </div>

            <div>


        <label className="mb-2 block text-sm font-semibold text-[#14213D]">


          Service Image


        </label>





        <div className="space-y-4">





          <div className="relative">



            <ImageIcon


              size={18}


              className="absolute left-3 top-3.5 text-gray-400"


            />





            <input


              type="file"


              accept="image/*"


              onChange={handleImageChange}


              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-800"


            />



          </div>







          <div>


            <p className="mb-2 text-sm font-medium text-gray-600">


              Or Paste Image URL


            </p>





            <input


              type="url"


              name="image"


              value={formData.image}


              onChange={(e)=>{


                handleChange(e);


                setImagePreview(

                  e.target.value

                );


              }}


              placeholder="https://images.unsplash.com/example.jpg"


              className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none focus:border-[#2563EB]"


            />



          </div>







          {
            imagePreview && (


              <div className="relative overflow-hidden rounded-2xl border border-gray-200">



                <img


                  src={imagePreview}


                  alt="Preview"


                  className="h-56 w-full object-cover"


                />





                <button


                  type="button"


                  onClick={removeImage}


                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white"


                >


                  <X size={18}/>


                </button>



              </div>


            )
          }


        </div>

      </div>



      <Button


        type="submit"


        isDisabled={loading}


        className="h-12 w-full rounded-xl bg-[#2563EB] font-semibold text-white"


      >

        <Send size={18}/>

        {


          loading

          ? "Uploading..."

          : "Create Service"


        }

      </Button>

    </form>


  );


}









function InputField({


  label,


  name,


  type="text",


  placeholder="",


  value,


  onChange,


  icon,



}:{

  label:string;


  name:string;


  type?:string;


  placeholder?:string;


  value:string;


  onChange:(

    e:React.ChangeEvent<HTMLInputElement>

  )=>void;


  icon?:React.ReactNode;



}) {



  return (



    <div>




      <label className="mb-2 block text-sm font-semibold text-[#14213D]">


        {label}


      </label>





      <div className="relative">



        {
          icon && (

            <div className="absolute left-3 top-3.5 text-gray-400">


              {icon}


            </div>

          )
        }






        <input



          name={name}



          type={type}



          placeholder={placeholder}



          value={value}



          onChange={onChange}



          className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#2563EB]"



        />



      </div>




    </div>


  );


}
