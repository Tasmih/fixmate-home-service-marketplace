import AddServiceForm from "@/components/provider/AddServiceForm";



export default function AddServicePage() {


  return (

    <main className="min-h-screen bg-[#F8FAFC] px-5 py-10">

      <div className="mx-auto max-w-3xl">


        <div className="mb-8">

          <h1 className="text-3xl font-bold text-[#14213D]">
            Add New Service
          </h1>


          <p className="mt-2 text-gray-500">
            Create and publish your professional service on FixMate.
          </p>


        </div>



        <AddServiceForm />


      </div>


    </main>

  );

}