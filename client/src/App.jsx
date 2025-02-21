import React, { useContext } from "react";
import Guest from "./pages/Guest.jsx";
import { Route, Routes } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import Auth from "./pages/Auth.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
  const { isLogin } = useContext(AuthContext);
  return (
    <>
      <Toaster style={{ position: "fixed", top: "10px", right: "10px" }} />
      <Routes>

       {/* if user is not login then guest page will be shown */}
        {isLogin ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Guest />} />}
        

        <Route path="/authorization" element={<Auth />} />
        
      </Routes>
    </>
  );
};

export default App;
