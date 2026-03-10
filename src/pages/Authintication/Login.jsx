import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/Vector.png";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxios";
import { useAuth } from "../Provider/AuthProvider";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { login } = useAuth();

const onSubmit = async (data) => {

  try {

    const res = await axios.post(
      "https://charissa-intuitable-corroboratorily.ngrok-free.dev/auth/login/",
      data
    );

    console.log(res.data);

    Cookies.set("accessToken", res.data.tokens.access);

    login(res.data);

    navigate("/");
    toast.success("Login Successfull!")

  } catch (error) {

    console.log(error.response?.data);
    toast.error("Something went wrong!")

  }

};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1D1D1D] text-white">

      <div className="w-[650px] border border-[#636363] rounded-2xl p-10">

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <label className="text-sm text-gray-300">Email</label>

            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-white/5 border border-[#636363]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>

            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-white/5 border border-[#636363]"
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
          >
            Continue
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;