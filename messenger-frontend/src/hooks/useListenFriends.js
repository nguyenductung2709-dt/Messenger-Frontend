import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "../context/SocketContext";
import { useEffect } from "react";
import { changeFriends } from "../reducers/friendReducer";

const useListenFriends = () => {
  const friends = useSelector((state) => state.friends);
  const dispatch = useDispatch();
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("newFriend", (newFriend) => {
      dispatch(changeFriends([...friends, newFriend]));
    });

    return () => socket?.off("newMessage");
  }, [socket, dispatch, friends]);
};

export default useListenFriends;
