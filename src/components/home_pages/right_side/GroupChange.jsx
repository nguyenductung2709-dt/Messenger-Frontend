/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import conversationService from '../../../services/conversations';
import { changeSelectedConversation } from '../../../reducers/conversationReducer';
import { updateConversations } from '../../../reducers/conversationsReducer';

function GroupChange({ authUser, selectedConversation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGroupImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGroupImage(file);
    }
  };

  const handleChangeGroup = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-alert
      const confirmDelete = window.confirm('Are you sure you want update this group?');
      if (!confirmDelete) return;
      const formData = new FormData();
      formData.append('title', title);
      if (groupImage) {
        formData.append('groupImage', groupImage);
      }
      conversationService.setToken(authUser.token);
      const details = await conversationService
        .changeConversationInformation(selectedConversation.id, formData);
      if (details.error) {
        throw new Error(details.error);
      } else {
        toast.success('Group updated successfully');
      }
      const newGroup = await conversationService.getConversationById(selectedConversation.id);
      dispatch(changeSelectedConversation(newGroup));
      dispatch(updateConversations(newGroup));
    } catch (err) {
      toast.error('Failed to update the group');
    }
    setTitle('');
    setGroupImage(null);
    setIsOpen(false);
  };

  return (
    <div className="mt-0.5 w-full relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full text-white bg-gradient-to-r from-rose-500 to-pink-300 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center"
        type="button"
      >
        Change information of group
      </button>

      <div
        className={`absolute w-full z-10 ${isOpen ? 'block' : 'hidden'} bg-rose-200 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
      >
        <form className="px-4 py-2 mb-2" onSubmit={handleChangeGroup}>
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-black dark:text-white">
              New title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
              placeholder="Siu"
            />
          </div>

          <div>
            <label htmlFor="avatarImage" className="block mb-2 text-sm font-medium text-black dark:text-white">
              New group image
            </label>
            <input
              type="file"
              name="avatarImage"
              id="avatarImage"
              onChange={handleGroupImage}
              className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600 placeholder-black text-black dark:text-white focus:ring-white focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full focus:ring-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center text-white bg-gradient-to-r from-rose-300 to-pink-500 hover:from-green-400 hover:to-blue-500 dark:bg-gradient-to-r dark:from-green-400 dark:to-blue-500 dark:hover:from-pink-500 dark:hover:to-yellow-500"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

export default GroupChange;
