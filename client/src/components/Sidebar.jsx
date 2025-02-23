import React, {useContext, useEffect, useState} from 'react';
import {  FaUser } from 'react-icons/fa';
import { MdExitToApp, MdMessage, MdSettings } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MessageSide from './MessageSide.jsx';
import "../style.css"
import aos from 'aos';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {setUserData,setIslogin, backendURI} = useContext(AuthContext)

     const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    useEffect(() => {
        aos.init();
      }, []);

    const getActiveLink = (path) => {
      return location.pathname === path ? "active" : "text-gray-400";
    };

    
const onLogout = async () => {
    try {
        const { data } = await axios.post(
            `${backendURI}/api/auth/logout`, 
            {},
            { withCredentials: true }
        );
        if(data.success){
            console.log(data);
            localStorage.clear();
            navigate('/');
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error('Logout error:', error.response?.data || error.message);
    }finally{
        window.location.reload();
        setIslogin(false);
        setUserData(null);
    }
}

    
    const onCancel = () => {
        setShowLogoutConfirmation(false);
    }

    const showLogoutDialog = () => {
        setShowLogoutConfirmation(true);
    }

const LogoutConfirmation = ({ onLogout, onCancel }) => {
    return (
       <>
            <div className='add-img'
                data-aos="fade-in"
                data-aos-duration="1000">
            </div>
            <div className=" fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-lg z-50">
                <div className="flex flex-col items-center p-8 bg-gray-900/80 rounded-2xl border border-white/10 shadow-2xl space-y-6 backdrop-blur-sm"
                    data-aos="fade-in"
                    data-aos-delay="500"
                   data-aos-duration="1000">
                <p className='text-gray-100 text-xl font-medium text-center'>
                    Are you sure you want to logout?
                </p>
                
                <div className='flex gap-4 w-full'>
                    <button 
                        onClick={onLogout}
                        className="flex-1 px-6 py-3 rounded-xl bg-red-500/90 hover:bg-red-400 text-white font-semibold
                        transition-all duration-200 hover:scale-[1.02] active:scale-95"
                    >
                        Logout
                    </button>
                    <button 
                        onClick={onCancel}
                        className="flex-1 px-6 py-3 rounded-xl bg-gray-600/50 hover:bg-gray-500/60 text-gray-200
                        transition-all duration-200 hover:scale-[1.02] active:scale-95"
                    >
                        Cancel
                    </button>
                </div>
            </div>
            </div>
            </>
    );
    };

    return (
      <div className="flex h-screen">
        
            <div className="flex flex-col justify-between items-center w-[10%] md:w-[5%] h-screen bg-[#0F0F0F] text-[#ccc] fixed top-0 left-0">
                <div className='pt-10 flex flex-col items-center gap-8 '>
                    <Link to="/" className=" logo text-[15px] font-semibold hover:text-white transition  text-gray-400">
                         Iregner
                    </Link>
                    <Link to="/" className=" text-[15px] font-semibold hover:text-white transition  text-gray-400">
                         <MdMessage className='text-2xl'/>
                    </Link>
                    
                </div>
                <div className="flex items-center flex-col gap-4 p-6">
                    <Link to="/profile">
                        <FaUser className={`text-[24px]  hover:text-white transition ${getActiveLink("/profile")}`} />
                    </Link>
                    <Link onClick={showLogoutDialog}>
                        <MdExitToApp className="text-[24px] text-gray-400 hover:text-white transition" />
                    </Link>
                    <Link to="">
                        <MdSettings className="text-[24px] text-gray-400 hover:text-white transition" />
                    </Link>
                </div>
            </div>

            <div className="ml-[10%] md:ml-[5%]  bg-[#FBFBFB] border-r border-gray-700 h-screen">
               {location.pathname !== "/profile" ? <MessageSide />: null }
            </div>
               {showLogoutConfirmation && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
                <LogoutConfirmation onLogout={onLogout} onCancel={onCancel} />
            </div>
            )}
            {location.pathname === "/" ?   
             <div className='flex items-center justify-center flex-col w-full p-6 gap-8'>
             <h1 className='text-4xl font-bold text-blue-400 leading-tight text-center'> Start Chat with Mern Chat</h1>
             <p className='text-lg text-gray-600 max-w-lg text-center'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ratione exercitationem
                    deserunt consequuntur, illo labore debitis molestiae itaque iusto! Exercitationem
                    expedita animi odit quos id hic quam iure porro enim, earum nemo.</p>
          </div>: null }
       
        </div>
    );
};

export default Sidebar;
