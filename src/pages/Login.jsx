import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='py-32'>
      <div className='flex h-screen  '>
        {/* Left Section */}
        <div className='w-1/2 flex flex-col justify-center px-16 bg-gray-50'>
          <h1 className='text-4xl font-bold mb-4'>WELCOME BACK</h1>
          <p className='text-gray-600 mb-8'>Welcome back! Please enter your details.</p>

          <form className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Enter your email'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='••••••••'
              />
            </div>

            <div className='flex items-center justify-between'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='h-4 w-4 text-indigo-600 border-gray-300 rounded'
                />
                <span className='ml-2 text-sm text-gray-600'>Remember me</span>
              </label>
              <a
                href='#'
                className='text-sm  hover:underline'
              >
                Forgot password?
              </a>
            </div>

            <button
              type='submit'
              className='w-full bg-[#f8748c] text-white py-2 px-4 rounded-md shadow '
            >
              Sign in
            </button>

            <button
              type='button'
              className='w-full flex items-center justify-center border  py-2 px-4 rounded-lg  '
            >
              <FcGoogle size={24} />
              Sign in with Google
            </button>
          </form>

          <p className='mt-8 text-center text-sm text-gray-600'>
            Don’t have an account?{' '}
            <Link
              to='/signup'
              className='text-[#f8748c] hover:underline'
            >
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className='w-1/2 bg-gray-100 flex items-center justify-center'>
          <img
            src=''
            alt='Image'
            className='max-w-full max-h-full'
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
