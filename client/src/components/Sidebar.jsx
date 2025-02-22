import React from 'react'
import { FaUser } from 'react-icons/fa'
import { MdExitToApp, MdSettings } from "react-icons/md";
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const getActiveLink = (path) => {
      return location.pathname === path ? "active" : "#ccc";
    }
  
  return (
    <div className="flex flex-col justify-between items-center fixed w-[10%] md:w-[5%] h-screen bg-[#0F0F0F] text-[#ccc] top-0 left-0">
      <div>
        <Link to="/" className={`${getActiveLink("/")}`}>
          <p className="pt-10 text-[15px]">Mern Chat</p>
        </Link>
      </div>
      <div className="flex items-center flex-col gap-3.5 p-7">
        <Link to="/profile">
          <FaUser className={`text-[20px] ${getActiveLink("/profile")}`} />
        </Link>
        <Link to="">
          <MdExitToApp className="text-[20px]" />
        </Link>
        <Link to="">
          <MdSettings className="text-[20px]" />
        </Link>
      </div>
    </div>
  );
}

export default Sidebar
