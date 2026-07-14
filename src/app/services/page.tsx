import { getServices } from "@/lib/actions/service.actions";
import ServicesContainer from "./ServicesContainer";




export default async function ServicesPage(){


  const result = await getServices();


  return (

    <ServicesContainer
      initialData={result?.data || []}
      pagination={result?.pagination}
    />

  );

}