/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaMoon, FaSun } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../../context/AuthContext';
import { changeFriends } from '../../../reducers/friendReducer';
import { changeConversations } from '../../../reducers/conversationsReducer';
import useDarkMode from '../../../hooks/useDarkMode';

import useListenFriends from '../../../hooks/useListenFriends';
import authenticationService from '../../../services/authentication';
import userService from '../../../services/users';
import conversationService from '../../../services/conversations';
import friendService from '../../../services/friends';

import AvatarDropdown from './AvatarDropdown';
import GroupFormation from './GroupFormation';

function NavBar() {
  const [user, setUser] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [avatarDropdownVisible, setAvatarDropdownVisible] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [darkTheme, setDarkTheme] = useDarkMode();

  const handleMode = () => setDarkTheme(!darkTheme);

  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends);
  useListenFriends();

  useEffect(() => {
    const fetchUser = async () => {
      setUser(await userService.getUserById(authUser.id));
    };
    fetchUser();
  }, [authUser, setAuthUser]);

  useEffect(() => {
    const fetchFriends = async () => {
      dispatch(changeFriends(await friendService.getFriendsById(authUser.id)));
    };
    fetchFriends();
  }, [authUser, dispatch]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleAvatarDropdown = () => {
    setAvatarDropdownVisible(!avatarDropdownVisible);
  };

  const handleLogout = async () => {
    try {
      authenticationService.setToken(authUser.token);
      await authenticationService.logout();
      localStorage.removeItem('loggedInChatUser');
      setAuthUser(null);
    } catch (err) {
      toast.error('Failed to logout');
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      }
      return [...prevSelectedUsers, userId];
    });
  };

  const handleFormGroup = async () => {
    const confirmDelete = window.confirm('Are you sure you want to create this group?');
    if (!confirmDelete) return;

    if (selectedUsers.length < 2) {
      toast.error('You need to select at least 2 friends to form a group');
      return;
    }
    if (!title) {
      toast.error('Please select a title for the group');
    } else {
      conversationService.setToken(authUser.token);
      const groupDetails = {
        title,
        participants: selectedUsers,
      };
      await conversationService.createConversation(groupDetails);
      const currentUserInfo = await userService.getUserById(authUser.id);
      const conversationIds = currentUserInfo.conversation
        .map((singleConversation) => singleConversation.id);
      const allConversations = await conversationService.getConversations();
      const filteredConversations = allConversations
        .filter((conversation) => conversationIds.includes(conversation.id));
      dispatch(changeConversations(filteredConversations));
      toast.success('Group form successful');
      setTitle('');
      setSelectedUsers([]);
      setDropdownVisible(false);
    }
  };

  return (
    <div className="flex h-15 items-center justify-center top-0 mb-10">
      <label className="swap swap-rotate basis-1/3">
        <span
          onClick={handleMode}
          className={`transition-transform transform ${darkTheme ? 'rotate-0' : 'rotate-180'}`}
        >
          {darkTheme ? (
            <FaMoon size="2.1em" className="top-navigation-icon" />
          ) : (
            <FaSun size="2.1em" className="top-navigation-icon" />
          )}
        </span>
      </label>

      <GroupFormation
        toggleDropdown={toggleDropdown}
        dropdownVisible={dropdownVisible}
        title={title}
        setTitle={setTitle}
        friends={friends}
        handleSelectUser={handleSelectUser}
        selectedUsers={selectedUsers}
        handleFormGroup={handleFormGroup}
      />

      <AvatarDropdown
        toggleAvatarDropdown={toggleAvatarDropdown}
        user={user}
        handleLogout={handleLogout}
        avatarDropdownVisible={avatarDropdownVisible}
      />
    </div>
  );
}

export default NavBar;
