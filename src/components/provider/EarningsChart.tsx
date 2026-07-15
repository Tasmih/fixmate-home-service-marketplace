"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import { protectedFetch } from "@/lib/api";

interface Booking {
  paymentAmount: number;
  paymentStatus: string;
  bookingStatus: string;
}

export default function EarningsChart() {
  const [data, setData] = useState<{ name: string; count: number }[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await protectedFetch("/api/bookings/provider");
        const bookings: Booking[] = result.data || [];

        const statusCount: Record<string, number> = {
          pending: 0, confirmed: 0, completed: 0, cancelled: 0,
        };

        let earnings = 0;

        bookings.forEach((b) => {
          const status = b.bookingStatus?.toLowerCase() || "pending";
          if (statusCount[status] !== undefined) statusCount[status]++;
          if (b.paymentStatus?.toLowerCase() === "paid") {
            earnings += b.paymentAmount || 0;
          }
        });

        setTotalEarnings(earnings);
        setData(
          Object.entries(statusCount).map(([name, count]) => ({
            name: name[0].toUpperCase() + name.slice(1),
            count,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#14213D]">Booking Performance</h2>
        <span className="text-sm font-semibold text-[#2563EB]">
          Total Earnings: ৳{totalEarnings}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#2563EB" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}