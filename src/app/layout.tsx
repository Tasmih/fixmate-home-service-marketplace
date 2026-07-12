import type { Metadata } from "next";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "FixMate",
  description: "Local Service Marketplace",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en">

      <body>
          <Navbar/>
        {children}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="light"
        />

      </body>

    </html>

  );

}