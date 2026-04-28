import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import useAxiosSecure from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  const token = localStorage.getItem("accessToken");

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    enabled: !!token,
    queryFn: async () => {
      const res = await axiosSecure.get("/auth/me/");
      return res.data;
    },

    // ⚡ performance improve
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
    retry: 1
  });

  const avatar = profile?.profile_image
    ? `${import.meta.env.VITE_API_URL}${profile.profile_image}`
    : "https://i.ibb.co/2kRZ0y9/user.png";

  // login
  const login = (data) => {

    const userData = data.user;
    const accessToken = data.tokens.access;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  // logout
  const logout = () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setUser(null);
  };

  useEffect(() => {

    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);

  }, []);

  const authinfo = {
    user,
    login,
    logout,
    loading: loading || isLoading,
    profile,
    avatar
  };

  return (
    <AuthContext value={authinfo}>
      {children}
    </AuthContext>
  );
};

export const useAuth = () => useContext(AuthContext);