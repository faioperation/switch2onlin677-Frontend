import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";

const axiosSecure = axios.create({
  baseURL: "https://charissa-intuitable-corroboratorily.ngrok-free.dev",
});

const useAxiosSecure = () => {

  useEffect(() => {

    const interceptor = axiosSecure.interceptors.request.use((config) => {

      const token = Cookies.get("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;

    });

    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };

  }, []);

  return axiosSecure;
};

export default useAxiosSecure;