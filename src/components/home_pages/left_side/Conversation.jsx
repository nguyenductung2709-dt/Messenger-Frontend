import { useDispatch, useSelector } from "react-redux";
import { changeSelectedConversation } from "../../../reducers/conversationReducer";
import { useSocketContext } from "../../../context/SocketContext";
import bigThree from "../../../assets/default_group.jpeg";

const Conversation = ({ conversation, currentUser }) => {
  let userUsed;

  if (conversation.participant_list.length === 2) {
    userUsed = conversation.participant_list.find(
      (participant) => participant.id !== currentUser.id,
    );
  }

  const selectedConversation = useSelector(
    (state) => state.selectedConversation,
  );
  const isSelected = selectedConversation?.id === conversation.id;
  const { onlineUsers } = useSocketContext();
  const dispatch = useDispatch();
  const conversationImage = conversation.imageName || bigThree;
  const isOnline = userUsed && onlineUsers.includes(String(userUsed.id));
  return (
    <>
      {conversation.participant_list.length === 2 ? (
        <div
          className={`flex gap-2 items-center hover:bg-rose-400 dark:hover:bg-gray-600 rounded p-2 py-1 cursor-pointer
                  ${isSelected ? "bg-gradient-to-r from-rose-300 to-pink-500 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-purple-800" : ""}
          `}
          onClick={() => dispatch(changeSelectedConversation(conversation))}
        >
          <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className="w-12 rounded-full">
              <img src={userUsed.avatarName} alt="user avatar" />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
              <p className="text-black dark:text-white">
                <span>{userUsed.middleName} </span>
                <span>{userUsed.firstName} </span>
                <span>{userUsed.lastName}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`flex gap-2 items-center hover:bg-rose-400 dark:hover:bg-gray-600 rounded p-2 py-1 cursor-pointer
                  ${isSelected ? "bg-gradient-to-r from-rose-300 to-pink-500 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-purple-800" : ""}
          `}
          onClick={() => dispatch(changeSelectedConversation(conversation))}
        >
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src={conversationImage} alt="user avatar" />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
              <p className="text-black dark:text-white">
                {" "}
                {conversation.title}{" "}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
