import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import logo from "../../assets/Vector.png";

const ForgetPassword = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const email = watch("email");

  const onSubmit = (data) => {
    console.log(data);

    // after email submit go to otp page
    navigate("/auth/otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1D1D1D] text-white">

      {/* Card */}
      <div className="w-[650px] h-120 border border-[#636363] rounded-2xl p-10 bg-white/3">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">

          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="logo" className="w-12 h-12" />
            <h1 className="text-3xl font-semibold">LoGo</h1>
          </div>

          <h2 className="text-lg font-semibold">
            Forgot Password?
          </h2>

          <p className="text-sm text-[#A4A4A4] mt-1">
            Please enter your email to get verification code
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
              {...register("email", { required: true })}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-white/5 border border-[#636363] outline-none focus:border-[#00CE51]"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                Email is required
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

export default ForgetPassword;