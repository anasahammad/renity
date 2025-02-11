import { Link } from 'react-router-dom';
import profile from '../assets/profile.png';
import { useSelector } from 'react-redux';

const MyProfile = () => {
  
  const userState = useSelector((state) => state.user);
  const user = userState.userInfo.data;
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white shadow-lg rounded-2xl w-3/5'>
        <img alt='profile' src='https://wallpapercave.com/wp/wp10784415.jpg' className='w-full mb-4 rounded-t-lg h-36' />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <Link to='/' className='relative block'>
            <img alt='profile' src={profile} className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white ' />
          </Link>

          <p className='p-2  px-4 text-xs text-white bg-[#FF4D30] rounded-full'>{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>User Id: #{user?._id}</p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>{user?.name}</span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black '>{user.email}</span>
              </p>

              <div>
                <button className='bg-[#FF4D30] px-10 py-1 rounded-lg text-white cursor-pointer  block mb-1'>Update Profile</button>

                <button className='bg-[#FF4D30] px-7 py-1 rounded-lg text-white cursor-pointer '>Change Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
