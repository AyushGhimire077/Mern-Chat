import { createContext, useState, useEffect  } from "react";
import axios from "axios";

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
    
    const [sidebarLoading, setSidebarLoading] = useState(true); 
    const [sidebarChats, setSidebarChats] = useState([]);

    const backendUI = 'http://localhost:4000';
    
    const fetchSidebarChats = async () => {
        setSidebarLoading(true);
        try {
            const { data } = await axios.get(`${backendUI}/api/message/get-users`, { withCredentials: true });
            if (data.success) {
                setSidebarChats(data.users);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSidebarLoading(false);
        }
    };

    //fetch user on component mount
    useEffect(() => {
        fetchSidebarChats();
    }, []);
    
    useEffect(() => {
        console.log("Sidebar Chats Updated:", sidebarChats);
    }, [sidebarChats]);

    const value = {
        sidebarChats,
        sidebarLoading,
    };

    return (
    <SidebarContext.Provider value={value}>
        {children}
    </SidebarContext.Provider> ) 
};

export { SidebarContext, SidebarProvider };