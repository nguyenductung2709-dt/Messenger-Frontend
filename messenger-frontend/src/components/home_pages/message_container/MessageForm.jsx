import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import Picker from 'emoji-picker-react';
import { useAuthContext } from '../../../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import messageService from '../../../services/messages';
import { AiFillFilePdf } from "react-icons/ai";
import { changeMessages } from '../../../reducers/messageReducer';
import { AiOutlineClose } from "react-icons/ai";

const MessageForm = () => {
    const [message, setMessage] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [messageImage, setMessageImage] = useState(null);
    const dispatch = useDispatch();
    const selectedConversation = useSelector((state) => state.selectedConversation);
    const messages = useSelector((state) => state.messages);
    const { authUser } = useAuthContext();

    const onEmojiClick = (event) => {
        let sym = event.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setMessage(prev => prev + emoji);
        setShowPicker(false);
    };
    
    const toggleEmojiPicker = () => setShowPicker(prev => !prev);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMessageImage(file);
    }

    const deleteFileChange = () => {
        setMessageImage(null);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('conversationId', selectedConversation.id);
            formData.append('message', message);
            if (messageImage) {
                formData.append('messageImage', messageImage);
            }
            messageService.setToken(authUser.token);
            const data = await messageService.sendMessage(formData);
            dispatch(changeMessages([...messages, data]));
            setMessage('');
            setMessageImage(null);
        } catch(err) {
            throw new Error(err.message);
        }
    };

    return (
        <>
            {messageImage && <DisplayForFile messageImage={messageImage} onDeleteFile={deleteFileChange} />}
            <form className='mb-3 w-full' onSubmit={handleSubmit}>
                <div className="w-full relative">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="text-sm block w-full p-2.5 text-white"
                        placeholder="Send a message"
                    />
                    <div className="absolute inset-y-0 end-20 flex items-center pl-3">
                        <label htmlFor="messageImage" className="beautiful-button-label">
                            📎
                        </label>
                        <input
                            type="file"
                            name="messageImage"
                            id="messageImage"
                            onChange={handleFileChange}
                            style={{ display: 'none' }} // Hide the default input
                        />
                    </div>
                    <button 
                        type="button" 
                        className="absolute inset-y-0 end-12 flex items-center pl-3" 
                        onClick={toggleEmojiPicker}
                        aria-label="Toggle emoji picker"
                    >
                        🙂
                    </button>
                    <button 
                        type="submit" 
                        className="absolute inset-y-0 end-0 flex items-center pe-3"
                        aria-label="Send message"
                    >
                        <AiOutlineSend size={25} />
                    </button>
                    {showPicker && (
                        <div className="absolute bottom-full mb-2">
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </div>
            </form>
        </>
    );
};

const DisplayForFile = ({ messageImage, onDeleteFile }) => {
    const handleDelete = () => {
        onDeleteFile();
    };

    return (
        <div className="h-1/5 flex flex-col justify-center bg-chat_background border-b-1.2 border-gray-500 relative">
            {messageImage.type.includes("image") ? (
                <img className="w-52 max-h-40" src={URL.createObjectURL(messageImage)} alt="messageImage" />
            ) : (
                <div className="flex flex-col gap-10 h-40 w-40 rounded-lg bg-gray-900 items-center">
                    <AiFillFilePdf size={100} />
                    <p className="text-white text-xs">{messageImage.name.length > 20 ? `${messageImage.name.substring(0, 20)}...` : messageImage.name}</p>
                </div>
            )}
            <div className = "flex justify-center w-40">
            <button
                onClick={handleDelete} 
                className="mt-1 mr-1 w-4 bg-red-500 text-white rounded-full"
                aria-label="Delete file"
            >
                <AiOutlineClose />
            </button>
            </div>
        </div>
    );
};


export default MessageForm;
