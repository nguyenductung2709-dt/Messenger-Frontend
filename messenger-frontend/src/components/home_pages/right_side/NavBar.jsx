import { BsSun } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { useAuthContext } from "../../../context/AuthContext";
import authenticationService from '../../../services/authentication';
import userService from '../../../services/users';
import { GrGroup } from "react-icons/gr";
import { useState, useEffect } from 'react';

const NavBar = () => {
    const [user, setUser] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await userService.getUserById(authUser.id);
            setUser(user);
        }
        fetchUser();
    }, [authUser, setAuthUser]);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }

    const handleLogout = async () => {
        try {
            authenticationService.setToken(authUser.token);
            await authenticationService.logout();
            localStorage.removeItem("loggedInChatUser");
            setAuthUser(null);
        } catch (err) {
            console.error("Logout error:", err);
        }
    }

    return (
        <div className="flex h-15 items-center justify-center top-0 mb-10">
            <BsSun size={35} className="basis-1/4" />

            <div className="basis-1/4 flex flex-col items-center justify-center rounded-full">
                <img className="w-10 h-10 rounded-full" alt="Avatar" src={user.avatarName} />
            </div>

            <div className="relative inline-block text-center basis-1/4">
                <input
                    type="checkbox"
                    onChange={toggleDropdown}
                    className="hidden"
                    id="dropdownCheckbox"
                />
                <label
                    htmlFor="dropdownCheckbox"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <GrGroup size={35} />
                </label>

                {dropdownVisible && (
                    <div className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="w-full py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <label htmlFor="dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <input type="checkbox" id="dashboard" className="mr-2" />
                                    Dashboard
                                </label>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <button className="basis-1/4 flex flex-col items-center" onClick={handleLogout}>
                <BiLogOut size={35} />
            </button>
        </div>
    );
};

export default NavBar;
