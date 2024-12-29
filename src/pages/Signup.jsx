import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate, useParams } from 'react-router-dom';
import img from "../assets/image2.jpg"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useMutation } from '@tanstack/react-query';
import { signup } from '../services/index/users';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/reducers/userReducer';
import toast from 'react-hot-toast';

const Signup = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { role } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const userState = useSelector((state) => state.user);


  

  const { mutate } = useMutation({
    mutationFn: ({name ,email, password }) => signup({ name, email, password, role }),
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      toast.success('Registration successful');
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
    const toggleVisibility = ()=> setIsVisible(!isVisible)
    const onSubmit = (data) => {
     mutate(data)
      
    };
  return (
    <div className='pt-10 max-h-screen relative'>
      <Link to='/' className='absolute px-3 py-1.5 left-10 top-3 bg-[#f8748c] text-white rounded-lg shadow-sm'>
        back to Home
      </Link>
      <div className='flex  mt-4 '>
        {/* Left Section */}
        <div className='md:w-1/2 flex flex-col justify-center px-8 md:px-16 '>
          <h1 className='text-4xl font-bold mb-4'>WELCOME To Renity</h1>
          <p className='text-gray-600 mb-8'> Please enter your details to Register.</p>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                Name
              </label>
              <input
                type='text'
                id='name'
                {...register('name', {
                  required: 'Name is required',
                })}
                className={`mt-1 block w-full px-4 py-2 border  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors?.name ? 'border-red-300' : 'border-gray-300'}`}
                placeholder='Enter your name'
              />
              {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                type='email'
                id='email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email',
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 border  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors?.email ? 'border-red-300' : 'border-gray-300'}`}
                placeholder='Enter your email'
              />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='relative '>
                <input
                  type={isVisible ? 'text' : 'password'}
                  id='password'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className={`mt-1 block w-full px-4 py-2 border  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors?.password ? 'border-red-300' : 'border-gray-300'} `}
                  placeholder='••••••••'
                />

                <button className='absolute right-5 top-3' type='button' onClick={toggleVisibility}>
                  {isVisible ? <FaEye color='#0B4E38' /> : <FaEyeSlash color='#0B4E38' />}
                </button>
              </div>

              {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
            </div>

            <div className=''>
              <label className='flex items-center'>
                <input type='checkbox' className='h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                <Link to='/' className='ml-2 text-sm text-gray-600 hover:underline'>
                  Accept Terms and Condition
                </Link>
              </label>
            </div>

            <button type='submit' className='w-full bg-[#f8748c] text-white py-2 px-4 rounded-md shadow '>
              Sign Up
            </button>

            <button type='button' className='w-full flex items-center justify-center border  py-2 px-4 rounded-lg  gap-2'>
              <FcGoogle size={24} />
              Sign up with Google
            </button>
          </form>

          <p className='mt-8 text-center text-sm text-gray-600'>
            Already have an account?{' '}
            <Link to='/login' className='text-[#f8748c] hover:underline'>
              Sign in here
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className='md:w-1/2 hidden bg-gray-100 md:flex items-center justify-center'>
          <img src={img} alt='Image' className='w-full h-[90vh]' />
        </div>
      </div>
    </div>
  );
};

export default Signup;
