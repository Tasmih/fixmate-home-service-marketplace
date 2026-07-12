import { serverFetch, serverMutation } from "../api";
import { IServiceFormData } from "@/types/service";


// Create Service

export const createService = async (
  serviceData: IServiceFormData
) => {

  return serverMutation(
    "/api/services",
    {
      ...serviceData,

      price: Number(serviceData.price),

      providerId: "demo-provider",

    },
    "POST"
  );

};




// Get All Services

export const getServices = async () => {

  return serverFetch(
    "/api/services"
  );

};




// Get Single Service

export const getServiceById = async (
  id: string
) => {

  return serverFetch(
    `/api/services/${id}`
  );

};




// Update Service

export const updateService = async (
  id: string,
  serviceData: Partial<IServiceFormData>
) => {

  return serverMutation(
    `/api/services/${id}`,
    serviceData,
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