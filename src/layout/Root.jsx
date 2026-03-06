import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Root = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black text-white">

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[280px] border-r border-[#1F1F1F]">
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">

          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-[280px] bg-[#0B0B0B]">
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>

        </div>
      )}

      {/* Right Section */}
      <div className="flex flex-col flex-1">

        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6 bg-black">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Root;