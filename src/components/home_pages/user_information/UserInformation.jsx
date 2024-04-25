import { FaMoon, FaSun } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import userService from '../../../services/users';
import { HiArrowLeftStartOnRectangle } from "react-icons/hi2";


const UserInformation = ({ authUser, toggleForm }) => {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    const [userUsed, setUserUsed] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            if (authUser) {
                try {
                    const user = await userService.getUserById(authUser.id);
                    setUserUsed(user);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        getUser();
    }, [authUser]);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
    
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
    
        return `${day}.${month}.${year}`;
    }

    return (
        <section className="dark:bg-primary_login_dark bg-rose-300">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <label className="swap absolute top-10 right-40">
                    <span onClick={handleMode} className={`transition-transform transform ${darkTheme ? 'rotate-0' : 'rotate-180'}`}>
                        {darkTheme ? (
                            <FaMoon size="2.1em" className='top-navigation-icon' />
                        ) : (
                            <FaSun size="2.1em" className='top-navigation-icon' />
                        )}
                    </span>
                </label>

                <div className="mb-8 w-full rounded-lg shadow-2xl shadow-rose-600 dark:shadow-white border md:mt-0 sm:max-w-md xl:p-0 bg-rose-200 dark:bg-secondary_login_dark dark:border-gray-700 border-rose-200">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-2xl text-black dark:text-white">
                            User Information
                        </h1>
                        {userUsed && (
                            <>
                                <div>
                                    <img className = "h-24 w-24 rounded-full" src={userUsed.avatarName} alt="User Avatar" />
                                </div>
                                <div>
                                    <p className="block mb-2 text-base font-medium text-black dark:text-white"> Your email: <span> {userUsed.gmail} </span> </p>
                                </div>
                                <div>
                                    <p className="block mb-2 text-base font-medium text-black dark:text-white"> Your first name: <span> {userUsed.firstName} </span> </p>
                                </div>
                                <div>
                                    <p className="block mb-2 text-base font-medium text-black dark:text-white"> Your middle name: <span> {userUsed.middleName} </span> </p>
                                </div>
                                <div>
                                    <p className="block mb-2 text-base font-medium text-black dark:text-white"> Your last name: <span> {userUsed.lastName} </span> </p>
                                </div>
                                <div>
                                    <p className="block mb-2 text-base font-medium text-black dark:text-white"> Your date of birth: <span> {formatDate(userUsed.dateOfBirth)} </span> </p>
                                </div>
                                <div>
                                    <p className="block mb-2 text-base font-medium text-black dark:text-white"> Your account is created at <span> {formatDate(userUsed.createdAt)} </span> </p>
                                </div>
                            </>
                        )}
                        <button
                            type="submit"
                            className="w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-rose-300 to-pink-500 hover:from-rose-600 hover:to-pink-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-violet-600 dark:hover:from-blue-800 dark:hover:to-indigo-900 text-white"
                            onClick = {toggleForm}
                        >
                            Change information
                        </button>
                    </div>
                </div>
                <a href = "/"><HiArrowLeftStartOnRectangle size = {'3.5em'} className = "text-white mb-2"/></a>
                <p className = "text-white"> Come back to chat </p>
            </div>
        </section>
    );
};

export default UserInformation;
