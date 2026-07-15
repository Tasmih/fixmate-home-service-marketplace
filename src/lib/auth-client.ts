import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";


export const authClient = createAuthClient({

  baseURL: process.env.NEXT_PUBLIC_API_URL,

  plugins:[
    jwtClient()
  ],

});



export const {
  useSession
} = authClient;



export type UserRole =
  | "customer"
  | "provider"
  | "admin";



export interface AuthUser {

  id:string;

  name:string;

  email:string;

  emailVerified:boolean;

  role?:UserRole;

  phone?:string;

  avatar?:string;

}