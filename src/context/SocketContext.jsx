import React, {
  useMemo, createContext, useState, useEffect, useContext,
} from 'react';
import io from 'socket.io-client';
import { useAuthContext } from './AuthContext';

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

// eslint-disable-next-line react/prop-types
export function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (authUser) {
      // eslint-disable-next-line no-shadow
      const socket = io('http://localhost:3000/', {
        query: {
          userId: authUser.id,
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    }
    if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [authUser]);

  return useMemo(
    // eslint-disable-next-line max-len
    () => <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>,
    [socket, onlineUsers, children],
  );
}
