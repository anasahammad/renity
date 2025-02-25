import { useContext, useEffect, useState } from 'react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LanguageContext from '../../context/LanguageContext';
import MobileNav from './MobileNav';
import axios from 'axios';
import Flag from 'react-world-flags';

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
    label: 'Contact Us',
    path: '/contact_us',
  },
  {
    label: 'All Rental Items',
    path: '/all_rentals_items',
  },
  {
    label: 'Blog',
    path: '/all_blogs',
  },
  {
    label: 'Become a Rental',
    path: '/register/lessor',
  },
];

export const topNavItems = [
  { label: 'How Rental Sheba Works', path: '/how-it-works' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact Us', path: '/contact_us' },
];

// Placeholder for category data




const Navbar = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const userState = useSelector((state) => state.user);
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
   const [isScrolled, setIsScrolled] = useState(false);
   useEffect(() => {
     // Simulating API call to fetch categories
     const fetchCategories = async () => {
       const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
        const categories = response.data.data;
       setFetchedCategories(categories);
     };

     fetchCategories();
   }, []);
  
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className={`fixed z-50 w-full bg-white shadow-md transition-all duration-300 `}>
      {/* Top mini-navbar */}
      <div className={`py-2 ${isScrolled ? 'hidden' : ''} transition-all duration-300  flex justify-end items-center bg-[#EBB714] text-white `}>
        <div className='  px-4 flex justify-end space-x-4'>
          {topNavItems.map((item, index) => (
            <Link key={index} to={item.path} className='text-sm font-medium hover:underline'>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main navbar */}
      <div className=' mx-auto px-4 py-4 md:py-6'>
        <div className='flex justify-between items-center'>
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
                      <ul className='absolute hidden group-hover:block bg-white shadow-md mt-1 rounded py-2 left-0 w-40 z-50'>
                        {item.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link to={subItem.path} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Language selector and user actions */}
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <div className='flex items-center'>
                {language === 'en' ? (
                  <div className='flex items-center'>
                    <Flag code='US' className='w-6 h-4 mr-2' />
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <Flag code='BD' className='w-6 h-4 mr-2' />
                  </div>
                )}
              </div>
              <select value={language} onChange={(e) => changeLanguage(e.target.value)} className='p-1 bg-gray-200 border rounded text-sm'>
                <option value='en'>English</option>
                <option value='bn'>বাংলা</option>
              </select>
            </div>

            {/* Shopping Cart Icon */}
            <Link to='/cart' className='bg-[#F8748C] text-white w-10 h-10 p-2 rounded-full flex items-center justify-center hover:bg-white hover:text-[#F8748C] hover:border hover:border-[#F8748C] transition duration-300'>
              <FiShoppingCart size={20} />
            </Link>

            {/* User actions */}
            <div className='flex items-center space-x-4'>
              {!userState?.userInfo && (
                <button className='bg-[#EAB308] text-white py-1.5 px-3 rounded-md'>
                  <Link to='/login'>Login</Link>
                </button>
              )}
              {userState?.userInfo && (
                <Link to='/dashboard' className='bg-gray-600 w-12 h-12 border rounded-full text-white flex justify-center items-center text-xl uppercase'>
                  {userState?.userInfo?.data?.name?.slice(0, 1)}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom full-width category navbar */}
      <nav className={`py-2 hidden  relative ${isScrolled ? 'hidden' : 'md:block'}`}>
        <div className=' mx-auto px-4'>
          <ul className='flex justify-between'>
            {fetchedCategories.map((category, index) => (
              <li key={index} className='relative group' onMouseEnter={() => setHoveredCategory(category)} onMouseLeave={() => setHoveredCategory(null)}>
                <Link to={`/category/${category.name.toLowerCase()}`} className='text-gray-700 text-sm hover:text-gray-900 font-medium'>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Full-width subcategory grid */}
        {hoveredCategory && (
          <div className='absolute left-0 w-full bg-[#FFF9EC] shadow-md py-6 z-50' onMouseEnter={() => setHoveredCategory(hoveredCategory)} onMouseLeave={() => setHoveredCategory(null)}>
            <div className='container mx-auto px-4'>
              <h3 className='text-lg font-semibold mb-4'>{hoveredCategory.name}</h3>
              <div className='grid grid-cols-4 gap-4'>
                {hoveredCategory?.subcategories.map((subcat, subIndex) => (
                  <Link key={subIndex} to={`/rental?category=${hoveredCategory.name}`}
                   className='text-gray-600 hover:text-gray-900 hover:underline flex items-center gap-2 '>
                    <img className='w-10 h-10 rounded-full' src={subcat?.icon} alt='' />
                    <span className='text-sm'> {subcat?.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
