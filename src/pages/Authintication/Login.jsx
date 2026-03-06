import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/Vector.png";

const Login = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // later you will send this to API
        // axios.post("/login", data)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1D1D1D] text-white">

            {/* Card */}
            <div className="w-[650px] border border-[#636363] rounded-2xl p-10">

                {/* Logo */}
                <div className="flex flex-col items-center mb-8">

                    <div className="flex items-center gap-2 mb-3">
                        <img src={logo} alt="logo" className="w-12 h-12" />
                        <h1 className="text-3xl font-semibold">LoGo</h1>
                    </div>

                    <h2 className="text-lg font-semibold">
                        Login your Profile
                    </h2>

                    <p className="text-sm text-[#A4A4A4] mt-1">
                        Start with new journey
                    </p>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-300">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            className="w-full mt-2 px-4 py-3 rounded-lg bg-white/5 border border-[#636363] outline-none focus:border-[#00CE51]"
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
                            {...register("password")}
                            className="w-full mt-2 px-4 py-3 rounded-lg bg-white/5 border border-[#636363] outline-none focus:border-[#00CE51]"
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
                        className="btn-primary"
                    >
                        Continue
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Login;