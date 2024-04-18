import Conversation from './Conversation';
import { useAuthContext } from "../../../context/AuthContext";
import { useEffect, useState } from 'react';
import userService from '../../../services/users'
import conversationService from '../../../services/conversations'
   
const Conversations = () => {
    const { authUser } = useAuthContext();
    const [filteredConversations, setFilteredConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            const currentUserInfo = await userService.getUserById(authUser.id);
            const conversationIds = currentUserInfo.conversation.map(singleConversation => singleConversation.id);
            const allConversations = await conversationService.getConversations();
            const filteredConversations = allConversations.filter(conversation => {
                return conversationIds.includes(conversation.id);
            });
            setFilteredConversations(filteredConversations);
        };
        
        fetchConversations();
    }, [authUser]);
    
    return (
        <div className = "py-2 flex flex-col overflow-y-auto">
            {filteredConversations.map(conversation => (
                <Conversation
                    key = {conversation.id}
                    conversation = {conversation}
                    currentUser = { authUser }
                />
            ))}
        </div>
    )
}

export default Conversations;