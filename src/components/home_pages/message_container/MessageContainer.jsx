/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Messages from './Messages';
import MessageForm from './MessageForm';
import { changeSelectedConversation } from '../../../reducers/conversationReducer';
import { useAuthContext } from '../../../context/AuthContext';

function MessageContainer() {
  const dispatch = useDispatch();
  const selectedConversation = useSelector((state) => state.selectedConversation);
  const { authUser } = useAuthContext();

  let userUsed;

  const isInbox = selectedConversation && selectedConversation.participant_list.length === 2;

  if (isInbox) {
    userUsed = selectedConversation && selectedConversation.participant_list
      .find((participant) => participant.id !== authUser.id);
  }

  useEffect(
    () => () => {
      dispatch(changeSelectedConversation(null));
    },
    [dispatch],
  );

  return !selectedConversation ? (
    <NoChatSelected />
  ) : (
    <div className="basis-6/10 flex flex-col h-screen overflow-y-auto bg-rose-100 dark:bg-primary_message_dark">
      <div className="bg-gradient-to-r from-rose-300 to-pink-500 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-purple-800 px-4 py-2 mb-2">
        <span className="label-text text-white"> To: </span>
        {' '}
        {isInbox ? (
          <span className="text-black dark:text-white">
            {' '}
            <span>
              {userUsed.middleName}
              {' '}
            </span>
            <span>
              {userUsed.firstName}
              {' '}
            </span>
            <span>{userUsed.lastName}</span>
          </span>
        ) : (
          <span className="text-black dark:text-white">{selectedConversation.title}</span>
        )}
      </div>
      <Messages />
      <MessageForm />
    </div>
  );
}

export default MessageContainer;

function NoChatSelected() {
  const { authUser } = useAuthContext();
  return (
    <div className="basis-6/10 flex flex-col h-screen overflow-y-auto bg-rose-100 dark:bg-primary_message_dark items-center justify-center text-3xl">
      <p>
        Welcome 👋
        {authUser.fullName}
      </p>
      <p>Select a chat to start messaging</p>
    </div>
  );
}
