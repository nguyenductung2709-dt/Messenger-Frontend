import { useState } from "react";
import authenticationService from "../../services/authentication";
import toast, { Toaster } from "react-hot-toast";

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
    <section className="bg-primary_login_dark">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 
                            bg-secondary_login_dark border-gray-700"
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-third_login_dark border-gray-600 
                                    placeholder-gray-400 text-white focus:ring-white focus:border-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-third_login_dark border-gray-600 
                                    placeholder-gray-400 text-white focus:ring-white focus:border-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Confirm your password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-third_login_dark border-gray-600 
                                    placeholder-gray-400 text-white focus:ring-white focus:border-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your first name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-third_login_dark border-gray-600 
                                    placeholder-gray-400 text-white focus:ring-white focus:border-white"
                  placeholder="Cristiano"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-third_login_dark border-gray-600 
                                    placeholder-gray-400 text-white focus:ring-white focus:border-white"
                  placeholder="Ronaldo"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="middleName"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your middle name
                </label>
                <input
                  type="text"
                  name="middleName"
                  id="middleName"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-third_login_dark border-gray-600 
                                    placeholder-gray-400 text-white focus:ring-white focus:border-white"
                  placeholder="Siu"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your date of birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-third_login_dark border-gray-600 
                                    placeholder-gray-400 text-white focus:ring-white focus:border-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="avatarImage"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your avatar image
                </label>
                <input
                  type="file"
                  name="avatarImage"
                  id="avatarImage"
                  onChange={handleAvatarChange}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-third_login_dark border-gray-600 placeholder-gray-400 text-white focus:ring-white focus:border-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                            bg-blue-500 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {" "}
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}{" "}
              </button>

              <p className="text-sm font-light text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium hover:underline text-white"
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
