import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); // ✅ safer initial state

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem("user");
            setUser(updatedUser ? JSON.parse(updatedUser) : null);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const authLogin = (authData) => {
        setUser(authData);
    };

    const authLogout = () => {
        setUser(null);
        sessionStorage.removeItem("auth");
        localStorage.removeItem("user");
    };

    const refreshAuth = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("Auth User after refresh", JSON.parse(storedUser));
        }
    };

    return (
        <AuthContext.Provider value={{user, authLogin, authLogout, refreshAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); // ✅ hook stays top-level
