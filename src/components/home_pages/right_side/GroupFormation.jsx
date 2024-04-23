import { GrGroup } from "react-icons/gr";

const GroupFormation = ({
  toggleDropdown,
  dropdownVisible,
  title,
  setTitle,
  friends,
  handleSelectUser,
  selectedUsers,
  handleFormGroup,
}) => {
  return (
    <div className="relative inline-block text-center basis-1/3">
      <input
        type="checkbox"
        onChange={toggleDropdown}
        className="hidden"
        id="dropdownCheckbox"
      />
      <label
        htmlFor="dropdownCheckbox"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      >
        <GrGroup size={"2.1em"} />
      </label>

      {dropdownVisible && (
        <div className="z-20 absolute right-0 mt-2 divide-y divide-gray-100 rounded-lg shadow w-72 dark:bg-gray-700 bg-white">
          <p className="text-white text-2xl border-none px-4 py-2 font-bold">
            Select friends
          </p>
          <p className="text-white text-base border-none px-4 py-1">
            Add at least 2 friends
          </p>
          <div className="px-4 py-2 border-none">
            <input
              type="text"
              name="password"
              id="password"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border sm:text-sm rounded-lg block w-full p-2.5 bg-third_login_dark border-gray-600 
                            placeholder-gray-400 text-white focus:ring-white focus:border-white"
              placeholder="Title for the group"
              required
            />
          </div>
          <ul className="w-full py-2 text-sm border-gray-600 text-gray-700 dark:text-gray-200 border-none">
            {friends.map((friend) => (
              <li
                key={friend.id}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white border-none cursor-pointer"
                onClick={() => handleSelectUser(friend.user.id)}
              >
                <div className="flex items-center flex-grow">
                  <img
                    className="w-12 h-12 rounded-full mr-2"
                    alt="Avatar"
                    src={friend.user.avatarName}
                  />
                  <span>
                    {friend.user.firstName} {friend.user.middleName}{" "}
                    {friend.user.lastName}
                  </span>
                </div>
                <input
                  type="checkbox"
                  id={`friend-${friend.user.id}`}
                  checked={selectedUsers.includes(friend.user.id)}
                  readOnly
                />
              </li>
            ))}
          </ul>
          <button
            className="border-none w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-blue-700 text-white"
            onClick={handleFormGroup}
          >
            Form Group
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupFormation;
