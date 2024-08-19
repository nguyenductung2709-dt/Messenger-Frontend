import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

import authenticationService from '../services/authentication';

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('loggedInChatUser')) || null);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const fetchUser = () => {
    // Check if user data is available in localStorage
    const userFromStorage = localStorage.getItem('loggedInChatUser');

    if (userFromStorage) {
      // If user data is found in localStorage, set it directly
      setAuthUser(JSON.parse(userFromStorage));
    } else {
      // If no user data in localStorage, make a request to fetch user data from server
      fetch('/api/auth/login/success')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.user) {
            // Set user data from server response
            setAuthUser(data.user);
            authenticationService.setToken(data.user.token);
            // Store it in localStorage for future use
            localStorage.setItem('loggedInChatUser', JSON.stringify(data.user));
          } else {
            setAuthUser(null);
          }
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          setAuthUser(null);
        });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // No dependencies here, so fetchUser will run once when the component mounts

  useEffect(() => {
    if (!authUser || !authUser.token) {
      setIsTokenExpired(true);
      return;
    }

    try {
      const payload = JSON.parse(atob(authUser.token.split('.')[1]));
      const isExpired = Date.now() >= payload.exp * 1000;
      setIsTokenExpired(isExpired);
    } catch (error) {
      console.error('Error decoding token:', error);
      setIsTokenExpired(true);
    }
  }, [authUser]);

  useEffect(() => {
    if (isTokenExpired) {
      setAuthUser(null);
      localStorage.removeItem('loggedInChatUser');
    }
  }, [isTokenExpired]);

  const contextValue = useMemo(() => ({ authUser, setAuthUser }), [authUser]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
