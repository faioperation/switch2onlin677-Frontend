import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/Vector.png";
import { useNavigate } from "react-router";

const SetPassword = () => {
        const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    console.log(data);
     navigate("/auth/password-successfull");
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
              {...register("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-white/5 border border-[#636363] outline-none focus:border-[#00CE51]"
            />

            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}

          </div>

          {/* Confirm Password */}
          <div>

            <label className="text-sm text-gray-300">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="******"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match"
              })}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-white/5 border border-[#636363] outline-none focus:border-[#00CE51]"
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}

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