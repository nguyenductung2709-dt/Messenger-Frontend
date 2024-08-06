/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import participantService from '../../../services/participants';
import conversationService from '../../../services/conversations';
import { changeParticipants } from '../../../reducers/participantsReducer';

function AddMember({ authUser, selectedConversation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [gmail, setGmail] = useState('');
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

  const handleAddToGroup = async (e) => {
    e.preventDefault();
    try {
      const confirmDelete = window.confirm('Are you sure you want add this person?');
      if (!confirmDelete) return;
      participantService.setToken(authUser.token);
      const newParticipant = {
        conversationId: selectedConversation.id,
        gmail,
      };
      participantService.setToken(authUser.token);
      await participantService.addParticipant(newParticipant);
      const newConversation = await conversationService
        .getConversationById(selectedConversation.id);
      dispatch(changeParticipants(newConversation.participant_list));
      toast.success('Friend added successfully');
    } catch (err) {
      toast.error('Failed to add friend to group');
    }
    setGmail('');
    setIsOpen(false);
  };

  return (
    <div className="mt-0.5 w-full relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full text-white bg-gradient-to-r from-rose-500 to-pink-300 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center"
        type="button"
      >
        Add friend to this group
      </button>

      <div
        className={`absolute w-full z-10 ${isOpen ? 'block' : 'hidden'} bg-rose-200 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
      >
        <form className="px-4 py-2 mb-2" onSubmit={handleAddToGroup}>
          <input
            type="text"
            name="gmail"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            className="mb-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
            placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
            placeholder="Add friends by gmail"
            required
          />
          <button
            type="submit"
            className="mt-2 w-full focus:ring-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center text-white bg-gradient-to-r from-rose-300 to-pink-500 hover:from-green-400 hover:to-blue-500 dark:bg-gradient-to-r dark:from-green-400 dark:to-blue-500 dark:hover:from-pink-500 dark:hover:to-yellow-500"
          >
            Add to group
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMember;
