import React from 'react';
import { FaUser } from 'react-icons/fa';
import { MdExitToApp, MdSettings } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import MessageSide from './MessageSide.jsx';
import "../style.css"
const Sidebar = () => {
    const location = useLocation();

    const getActiveLink = (path) => {
      return location.pathname === path ? "active" : "text-gray-400";
    };

    return (
      <div className="flex h-screen">
        
            <div className="flex flex-col justify-between items-center w-[10%] md:w-[5%] h-screen bg-[#0F0F0F] text-[#ccc] fixed top-0 left-0">
                <div className='pt-10 logo'>
                    <Link to="/" className=" text-[15px] font-semibold hover:text-white transition  text-gray-400">
                         Iregner
                    </Link>
                </div>
                <div className="flex items-center flex-col gap-4 p-6">
                    <Link to="/profile">
                        <FaUser className={`text-[24px]  hover:text-white transition ${getActiveLink("/profile")}`} />
                    </Link>
                    <Link to="">
                        <MdExitToApp className="text-[24px] text-gray-400 hover:text-white transition" />
                    </Link>
                    <Link to="">
                        <MdSettings className="text-[24px] text-gray-400 hover:text-white transition" />
                    </Link>
                </div>
            </div>

            <div className="ml-[10%] md:ml-[5%]  bg-[#FBFBFB] border-r border-gray-700 h-screen">
               {location.pathname === "/profile" ? null :  <MessageSide />}
            </div>
        </div>
    );
};

export default Sidebar;
