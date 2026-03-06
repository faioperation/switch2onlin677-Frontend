import React from "react";
import { Menu } from "lucide-react";

const Navbar = ({ setSidebarOpen }) => {
  return (
    <header className="py-5 border-b border-[#1F1F1F] bg-[#0B0B0B] flex items-center justify-between px-6">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-gray-400 hover:text-white transition"
        >
          <Menu size={22} />
        </button>

        {/* Page Title */}
        <h1 className="text-lg md:text-2xl font-semibold text-white">
          Dashboard
        </h1>

      </div>

      {/* Right User */}
      <div className="flex items-center gap-3">

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-9 h-9 rounded-full object-cover"
        />

        <div className="hidden sm:flex flex-col leading-tight">
          <span className="text-sm font-medium text-white">
            Akash Rohman
          </span>

          <span className="text-xs text-gray-400">
            Admin
          </span>
        </div>

      </div>

    </header>
  );
};

export default Navbar;