import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaEdit, FaKey } from 'react-icons/fa';
import profile from '../assets/profile.png';
const MyProfile = () => {
  const userState = useSelector((state) => state.user);
  const user = userState.userInfo.data;
  console.log(user);
  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='bg-white shadow-xl rounded-lg overflow-hidden'>
          <div className='relative h-48 bg-gradient-to-r from-blue-500 to-[#FF4D30]'>
            <img className='absolute inset-0 h-full w-full object-cover mix-blend-overlay' src='https://wallpapercave.com/wp/wp10784415.jpg' alt='Profile background' />
          </div>
          <div className='relative -mt-16 px-4 sm:px-6 pb-6'>
            <div className='flex flex-col sm:flex-row items-center'>
              <img className='h-32 w-32 rounded-full border-4 border-white shadow-lg' src={user?.profileImage || profile} alt={user.name} />
              <div className='mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left'>
                <h1 className='text-3xl font-bold text-gray-900'>{user.name}</h1>
                <p className='text-sm font-medium text-gray-500'>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                <p className='mt-1 text-sm text-gray-500'>User ID: #{user._id}</p>
              </div>
            </div>

            <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div className='flex items-center'>
                <FaUser className='h-6 w-6 text-gray-400 mr-3' />
                <div>
                  <p className='text-sm font-medium text-gray-500'>Name</p>
                  <p className='mt-1 text-sm text-gray-900'>{user.name}</p>
                </div>
              </div>
              <div className='flex items-center'>
                <FaEnvelope className='h-6 w-6 text-gray-400 mr-3' />
                <div>
                  <p className='text-sm font-medium text-gray-500'>Email</p>
                  <p className='mt-1 text-sm text-gray-900'>{user.email}</p>
                </div>
              </div>
            </div>

            <div className='mt-8 flex flex-col sm:flex-row sm:space-x-4'>
              <Link
                to='/update-profile'
                className='inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF4D30] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto mb-3 sm:mb-0'
              >
                <FaEdit className='mr-2 -ml-1 h-4 w-4' />
                Update Profile
              </Link>
              <Link
                to='/change-password'
                className='inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full sm:w-auto'
              >
                <FaKey className='mr-2 -ml-1 h-4 w-4' />
                Change Password
              </Link>
            </div>
          </div>
        </div>

        {/* <div className='mt-8 bg-white shadow-xl rounded-lg overflow-hidden'>
          <div className='px-4 py-5 sm:p-6'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>Account Statistics</h3>
            <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
              <div className='px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6'>
                <dt className='text-sm font-medium text-gray-500 truncate'>Total Orders</dt>
                <dd className='mt-1 text-3xl font-semibold text-[#FF4D30]'>12</dd>
              </div>
              <div className='px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6'>
                <dt className='text-sm font-medium text-gray-500 truncate'>Wishlist Items</dt>
                <dd className='mt-1 text-3xl font-semibold text-[#FF4D30]'>4</dd>
              </div>
              <div className='px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6'>
                <dt className='text-sm font-medium text-gray-500 truncate'>Reviews Given</dt>
                <dd className='mt-1 text-3xl font-semibold text-[#FF4D30]'>7</dd>
              </div>
            </dl>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MyProfile;
