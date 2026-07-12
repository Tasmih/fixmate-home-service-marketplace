import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";


export async function PATCH(req:Request){

  try{

    const {role}=await req.json();


    const session =
      await auth.api.getSession({
        headers:req.headers,
      });



    if(!session){

      return NextResponse.json(
        {
          success:false,
          message:"Unauthorized"
        },
        {
          status:401
        }
      );

    }



    await auth.api.updateUser({

      body:{
        role,
      },

      headers:req.headers,

    });



    return NextResponse.json({

      success:true,

    });



  }

  catch(error){

    return NextResponse.json({

      success:false,

    });

  }

}