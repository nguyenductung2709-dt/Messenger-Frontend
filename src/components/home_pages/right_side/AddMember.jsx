import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import participantService from "../../../services/participants";

const AddMember = ({ authUser, selectedConversation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [gmail, setGmail] = useState("");
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddToGroup = async (e) => {
    e.preventDefault();
    try {
      participantService.setToken(authUser.token);
      const newParticipant = {
        conversationId: selectedConversation.id,
        gmail: gmail,
      };
      await participantService.addParticipant(newParticipant);
      dispatch(selectedConversation.participant_list);
      toast.success("Friend added successfully");
    } catch (err) {
      toast.error("Failed to add friend to group");
    }

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
        className={`absolute w-full z-10 ${isOpen ? "block" : "hidden"} bg-rose-200 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
      >
        <form className="px-4 py-2 mb-2" onSubmit={handleAddToGroup}>
          <input
            type="text"
            name="gmail"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            className="w-full rounded-lg h-12 text-black dark:text-black bg-white dark:bg-black"
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
};

export default AddMember;
