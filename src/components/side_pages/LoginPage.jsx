import { useState } from "react";
import authenticationService from "../../services/authentication";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import useDarkMode from '../../hooks/useDarkMode';

const LoginPage = () => {
  const [loading, setLoading] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthUser } = useAuthContext();
  const [darkTheme, setDarkTheme] = useDarkMode();

  const handleMode = () => setDarkTheme(!darkTheme);

  function handleInputErrors(gmail, password) {
    if (!gmail || !password) {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const check = handleInputErrors(gmail, password);
    if (!check) {
      return;
    }
    try {
      const userDetails = {
        gmail,
        password,
      };
      const user = await authenticationService.login(userDetails);
      if (user.error) {
        throw new Error(user.error);
      }
      setLoading(true);
      localStorage.setItem("loggedInChatUser", JSON.stringify(user));
      setAuthUser(user);
    } catch (err) {
      toast.error("Login failed. Please check your credentials");
    }
  };

  return (
    <section className= "dark:bg-primary_login_dark bg-amber-300">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

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
              Welcome Back!
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
                  type="gmail"
                  name="gmail"
                  id="gmail"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-amber-200 dark:border-gray-600 
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white focus::bg-white"
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

              <button
                type="submit"
                className="w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                            bg-cyan-500 hover:bg-cyan-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign In"
                )}
              </button>

              <p className="text-sm font-light dark:text-gray-400 text-black">
                Need an account?{" "}
                <a
                  href="/register"
                  className="font-semibold hover:underline text-black dark:text-white"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
