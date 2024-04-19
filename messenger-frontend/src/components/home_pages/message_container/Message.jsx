import { useAuthContext } from "../../../context/AuthContext";
import { extractTime } from "../../../utils/extractTime";
import { useSelector } from 'react-redux';
import participantService from '../../../services/participants';
import { useEffect, useState } from 'react';
import { AiFillFilePdf } from "react-icons/ai";


const Message = ({ message }) => {

    const { authUser } = useAuthContext();
    const selectedConversation = useSelector(state => state.selectedConversation);

    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const getParticipant = async () => {
            const participants = await participantService.getParticipantById(selectedConversation.id);
            setParticipants(participants);
        };
        if (selectedConversation) {
            getParticipant();
        }
    }, [selectedConversation]);

    const fromMe = message.senderId === authUser.id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const participant = participants.find(participant => participant.user.id === message.senderId)
    const profilePic = participant?.user.avatarName || '';
    const firstName = participant?.user.firstName;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const fileName = message.fileName;
    const imageName = message.imageName;

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Tailwind CSS chat bubble component' src={profilePic} />
                </div>
            </div>
            <div className="chat-header">
                {firstName} 
                <time className="text-xs opacity-50"> {formattedTime}</time>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
            {fileName ? 
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center mb-4'>
                <div className="flex flex-col gap-10 h-40 w-40 rounded-lg bg-gray-900 items-center">
                    <AiFillFilePdf size={100} />
                    <a href = {fileName}><p className="text-white text-xs">{messageImage.name.length > 20 ? `${messageImage.name.substring(0, 20)}...` : messageImage.name}</p></a>
                </div> 
            </div> : <></>}

            {imageName ? (
                <div className='chat-footer text-xs flex gap-1 items-center mb-4'>
                    <img className="w-52 max-h-40"  src={imageName} alt="messageImage" />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Message;
