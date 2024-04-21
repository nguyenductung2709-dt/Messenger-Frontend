import Conversation from "./Conversation";
import { useAuthContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeConversations } from "../../../reducers/conversationsReducer";
import userService from "../../../services/users";
import conversationService from "../../../services/conversations";

const Conversations = () => {
  const { authUser } = useAuthContext();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConversations = async () => {
      const currentUserInfo = await userService.getUserById(authUser.id);
      const conversationIds = currentUserInfo.conversation.map(
        (singleConversation) => singleConversation.id,
      );
      const allConversations = await conversationService.getConversations();
      const filteredConversations = allConversations.filter((conversation) => {
        return conversationIds.includes(conversation.id);
      });
      dispatch(changeConversations(filteredConversations));
    };

    fetchConversations();
  }, [authUser, dispatch]);

  const filteredConversations = useSelector((state) => state.conversations);

  return (
    <div className="py-2 flex flex-col overflow-y-auto">
      {filteredConversations.map((conversation) => (
        <Conversation
          key={conversation.id}
          conversation={conversation}
          currentUser={authUser}
        />
      ))}
    </div>
  );
};

export default Conversations;
