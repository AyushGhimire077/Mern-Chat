import { createContext, useState } from "react";
import toast from "react-hot-toast";


const ChatContext = createContext();


const ChatContextProvider = ({ children }) => {

    const [ messages, setMessages ] = useState([]);

    const backendURI = 'http://localhost:4000';

    const fetchMessages = async () => {
        try {
            const { data } = await axios.get(`${backendURI}/api/message/get-messages/${backendURI}`,
                { withCredentials: true }         
            ); 
            setMessages(data.messages || []);
        } catch (error) {
            toast.error('Something went wrong');
        }
    }

    const value = {
        messages,
        fetchMessages
    };

    return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider> )
};


export { ChatContext, ChatContextProvider };