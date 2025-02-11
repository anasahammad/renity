import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import img from '../assets/image2.jpg';
import { login } from '../services/index/users';
import { userActions } from '../store/reducers/userReducer';

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  console.log(userState);
  const [captchaValue, setCaptchaValue] = useState('');
  useEffect(() => {
    loadCaptchaEnginge(4, 'rgb(255, 255, 255)');
  }, []);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account', JSON.stringify(data));
      toast.success('User logged in successfully');
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Failed to login:', error);
      // toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const submitHandler = (data) => {
    if (!validateCaptcha(captchaValue)) {
      toast.error('Please complete the reCAPTCHA verification.');
      return;
    }

    toast.loading('Please wait...');
    const { email, password } = data;
    mutate({ email, password });
    toast.dismiss();
  };
  return (
    <div className='pt-10 max-h-screen relative'>
      <Link to='/' className='absolute px-3 py-1.5 left-10 top-3 bg-[#f8748c] text-white rounded-lg shadow-sm'>
        back to Home
      </Link>
      <div className='flex      '>
        {/* Left Section */}
        <div className='md:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-gray-50 '>
          <h1 className='text-4xl font-bold mb-4'>WELCOME BACK</h1>
          <p className='text-gray-600 mb-8'>Welcome back! Please enter your details.</p>

          <form onSubmit={handleSubmit(submitHandler)} className='space-y-6'>
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
            <div>
              <LoadCanvasTemplate
                reloadText='Reload CAPTCHA'
                reloadColor='#0B4E38'
                canvasProps={{
                  style: { color: 'white', backgroundColor: 'transparent' },
                }}
              />
              <input type='text' placeholder='Enter the CAPTCHA' className='border-2 rounded-md w-full px-2 h-10' value={captchaValue} onChange={(e) => setCaptchaValue(e.target.value)} />
            </div>
            <div className='flex  items-center justify-between'>
              <label className='flex items-center'>
                <input type='checkbox' className='h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                <span className='ml-2 text-sm text-gray-600'>Remember me</span>
              </label>
              <a href='#' className='text-sm  hover:underline'>
                Forgot password?
              </a>
            </div>

            <button type='submit' className='w-full bg-[#f8748c] text-white py-2 px-4 rounded-md shadow '>
              Sign in
            </button>

            <button type='button' className='w-full flex items-center justify-center border  py-2 px-4 rounded-lg  '>
              <FcGoogle size={24} />
              Sign in with Google
            </button>
          </form>

          <p className='mt-8 text-center text-sm text-gray-600'>
            Don’t have an account?{' '}
            <Link to='/signup' className='text-[#f8748c] hover:underline'>
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className='md:w-1/2 hidden  bg-gray-100 md:flex items-center justify-center'>
          <img src={img} alt='Image' className='w-full h-[90vh]' />
        </div>
      </div>
    </div>
  );
};

export default Login;
