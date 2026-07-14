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

):Promise<IServiceResponse> => {


  return serverFetch(

    `/api/services?${query}`

  );


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