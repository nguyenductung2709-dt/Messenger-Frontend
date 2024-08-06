/* eslint-disable no-unused-expressions */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { changeFriends } from '../reducers/friendReducer';

const useListenFriends = () => {
  const friends = useSelector((state) => state.friends);
  const dispatch = useDispatch();
  const { socket } = useSocketContext();

  useEffect(() => {
    socket && socket.on('newFriend', (newFriend) => {
      dispatch(changeFriends([...friends, newFriend]));
    });

    return () => socket && socket.off('newMessage');
  }, [socket, dispatch, friends]);
};

export default useListenFriends;
