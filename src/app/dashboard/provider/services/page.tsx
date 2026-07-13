import ManageServices from "@/components/provider/ManageServices";


export default function ProviderServicesPage() {


  return (

    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-8">

      <div className="mx-auto max-w-7xl">


        <h1 className="mb-8 text-3xl font-bold text-[#14213D]">

          Manage Services

        </h1>


        <ManageServices />


      </div>

    </main>

  );


}