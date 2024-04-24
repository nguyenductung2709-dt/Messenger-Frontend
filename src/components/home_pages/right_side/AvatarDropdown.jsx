const AvatarDropdown = ({
  toggleAvatarDropdown,
  user,
  handleLogout,
  avatarDropdownVisible,
}) => {
  return (
    <div className="basis-1/3 flex flex-col items-center justify-center rounded-full">
      <div className="relative inline-block text-center">
        <input
          type="checkbox"
          onChange={toggleAvatarDropdown}
          className="hidden"
          id="avatarDropdownCheckbox"
        />
        <label htmlFor="avatarDropdownCheckbox" className="cursor-pointer">
          <img
            className="w-12 h-12 rounded-full"
            alt="Avatar"
            src={user.avatarName}
          />
        </label>

        {avatarDropdownVisible && (
          <div className="w-52 z-20 absolute right-0 mt-2 divide-y divide-gray-100 rounded-lg shadow bg-amber-100 dark:bg-gray-700">
            <div className="w-full">
              <p className="text-black dark:text-white text-base font-medium mb-8 w-full">
                {user.firstName} {user.middleName} {user.lastName}
              </p>
              <button className="w-full border-none flex-grow focus:ring-4 font-medium rounded-lg text-sm py-2.5 text-center bg-blue-600 hover:bg-blue-700 text-black dark:text-white">
                User Information
              </button>
            </div>
            <button
              className="border-none w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 hover:bg-red-700 text-black dark:text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarDropdown;
