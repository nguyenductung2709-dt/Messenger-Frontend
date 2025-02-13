/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { AiFillFilePdf } from 'react-icons/ai';
import { useAuthContext } from '../../../context/AuthContext';
import extractTime from '../../../utils/extractTime';
import participantService from '../../../services/participants';

function Message({ message }) {
  const { authUser } = useAuthContext();
  const selectedConversation = useSelector((state) => state.selectedConversation);

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const getParticipant = async () => {
      setParticipants(await participantService.getParticipantById(selectedConversation.id));
    };
    if (selectedConversation) {
      getParticipant();
    }
  }, [selectedConversation]);

  const fromMe = message.senderId === authUser.id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const participant = participants
    .find((singleParticipant) => singleParticipant.user.id === message.senderId);
  const profilePic = (participant && participant.user.avatarName) || '';
  const firstName = participant && participant.user.firstName;
  const bubbleBgColor = fromMe ? 'bg-rose-300 dark:bg-blue-500' : 'bg-rose-400 dark:bg-indigo-700';
  const { fileUrl } = message;
  const { imageUrl } = message;

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className="chat-header text-black dark:text-white">
        {firstName}
        <time className="text-xs opacity-50">
          {' '}
          {formattedTime}
        </time>
      </div>

      {message.message !== '' && (
        <div className={`chat-bubble text-black dark:text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
      )}

      {fileUrl ? (
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center mb-4">
          <div className="flex flex-col gap-10 h-40 w-40 rounded-lg bg-gray-900 items-center">
            <AiFillFilePdf size={100} />
            <a className="text-cyan-300 underline hover:text-cyan-900" href={fileUrl}>
              <p className="text-sm">
                {message.fileName.length > 20 ? `${message.fileName.substring(0, 20)}...` : message.fileName}
              </p>
            </a>
          </div>
        </div>
      ) : null}

      {imageUrl ? (
        <div className="chat-footer text-xs flex gap-1 items-center mb-4">
          <img className="w-52 h-auto" src={imageUrl} alt="messageImage" />
        </div>
      ) : null}
    </div>
  );
}

export default Message;
