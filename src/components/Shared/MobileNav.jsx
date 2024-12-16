import { useState } from 'react';
import { FaArrowLeft, FaBars, FaCaretRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { navItems } from './Navbar';

const MobileNav = () => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const [openNestedSubMenuIndex, setOpenNestedSubMenuIndex] = useState(null);

  const handleMainMenuToggle = () => {
    setIsMainMenuOpen(!isMainMenuOpen);
    setOpenSubMenuIndex(null);
    setOpenNestedSubMenuIndex(null);
  };

  const handleSubMenuOpen = (index) => {
    setIsMainMenuOpen(false);
    setOpenSubMenuIndex(index);
    setOpenNestedSubMenuIndex(null);
  };

  const handleNestedSubMenuOpen = (subIndex) => {
    setOpenNestedSubMenuIndex(subIndex);
  };

  const handleBackToMainMenu = () => {
    setOpenSubMenuIndex(null);
    setOpenNestedSubMenuIndex(null);
    setIsMainMenuOpen(true);
  };

  const handleBackToSubMenu = () => {
    setOpenNestedSubMenuIndex(null);
  };

  return (
    <>
      <div className='flex justify-between items-center md:hidden'>
        <div
          onClick={handleMainMenuToggle}
          className='bg-[#F8748C] text-white p-2'
        >
          <FaBars size={24} />
        </div>
        <div>
          <img
            src='/logo-rentmy-b.png'
            alt='Logo'
            className='h-12 mr-2'
          />
        </div>
      </div>

      {/* Main Menu */}
      {isMainMenuOpen && (
        <div className='bg-[#F5AB1A] text-gray-200'>
          <ul className='px-4 py-2'>
            {navItems.map((navItem, index) => (
              <li
                className='my-4'
                key={index}
              >
                <div className='flex justify-between items-center'>
                  <Link to={navItem.path}>{navItem.label}</Link>
                  {navItem.subMenu && <FaCaretRight onClick={() => handleSubMenuOpen(index)} />}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SubMenu */}
      {openSubMenuIndex !== null && openNestedSubMenuIndex === null && (
        <div className='bg-[#F5AB1A] text-gray-200 pl-4 py-2'>
          <div className='flex items-center mb-4'>
            <FaArrowLeft
              onClick={handleBackToMainMenu}
              className='mr-2 cursor-pointer'
            />
            <span>Back</span>
          </div>
          <ul>
            {navItems[openSubMenuIndex].subMenu.map((subItem, subIndex) => (
              <li
                className='my-2'
                key={subIndex}
              >
                <div className='flex justify-between items-center'>
                  <Link to={subItem.path}>{subItem.label}</Link>
                  {subItem.subItem && <FaCaretRight onClick={() => handleNestedSubMenuOpen(subIndex)} />}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Nested SubItems */}
      {openNestedSubMenuIndex !== null && (
        <div className='bg-[#F5AB1A] text-gray-200 pl-4 py-2'>
          <div className='flex items-center mb-4'>
            <FaArrowLeft
              onClick={handleBackToSubMenu}
              className='mr-2 cursor-pointer'
            />
            <span>Back</span>
          </div>
          <ul>
            {navItems[openSubMenuIndex].subMenu[openNestedSubMenuIndex].subItem.map((nestedItem, nestedIndex) => (
              <li
                className='my-2'
                key={nestedIndex}
              >
                <Link to={nestedItem.path}>{nestedItem.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileNav;
