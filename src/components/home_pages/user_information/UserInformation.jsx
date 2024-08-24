/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { FaMoon, FaSun } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { HiArrowLeftStartOnRectangle } from 'react-icons/hi2';
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import useDarkMode from '../../../hooks/useDarkMode';
import userService from '../../../services/users';

function UserInformation({ authUser, toggleForm }) {
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
          throw new Error(error.message);
        }
      }
    };

    getUser();
  }, [authUser]);

  const verifyEmail = async () => {
    try {
      await userService.requestEmailVerification(authUser.id);
      toast.success('Email verification link was successfully sent to your Gmail address');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };
  
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    return `${day}.${month}.${year}`;
  }

  return (
    <section className="dark:bg-primary_login_dark bg-rose-300 h-screen">
      <Helmet>
        <title>User Information</title>
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a className = "swap absolute top-10 left-40" href="/">
          <HiArrowLeftStartOnRectangle size="3em" className="mb-2" />
        </a>
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

        <div className="mb-8 w-full rounded-lg shadow-2xl shadow-rose-600 dark:shadow-white border md:mt-0 sm:max-w-md xl:p-0 bg-rose-200 dark:bg-secondary_login_dark dark:border-gray-700 border-rose-200">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-2xl text-black dark:text-white">
              User Information
            </h1>
            {userUsed && (
              <>
                <div>
                  <img className="h-24 w-24 rounded-full" src={userUsed.avatarName} alt="User Avatar" />
                </div>
                <div>
                  <p className="block mb-2 text-base font-medium text-black dark:text-white">
                    {' '}
                    Your username:
                    {' '}
                    <span>
                      {' '}
                      {userUsed.username}
                      {' '}
                    </span>
                    {' '}
                  </p>
                </div>
                <div>
                <p className="text-base font-medium text-black dark:text-white">
                  Your email: {userUsed.gmail}
                  <span className="ml-2 inline-flex items-center">
                    {userUsed.isVerified ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                  </span>
                </p>
                {!userUsed.isVerified && (
                  <button
                    type="button"
                    onClick={verifyEmail}
                    className="mt-2 px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Verify your email
                  </button>
                )}
                </div>
                <div>
                  <p className="block mb-2 text-base font-medium text-black dark:text-white">
                    {' '}
                    Your first name:
                    {' '}
                    <span>
                      {' '}
                      {userUsed.firstName}
                      {' '}
                    </span>
                    {' '}
                  </p>
                </div>
                <div>
                  <p className="block mb-2 text-base font-medium text-black dark:text-white">
                    {' '}
                    Your middle name:
                    {' '}
                    <span>
                      {' '}
                      {userUsed.middleName}
                      {' '}
                    </span>
                    {' '}
                  </p>
                </div>
                <div>
                  <p className="block mb-2 text-base font-medium text-black dark:text-white">
                    {' '}
                    Your last name:
                    {' '}
                    <span>
                      {' '}
                      {userUsed.lastName}
                      {' '}
                    </span>
                    {' '}
                  </p>
                </div>
                <div>
                  <p className="block mb-2 text-base font-medium text-black dark:text-white">
                    {' '}
                    Your date of birth:
                    {' '}
                    <span>
                      {' '}
                      {formatDate(userUsed.dateOfBirth)}
                      {' '}
                    </span>
                    {' '}
                  </p>
                </div>
                <div>
                  <p className="block mb-2 text-base font-medium text-black dark:text-white">
                    {' '}
                    Your account is created at
                    {' '}
                    <span>
                      {' '}
                      {formatDate(userUsed.createdAt)}
                      {' '}
                    </span>
                    {' '}
                  </p>
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-rose-300 to-pink-500 hover:from-rose-600 hover:to-pink-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-violet-600 dark:hover:from-blue-800 dark:hover:to-indigo-900 text-white"
              onClick={toggleForm}
            >
              Change information
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserInformation;
