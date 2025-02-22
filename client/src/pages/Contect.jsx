import React, { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapPin,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import Footer from "./Footer.jsx";
import aos from "aos";

const Contact = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    aos.init({
      duration: 2000,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold text-cyan-400 mb-4"
            data-aos="fade-in"
            date-aos-duration="2000"
          >
            Contact Us
          </h1>
          <p
            className="text-gray-300 text-lg"
            data-aos="fade-in"
            date-aos-duration="2000"
            data-aos-delay="500"
          >
            We're here to help and answer any questions you might have.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <div
            className="bg-gray-800 p-6 rounded-xl "
            data-aos="fade-in"
            data-aos-duration="700"
          >
            <div className="space-y-6">
              <ContactItem
                icon={<FaEnvelope className="text-cyan-400" />}
                title="Email"
                value="contact@mernchat.com"
              />
              <ContactItem
                icon={<FaPhoneAlt className="text-cyan-400" />}
                title="Phone"
                value="+977 9810534413"
              />
              <ContactItem
                icon={<FaMapPin className="text-cyan-400" />}
                title="Office"
                value="123 Somwhere , Nepal"
              />
            </div>
          </div>

          {/* Social Links */}
          <div
            className="bg-gray-800 flex flex-col justify-center text-center items-center p-6  rounded-xl"
            data-aos="fade-right"
            data-aos-duration="700"
          >
            <h3 className="text-xl font-semibold text-cyan-400 mb-6">
              Follow Us
            </h3>
            <div className="flex justify-center space-x-6 ">
              <SocialLink href="#">
                <FaFacebook className="w-6 h-6" />
              </SocialLink>
              <SocialLink href="#">
                <FaTwitter className="w-6 h-6" />
              </SocialLink>
              <SocialLink href="#">
                <FaLinkedin className="w-6 h-6" />
              </SocialLink>
              <SocialLink href="#">
                <FaGithub className="w-6 h-6" />
              </SocialLink>
            </div>
          </div>
        </div>

        {/* Map */}
        <div
          className="bg-gray-800 rounded-xl aspect-video flex items-center justify-center"
          data-aos="fade-left"
          data-aos-duration="700"
          data-aos-delay="200"
        >
          <p className="text-gray-400">Map integration coming soon</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ContactItem = ({ icon, title, value }) => (
  <div
    className="flex items-start space-x-4"
    data-aos="fade-in"
    data-aos-duration="2000"
    data-aos-delay="100"
  >
    <div className="mt-1">{icon}</div>
    <div>
      <h3 className="text-gray-300 font-medium">{title}</h3>
      <p className="text-gray-400">{value}</p>
    </div>
  </div>
);

const SocialLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-300 hover:text-cyan-400 transition-colors p-2"
  >
    {children}
  </a>
);

export default Contact;
