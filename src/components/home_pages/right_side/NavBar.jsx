import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../../../context/AuthContext";
import { changeFriends } from "../../../reducers/friendReducer";
import { changeConversations } from "../../../reducers/conversationsReducer";

import useListenFriends from "../../../hooks/useListenFriends";
import authenticationService from "../../../services/authentication";
import userService from "../../../services/users";
import conversationService from "../../../services/conversations";
import friendService from "../../../services/friends";

import AvatarDropdown from "./AvatarDropdown";
import GroupFormation from "./GroupFormation";

import { toast, Toaster } from "react-hot-toast";

const NavBar = () => {
  const [user, setUser] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [avatarDropdownVisible, setAvatarDropdownVisible] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends);
  useListenFriends();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userService.getUserById(authUser.id);
      setUser(user);
    };
    fetchUser();
  }, [authUser, setAuthUser]);

  useEffect(() => {
    const fetchFriends = async () => {
      const friends = await friendService.getFriendsById(authUser.id);
      dispatch(changeFriends(friends));
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
      localStorage.removeItem("loggedInChatUser");
      setAuthUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleFormGroup = async () => {
    if (selectedUsers.length < 2) {
      toast.error("You need to select at least 2 friends to form a group");
      return;
    } else {
      conversationService.setToken(authUser.token);
      const groupDetails = {
        title: title,
        participants: selectedUsers,
      };
      await conversationService.createConversation(groupDetails);

      const currentUserInfo = await userService.getUserById(authUser.id);
      const conversationIds = currentUserInfo.conversation.map(
        (singleConversation) => singleConversation.id,
      );
      const allConversations = await conversationService.getConversations();
      const filteredConversations = allConversations.filter((conversation) => {
        return conversationIds.includes(conversation.id);
      });
      dispatch(changeConversations(filteredConversations));

      toast.success("Group form successful");
      setTitle("");
      setSelectedUsers([]);
      setDropdownVisible(false);
    }
  };

  return (
    <div className="flex h-15 items-center justify-center top-0 mb-10">
      <Toaster position="top-center" reverseOrder={false} />

      <label className="swap swap-rotate basis-1/3">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" />

        {/* sun icon */}
        <svg
          className="swap-on fill-current w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        {/* moon icon */}
        <svg
          className="swap-off fill-current w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
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
};

export default NavBar;
