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
          <div className="w-52 z-20 absolute right-0 mt-2 divide-y divide-gray-100 rounded-lg shadow bg-rose-100 dark:bg-gray-700">
            <div className="w-full">
              <p className="text-black dark:text-white text-base font-medium mt-4 mb-8 w-full">
                {user.firstName} {user.middleName} {user.lastName}
              </p>
              <a href="/information">
                <button
                  className="w-full border-none flex-grow focus:ring-4 font-medium rounded-lg text-sm py-2.5 text-center bg-gradient-to-r from-rose-300 to-pink-500 hover:from-rose-600 hover:to-pink-600 
                dark:bg-gradient-to-r dark:from-blue-600 dark:to-violet-600 dark:hover:from-blue-800 dark:hover:to-indigo-900 text-black dark:text-white"
                >
                  User Information
                </button>
              </a>
            </div>
            <button
              className="border-none w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-red-600 to-rose-700 hover:from-rose-600 hover:to-pink-600 text-black dark:text-white"
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
