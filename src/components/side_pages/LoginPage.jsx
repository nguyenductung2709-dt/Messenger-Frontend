import { useState } from "react";
import authenticationService from "../../services/authentication";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import useDarkMode from "../../hooks/useDarkMode";
import { FaMoon, FaSun } from "react-icons/fa";

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
      const userDetails = { gmail, password };  
      const user = await withTimeout(
        authenticationService.login(userDetails),
        7000, 
        "Login timed out"
      );
  
      if (user.error) {
        throw new Error(user.error);
      }
      
      setLoading(true);
      localStorage.setItem("loggedInChatUser", JSON.stringify(user));
      setAuthUser(user);
    } catch (err) {
      setLoading(false); 
      toast.error(err.message || "Login failed. Please check your credentials");
    }
  };
  
  function withTimeout(promise, ms, timeoutError) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(timeoutError));
      }, ms);
  
      promise
        .then(resolve)
        .catch(reject)
        .finally(() => clearTimeout(timer));
    });
  }
  

  return (
    <section className="dark:bg-primary_login_dark bg-rose-300">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <label className="swap absolute top-10 right-40">
          <span
            onClick={handleMode}
            className={`transition-transform transform ${darkTheme ? "rotate-0" : "rotate-180"}`}
          >
            {darkTheme ? (
              <FaMoon size={"2.1em"} className="top-navigation-icon" />
            ) : (
              <FaSun size={"2.1em"} className="top-navigation-icon" />
            )}
          </span>
        </label>

        <div
          className="w-full rounded-lg shadow-2xl shadow-rose-600 dark:shadow-white border md:mt-0 sm:max-w-md xl:p-0 
                            bg-rose-200 dark:bg-secondary_login_dark dark:border-gray-700 border-rose-200"
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
                  className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-rose-200 dark:border-gray-600 
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
