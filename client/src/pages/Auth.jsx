import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { registerUser, loginUser } = useContext(AuthContext);


  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if (isLogin) {
          loginUser(email, password);
      } else {
          registerUser(name, email, password);
      }
  };

    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
          <div className="w-[380px] bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {isLogin ? "Login" : "Regsiter"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-5"
            >
              {isLogin ? null : (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-2.5 text-[14px] bg-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0D7377] text-gray-700"
                />
              )}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-5 py-2.5 text-[14px] bg-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0D7377] text-gray-700"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-5 py-2.5 text-[14px] bg-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0D7377] text-gray-700"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold text-[16px] hover:bg-blue-700 transition-all duration-300 shadow-md"
              >
                {isLogin ? "Sign in" : "Sign up"}
              </button>
            </form>

            <div className="w-full flex justify-between mt-5 text-gray-600 text-sm">
              <p className="cursor-pointer hover:text-blue-500 transition">
                Forgot Password?
              </p>
              <p
                onClick={handleToggle}
                className="cursor-pointer hover:text-purple-500 transition"
              >
                Create Account
              </p>
            </div>
          </div>
        </div>
      </>
    );
};

export default Auth;
