/* eslint-disable no-unused-expressions */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { changeMessages } from '../reducers/messageReducer';

const useListenMessages = () => {
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const { socket } = useSocketContext();

  useEffect(() => {
    socket && socket.on('newMessage', (newMessage) => {
      dispatch(changeMessages([...messages, newMessage]));
    });

    return () => socket && socket.off('newMessage');
  }, [socket, dispatch, messages]);
};

export default useListenMessages;
