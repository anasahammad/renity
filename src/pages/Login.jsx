import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import img from "../assets/image2.jpg";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const toggleVisibility = ()=> setIsVisible(!isVisible)
  const onSubmit = (data) => {
    console.log(data)
    
  };
  return (
    <div className="py-56 md:py-32">
      <div className="flex    h-screen  ">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-gray-50 ">
          <h1 className="text-4xl font-bold mb-4">WELCOME BACK</h1>
          <p className="text-gray-600 mb-8">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email',
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 border  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors?.email ? 'border-red-300': 'border-gray-300'}`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative ">
              <input
                 type={isVisible ? 'text' : 'password'}
                id="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 border  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors?.password ? 'border-red-300': 'border-gray-300'} `}
                placeholder="••••••••"
              />

<button className="absolute right-5 top-3" type='button' onClick={toggleVisibility}>
                {isVisible ? (
                  <FaEye color='#0B4E38' />
                ) : (
                  <FaEyeSlash color='#0B4E38' />
                )}
              </button>
              </div>
 
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>

            <div className="flex  items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm  hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#f8748c] text-white py-2 px-4 rounded-md shadow "
            >
              Sign in
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center border  py-2 px-4 rounded-lg  "
            >
              <FcGoogle size={24} />
              Sign in with Google
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#f8748c] hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 hidden  bg-gray-100 md:flex items-center justify-center">
          <img src={img} alt="Image" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
