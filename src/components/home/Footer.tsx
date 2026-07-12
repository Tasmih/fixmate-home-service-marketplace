"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";


const footerAnimation = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};


export default function Footer() {

  return (

    <footer className="bg-[#14213D] text-white overflow-hidden">


      <motion.div
        variants={footerAnimation}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-5 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
      >


        {/* BRAND */}

        <div>


          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <Image
              src="/assets/fixmate-logo.png"
              alt="FixMate Logo"
              width={160}
              height={60}
              className="w-[150px] h-auto object-contain"
            />

          </motion.div>



          <p className="text-white/70 mt-5 text-sm leading-7">
            Connecting customers with trusted professionals
            for reliable home services.
          </p>




          <div className="flex gap-4 mt-6">


            <motion.a
              href="#"
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2563EB] transition"
            >
              <FaFacebook size={20}/>
            </motion.a>



            <motion.a
              href="#"
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2563EB] transition"
            >
              <FaInstagram size={20}/>
            </motion.a>



            <motion.a
              href="#"
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2563EB] transition"
            >
              <FaLinkedin size={20}/>
            </motion.a>


          </div>


        </div>







        {/* QUICK LINKS */}


        <div>


          <h3 className="text-lg font-semibold">
            Quick Links
          </h3>



          <div className="flex flex-col gap-3 mt-5 text-white/70 text-sm">


            <Link href="/" className="hover:text-white transition">
              Home
            </Link>


            <Link href="/services" className="hover:text-white transition">
              Services
            </Link>


            <Link href="/about" className="hover:text-white transition">
              About
            </Link>


            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>


          </div>


        </div>







        {/* SERVICES */}


        <div>


          <h3 className="text-lg font-semibold">
            Popular Services
          </h3>



          <div className="flex flex-col gap-3 mt-5 text-white/70 text-sm">


            <p>
              Electrical Repair
            </p>


            <p>
              AC Service
            </p>


            <p>
              Plumbing
            </p>


            <p>
              Home Cleaning
            </p>


            <p>
              Healthcare Support
            </p>


          </div>


        </div>







        {/* CONTACT */}


        <div>


          <h3 className="text-lg font-semibold">
            Contact Us
          </h3>



          <div className="flex flex-col gap-4 mt-5 text-white/70 text-sm">


            <div className="flex items-center gap-3">

              <Mail size={18}/>

              support@fixmate.com

            </div>




            <div className="flex items-center gap-3">

              <Phone size={18}/>

              +880 1234 567890

            </div>




            <div className="flex items-center gap-3">

              <MapPin size={18}/>

              Dhaka, Bangladesh

            </div>


          </div>


        </div>



      </motion.div>







      {/* COPYRIGHT */}


      <motion.div
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        transition={{ duration:0.5 }}
        viewport={{ once:true }}
        className="border-t border-white/10"
      >


        <div className="max-w-7xl mx-auto px-5 py-5 text-center text-sm text-white/60">

          © 2026 FixMate. All rights reserved.

        </div>


      </motion.div>



    </footer>

  );

}