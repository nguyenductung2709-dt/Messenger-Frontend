import React, {
  createContext, useContext, useState, useEffect, useMemo,
} from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export function AuthContextProvider({ children }) {
  // eslint-disable-next-line no-undef
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('loggedInChatUser')) || null);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    const token = authUser ? authUser.token : null;
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setIsTokenExpired(Date.now() >= payload.exp * 1000);
    } else {
      setIsTokenExpired(true); // No token found, consider it expired
    }
  }, [authUser]); // Run this effect whenever authUser changes

  const contextValue = useMemo(() => ({ authUser, setAuthUser }), [authUser, setAuthUser]);

  useEffect(() => {
    // If the token is expired, clear authUser from state
    if (isTokenExpired) {
      setAuthUser(null);
      // eslint-disable-next-line no-undef
      localStorage.removeItem('loggedInChatUser');
    }
  }, [isTokenExpired]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
