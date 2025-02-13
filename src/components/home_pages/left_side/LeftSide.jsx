/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { MdOutlineOpenInNew } from 'react-icons/md';
import toast from 'react-hot-toast';
import SearchBar from './SearchBar';
import Conversations from './Conversations';
import FriendForm from './FriendForm';

function LeftSide() {
  const [friendForm, setFriendForm] = useState(false);

  const openFriendForm = () => {
    setFriendForm(true);
  };

  const closeFriendForm = () => {
    setFriendForm(false);
  };

  const showNotification = (success, message) => {
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="basis-2/10 flex flex-col h-screen overflow-y-auto relative bg-rose-200 dark:bg-secondary_message_dark shadow-sm shadow-rose-500 dark:shadow-white">
      {friendForm ? (
        <FriendForm onClose={closeFriendForm} showNotification={showNotification} />
      ) : (
        <div className="px-4 py-2 mb-2">
          <h1 className="bg-gradient-to-r from-pink-500 to-rose-100 dark:from-indigo-600 dark:to-rose-700 bg-clip-text text-transparent text-2xl mt-2 font-semibold">
            {' '}
            Conversations
            {' '}
          </h1>
          <button onClick={openFriendForm}>
            <MdOutlineOpenInNew
              className="text-black dark:text-white text-2xl absolute right-4 top-4 cursor-pointer"
              size="1.3em"
            />
          </button>
          <SearchBar />
        </div>
      )}
      <Conversations />
    </div>
  );
}

export default LeftSide;
