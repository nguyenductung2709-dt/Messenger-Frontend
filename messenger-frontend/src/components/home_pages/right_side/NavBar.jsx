import { BsSun } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { GrGroup } from "react-icons/gr";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../../../context/AuthContext";
import { changeFriends } from "../../../reducers/friendReducer";
import { changeConversations } from "../../../reducers/conversationsReducer";

import authenticationService from "../../../services/authentication";
import userService from "../../../services/users";
import conversationService from "../../../services/conversations";
import friendService from "../../../services/friends";

import { toast, Toaster } from "react-hot-toast";

const NavBar = () => {
  const [user, setUser] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends);

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

      <BsSun size={35} className="basis-1/4" />

      <div className="basis-1/4 flex flex-col items-center justify-center rounded-full">
        <img
          className="w-10 h-10 rounded-full"
          alt="Avatar"
          src={user.avatarName}
        />
      </div>

      <div className="relative inline-block text-center basis-1/4">
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
          </div>
        )}
      </div>

      <button
        className="basis-1/4 flex flex-col items-center"
        onClick={handleLogout}
      >
        <BiLogOut size={35} />
      </button>
    </div>
  );
};

export default NavBar;
