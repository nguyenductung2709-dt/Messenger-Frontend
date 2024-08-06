/* eslint-disable no-unused-expressions */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { changeConversations, updateConversations } from '../reducers/conversationsReducer';
import { changeSelectedConversation } from '../reducers/conversationReducer';

const useListenConversations = () => {
  const conversations = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
  const { socket } = useSocketContext();

  useEffect(() => {
    socket && socket.on('newConversation', (newConversation) => {
      dispatch(changeConversations([...conversations, newConversation]));
    });

    return () => socket && socket.off('newMessage');
  }, [socket, dispatch, conversations]);

  useEffect(() => {
    socket && socket.on('updateConversation', (updatedConversation) => {
      dispatch(updateConversations(updatedConversation));
      dispatch(changeSelectedConversation(updatedConversation));
    });

    return () => socket && socket.off('updateConversation');
  }, [socket, dispatch, conversations]);

  useEffect(() => {
    socket && socket.on('deleteConversation', (deleteConversation) => {
      dispatch(changeConversations(conversations
        .filter((conversation) => conversation.id !== deleteConversation.id)));
      dispatch(changeSelectedConversation(null));
    });

    return () => socket && socket.off('updateConversation');
  }, [socket, dispatch, conversations]);
};

export default useListenConversations;
