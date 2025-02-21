import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    //backendURI
    const backendURI = 'http://localhost:4000';

    const navigate = useNavigate();

    const [userToken, setUserToken] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    //check if user is logged in
    useEffect(() => {
        try {
            //get token from local storage
            const token = Cookies.get("token");
            if (token) {
                //decode token
                const decodedToken = jwtDecode(token);
                if(decodedToken.exp * 1000 < Date.now()){
                    localStorage.removeItem('token');
                }
                setUserToken(decodedToken);
                setIsLogin(true);
            }  
        } catch (error) {
            console.log(error)
        }
    },[])

    useEffect(() => {
        const token = Cookies.get("token");
        console.log(token);
    })

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
                Cookies.set("token", data.token)
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
                Cookies.set("token", data.token)
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

    const value = {
        registerUser,
        loginUser,
        isLogin
    };

    return(
    <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthContextProvider };