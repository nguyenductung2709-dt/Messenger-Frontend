import { useState } from 'react';
import { useAuthContext } from "../../../context/AuthContext";
import friendService from '../../../services/friends';
import { AiOutlineClose } from "react-icons/ai";
import conversationService from '../../../services/conversations'
import userService from '../../../services/users'
import { useDispatch } from 'react-redux';
import { changeConversations } from '../../../reducers/conversationsReducer';
import { changeFriends } from '../../../reducers/friendReducer';

const FriendForm = ({ onClose, showNotification }) => { 

    const { authUser } = useAuthContext();
    const [gmail, setGmail] = useState('');

    const dispatch = useDispatch();

    const handleFriend = async(e) => {
        e.preventDefault();
        try {
            friendService.setToken(authUser.token);
            const newFriend = {
                gmail: gmail,
                userId: authUser.id
            }
            await friendService.addFriend(newFriend);
            const friends = await friendService.getFriendsById(authUser.id);
            dispatch(changeFriends(friends));
            
            const currentUserInfo = await userService.getUserById(authUser.id);
            const conversationIds = currentUserInfo.conversation.map(singleConversation => singleConversation.id);
            const allConversations = await conversationService.getConversations();
            const filteredConversations = allConversations.filter(conversation => {
                return conversationIds.includes(conversation.id);
            });

            dispatch(changeConversations(filteredConversations))

            showNotification(true, "Friend added successfully"); 
        } catch(err) {
            showNotification(false, "Failed to add friend"); 
        }
        onClose();
    }

    return (
        <div className = "flex items-center justify-center">
        <form className="px-4 py-2 mb-2" onSubmit = {handleFriend}>
            <input type="text"  
                   name = "gmail"
                   value={gmail}
                   onChange={(e) => setGmail(e.target.value)} 
                   className = "w-full rounded-lg" 
                   placeholder="You can add friends with their gmail" 
                   required 
            />
            <button type="submit" className="w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                            bg-blue-500 hover:bg-blue-700 text-white">Add friend</button>
        </form>
        <button
                onClick={onClose} 
                className="mt-1 mr-1 w-4 bg-red-500 text-white rounded-full"
                aria-label="Delete file"
            >
                <AiOutlineClose />
            </button>
        </div>
    )
}

export default FriendForm;
