"use client";

import AdminDashboard from "@/components/dashboard/AdminDashboard";
import CustomerDashboard from "@/components/dashboard/CustomerDashboard";
import ProviderDashboard from "@/components/dashboard/ProviderDashboard";
import { useSession } from "@/lib/auth-client";
import { unknown } from "better-auth";

export default function DashboardPage() {

  const { data: session, isPending } = useSession();


  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }


  if (!session?.user) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Please login first
      </div>
    );

  }

const role = session.user.role;


if(role === "admin"){
  return <AdminDashboard />;
}


if(role === "provider"){
  return <ProviderDashboard />;
}


return <CustomerDashboard />;

  


  return (

    <div className="min-h-screen bg-gray-50 p-10">

      <div className="bg-white rounded-2xl shadow p-8">

        <h1 className="text-3xl font-bold text-[#14213D]">
          Dashboard
        </h1>


        <div className="mt-5 space-y-3">

          <p className="text-gray-700">
            Welcome, {session.user.name}
          </p>


          <p className="text-gray-700">
            Email: {session.user.email}
          </p>


          <p className="text-gray-700">
            Role: {session.user.role}
          </p>

        </div>

      </div>

    </div>

  );

}