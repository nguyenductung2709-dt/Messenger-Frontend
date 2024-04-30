import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../../../context/AuthContext";
import { changeFriends } from "../../../reducers/friendReducer";
import { changeConversations } from "../../../reducers/conversationsReducer";
import { changeParticipants } from "../../../reducers/participantsReducer";
import useDarkMode from "../../../hooks/useDarkMode";
import { FaMoon, FaSun } from "react-icons/fa";

import useListenFriends from "../../../hooks/useListenFriends";
import authenticationService from "../../../services/authentication";
import userService from "../../../services/users";
import conversationService from "../../../services/conversations";
import friendService from "../../../services/friends";

import AvatarDropdown from "./AvatarDropdown";
import GroupFormation from "./GroupFormation";

import { toast } from "react-hot-toast";

const NavBar = ({ selectedConversation }) => {
  const [user, setUser] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [avatarDropdownVisible, setAvatarDropdownVisible] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [darkTheme, setDarkTheme] = useDarkMode();

  const handleMode = () => setDarkTheme(!darkTheme);

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
      dispatch(changeParticipants(selectedConversation.participant_list));
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
      <label className="swap swap-rotate basis-1/3">
        <span
          onClick={handleMode}
          className={`transition-transform transform ${darkTheme ? "rotate-0" : "rotate-180"}`}
        >
          {darkTheme ? (
            <FaMoon size={"2.1em"} className="top-navigation-icon" />
          ) : (
            <FaSun size={"2.1em"} className="top-navigation-icon" />
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
};

export default NavBar;
