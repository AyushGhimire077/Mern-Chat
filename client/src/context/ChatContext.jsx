import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ChatContext = createContext();


const ChatContextProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [receiverInfo, setReceiverInfo ] = useState(null);

    const backendURI = 'http://localhost:4000';

    //fetch messages
    const fetchMessages = async (receiverId) => {
        try {
            const { data } = await axios.get(`${backendURI}/api/message/get-messages/${receiverId}`,
                { withCredentials: true }         
            ); 
            setMessages(data.messages || []);
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
            
        }
    }

    //fetch userInfo
    const fetchUserInfo = async (receiverId) => {
    console.log(receiverId);
    try {
        const { data } = await axios.get(`${backendURI}/api/message/${receiverId}`, { withCredentials: true });
        console.log(data);
        if (data.success) {
            setReceiverInfo(data.user);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.log("Error fetching user info:", error);
    }
};


    const value = {
        messages,
        fetchMessages,
        fetchUserInfo,
        receiverInfo,
    };

    return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider> )
};


export { ChatContext, ChatContextProvider };