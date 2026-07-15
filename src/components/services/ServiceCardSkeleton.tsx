"use client";

import { motion } from "framer-motion";

export default function ServiceCardSkeleton() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow overflow-hidden h-full">
      <div className="h-52 bg-gray-200 animate-pulse"></div>

      <div className="p-5 space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>

        <div className="flex justify-between items-center pt-4">
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-14 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    </motion.div>
  );
}