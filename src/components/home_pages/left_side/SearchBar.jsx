import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { changeSelectedConversation } from "../../../reducers/conversationReducer";
import { useAuthContext } from "../../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const SearchBar = () => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversations);
  const { authUser } = useAuthContext();
  const [conversationName, setConversationName] = useState("");

  const handleSearchBar = (e) => {
    e.preventDefault();
    const chosenId = conversationMap[conversationName];
    if (chosenId) {
      const conversation = conversations.find(
        (conversation) => conversation.id === chosenId,
      );
      if (conversation) {
        dispatch(changeSelectedConversation(conversation));
        setConversationName("");
      }
    } else {
      toast.error("Conversation not found");
      setConversationName("");
    }
  };

  const conversationMap = conversations.reduce((map, conversation) => {
    const value = conversation.id;

    let key;
    if (conversation.participant_list.length > 2) {
      key = conversation.title;
    } else {
      const userUsed = conversation.participant_list.find(
        (participant) => participant.id !== authUser.id,
      );
      key = `${userUsed.middleName} ${userUsed.firstName} ${userUsed.lastName}`;
    }

    map[key] = value;
    return map;
  }, {});

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form className="relative w-full" onSubmit={handleSearchBar}>
        <div className="flex items-center w-full border-none rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            className="text-black dark:text-white bg-white dark:bg-black input input-bordered rounded-full w-full h-10 focus:outline-none focus:ring focus:border-blue-500"
            value={conversationName}
            onChange={(e) => setConversationName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-green-400 hover:to-blue-500 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-sm py-1 px-2 rounded-full focus:outline-none focus:ring focus:border-blue-500
                        dark:bg-gradient-to-r dark:from-green-400 dark:to-blue-500 dark:hover:from-pink-500 dark:hover:to-yellow-500"
          >
            Enter
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
