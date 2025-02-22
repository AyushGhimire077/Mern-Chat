import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "./Footer.jsx";
import { HiOutlineMail, HiLockClosed, HiUser } from "react-icons/hi";
import { FaGoogle, FaGithub } from "react-icons/fa"; 
import aos from "aos";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerUser, loginUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);    
  }

  useEffect(() => {
    aos.init({
      duration: 1000,
    })
  }, [])

  useEffect(() => {
    aos.refresh();
  },[isLogin])


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await loginUser(email, password);
      } else {
        await registerUser(name, email, password);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] flex items-center justify-center p-4">
        <div
          data-aos="fade-right"
          data-aos-duration="600"
          key={isLogin}
          className="w-full max-w-md bg-[#ffffff]/5 backdrop-blur-xl rounded-2xl border border-[#ffffff]/10 p-8 transition-all duration-300 hover:border-[#00A1AB]/50"
        >
          <div className="flex flex-col items-center mb-8">
            <h2
              className="text-3xl font-bold bg-gradient-to-r from-[#00A1AB] to-[#00C2CB] bg-clip-text text-transparent"
              data-aos="fade-in"
              data-aos-duration="2000"
              data-aos-delay="200"
            >
              {isLogin ? "Welcome Back" : "Get Started"}
            </h2>
            <p
              className="text-gray-400 mt-2"
              data-aos="fade-in"
              data-aos-duration="2000"
              data-aos-delay="500"
            >
              {isLogin ? "Sign in to continue" : "Create your account"}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            data-aos="fade-in"
            data-aos-duration="2000"
            data-aos-delay="200"
          >
            {!isLogin && (
              <div className="relative group">
                <HiUser className="h-5 w-5 text-[#00A1AB] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#ffffff]/05 rounded-lg border border-[#ffffff]/15 focus:border-[#00A1AB] focus:ring-2 focus:ring-[#00A1AB]/30 text-white placeholder-gray-400 transition-all"
                />
              </div>
            )}

            <div className="relative group">
              <HiOutlineMail className="h-5 w-5 text-[#00A1AB] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 bg-[#ffffff]/05 rounded-lg border border-[#ffffff]/15 focus:border-[#00A1AB] focus:ring-2 focus:ring-[#00A1AB]/30 text-white placeholder-gray-400 transition-all"
              />
            </div>

            <div className="relative group">
              <HiLockClosed className="h-5 w-5 text-[#00A1AB] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-[#ffffff]/05 rounded-lg border border-[#ffffff]/15 focus:border-[#00A1AB] focus:ring-2 focus:ring-[#00A1AB]/30 text-white placeholder-gray-400 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#00A1AB] to-[#00C2CB] text-white py-3.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00A1AB]/20 transition-all duration-300 relative"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div
            className="mt-6"
            data-aos="fade-in"
            data-aos-duration="2000"
            data-aos-delay="400"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#ffffff]/10"></div>
              </div>
              <div
                className="relative flex justify-center text-sm"
                data-aos="fade-in"
                data-aos-duration="1000"
              >
                <span className="px-2 bg-transparent text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 w-full p-3 bg-[#ffffff]/05 hover:bg-[#ffffff]/10 border border-[#ffffff]/10 rounded-lg transition-all">
                <FaGoogle className="w-5 h-5 text-[#00A1AB]" />
                <span className="text-sm font-medium text-gray-300">
                  Google
                </span>
              </button>
              <button className="flex items-center justify-center gap-2 w-full p-3 bg-[#ffffff]/05 hover:bg-[#ffffff]/10 border border-[#ffffff]/10 rounded-lg transition-all">
                <FaGithub className="w-5 h-5 text-[#00A1AB]" />
                <span className="text-sm font-medium text-gray-300">
                  GitHub
                </span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={handleToggle}
              className="font-semibold text-[#00A1AB] hover:text-[#00C2CB] transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
