import { serverFetch, serverMutation } from "../api";
import { IServiceFormData } from "@/types/service";
import {IServiceResponse} from "@/types/service";


// Create Service

export const createService = async (
  serviceData: IServiceFormData
) => {

  return serverMutation(
    "/api/services",
    {
      ...serviceData,

      price: Number(serviceData.price),

    },
    "POST"
  );

};




// Get All Services

export const getServices = async (
  query:string = ""
)=>{

  try{

    const result = await serverFetch(
      `/api/services?${query}`
    );

    console.log(
      "SERVICE API RESULT:",
      result
    );


    return result;


  }catch(error){

    console.log(
      "SERVICE FETCH ERROR:",
      error
    );


    return {
      success:false,
      data:[]
    };

  }

};




// Get Single Service

export const getServiceById = async (
  id:string
) => {

  try {

    const result = await serverFetch(
      `/api/services/${id}`
    );


    return result;


  } catch(error){

    console.log(error);

    return {
      success:false,
      message:"Failed to fetch service"
    };

  }

};


// Update Service

export const updateService = async (
  id: string,
  serviceData: Partial<IServiceFormData>
) => {

  return serverMutation(
    `/api/services/${id}`,
    {
      ...serviceData,
      price:Number(serviceData.price)
    },
    "PATCH"
  );

};




// Delete Service

export const deleteService = async (
  id: string
) => {

  return serverMutation(
    `/api/services/${id}`,
    null,
    "DELETE"
  );

};

// Get Provider Services

export const getProviderServices = async (

  providerId:string

) => {


  return serverFetch(

    `/api/services/provider/${providerId}`

  );


};




// Create Booking

export const createBooking = async (

  bookingData: {

    serviceId:string;

    customerId:string;

    bookingDate:string;

    address:string;

    phone:string;

    paymentAmount:number;

  }

)=>{


return serverMutation(

"/api/bookings",

bookingData,

"POST"

);


};