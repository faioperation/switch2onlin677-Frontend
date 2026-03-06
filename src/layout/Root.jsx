import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Root = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen grid grid-rows-[60px_1fr]">

      <Navbar setSidebarOpen={setSidebarOpen} />

      <main className="grid grid-cols-12">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block md:col-span-2 border-r">
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </aside>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition ${
            sidebarOpen ? "visible" : "invisible"
          }`}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div
            className={`absolute left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>
        </div>

        {/* Page Content */}
        <section className="col-span-12 md:col-span-10 p-6 bg-gray-100">
          <Outlet />
        </section>

      </main>
    </div>
  );
};

export default Root;