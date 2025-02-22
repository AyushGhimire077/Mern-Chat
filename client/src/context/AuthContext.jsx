import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    //backendURI
    const backendURI = 'http://localhost:4000';

    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false);

    //check if user is logged in
    const checkAuth = async() => {
        try {
            //get token from local storage
            const { data } =  await axios.get(`${backendURI}/api/auth/check-auth`, {
              withCredentials: true,
            });
            if(data.success){
                setIsLogin(true);
                setUserData(data.requestUser);
            }else{
                setIsLogin(false);
            }
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        checkAuth();
    }, []);


    //regsiter user
    const registerUser = async (name, email, password) => {
        if(isLogin){
            return toast.error("You are already logged in")
        }
        try {
            const { data } = await axios.post(`${backendURI}/api/auth/register`, {
                fullName: name, email, password
            }, { withCredentials: true });

            //if user is registered
            if (data.success) {
                toast.success(data.message);
                Cookies.set("token", data.token, { expires: 7 });
                setIsLogin(true)
                navigate('/')
            } else {
                toast.error(data.message);
                setIsLogin(false)
                navigate('/')
            }
            
        } catch (error) {
           const errorMessage = error.response?.data?.message || "Something went wrong";
           toast.error(errorMessage);
           console.log(error);
        }
    }

   //login user
    const loginUser = async (email, password) => {
        if(isLogin){
            return toast.error("You are already logged in")
        }
        try {
            const { data } = await axios.post(`${backendURI}/api/auth/login`, {
                email,password
            }, { withCredentials: true })
            //if login is success
            if (data.success) {
                toast.success(data.message)
                Cookies.set("token", data.token, { expires: 7 });
                navigate('/')
                setIsLogin(true)
            } else {
                toast.error(data.message)
                navigate('/')
            }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Something went wrong';
          toast.error(errorMessage);
          console.log(error);
        }
    }

    const handleProfile = async (image) => {
      try {
        const { data } = await axios.post(`${backendURI}/api/auth/update-profile`, {
          userProfile: image
        }, { withCredentials: true });

        if (data.success) {
            toast.success(data.message);
            window.location.reload();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Something went worng')
        console.log(error);
      }
    };

    const value = {
      registerUser,
      loginUser,
      isLogin,
      backendURI,
      userData,
      handleProfile,
    };

    return(
    <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthContextProvider };
