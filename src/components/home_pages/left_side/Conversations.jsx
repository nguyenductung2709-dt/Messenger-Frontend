import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Conversation from './Conversation';
import { useAuthContext } from '../../../context/AuthContext';
import { changeConversations } from '../../../reducers/conversationsReducer';
import useListenConversations from '../../../hooks/useListenConversations';
import userService from '../../../services/users';
import conversationService from '../../../services/conversations';

function Conversations() {
  const { authUser } = useAuthContext();

  const dispatch = useDispatch();
  useListenConversations();

  useEffect(() => {
    const fetchConversations = async () => {
      const currentUserInfo = await userService.getUserById(authUser.id);
      const conversationIds = currentUserInfo.conversation
        .map((singleConversation) => singleConversation.id);

      const allConversations = await conversationService.getConversations();

      const filteredConversations = allConversations
        .filter((conversation) => conversationIds.includes(conversation.id))
        .sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB.getTime() - dateA.getTime(); // Compare in milliseconds
        });
              
      dispatch(changeConversations(filteredConversations));
    };

    fetchConversations();
  }, [authUser, dispatch]);

  const filteredConversations = useSelector((state) => state.conversations);

  return (
    <div className="py-2 flex flex-col overflow-y-auto">
      {filteredConversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} currentUser={authUser} />
      ))}
    </div>
  );
}

export default Conversations;
