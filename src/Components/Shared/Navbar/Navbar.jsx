import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "About Us",
      path: "/about_us",
    },
    {
      label: "Equipment",
      path: "/equipment",
      subMenu: [
        {
          label: "Catalog",
          path: "/catalog",
          subItem: [
            { label: "List", path: "/list" },
            { label: "Grid", path: "/grid" },
          ],
        },
        {
          label: "Single",
          path: "/single",
          subItem: [
            { label: "List", path: "/list" },
            { label: "Grid", path: "/grid" },
          ],
        },
      ],
    },
    {
      label: "Blog",
      path: "/blog",
    },
    {
      label: "Contact Us",
      path: "/contact_us",
    },
  ];

  return (
    <header className="flex justify-between items-center py-8 px-8  fixed z-50 bg-white w-full">
      {/* Logo Section */}
      <div className="flex items-center gap-8">
        <img src="/logo-rentmy-b.png" alt="Logo" className="h-12 mr-2" />
        {/* Navigation Links */}
        <nav className="flex items-center space-x-8">
          <ul className="flex items-center gap-4 text-sm">
            {navItems.map((item, index) => (
              <li key={index} className="relative group">
                <Link
                  to={item.path}
                  className="text-gray-700 hover:text-gray-900 font-semibold relative transition duration-300 flex items-center gap-1"
                >
                  {item.label}
                  {item.subMenu && <BiChevronDown />}
                  <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-[#F8748C] transition-all duration-300 group-hover:w-full"></span>
                </Link>

                {/* Sub menu */}
                {item.subMenu && (
                  <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md mt-2 rounded py-2 left-0 w-40 z-50">
                    {item.subMenu.map((subItem, subIndex) => (
                      <div key={subIndex} className="relative group">
                        <Link
                          to={subItem.path}
                          className="px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                        >
                          {subItem.label}
                          {subItem.subItem && (
                            <BiChevronRight
                              className="text-[#F8748C]"
                              size={18}
                            />
                          )}
                        </Link>

                        {/* Nested subItem dropdown */}
                        {subItem.subItem && (
                          <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded py-2 left-full top-0 w-40 ml-1 ">
                            {subItem.subItem.map((nestedItem, nestedIndex) => (
                              <Link
                                key={nestedIndex}
                                to={nestedItem.path}
                                className="px-4 py-2 hover:bg-gray-100"
                              >
                                {nestedItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Shopping Cart Icon */}
      <div className="flex items-center">
        <Link
          to="/cart"
          className="bg-[#F8748C] text-white p-3 rounded-full flex items-center justify-center hover:bg-white hover:text-[#F8748C] hover:border hover:border-[#F8748C] transition duration-300"
        >
          <FiShoppingCart size={24} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
