import  { useContext,useState } from 'react'
import AuthLayout from '../../components/AuthLayout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance.js'
import { API_PATHS } from '../../utils/apiPath.js'
import { UserContext } from '../../context/userContext.jsx'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('null');

    const {updateUser}= useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid  email address.");
        }

        if (!password) {
            setError("Please enter password");
            return;
        }

        setError("");

        // login Api call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });
            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashnoard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong.Please try again");
            }
        }
    }

    return (
        <AuthLayout>
            <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center '>
                <h3 className='text-xl font-semibold text-black'> Welcome Back!!</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Please enter your credentials to login.
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />

                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />

                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                    <button type='submit' className='btn-primary'>Login</button>

                    <p className='text-[13px] text-slate-800 mt-3'>
                        Don't have an account? {" "}
                        <Link className='font-medium text-purple-400 underline' to='/Signup'>
                            SignUp
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login
