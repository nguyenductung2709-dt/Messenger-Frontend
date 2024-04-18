import { useState } from 'react';

const FriendForm = ({ onClose, setSuccess, setMessage }) => {
    const handleFriend = () => {
        onClose();
    }
    return (
        <>
        <form className="px-4 py-2 mb-2" onSubmit = {handleFriend}>
            <input type="text"  className = "w-full rounded-lg" placeholder="You can add friends with their gmail" />
            <button type="submit" className="w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                            bg-blue-500 hover:bg-blue-700 text-white">Add friend</button>
        </form>
        </>
    )
}

export default FriendForm