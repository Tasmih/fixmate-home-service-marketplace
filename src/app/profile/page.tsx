"use client";

import { useEffect, useState } from "react";
import { protectedFetch, serverMutation } from "@/lib/api";
import { toast } from "react-toastify";

interface Profile {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");


  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await protectedFetch("/api/users/profile");

        setProfile(result.data);

        setName(result.data.name);
        setPhone(result.data.phone || "");
        setAvatar(result.data.avatar || "");

      } catch (error) {
        console.log(error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);



  const handleUpdate = async () => {
    try {
      const result = await serverMutation(
        "/api/users/profile",
        {
          name,
          phone,
          avatar,
        },
        "PATCH"
      );


      if (result.success) {
        toast.success("Profile updated successfully");
        setProfile(result.data);
      }


    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">

        <h1 className="text-3xl font-bold text-[#14213D]">
          My Profile
        </h1>


        <div className="mt-6 space-y-5">


          <div>
            <label className="font-semibold">
              Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>



          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              value={profile?.email || ""}
              disabled
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>



          <div>
            <label className="font-semibold">
              Phone
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>



          <div>
            <label className="font-semibold">
              Avatar URL
            </label>

            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>



          <div>
            <label className="font-semibold">
              Role
            </label>

            <input
              value={profile?.role || ""}
              disabled
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>



          <button
            onClick={handleUpdate}
            className="bg-[#2563EB] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#14213D]"
          >
            Update Profile
          </button>


        </div>

      </div>

    </div>
  );
}