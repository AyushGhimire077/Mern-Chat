import React, { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import {
  FaRocket,
  FaShieldAlt,
  FaThumbtack,
  FaPaintBrush,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";

const KnowMore = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] min-h-screen">
      <Navbar />
      <div className="text-white flex flex-col items-center justify-center w-[90%] md:w-[80%] lg:w-[70%] mx-auto py-12 space-y-12">
        <div className="text-center space-y-6 animate-fade-in-up">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00A1AB] to-[#00C2CB] bg-clip-text text-transparent"
            data-aos="fade-in"
            data-aos-duration="3000"
          >
            Discover Mern-Chat
          </h1>
        </div>

        <div className="space-y-16 w-full">
          <section className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p
                className="text-base sm:text-lg text-gray-300 leading-relaxed"
                data-aos="fade-in"
                data-aos-duration="3000"
              >
                Mern-Chat redefines real-time communication by combining
                powerful MERN stack technology with user-centric design. Perfect
                for both personal connections and professional collaboration.
              </p>
              <p
                className="text-base sm:text-lg text-gray-300 leading-relaxed"
                data-aos="fade-in"
                data-aos-delay="500"
                data-aos-duration="3000"
              >
                Experience lightning-fast messaging, military-grade security,
                and seamless media sharing - all wrapped in an elegant interface
                that adapts to your needs.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#00A1AB]/20 to-[#00C2CB]/10 p-8 rounded-2xl border border-[#00A1AB]/30">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-32 bg-[#00A1AB]/10 rounded-xl animate-pulse-slow"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-semibold text-center">
              Core Features
            </h2>
            <div
              className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              data-aos="fade-in"
              data-aos-duration="3000"
            >
              {[
                {
                  icon: FaRocket,
                  title: "Real-time Sync",
                  text: "Instant message delivery with socket integration",
                },
                {
                  icon: FaShieldAlt,
                  title: "Bank-grade Security",
                  text: "End-to-end encryption & JWT authentication",
                },
                {
                  icon: FaThumbtack,
                  title: "Reliable",
                  text: "99.9% uptime guaranteed with cloud infrastructure",
                },
                {
                  icon: FaPaintBrush,
                  title: "Modern UI",
                  text: "Responsive design with dark/light modes",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#ffffff]/5 rounded-xl backdrop-blur-sm border border-[#ffffff]/10 hover:border-[#00A1AB]/50 transition-all duration-300 group w-[90%] mx-auto"
                >
                  <feature.icon className="h-10 w-10 text-[#00A1AB] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-300">{feature.text}</p>
                </div>
              ))}
            </div>
          </section>

          <div
            className="text-center space-y-8"
            data-aos="fade-out"
            data-aos-duration="2000"
          >
            <div className="inline-block bg-gradient-to-r from-[#00A1AB] to-[#00C2CB] p-0.5 rounded-full animate-gradient-x">
              <Link
                to="/authorization"
                className="block px-12 py-3 bg-[#0F0F0F] rounded-full text-lg font-semibold hover:bg-transparent transition-colors duration-300"
              >
                Start Connecting Now →
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              Join 50,000+ satisfied users worldwide
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default KnowMore;
