import { AuthContextProvider } from "./AuthContext.jsx";
import { ChatContextProvider } from "./ChatContext.jsx";
import { SidebarProvider } from "./SidebarChatContext.jsx";


const MainContextProvider = ({ children }) => {
    return (
     <AuthContextProvider>
            <SidebarProvider>
                <ChatContextProvider>
                  {children}
                </ChatContextProvider>
        </SidebarProvider>
     </AuthContextProvider>
    )
}

export default MainContextProvider