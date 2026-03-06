import React from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  BarChart3,
  MessageSquare,
  Users,
  Settings,
  LogIn,
  X,
  Sparkles,
} from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="flex flex-col h-full p-4">

      {/* Top Logo + Close */}
      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-2 font-semibold text-lg">
          <Sparkles size={20} />
          AI Beauty
        </div>

        <button
          onClick={closeSidebar}
          className="md:hidden p-1 rounded hover:bg-gray-200"
        >
          <X size={18} />
        </button>

      </div>

      {/* Navigation */}
      <div className="space-y-2">

        <NavLink to="/" className={linkClass} onClick={closeSidebar}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/analytics" className={linkClass} onClick={closeSidebar}>
          <BarChart3 size={18} />
          Analytics
        </NavLink>

        <NavLink
          to="/conversation"
          className={linkClass}
          onClick={closeSidebar}
        >
          <MessageSquare size={18} />
          Conversations
        </NavLink>

        <NavLink to="/leads" className={linkClass} onClick={closeSidebar}>
          <Users size={18} />
          Leads
        </NavLink>

        <NavLink to="/settings" className={linkClass} onClick={closeSidebar}>
          <Settings size={18} />
          Settings
        </NavLink>

      </div>

      {/* Bottom Login Button */}
      <div className="mt-auto pt-6">

        <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition">

          <LogIn size={18} />
          Login

        </button>

      </div>

    </div>
  );
};

export default Sidebar;