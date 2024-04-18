import SearchBar from './SearchBar';
import Conversations from './Conversations';
import { useState } from 'react';
import { MdOutlineOpenInNew } from "react-icons/md";
import FriendForm from './FriendForm';
import toast, { Toaster } from 'react-hot-toast';

const LeftSide = () => {
    const [friendForm, setFriendForm] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const openFriendForm = () => {
        setFriendForm(true);
    }

    const closeFriendForm = () => {
        setFriendForm(false);
        console.log('siu')
        toast.success("Friend added successfully");
    }

    return (
        <div className="basis-2/10 flex flex-col h-screen overflow-y-auto relative bg-secondary_message_dark">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {friendForm ? 
                <FriendForm onClose={closeFriendForm} setSuccess = {setSuccess} setMessage = {setMessage}/> :
                <div className="px-4 py-2 mb-2">
                    <h1 className="text-white text-2xl mb-4 mt-2"> Conversations </h1>
                    <button onClick={openFriendForm}><MdOutlineOpenInNew className="text-white text-2xl absolute right-4 top-4 cursor-pointer" size={34} /></button>
                    <SearchBar />
                </div>
            }
            <Conversations />
        </div>
    );
};

export default LeftSide;
