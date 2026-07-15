"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { User, Menu } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
const { data: session, isPending } = useSession();


const user = session?.user as (
  {
    id:string;
    name:string;
    email:string;
    role?: "customer" | "provider" | "admin";
  }
  |
  undefined
);

  if (isPending) {
    return null;
  }

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navLinks = (
    <>
      <li>
        <Link
          href="/"
          className={isActive("/") ? "text-[#2563EB] font-semibold" : "text-gray-600 hover:text-[#2563EB]"}
        >
          Home
        </Link>
      </li>

      <li>
        <Link
          href="/services"
          className={
            isActive("/services") ? "text-[#2563EB] font-semibold" : "text-gray-600 hover:text-[#2563EB]"
          }
        >
          Explore Services
        </Link>
      </li>

      <li>
        <Link href="/about" className="text-gray-600 hover:text-[#2563EB]">
          About
        </Link>
      </li>

      <li>
        <Link href="/contact" className="text-gray-600 hover:text-[#2563EB]">
          Contact
        </Link>
      </li>
{user?.role === "provider" && (
        <>
          <li>
            <Link href="/services/add" className="text-gray-600 hover:text-[#2563EB]">
              Add Service
            </Link>
          </li>

          <li>
            <Link href="/services/manage" className="text-gray-600 hover:text-[#2563EB]">
              Manage Services
            </Link>
          </li>
        </>
      )}

      {session?.user && (
        <li>
          <Link href="/dashboard" className="text-gray-600 hover:text-[#2563EB]">
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  const avatarSrc =
    session?.user?.image && typeof session.user.image === "string" ? session.user.image : "/assets/user.png";

  return (
   <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
  <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between overflow-hidden">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-sm">
              <Menu size={22} />
            </button>

            <ul
              tabIndex={0}
              className="dropdown-content mt-3 z-[60] p-3 shadow bg-white rounded-xl w-56 space-y-2"
            >
              {navLinks}
            </ul>
          </div>

 <Image
  src="/assets/fixmate-logo.png"
  alt="FixMate Logo"
  width={290}
  height={180}
  priority
  className="w-[100px] sm:w-[120px] h-auto object-contain"
/>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex">
          <ul className="flex items-center gap-6 text-sm font-medium">{navLinks}</ul>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border">
                <span className="text-sm text-gray-700">Hello, {session.user.name}</span>
                <Image src={avatarSrc} alt="avatar" width={32} height={32} className="rounded-full object-cover" />
              </div>

              <button
                onClick={handleLogout}
                className="bg-[#14213D] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#2563EB] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-1 px-4 py-2 rounded-xl border border-[#2563EB] text-[#2563EB] text-sm hover:bg-[#2563EB] hover:text-white transition"
              >
                <User size={16} />
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-sm hover:bg-[#14213D] transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;