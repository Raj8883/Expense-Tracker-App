import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/AuthLayout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { validateEmail } from '../../utils/helper'
import { UserContext } from '../../context/userContext.js'
import uploadImage from '../../utils/uploadImage.js'

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setsetPassword] = useState("");

  const [error, setError] = useState(null);

  const {updateUser}=useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError('please enter your name')
      return;
    }

    if (!email) {
      setError('please enter valid  your email')
      return;
    }

    if (!password) {
      setError('please enter valid your password ')
      return;
    }

    setError('');

    // Signup Api call

    try {

      if(profilePic){
        const ImgUploadRes=await uploadImage(profilePic);
        profileImageUrl=ImgUploadRes.imageUrl||"";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
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
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex fledx-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details ..</p>
        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-col-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label='Full Nmae'
              placeholder="enter your name "
              type='text' />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              required
            />

            <div className='col-span-2'>

              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

          </div>
          <button type='submit' className='btn-primary'>Sign Up </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account ? {" "}
            <Link className='font-medium text-purple-400 underline' to='/Login'>
              Login
            </Link>
          </p>
        </form>

      </div>

    </AuthLayout>
  )
}

export default Signup
