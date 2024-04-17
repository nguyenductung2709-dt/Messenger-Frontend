import { useState } from 'react';
import authenticationService from '../../services/authentication';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';


const LoginPage = () => {
    const [loading, setLoading] = useState('');
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState(false);
    const { setAuthUser } = useAuthContext();

    function handleInputErrors(gmail, password) {
        if (!gmail || !password) {
            toast.error("Please fill in all fields");
            return false;
        }
        return true;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const check = handleInputErrors(gmail, password);
        if (!check) {return ;}
        try {
            const userDetails = {
                gmail,
                password
            }
            const user = await authenticationService.login(userDetails);
            if (user.error) {
                throw new Error(user.error);
            }
            setLoading(true);
            toast.success("You have successfully logged in")
            localStorage.setItem("loggedInChatUser", JSON.stringify(user));
            setAuthUser(user);
        } catch(err) {
            toast.error("Login failed. Please check your credentials");
        }
    };

    return (
        <section className="bg-primary_login_dark">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 
                            bg-secondary_login_dark border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                <input 
                                    type="gmail" 
                                    name="gmail" 
                                    id="gmail" 
                                    value={gmail} 
                                    onChange={(e) => setGmail(e.target.value)} 
                                    className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-third_login_dark border-gray-600 
                                    placeholder-gray-400 text-white focus:ring-white focus:border-white" 
                                    placeholder="name@company.com" 
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
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

                            <button type="submit" className="w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                            bg-blue-500 hover:bg-blue-700 text-white" disabled = {loading}>{loading ? <span className='loading loading-spinner'></span> : "Sign In"}</button>

                            <p className="text-sm font-light text-gray-400">
                                Need an account? <a href="/register" className="font-medium hover:underline text-white">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
