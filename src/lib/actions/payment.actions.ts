import { baseUrl } from "../core/config";


interface CheckoutData {

  bookingId:string;

  amount:number;

  serviceName:string;

}


interface CheckoutResponse {

  success:boolean;

  url?:string;

  message?:string;

}



export const createCheckoutSession = async (
  data:CheckoutData
):Promise<CheckoutResponse>=>{


  try{


    const res = await fetch(

      `${baseUrl}/api/payment/create-checkout`,

      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        credentials:"include",

        body:JSON.stringify(data)

      }

    );



    const result =
    await res.json();



    if(!res.ok){

      throw new Error(

        result.message ||
        "Payment session failed"

      );

    }



    return result;



  }catch(error){


    console.error(
      "Checkout Session Error:",
      error
    );


    throw error;


  }


};