import EditServiceForm from "@/components/provider/EditServiceForm";


export default async function EditServicePage({

  params,

}: {

  params: Promise<{
    id: string;
  }>;

}) {


  const { id } = await params;


  return (

    <main className="min-h-screen bg-[#F8FAFC] p-5 sm:p-8">

      <div className="mx-auto max-w-3xl">


        <div className="mb-8">


          <h1 className="text-3xl font-bold text-[#14213D]">

            Edit Service

          </h1>


          <p className="mt-2 text-gray-500">

            Update your service information

          </p>


        </div>



        <EditServiceForm

          id={id}

        />


      </div>


    </main>

  );

}