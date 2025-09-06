import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import { useTab } from "../context/TabContext";
import { FaBook, FaUser, FaUserAlt, FaKey, FaSignOutAlt } from "react-icons/fa";
const MobileMenu = ({ links, isMenuOpen, toggleMenu }) => {
  const { user, logout } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  const { setActiveTab } = useTab();
  return (
    <div
      className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={toggleMenu}
    >
      <div
        className="absolute top-0 right-0 text-white bg-gradient-to-r from-[#060B33] to-[#383F71] w-3/4 h-full shadow-xl transform translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <img src={Logo} alt="Logo" className="w-[150px]" />
          <button onClick={toggleMenu} className="text-white text-3xl">
            &times;
          </button>
        </div>
        <ul className="p-6 space-y-6">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.route}
                className={({ isActive }) =>
                  `block text-xl ${
                    isActive
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#DB0032] to-[#FA6602] font-bold"
                      : "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
                  }`
                }
                onClick={toggleMenu}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex flex-col space-y-4 p-6 border-t">
          {user ? (
            <>
              <div className="flex justify-between items-center gap-6 relative flex-wrap">
                <span>Welcome, {user.first_name}!</span>
                <span className="group cursor-pointer border-2 border-[#db2100] flex justify-center items-center h-10 w-10 text-center rounded-full">
                  <FaUser className="w-5 h-5" />
                  <div
                    id="dropdownContainer"
                    className="absolute z-20 top-full right-0 bg-gradient-to-r from-[#060B33] to-[#383F71] text-white px-6 py-4 border-2 border-[#383F71] rounded-md shadow-lg w-60 hidden group-hover:block "
                  >
                    <h2 className="font-bold text2xl mb-6 text-center text-white">
                      My Profile
                    </h2>
                    <hr className="my-4 border-[#DB0032] border-2" />

                    <div className="space-y-5">
                      <div className="flex items-center cursor-pointer space-x-3 hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:text-white transition-all duration-300 rounded-md p-2">
                        <FaBook className=" text-sm transition-colors duration-300" />
                        <Link
                          to="/login-signup"
                          state={{ activeTab: "journey" }} // pass tab via state
                          className="text-sm font-medium transition-colors
                      duration-300"
                        >
                          My learning journey
                        </Link>
                      </div>

                      <div className="flex items-center cursor-pointer space-x-3 hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:text-white transition-all duration-300 rounded-md p-2">
                        <FaUserAlt className=" text-sm transition-colors duration-300" />
                        <Link
                          to="/login-signup"
                          state={{ activeTab: "personal" }} // pass tab via state
                          className="text-sm font-medium transition-colors
                      duration-300"
                        >
                          Personal details
                        </Link>
                      </div>

                      <div className="flex items-center cursor-pointer space-x-3 hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:text-white transition-all duration-300 rounded-md p-2">
                        <FaKey className=" text-sm  transition-colors duration-300" />
                        <Link
                          to="/login-signup"
                          state={{ activeTab: "password" }} // pass tab via state
                          className="text-sm font-medium transition-colors
                      duration-300"
                        >
                          Change password
                        </Link>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={logout}
                      className="mt-6 text-white w-full group transition-transform duration-500 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none text-[14px] sm:text-sm md:text-[16px] px-5 py-3 flex items-center justify-center"
                    >
                      <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                      <span className="relative text-white group-hover:text-white flex items-center">
                        <FaSignOutAlt className="mr-2 text-sm" />
                        Sign Out
                      </span>
                    </button>
                  </div>
                </span>
              </div>
            </>
          ) : (
            <>
              <NavLink
                // onClick={handleLoginClick}
                to="/login-signup"
                state={{ activeTab: "login" }}
                className="text-white group flex justify-center items-center transition-transform duration-500 ease-out transform uppercase text-[12px] bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl font-bold text-sm px-10 py-3"
              >
                <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative text-white text-center group-hover:text-transparent bg-clip-text bg-gradient-to-r from-[#DB0032] to-[#FA6602]">
                  Login
                </span>
              </NavLink>
              <NavLink
                to="/login-signup"
                state={{ activeTab: "signup" }}
                type="button"
                className="text text-center group transition-transform duration-500 ease-out transform uppercase text-[12px] hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] font-bold text-sm px-10 py-3 border-btn border-white hover:border-[#ed3b15]"
              >
                <span>Sign up</span>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
