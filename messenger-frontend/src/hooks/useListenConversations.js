import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "../context/SocketContext";
import { useEffect } from "react";
import { changeConversations } from "../reducers/conversationsReducer";

const useListenConversations = () => {
  const conversations = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("newConversation", (newConversation) => {
      dispatch(changeConversations([...conversations, newConversation]));
    });

    return () => socket?.off("newMessage");
  }, [socket, dispatch, conversations]);
};

export default useListenConversations;
