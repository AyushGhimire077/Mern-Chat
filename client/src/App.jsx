import React, { useContext } from "react";
import Guest from "./pages/Guest.jsx";
import { Route, Routes } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import Auth from "./pages/Auth.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import KnowMore from "./pages/KnowMore.jsx";
import Contect from "./pages/Contect.jsx";
import Profile from "./pages/Profile.jsx";

const App = () => {
  const { isLogin } = useContext(AuthContext);

  return (
    <>
      <Toaster style={{ position: "fixed", top: "10px", right: "10px" }} />
      <Routes>
        {/* if user is not login then guest page will be shown */}
        {isLogin ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Guest />} />
        )}

        {/* only acessible when user is not login */}
        {!isLogin && (
          <>
            <Route path="/authorization" element={<Auth />} />
            <Route path="/know-more" element={<KnowMore />} />
            <Route path="/contact" element={<Contect />} />
          </>
        )}

        {/* access only if login is truee */}
        {isLogin && (
          <>
            <Route path="/profile" element={<Profile />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
