import React, { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";

const Navbar = ({ setSidebarOpen }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="border-b bg-white">
            <div className="flex items-center justify-between h-[60px] px-6">

                {/* Left */}
                <div className="flex items-center gap-4">

                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
                    >
                        <Menu size={22} />
                    </button>

                    <h1 className="text-lg md:text-xl font-semibold">
                        AI Beauty Dashboard
                    </h1>

                </div>

                {/* Right */}
                <div className="relative" ref={dropdownRef}>

                    <img
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                        onClick={() => setOpen(!open)}
                        className="w-9 h-9 rounded-full cursor-pointer"
                    />

                    {open && (
                        <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-xl p-4 border animate-fadeIn">

                            <p className="font-semibold text-sm">
                                Saif
                            </p>

                            <p className="text-gray-500 text-xs mb-3">
                                Admin
                            </p>

                            <button className="w-full text-sm bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                                Login
                            </button>

                        </div>
                    )}

                </div>

            </div>
        </header>
    );
};

export default Navbar;