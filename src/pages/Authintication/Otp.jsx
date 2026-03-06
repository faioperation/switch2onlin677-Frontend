import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/Vector.png";

const Otp = () => {

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const otp =
      data.otp1 +
      data.otp2 +
      data.otp3 +
      data.otp4 +
      data.otp5 +
      data.otp6;

    console.log("OTP:", otp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1D1D1D] text-white">

      {/* Card */}
      <div className="w-[650px] border border-[#636363] rounded-2xl p-10 bg-white/[0.03] h-110">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">

          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="logo" className="w-12 h-12" />
            <h1 className="text-3xl font-semibold">LoGo</h1>
          </div>

          <h2 className="text-lg font-semibold">OTP</h2>

          <p className="text-sm text-[#A4A4A4] mt-2 text-center max-w-[320px]">
            We sent a code to your email address. Please check your email for the 6 digit code.
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* OTP Inputs */}
          <div className="flex justify-center gap-4">

            <input
              maxLength={1}
              {...register("otp1")}
              className="w-12 h-12 text-center rounded-lg bg-transparent border border-[#00CE51] outline-none"
            />

            <input
              maxLength={1}
              {...register("otp2")}
              className="w-12 h-12 text-center rounded-lg bg-transparent border border-[#00CE51] outline-none"
            />

            <input
              maxLength={1}
              {...register("otp3")}
              className="w-12 h-12 text-center rounded-lg bg-transparent border border-[#00CE51] outline-none"
            />

            <input
              maxLength={1}
              {...register("otp4")}
              className="w-12 h-12 text-center rounded-lg bg-transparent border border-[#00CE51] outline-none"
            />

            <input
              maxLength={1}
              {...register("otp5")}
              className="w-12 h-12 text-center rounded-lg bg-transparent border border-[#00CE51] outline-none"
            />

            <input
              maxLength={1}
              {...register("otp6")}
              className="w-12 h-12 text-center rounded-lg bg-transparent border border-[#00CE51] outline-none"
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

export default Otp;