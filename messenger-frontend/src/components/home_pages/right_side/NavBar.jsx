import { BsSun } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { GrGroup } from "react-icons/gr";

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
        <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
        
        {/* moon icon */}
        <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        
      </label>

      <div className="relative inline-block text-center basis-1/3">
        <input
          type="checkbox"
          onChange={toggleDropdown}
          className="hidden"
          id="dropdownCheckbox"
        />
        <label
          htmlFor="dropdownCheckbox"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <GrGroup size={35} />
        </label>

        {dropdownVisible && (
          <div className="z-20 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700">
            <p className="text-white text-xl border-none"> Select friends </p>
            <p className="text-white text-sm border-none">
              {" "}
              You need to add at least 2 friends{" "}
            </p>
            <div className="border-none">
              <input
                type="text"
                name="password"
                id="password"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-third_login_dark border-gray-600 
                                    placeholder-gray-400 text-white focus:ring-white focus:border-white"
                placeholder="Title for the group"
                required
              />
            </div>
            <ul className="w-full py-2 text-sm border-gray-600 text-gray-700 dark:text-gray-200 border-none">
              {friends.map((friend) => (
                <li
                  key={friend.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full mr-2"
                    alt="Avatar"
                    src={friend.user.avatarName}
                  />
                  <span className="mr-2">
                    {friend.user.firstName} {friend.user.middleName}{" "}
                    {friend.user.lastName}
                  </span>
                  <input
                    type="checkbox"
                    id={`friend-${friend.user.id}`}
                    className="mr-2"
                    checked={selectedUsers.includes(friend.user.id)}
                    onChange={() => handleSelectUser(friend.user.id)}
                  />
                </li>
              ))}
            </ul>
            <button
              className="border-none w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-blue-700 text-white"
              onClick={handleFormGroup}
            >
              {" "}
              Form Group{" "}
            </button>
            <button
              className="border-none w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 hover:bg-red-700 text-white mt-2"
              onClick={handleLogout}
            >
              {" "}
              Logout{" "}
            </button>
          </div>
        )}
      </div>

      <div className="basis-1/3 flex flex-col items-center justify-center rounded-full">
        <div className="relative inline-block text-center">
          <input
            type="checkbox"
            onChange={toggleAvatarDropdown}
            className="hidden"
            id="avatarDropdownCheckbox"
          />
          <label
            htmlFor="avatarDropdownCheckbox"
            className="cursor-pointer"
          >
            <img
              className="w-10 h-10 rounded-full"
              alt="Avatar"
              src={user.avatarName}
            />
          </label>

          {avatarDropdownVisible && (
            <div className="z-20 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700">
              <div className="px-4 py-2">
                <p className="text-white text-sm font-medium">
                  {user.firstName} {user.middleName} {user.lastName}
                </p>
                <button> User Information </button>
              </div>
              <button
                className="border-none w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 hover:bg-red-700 text-white"
                onClick={handleLogout}
              >
                {" "}
                Logout{" "}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
