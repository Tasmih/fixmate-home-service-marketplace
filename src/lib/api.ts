import { baseUrl } from "./core/config";


const handleStatusCode = async (res: Response) => {

  const contentType = res.headers.get("content-type");


  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Invalid server response");
  }


  const data = await res.json();


  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }


  return data;

};



export const serverFetch = async (path: string) => {

  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });


  return handleStatusCode(res);

};



export const protectedFetch = async (path: string) => {

  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    credentials: "include",
  });


  return handleStatusCode(res);

};



export const serverMutation = async (
  path: string,
  data: unknown = null,
  method: string = "POST"
) => {

  const res = await fetch(`${baseUrl}${path}`, {

    method,

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: data ? JSON.stringify(data) : null,

  });


  return handleStatusCode(res);

};