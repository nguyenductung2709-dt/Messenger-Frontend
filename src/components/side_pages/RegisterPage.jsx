import { useState } from "react";
import authenticationService from "../../services/authentication";
import toast, { Toaster } from "react-hot-toast";
import useDarkMode from '../../hooks/useDarkMode';


const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [avatarImage, setAvatarImage] = useState(null);
  const [darkTheme, setDarkTheme] = useDarkMode();

  const handleMode = () => setDarkTheme(!darkTheme);

  function handleInputErrors(
    gmail,
    password,
    confirmPassword,
    firstName,
    lastName,
    middleName,
    dateOfBirth,
  ) {
    if (
      !gmail ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !middleName ||
      !dateOfBirth
    ) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const check = handleInputErrors(
      gmail,
      password,
      confirmPassword,
      firstName,
      lastName,
      middleName,
      dateOfBirth,
    );
    if (!check) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("gmail", gmail);
      formData.append("password", password);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("middleName", middleName);
      formData.append("dateOfBirth", dateOfBirth);
      if (avatarImage) {
        formData.append("avatarImage", avatarImage);
      }
      const details = await authenticationService.register(formData);
      if (details.error) {
        throw new Error(details.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setGmail("");
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setDateOfBirth("");
      setAvatarImage(null);
      toast.success("You have successfully create an account");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarImage(file);
  };

  return (
    <section className= "dark:bg-primary_login_dark bg-amber-300">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-6">
      <label className="swap swap-rotate absolute top-10 right-40">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" onClick = {handleMode}/>

        {/* sun icon */}
        <svg
          className="swap-on fill-current w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        {/* moon icon */}
        <svg
          className="swap-off fill-current w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
        <div
          className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 
          bg-amber-200 dark:bg-secondary_login_dark dark:border-gray-700 border-amber-200"
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-semibold leading-tight tracking-tight md:text-2xl text-black dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-amber-200 dark:border-gray-600 
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-amber-200 dark:border-gray-600 
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Confirm your password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-amber-200 dark:border-gray-600 
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Your first name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-amber-200 dark:border-gray-600 
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Cristiano"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Your last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-amber-200 dark:border-gray-600 
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Ronaldo"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="middleName"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Your middle name
                </label>
                <input
                  type="text"
                  name="middleName"
                  id="middleName"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-amber-200 dark:border-gray-600 
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Siu"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Your date of birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-amber-200 dark:border-gray-600 
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="avatarImage"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Your avatar image
                </label>
                <input
                  type="file"
                  name="avatarImage"
                  id="avatarImage"
                  onChange={handleAvatarChange}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-amber-200 dark:border-gray-600 placeholder-black text-black dark:text-white focus:ring-white focus:border-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                            bg-cyan-500 hover:bg-cyan-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white"
                disabled={loading}
              >
                {" "}
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}{" "}
              </button>

              <p className="text-sm font-light dark:text-gray-400 text-black">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-semibold hover:underline text-black dark:text-white"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
