import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import Picker from 'emoji-picker-react';

const MessageForm = () => {
    const [message, setMessage] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event) => {
        let sym = event.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setMessage(prev => prev + emoji);
        setShowPicker(false);
    };
    
    const toggleEmojiPicker = () => setShowPicker(prev => !prev);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(message); 
        setMessage('');
        setShowPicker(false); 
    };

    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    className="border text-sm rounded-lg block w-full p-2.5 text-white"
                    placeholder="Send a message"
                />
                <div className="absolute inset-y-0 end-20 flex items-center pl-3">
                    <label htmlFor="fileName" className="beautiful-button-label">
                        📎
                    </label>
                    <input
                        type="file"
                        name="fileName"
                        id="fileName"
                        onChange={(e) => {}}
                        required
                        style={{ display: 'none' }} // Hide the default input
                    />
                </div>
                <div className="absolute inset-y-0 end-28 flex items-center pl-3">
                    <label htmlFor="imageName" className="beautiful-button-label">
                        📷
                    </label>
                    <input
                        type="file"
                        name="imageName"
                        id="imageName"
                        onChange={(e) => {}}
                        required
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
    );
};

export default MessageForm;
