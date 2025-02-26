import React, { useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom"; 

const Footer = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  return (
    <div className="bg-gradient-to-r from-[#0F0F0F] to-[#1A1A1A] py-12 pt-10">
      <div className="max-w-screen-xl mx-auto text-white px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-4xl font-bold text-[#00A1AB] mb-2">
              Mern-Chat
            </h3>
            <p className="text-gray-400 text-[12px] sm:text-sm">
              © 2025 Mern-Chat. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 justify-center md:justify-start">
            <Link to="/" className="text-gray-300 hover:text-[#00A1AB] transition duration-300 text-[16px] sm:text-lg">
              Home
            </Link>
            <Link to="/features" className="text-gray-300 hover:text-[#00A1AB] transition duration-300 text-[16px] sm:text-lg" >
              Features
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-[#00A1AB] transition duration-300 text-[16px] sm:text-lg" >
              Contact
            </Link>
            <Link to="/know-more" className="text-gray-300 hover:text-[#00A1AB] transition duration-300 text-[16px] sm:text-lg" >
              About
            </Link>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mt-8">
          <a href="/" className="text-gray-300 hover:text-[#00A1AB] transition duration-300 text-xl sm:text-2xl">
            <FaFacebook />
          </a>
          <a href="/" className="text-gray-300 hover:text-[#00A1AB] transition duration-300 text-xl sm:text-2xl">
            <FaTwitter />
          </a>
          <a href="/" className="text-gray-300 hover:text-[#00A1AB] transition duration-300 text-xl sm:text-2xl">
            <FaInstagram />
          </a>
          <a href="/" className="text-gray-300 hover:text-[#00A1AB] transition duration-300 text-xl sm:text-2xl" >
            <FaLinkedin />
          </a>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Powered by{" "}
            <span className="font-semibold text-[#00A1AB]">Mern-Chat</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
