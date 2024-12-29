import { useState } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FaRegHeart } from 'react-icons/fa6';
import { HiOutlineLogout, HiOutlineUsers } from 'react-icons/hi';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdOutlineCarRental, MdOutlineInsertChartOutlined } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import profile from '../assets/profile.png';
import { logout } from '../store/actions/userLogout';
import {  useMutation } from '@tanstack/react-query';
import axiosInstance from '../hooks/axiosInstance';
import toast from 'react-hot-toast';
import { FiClock } from 'react-icons/fi';
import { LuMessageSquareText } from 'react-icons/lu';
import { VscFeedback } from 'react-icons/vsc';
const commonMenuItems = [
  { id: '01', label: 'Dashboard', path: '/dashboard', icon: <MdOutlineInsertChartOutlined /> },
  { id: '05', label: 'My Profile', path: '/dashboard/my_profile', icon: <CgProfile /> },
];

//admin menu
const menuItemsAdmin = [
  { id: '02', label: 'Users', path: 'users', icon: <HiOutlineUsers /> },
  { id: '03', label: 'Rentals', path: 'rentals', icon: <MdOutlineCarRental /> },
  { id: '04', label: 'Category', path: 'category', icon: <BiCategoryAlt /> },
  { id: '05', label: 'All Contacts', path: 'all_contacts', icon: <LuMessageSquareText /> },
  { id: '06', label: 'All reviews', path: 'all_reviews', icon: <VscFeedback /> },
];

//user menu
const menuItemsUser = [
  { id: '02', label: 'My Bookings', path: 'my_bookings', icon: <HiOutlinePencilSquare /> },
  { id: '03', label: 'My Favorites', path: '/favorite', icon: <FaRegHeart /> },
  { id: '06', label: 'Add Listing', path: '/ad_listing', icon: <HiOutlinePencilSquare /> },
];

//rental menu
const menuItemsRental = [
  { id: '02', label: 'All Rentals', path: 'all_rentals', icon: <MdOutlineCarRental /> },
  { id: '06', label: 'Add Rentals', path: 'add_rental', icon: <HiOutlinePencilSquare /> },
  { id: '06', label: 'My Meta Data', path: 'my_meta_data', icon: <FiClock /> },
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  console.log(userState);
  const role = userState?.userInfo?.data?.role;
  console.log(userState);
  const dispatch = useDispatch();

  let menuItems = [...commonMenuItems];

  if (role === 'admin') {
    menuItems = [...menuItems, ...menuItemsAdmin];
  } else if (role === 'user') {
    menuItems = [...menuItems, ...menuItemsUser];
  } else if (role === 'lessor') {
    menuItems = [...menuItems, ...menuItemsRental];
  }

  const logutMutation = useMutation({
    mutationFn: () => axiosInstance.post('/auth/logout'),
    onSuccess: () => {
      toast.success('Logout successfully!');
      navigate('/');
    },
    onError: (error) => {
      console.error('Failed to logout', error.message);
      toast.error(error.message);
    },
  });
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
    // logutMutation.mutate();
    
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && <div className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden' onClick={() => setIsSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-[#1e2022] transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        {/* Logo */}
        <div className='flex items-center gap-2 px-6 py-4 border-b border-gray-700'>
          {/* <div className="text-white text-2xl"></div> */}
          <span className='text-white text-xl font-bold'>Renity</span>
        </div>

        {/* Menu */}
        <div className='px-4 py-6'>
          <div className='text-gray-400 text-sm mb-4'>Menu</div>
          <nav className='space-y-1'>
            {menuItems?.map((item) => (
              <NavLink key={item.id} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-white ${isActive ? 'bg-[#ff4d30]' : 'hover:bg-[#ff4d30]'}`}>
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}

            <div className=''>
              <button onClick={logoutHandler} className=' py-2  pl-4 w-full rounded-lg text-[18px] text-white text-left flex items-center gap-4 hover:bg-[#ff4d30]'>
                <HiOutlineLogout /> Logout
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className='lg:ml-64'>
        {/* Top Navigation */}
        <header className='bg-white border-b'>
          <div className='flex items-center justify-between px-4 py-4'>
            {/* Mobile Menu Button */}
            <button onClick={() => setIsSidebarOpen(true)} className='lg:hidden p-2 rounded-md hover:bg-gray-100'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>

            {/* Navigation Items */}
            <nav className='hidden lg:flex items-center gap-6'>
              <Link to='/'>Home</Link>
            </nav>

            {/* Right Side Buttons */}
            <div className='flex items-center gap-4'>
              <div className='cursor-pointer relative'>
                <IoIosNotificationsOutline size={24} />
                <span className='absolute h-5 w-5 bg-[#ff4d30] rounded-full -top-2 -left-1 text-white flex items-center justify-center text-sm'>1</span>
              </div>

              <div onClick={toggleDropDown} className='cursor-pointer'>
                <img src={profile} alt='' className='w-12 h-12 border rounded-full dark:bg-gray-500 dark:border-gray-300' />
              </div>
            </div>
          </div>
          {isDropdownOpen && (
            <div className='w-52 absolute right-4  bg-white rounded-sm p-4 shadow-md '>
              <div className='pl-2 mb-2'>{userState?.userInfo?.data?.name}</div>
              <hr />
              <ul className='space-y-2  mt-2'>
                <li>
                  <button onClick={logoutHandler} className='flex items-center gap-2'>
                    <HiOutlineLogout className='mt-1' /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <main className='p-6'>
          <div className='max-w-7xl mx-auto'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
