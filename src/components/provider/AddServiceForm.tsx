"use client";

import React, {
  useState,
} from "react";

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

  price:"",

  location:"",

  image:"",

};





export default function AddServiceForm(){


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









  const handleSubmit = async (

    e:React.FormEvent<HTMLFormElement>

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


        value={
          formData.shortDescription
        }


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


          value={
            formData.description
          }


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


            value={
              formData.category
            }


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


          label="Service Price"


          name="price"


          type="number"


          placeholder="1200"


          value={
            formData.price
          }


          onChange={handleChange}


          icon={
            <DollarSign size={18}/>
          }


        />








        <InputField


          label="Service Location"


          name="location"


          placeholder="Dhaka"


          value={
            formData.location
          }


          onChange={handleChange}


          icon={
            <MapPin size={18}/>
          }


        />



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


              value={
                formData.image
              }


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


        isLoading={loading}


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


  placeholder,


  value,


  onChange,


  icon,



}:{

  label:string;


  name:string;


  type?:string;


  placeholder:string;


  value:string;


  onChange:(

    e:React.ChangeEvent<HTMLInputElement>

  )=>void;


  icon:React.ReactNode;


}) {



  return (



    <div>




      <label className="mb-2 block text-sm font-semibold text-[#14213D]">


        {label}


      </label>








      <div className="relative">





        <div className="absolute left-3 top-3.5 text-gray-400">


          {icon}


        </div>







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
