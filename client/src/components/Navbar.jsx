import React, { useContext, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../style.css";
import { AuthContext } from "../context/AuthContext";
import { FaBars, FaUser, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const isActive = useLocation();
  const navigate = useNavigate();

  // Mobile menu visibility state
  const [isShow, setIsShow] = useState(false);

  const { isLogin } = useContext(AuthContext);

  const getActiveLink = (path) => {
    return isActive.pathname === path ? "active" : "text-white";
  };

  return (
    <div className="bg-[#0F0F0F]">
      <div className="flex justify-between  items-center py-6 px-8 md:px-20 lg:px-32 bg-neutral-950 text-white">
        <h1
          onClick={() => navigate("/")}
          className="md:text-3xl md:p-0 px-2 text-2xl cursor-pointer"
        >
          Mern-Chat
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <Link
              to="/"
              className={`hover:text-[#0D7377] duration-500 text-[17px] ${getActiveLink(
                "/"
              )}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/know-more"
              className={`hover:text-[#0D7377] duration-500 text-[17px] ${getActiveLink(
                "/know-more"
              )}`}
            >
              Know more
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`hover:text-[#0D7377] duration-500 text-[17px] ${getActiveLink(
                "/contact"
              )}`}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Desktop User Icon */}
        <div className="hidden md:flex items-center gap-8">
          {isLogin ? (
            <Link to="">
              <FaUser className="text-2xl" />
            </Link>
          ) : (
            <>
              <Link
                to="/authorization"
                className={`login-btn ${getActiveLink("/authorization")}`}
              >
                <span>Login</span>
              </Link>
              <Link
                to="/authorization"
                className={`custom-button ${getActiveLink("/register")}`}
              >
                <span>Sign up</span>
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button for Mobile */}
        <div className="md:hidden text-2xl focus:outline-none">
          <button onClick={() => setIsShow(!isShow)}>
            <FaBars />
          </button>
        </div>
      </div>

      <hr className="border-[#fff] shadow-2xs w-[80%] m-auto" />

      {/* Mobile Dropdown Menu (Right side fixed position) */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 bg-[#435585]  h-[50%] text-center rounded-es-2xl w-[60%] z-10 flex flex-col gap-3.5 text-2xl p-6 transition-all duration-300 ease-in-out ${
          isShow ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end text-center items-center">
          <button
            onClick={() => setIsShow(false)}
            className="text-xl text-white"
          >
            <FaTimes />
          </button>
        </div>

        <ul className="flex flex-col gap-7">
          <li>
            <Link
              to="/"
              onClick={() => setIsShow(false)}
              className={`hover:text-[#0D7377] duration-500 text-[17px] ${getActiveLink(
                "/"
              )}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/know-more"
              onClick={() => setIsShow(false)}
              className={`hover:text-[#0D7377] duration-500 text-[17px] ${getActiveLink(
                "/know-more"
              )}`}
            >
              Know more
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={() => setIsShow(false)}
              className={`hover:text-[#0D7377] duration-500 text-[17px] ${getActiveLink(
                "/contact"
              )}`}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex flex-col items-center gap-6">
          {isLogin ? (
            <Link to="">
              <FaUser className="text-2xl" />
            </Link>
          ) : (
            <>
              <Link
                to="/authorization"
                onClick={() => setIsShow(false)}
                className={`login-btn ${getActiveLink("/authorization")}`}
              >
                <span>Login</span>
              </Link>
              <Link
                to="/authorization"
                onClick={() => setIsShow(false)}
                className={`custom-button text-[17px] ${getActiveLink(
                  "/register"
                )}`}
              >
                <span>Sign up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
