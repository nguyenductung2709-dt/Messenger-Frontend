import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("loggedInChatUser")) || null);
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    useEffect(() => {
        const token = authUser ? authUser.token : null;
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setIsTokenExpired(Date.now() >= payload.exp * 1000);
        } else {
            setIsTokenExpired(true); // No token found, consider it expired
        }
    }, [authUser]); // Run this effect whenever authUser changes

    useEffect(() => {
        // If the token is expired, clear authUser from state
        if (isTokenExpired) {
            setAuthUser(null);
            localStorage.removeItem("loggedInChatUser");
        }
    }, [isTokenExpired]);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
