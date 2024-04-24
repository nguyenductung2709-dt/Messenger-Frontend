import { useState, useRef, useEffect } from "react";

const MemberList = ({ selectedConversation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const participants = selectedConversation.participant_list;

  return (
    <div className="mt-20 w-full relative" ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="w-full text-white bg-gradient-to-r from-rose-500 to-yellow-500 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Members
      </button>

      <div
        id="dropdown"
        className={`w-full z-10 ${isOpen ? "block" : "hidden"} absolute bg-orange-300 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
      >
        <ul
          className="w-full text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {participants.map((participant) => (
            <li
              key={participant.id}
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <img
                className="w-10 h-10 rounded-full mr-2"
                alt="Avatar"
                src={participant.avatarName}
              />
              <span className="mr-2">
                {participant.firstName} {participant.middleName}{" "}
                {participant.lastName}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemberList;
