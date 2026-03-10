import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

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

    

    const authinfo = {
        user,
        login,
        logout
    }

    return (
        <AuthContext value={authinfo}>
            {children}
        </AuthContext>
    );
};

export const useAuth = () => useContext(AuthContext);