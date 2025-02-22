import React, { useContext, useEffect, useState } from "react";
import { FaCamera, FaUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import aos from 'aos';

const Profile = () => {
  const { userData, handleProfile } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  //for aos animation
  useEffect(() => { aos.init(); }, [])

  const handleClick = async () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";

    inputFile.onchange = () => {
      const file = inputFile.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); 
        handleProfile(reader.result);
      };
      reader.readAsDataURL(file);
    };

    inputFile.click(); 
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 ml-20 m-auto w-fit">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div
            className="text-center mb-8"
            data-aos="fade-in"
            data-aos-duration="1000"
          >
            <h1 className="text-4xl font-semibold text-gray-800 mb-2">
              Your Profile
            </h1>
            <p className="text-gray-600">Manage your account details</p>
          </div>

          {/* Profile Image */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div
              className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center shadow-lg"
              data-aos="fade-in"
              data-aos-duration="800"
              data-aos-delay="300"
            >
              {userData?.userProfile ? (
                <img
                  src={userData?.userProfile}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaUser className="text-3xl text-blue-500" />
              )}
            </div>
            <button
              onClick={handleClick}
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
            >
              <FaCamera className="text-blue-500 text-sm" />
            </button>
          </div>

          {/* Profile Information */}
          <div
            className="space-y-6 bg-white p-6 rounded-2xl shadow-xl"
            data-aos="fade-right"
            data-aos-duration="500"
            data-aos-delay="200"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-lg font-[500] capitalize text-gray-800">
                {userData?.fullName}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-[16px] font-[500] text-gray-800">
                {userData?.email}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">
                Password
              </label>
              <p className="text-lg font-semibold text-gray-800">••••••••</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
