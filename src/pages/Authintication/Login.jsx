import React from "react";
import { Sparkles } from "lucide-react";
import logo from '../../assets/Vector.png'

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1D1D1D] text-white">

            {/* Card */}
            <div className="w-[650px] border border-[#636363] rounded-2xl p-10">

                {/* Logo */}
                <div className="flex flex-col items-center mb-8">

                    <div className="flex items-center gap-2 mb-3">
                        <img src={logo} alt="logo of the website" className="w-14 h-14" />
                        <h1 className="text-4xl font-semibold">LoGo</h1>
                    </div>

                    <h2 className="text-lg font-semibold">
                        Login your Profile
                    </h2>

                    <p className="text-sm text-[#A4A4A4] mt-1">
                        Start with new journey
                    </p>

                </div>

                {/* Form */}
                <form className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-300">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full mt-2 px-4 py-3 rounded-lg bg-transparent border border-[#636363] outline-none focus:border-[#00CE51]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-300">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="******"
                            className="w-full mt-2 px-4 py-3 rounded-lg bg-transparent border border-[#636363] outline-none focus:border-[#00CE51]"
                        />

                        <div className="flex justify-end mt-2">
                            <button
                                type="button"
                                className="text-sm text-[#A4A4A4] hover:text-white"
                            >
                                Forgot password?
                            </button>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-[#00CE51] text-white font-semibold hover:opacity-90 transition"
                    >
                        Continue
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Login;