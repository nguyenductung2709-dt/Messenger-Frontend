import { useDispatch, useSelector } from 'react-redux';
import { useSocketContext } from '../context/SocketContext';
import { useEffect } from 'react';
import { changeMessages } from '../reducers/messageReducer';

const useListenMessages = () => {
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch();
    const { socket } = useSocketContext();

    useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        dispatch(changeMessages([...messages, newMessage]));
    })

    return () => socket?.off("newMessage");
    }, [socket, dispatch, messages])
};

export default useListenMessages