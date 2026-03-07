import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/", // later change to backend API
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;