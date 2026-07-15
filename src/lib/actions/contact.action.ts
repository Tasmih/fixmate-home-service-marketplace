import {
  serverMutation
} from "../api";



export const sendContactMessage = async(
  data:{
    name:string;
    email:string;
    message:string;
  }
)=>{


return serverMutation(

"/api/contact",

data,

"POST"

);


};