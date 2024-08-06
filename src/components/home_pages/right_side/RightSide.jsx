import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { useAuthContext } from '../../../context/AuthContext';
import MemberList from './MemberList';
import AddMember from './AddMember';
import GroupChange from './GroupChange';
import bigThree from '../../../assets/default_group.jpeg';
import useListenConversations from '../../../hooks/useListenConversations';

function RightSide() {
  const { authUser } = useAuthContext();
  useListenConversations();
  const selectedConversation = useSelector((state) => state.selectedConversation);
  const isInbox = selectedConversation && selectedConversation.participant_list.length === 2;
  const isGroup = selectedConversation && selectedConversation.participant_list.length > 2;
  const groupTitle = selectedConversation && selectedConversation.title;
  const groupImage = (selectedConversation && selectedConversation.imageName) || bigThree;
  const [userUsed, setUserUsed] = useState(null);

  useEffect(() => {
    if (isInbox) {
      setUserUsed(selectedConversation && selectedConversation.participant_list
        .find((participant) => participant.id !== authUser.id));
    } else {
      setUserUsed(null);
    }
  }, [selectedConversation, authUser, isInbox]);

  return (
    <div className="basis-2/10 flex flex-col bg-rose-200 dark:bg-secondary_message_dark shadow-sm shadow-rose-500 dark:shadow-white">
      <NavBar />
      <div className="flex flex-col flex-g  items-center justify-center">
        {userUsed ? (
          <>
            <img
              className="w-28 h-28 rounded-full shadow-md shadow-white"
              alt="Tailwind CSS chat bubble component"
              src={userUsed.avatarName}
            />
            <p className="text-black dark:text-white mt-2">
              {userUsed.middleName}
              {' '}
              {userUsed.firstName}
              {' '}
              {userUsed.lastName}
              {' '}
            </p>
          </>
        ) : (
          null
        )}

        {groupTitle && (
          <>
            <img
              className="w-28 h-28 rounded-full shadow-md shadow-white"
              src={groupImage}
              alt={`${groupTitle}`}
            />
            <p className="text-black dark:text-white mt-2">{groupTitle}</p>
          </>
        )}
      </div>
      {isGroup && (
        <>
          <MemberList selectedConversation={selectedConversation} authUser={authUser} />
          <AddMember authUser={authUser} selectedConversation={selectedConversation} />
          <GroupChange selectedConversation={selectedConversation} authUser={authUser} />
        </>
      )}
    </div>
  );
}

export default RightSide;
