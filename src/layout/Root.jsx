import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Root = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0B0B0B] text-white">

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-[260px] border-r border-[#2A2A2A]">
        <Sidebar />
      </aside>

      {/* Right Section */}
      <div className="flex flex-col flex-1">

        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6 bg-[#0B0B0B] overflow-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Root;