import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import Loader from "../../components/Loader";

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (data) => {

    const userData = data.user;
    const accessToken = data.tokens.access;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  const logout = () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setUser(null);
  };

  // page refresh হলে user load
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
    loading
  };

  if (loading) {
    return <Loader></Loader>
  }

  return (
    <AuthContext value={authinfo}>
      {children}
    </AuthContext>
  );
};

export const useAuth = () => useContext(AuthContext);