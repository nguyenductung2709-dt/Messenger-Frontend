/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import authenticationService from '../../services/authentication';
import useDarkMode from '../../hooks/useDarkMode';

function TokenVerification() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [darkTheme, setDarkTheme] = useDarkMode();

  const handleMode = () => setDarkTheme(!darkTheme);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  
  function handleInputErrors() {
    if (
      !token
      || !password
      || !confirmPassword
    ) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
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
      const response = await authenticationService.resetPassword({ id, token, password });
      if (response.error) {
        toast.error(response.error);
      } else {
        setToken('');
        setPassword('');
        setConfirmPassword('');
        toast.success('You have successfully reset your password');
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
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl text-black dark:text-white">
              Confirm your token
            </h1>
            <p className="text-center text-black dark:text-white"> 
              Enter your reset password token which was sent to your email to reset your password
            </p>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="token" className="block mb-2 text-sm font-medium text-black dark:text-white">
                  Reset password token
                </label>
                <input
                  type="token"
                  name="token"
                  id="token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
                  placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Token"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-white">
                  New password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-black dark:text-white">
                  Confirm your new password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="••••••••"
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
                {loading ? <span className="loading loading-spinner" /> : 'Send'}
              </button>
            </form>
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

export default TokenVerification;
