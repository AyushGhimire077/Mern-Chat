import React, { useContext } from 'react'
import { useLocation, Link,useNavigate } from 'react-router-dom'
import '../style.css'
import { AuthContext } from '../context/AuthContext';
import { FaUser } from "react-icons/fa"; 

const Navbar = () => {
    const isActive = useLocation();
    const naviagate = useNavigate();

    const { isLogin } = useContext(AuthContext);
    
    
    const getActiveLink = (path) => {
        return isActive.pathname === path ? 'active ' : 'text-white';
    }

    return (
      <div className='bg-[#0F0F0F]'>
      <div className='flex justify-between items-center py-6 px-32 bg-neutral-950 text-white'>
          <h1 onClick={()=> naviagate('/')} className='text-3xl cursor-pointer'>Mern-Chat</h1>
          <div>
              <ul className='flex items-center gap-10'>
                  <li><Link to='/' className={` hover:text-[#0D7377] duration-500 text-[17px] ${getActiveLink('/')}`}>Home</Link></li>
                  <li><Link to='/know-more' className={`hover:text-[#0D7377] duration-500 text-[17px] ${getActiveLink('/know-more')}`}>Know more</Link></li>
                  <li><Link to='/contact' className={`hover:text-[#0D7377] duration-500 text-[17px] ${getActiveLink('/contact')}`}>Contect</Link></li>                  
              </ul>
          </div>
          <div className='flex items-center gap-8'>
              {isLogin ? (
                  <Link to = ''><FaUser className='text-2xl' /></Link>
              ) : 
                  <>
                   <Link to='/authorization' className={` login-btn ${getActiveLink('/authorization')}`}><span>Login</span></Link>
                   <Link to='/authorization' className={`custom-button ${getActiveLink('/register')}`}><span>Sign up</span></Link>
                  </>
              }
          </div>
            </div>
        <hr className='border-[#fff] shadow-2xs  w-[80%] m-auto '/>
    </div>
  )
}

export default Navbar