/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaMoon, FaSun } from 'react-icons/fa';
import { GoShieldLock } from "react-icons/go";
import { Helmet } from 'react-helmet';  // Add this import
import authenticationService from '../../services/authentication';
import useDarkMode from '../../hooks/useDarkMode';

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [darkTheme, setDarkTheme] = useDarkMode();

  const handleMode = () => setDarkTheme(!darkTheme);

  function handleInputErrors() {
    if (!input) {
      toast.error('Please fill in the input field');
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
      const response = await authenticationService.requestForgotPassword({ input });
      if (response.error) {
        toast.error(response.error);
      } else {
        setInput('');
        toast.success('An email with token and reset password link page has been sent to your gmail address');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        console.log(`The server responds with a ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <section className="dark:bg-primary_login_dark bg-rose-300 h-screen flex items-center justify-center">
      <Helmet>
        <title>Forgot Password</title>  
      </Helmet>      
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-6 w-full">
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
            <div className="flex justify-center">
              <GoShieldLock size="5.5em" className="dark:text-[#A5ADBB] text-black" />
            </div>
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl text-black dark:text-white">
              Trouble logging in?
            </h1>
            <p className="text-center text-black dark:text-white"> 
              Enter your verified email, or username and we'll send you a new token to reset your account's password. 
            </p>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="input"
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
                  placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Username, or verified email"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                bg-gradient-to-r from-rose-300 to-pink-500 hover:from-rose-600 hover:to-pink-600
                dark:bg-gradient-to-r dark:from-blue-600 dark:to-violet-600 dark:hover:from-blue-800 dark:hover:to-indigo-900 text-white"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner" /> : 'Send reset password token'}
              </button>
            </form>
            <p className="flex items-center text-center">
              <span className="flex-grow border-t dark:border-gray-300 border-black" />
              <span className="mx-4 dark:text-gray-300 text-black">OR</span>
              <span className="flex-grow border-t dark:border-gray-300 border-black" />
            </p>
            <a className="text-center block font-semibold dark:text-white dark:hover:text-gray-400 hover:text-gray-700 text-black" href="/register">
              Create new account
            </a>
          </div>
          <div className="pt-4 pb-4 dark:bg-[#132257] bg-red-300 rounded-md">
            <a href="/login" className="block text-base font-semibold text-center dark:hover:text-gray-400 hover:text-gray-700 text-black dark:text-white">
              Back to sign in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
