export const uploadImageFromUrl = async (
  imageUrl: string
) => {


  try {


    const response = await fetch(imageUrl);


    if(!response.ok){

      throw new Error(
        "Image URL not accessible"
      );

    }



    const blob = await response.blob();



    const formData = new FormData();



    formData.append(
      "image",
      blob
    );



    const uploadResponse = await fetch(

      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,

      {

        method:"POST",

        body:formData,

      }

    );



    const data = await uploadResponse.json();




    if(!data.success){

      throw new Error(
        "imgBB upload failed"
      );

    }




    return data.data.url;



  } catch(error){


    console.log(error);


    throw error;


  }


};

export const uploadImage = async (

  imageFile: File

) => {


  try {


    const formData = new FormData();



    formData.append(

      "image",

      imageFile

    );





    const response = await fetch(

      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,

      {

        method:"POST",

        body:formData,

      }

    );






    const data = await response.json();






    if(!data.success){


      throw new Error(

        "imgBB upload failed"

      );


    }







    return data.data.url;





  } catch(error){


    console.log(error);


    throw error;


  }


};