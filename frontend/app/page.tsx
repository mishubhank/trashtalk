// app/page.tsx
"use client"; // We need this to fetch data on the client

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import AreaLeaderboard from "./components/AreaLeaderboard";
import TrashFeed from "./components/TrashFeed";

// This is the special trick to prevent the "Window is not defined" error
const DynamicMap = dynamic(() => import("./components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-3xl" />
  ),
});

export default function HomePage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/reports/find-all")
      .then((res) => res.json())
      .then((data) => setReports(data));
    console.log("Fetched reports:", reports[0]);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Section: The Map */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-black text-slate-900">
              City-Wide Status
            </h2>
            <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
              Live Updates
            </span>
          </div>
          <DynamicMap reports={reports} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <AreaLeaderboard />
          </div>
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Recent Evidence
            </h2>
            <TrashFeed />
          </div>
        </div>
      </div>
    </main>
  );
}
