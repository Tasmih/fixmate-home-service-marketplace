import { getServices } from "@/lib/actions/service.actions";
import ServicesContainer from "./ServicesContainer";





export default async function ServicesPage(){


  const result = await getServices();


  console.log(
    "PAGE SERVICE DATA:",
    result
  );


  return (

   <ServicesContainer
    initialData={result?.data || []}
   />

  );

}