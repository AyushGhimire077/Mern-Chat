import React, { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import GuestImg from "../assets/guest-img.avif";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Footer from "./Footer.jsx";
import aos from 'aos'

const Guest = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  })

  useEffect(()=> {
    aos.init()
  }, [])
  

  return (
    <div>
      <Navbar />
      <div className="flex justify-evenly items-center h-[100vh] bg-[#0F0F0F] p-8">
        <div className="w-full md:w-[35%] text-white p-1 mb-8 text-start md:text-start">
          <h1 className="text-4xl font-bold mb-4"
            data-aos="fade-in"
            data-aos-duration="2500"
          >Start Chat with your friends or family, Anywhere anytime</h1>
          <p className="mb-4"
            data-aos="fade-in"
            data-aos-duration="2500"
            data-aos-delay="500"
          >With Mern-Chat, An application that allows you to chat with your friends or family, Anywhere anytime</p>
          <Link to='/authorization' className='py-3 px-6 rounded-xl text-center flex items-center gap-2 hover:bg-[#483d9edc] duration-500 bg-[#493D9E] w-fit'
            data-aos="fade-out"
            data-aos-duration="2500"
            data-aos-delay="1000"
          >Get Started <FaArrowRight /></Link>
        </div>
        <div className="w-full md:w-[50%]"
           data-aos="fade-left"
          data-aos-duration="800"
        >
          <img src={GuestImg} alt="img" />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Guest;
