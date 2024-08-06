/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useAuthContext } from '../../../context/AuthContext';
import friendService from '../../../services/friends';
import conversationService from '../../../services/conversations';
import userService from '../../../services/users';
import { changeConversations } from '../../../reducers/conversationsReducer';
import { changeFriends } from '../../../reducers/friendReducer';

function FriendForm({ onClose, showNotification }) {
  const { authUser } = useAuthContext();
  const [gmail, setGmail] = useState('');

  const dispatch = useDispatch();

  const handleFriend = async (e) => {
    e.preventDefault();
    try {
      const confirmDelete = window.confirm('Are you sure you want add friend this person?');
      if (!confirmDelete) return;
      friendService.setToken(authUser.token);
      const newFriend = {
        gmail,
        userId: authUser.id,
      };
      await friendService.addFriend(newFriend);
      const friends = await friendService.getFriendsById(authUser.id);
      dispatch(changeFriends(friends));

      const currentUserInfo = await userService.getUserById(authUser.id);
      const conversationIds = currentUserInfo.conversation
        .map((singleConversation) => singleConversation.id);
      const allConversations = await conversationService.getConversations();
      const filteredConversations = allConversations
        .filter((conversation) => conversationIds.includes(conversation.id));

      dispatch(changeConversations(filteredConversations));

      showNotification(true, 'Friend added successfully');
    } catch (err) {
      showNotification(false, 'Failed to add friend');
    }
    onClose();
  };

  return (
    <div className="flex items-center justify-center w-full">
      <form className="px-4 py-2 mb-2" onSubmit={handleFriend}>
        <input
          type="text"
          name="gmail"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          className="w-full rounded-lg h-12 text-black dark:text-black bg-white dark:bg-third_login_dark"
          placeholder="Add friends by gmail"
          required
        />
        <button
          type="submit"
          className="w-full focus:ring-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center text-white
                      bg-gradient-to-r from-rose-300 to-pink-500 hover:from-green-400 hover:to-blue-500
                      dark:bg-gradient-to-r dark:from-green-400 dark:to-blue-500 dark:hover:from-pink-500 dark:hover:to-yellow-500"
        >
          Add friend
        </button>
      </form>
      <button onClick={onClose} className="mt-1 mr-1 w-4 bg-red-500 text-white rounded-full" aria-label="Delete file">
        <AiOutlineClose />
      </button>
    </div>
  );
}

export default FriendForm;
