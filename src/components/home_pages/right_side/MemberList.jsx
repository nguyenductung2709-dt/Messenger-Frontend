/* eslint-disable react/button-has-type */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { AiOutlineClose } from 'react-icons/ai';
import { changeParticipants } from '../../../reducers/participantsReducer';
import participantService from '../../../services/participants';

function MemberList({ selectedConversation, authUser }) {
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    const fetchParticipants = async () => {
      dispatch(changeParticipants(selectedConversation.participant_list));
    };

    fetchParticipants();
  }, [selectedConversation, dispatch]);

  const participants = useSelector((state) => state.participants);

  const handleDeleteParticipant = (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this participant?');
      if (!confirmDelete) return;
      if (participants.length === 3) {
        toast.error('Group must have at least 3 participants');
        return;
      }
      participantService.setToken(authUser.token);
      participantService.deleteParticipant(id);
      const newParticipants = participants
        .filter((participant) => participant.participant_details.id !== id);
      const details = dispatch(changeParticipants(newParticipants));
      if (details.error) {
        throw new Error(details.error);
      } else {
        toast.success('Participant removed successfully');
      }
    } catch (err) {
      toast.error('Failed to remove participant');
    }
  };

  return (
    <div className="mt-20 w-full relative" ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="w-full text-white bg-gradient-to-r from-rose-500 to-pink-300 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Members
      </button>

      <div
        id="dropdown"
        className={`w-full z-10 ${isOpen ? 'block' : 'hidden'} absolute bg-rose-300 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
      >
        <ul className="w-full text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          {participants.map((participant) => (
            <li
              key={participant.id}
              className="flex items-center px-4 py-2 hover:bg-rose-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <img className="w-10 h-10 rounded-full mr-2" alt="Avatar" src={participant.avatarName} />

              <span className="mr-2">
                {participant.firstName}
                {' '}
                {participant.middleName}
                {' '}
                {participant.lastName}
              </span>

              <button
                onClick={() => handleDeleteParticipant(participant.participant_details.id)}
                className="mt-1 mr-1 w-4 bg-red-500 text-white rounded-full"
                aria-label="Delete file"
              >
                <AiOutlineClose />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MemberList;
