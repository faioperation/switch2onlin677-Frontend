import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/Vector.png";

const SetPassword = () => {

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1D1D1D] text-white">

      {/* Card */}
      <div className="w-[650px] border border-[#636363] rounded-2xl p-10 bg-white/3">

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">

          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="logo" className="w-12 h-12" />
            <h1 className="text-3xl font-semibold">LoGo</h1>
          </div>

          <h2 className="text-lg font-semibold">
            Set Password
          </h2>

          <p className="text-sm text-[#A4A4A4] mt-1">
            Start with new journey
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* New Password */}
          <div>
            <label className="text-sm text-gray-300">
              New Password
            </label>

            <input
              type="password"
              placeholder="******"
              {...register("newPassword")}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-white/5 border border-[#636363] outline-none focus:border-[#00CE51]"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-300">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="******"
              {...register("confirmPassword")}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-white/5 border border-[#636363] outline-none focus:border-[#00CE51]"
            />
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

export default SetPassword;