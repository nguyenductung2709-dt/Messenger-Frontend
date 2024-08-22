/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import useDarkMode from '../../hooks/useDarkMode';


function EmailVerificationSuccessful () {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);

    return (
        <div className = "flex flex-col items-center justify-center h-screen dark:bg-primary_login_dark bg-rose-300">
            <label className="swap absolute top-10 right-40">
                <span
                    onClick={handleMode}
                    className={`transition-transform transform ${darkTheme ? 'rotate-0' : 'rotate-180'}`}
                >
                {darkTheme ? (
                <FaMoon size="2.1em" className="top-navigation-icon" />
                ) : (
                <FaSun size="2.1em" className="top-navigation-icon" />
                )}
                </span>
            </label>
            <h1 className = "text-6xl text-black dark:text-white mb-4">Email Verification Successful</h1>
            <p className = "text-lg text-black dark:text-white mb-4">Your email has been successfully verified, now you can login with your gmail account.</p>
            <a href = "/" className = "w-32 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-rose-300 to-pink-500 hover:from-rose-600 hover:to-pink-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-violet-600 dark:hover:from-blue-800 dark:hover:to-indigo-900 text-white"> 
                Homepage 
            </a>
        </div>
    );
};

export default EmailVerificationSuccessful;