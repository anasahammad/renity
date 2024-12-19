import { useContext } from 'react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LanguageContext from '../../context/LanguageContext';
import MobileNav from './MobileNav';

export const navItems = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'About Us',
    path: '/about_us',
  },
  {
    label: 'Equipment',
    path: '/catalog',
    subMenu: [
      {
        label: 'Catalog',
        path: '/catalog',
        subItem: [
          { label: 'List', path: '/list' },
          { label: 'Grid', path: '/grid' },
        ],
      },
      {
        label: 'Single',
        path: '/',
        subItem: [
          { label: 'List', path: '/list' },
          { label: 'Grid', path: '/grid' },
        ],
      },
    ],
  },
  {
    label: 'Blog',
    path: '/blog',
    subMenu: [
      {
        label: 'Blog Grid',
        path: '/',
      },
      {
        label: 'Blog Single',
        path: '/',
      },
    ],
  },
  {
    label: 'Contact Us',
    path: '/contact_us',
  },
];

const user = { name: 'Anas Ahammad Sarker', email: 'anasahammad2002@gmail.com', role: 'user' };
const Navbar = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const userState = useSelector((state) => state.user);
  return (
    <header className='md:flex md:justify-between md:items-center py-4 md:py-8 px-4 md:px-8 fixed z-50 bg-white w-full'>
      {/* Mobile Nav */}
      <MobileNav />

      {/* Logo Section */}
      <div className='hidden md:flex items-center gap-8'>
        <img src='/rentalLogo.png' alt='Logo' className='h-12 mr-2' />

        {/* Navigation Links */}
        <nav className='flex items-center space-x-8'>
          <ul className='flex items-center gap-4 text-sm'>
            {navItems.map((item, index) => (
              <li key={index} className='relative group'>
                <Link to={item.path} className='text-gray-700 hover:text-gray-900 font-semibold relative transition duration-300 flex items-center gap-1'>
                  {item.label}
                  {item.subMenu && <BiChevronDown />}
                  <span className='absolute left-0 bottom-0 h-[1px] w-0 bg-[#F8748C] transition-all duration-300 group-hover:w-full'></span>
                </Link>

                {/* Sub menu */}
                {item.subMenu && (
                  <ul className='absolute hidden group-hover:flex flex-col bg-white shadow-md mt-1 rounded py-2 left-0 w-40 z-50 '>
                    {item.subMenu.map((subItem, subIndex) => (
                      <li key={subIndex} className='relative group'>
                        <Link to={subItem.path} className='px-4 py-2 hover:bg-gray-100 flex items-center justify-between '>
                          {subItem.label}
                          {subItem.subItem && <BiChevronRight className='text-[#F8748C]' size={18} />}
                        </Link>

                        {/* Nested subItem dropdown */}
                        {subItem.subItem && (
                          <div className='absolute hidden group-hover:flex group-hover:flex-col bg-white shadow-md rounded py-2 left-full top-0 w-40 ml-1'>
                            {subItem.subItem.map((nestedItem, nestedIndex) => (
                              <Link key={nestedIndex} to={nestedItem.path} className='px-4 py-2 hover:bg-gray-100'>
                                {nestedItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-base'>{language === 'en' ? 'English' : 'বাংলা'}</h1>
        <select value={language} onChange={(e) => changeLanguage(e.target.value)} className='p-2 bg-gray-200 border rounded'>
          <option value='en'>English</option>
          <option value='bn'>বাংলা</option>
        </select>
      </div>
      {/* Shopping Cart Icon */}
      <div className='hidden md:flex space-x-2 items-center'>
        <Link to='/cart' className='bg-[#F8748C] text-white w-12 h-12 p-3 rounded-full flex items-center justify-center hover:bg-white hover:text-[#F8748C] hover:border hover:border-[#F8748C] transition duration-300'>
          <FiShoppingCart size={24} />
        </Link>

        <div className='flex items-center gap-4'>
          <div className='flex space-x-4'>
            {!userState?.userInfo && (
              <button className='bg-[#EAB308] text-white py-1.5 px-3 rounded-md'>
                <Link to='/login'>Login</Link>
              </button>
            )}
            {!userState?.userInfo && (
              <button className='bg-[#EAB308] text-white py-1.5 px-3 rounded-md'>
                <Link to="/register/lessor"> Become a Rental</Link>
              </button>
            )}
          </div>

          {userState?.userInfo && (
            <Link to='/dashboard' className='bg-gray-600 w-12 h-12 border rounded-full text-white flex justify-center items-center text-xl uppercase'>
              {userState?.userInfo?.data?.name?.slice(0, 1)}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
