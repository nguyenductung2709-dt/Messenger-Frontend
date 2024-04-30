import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { useAuthContext } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import MemberList from "./MemberList";
import AddMember from './AddMember';
import bigThree from "../../../assets/default_group.jpeg";

const RightSide = () => {
  const { authUser } = useAuthContext();
  const selectedConversation = useSelector(
    (state) => state.selectedConversation,
  );
  const isInbox = selectedConversation?.participant_list.length === 2;
  const isGroup = selectedConversation?.participant_list.length > 2;
  const groupTitle = selectedConversation?.title;
  const groupImage = selectedConversation?.imageName || bigThree;
  const [userUsed, setUserUsed] = useState(null);

  useEffect(() => {
    if (isInbox) {
      const userUsed = selectedConversation?.participant_list.find(
        (participant) => participant.id !== authUser.id,
      );
      setUserUsed(userUsed);
    } else {
      setUserUsed(null);
    }
  }, [selectedConversation, authUser, isInbox]);

  return (
    <div className="basis-2/10 flex flex-col bg-rose-200 dark:bg-secondary_message_dark shadow-sm shadow-rose-500 dark:shadow-white">
      <NavBar selectedConversation = {selectedConversation}/>
      <div className="flex flex-col flex-g  items-center justify-center">
        {userUsed ? (
          <>
            <img
              className="w-28 h-28 rounded-full shadow-md shadow-white"
              alt="Tailwind CSS chat bubble component"
              src={userUsed.avatarName}
            />
            <p className="text-black dark:text-white mt-2">
              {userUsed.middleName} {userUsed.firstName} {userUsed.lastName}{" "}
            </p>
          </>
        ) : (
          <></>
        )}

        {groupTitle && (
          <>
            <img
              className="w-28 h-28 rounded-full shadow-md shadow-white"
              src={groupImage}
              alt={`${groupTitle} image`}
            />
            <p className="text-black dark:text-white mt-2">{groupTitle}</p>
          </>
        )}
      </div>
      {isGroup && 
      <>
      <MemberList selectedConversation={selectedConversation} />
      <AddMember authUser={authUser} selectedConversation={selectedConversation}/>
      </>
      }
    </div>
  );
};

export default RightSide;
