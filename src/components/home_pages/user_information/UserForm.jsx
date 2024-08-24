/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaMoon, FaSun } from 'react-icons/fa';
import { HiArrowLeftStartOnRectangle } from 'react-icons/hi2';
import { Helmet } from 'react-helmet';
import useDarkMode from '../../../hooks/useDarkMode';
import userService from '../../../services/users';

function UserForm({ authUser, toggleForm }) {
  const [loading, setLoading] = useState(false);
  const [gmail, setGmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [avatarImage, setAvatarImage] = useState(null);
  const [darkTheme, setDarkTheme] = useDarkMode();

  const handleMode = () => setDarkTheme(!darkTheme);

  function handleInputErrors() {
    if (!gmail && !firstName && !lastName && !middleName && !dateOfBirth) {
      toast.error('Please fill in at least one field');
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const check = handleInputErrors();
    if (!check) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('gmail', gmail);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('middleName', middleName);
      formData.append('dateOfBirth', dateOfBirth);
      if (avatarImage) {
        formData.append('avatarImage', avatarImage);
      }
      userService.setToken(authUser.token);
      const details = await userService.changeUserInformation(formData, authUser.id);
      if (details.error) {
        throw new Error(details.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setGmail('');
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setDateOfBirth('');
      setAvatarImage(null);
      toast.success('You have successfully change your information');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarImage(file);
  };

  return (
    <section className="dark:bg-primary_login_dark bg-rose-300 h-screen">
      <Helmet>
        <title> Information Form </title>
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-6">
        <a className = "swap absolute top-10 left-40" href="/">
          <HiArrowLeftStartOnRectangle size="3em"/>
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
        <div
          className="w-full rounded-lg shadow-2xl shadow-rose-600 dark:shadow-white border sm:max-w-md xl:p-0
          bg-rose-200 dark:bg-secondary_login_dark dark:border-gray-700 border-rose-200"
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-semibold leading-tight tracking-tight md:text-2xl text-black dark:text-white">
              Change information
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-white">
                  New email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-black dark:text-white">
                  New first name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Cristiano"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-black dark:text-white">
                  New last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Ronaldo"
                />
              </div>
              <div>
                <label htmlFor="middleName" className="block mb-2 text-sm font-medium text-black dark:text-white">
                  New middle name
                </label>
                <input
                  type="text"
                  name="middleName"
                  id="middleName"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Siu"
                />
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-black dark:text-white">
                  New date of birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label htmlFor="avatarImage" className="block mb-2 text-sm font-medium text-black dark:text-white">
                  New avatar image
                </label>
                <input
                  type="file"
                  name="avatarImage"
                  id="avatarImage"
                  onChange={handleAvatarChange}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600 placeholder-black text-black dark:text-white focus:ring-white focus:border-white"
                />
              </div>
              <button
                type="submit"
                className="w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                bg-gradient-to-r from-rose-300 to-pink-500 hover:from-rose-600 hover:to-pink-600
                dark:bg-gradient-to-r dark:from-blue-600 dark:to-violet-600 dark:hover:from-blue-800 dark:hover:to-indigo-900 text-white"
                disabled={loading}
              >
                {' '}
                {loading ? <span className="loading loading-spinner" /> : 'Confirm'}
                {' '}
              </button>

              <p className="text-sm font-light dark:text-gray-400 text-black">
                Have nothing to change?
                {' '}
                <button className="font-semibold hover:underline text-black dark:text-white" onClick={toggleForm}>
                  Your information
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserForm;
