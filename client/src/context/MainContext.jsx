import { AuthContextProvider } from "./AuthContext.jsx";
import { SidebarProvider } from "./SidebarChatContext.jsx";


const MainContextProvider = ({ children }) => {
    return (
     <AuthContextProvider>
        <SidebarProvider>
            {children}
        </SidebarProvider>
     </AuthContextProvider>
    )
}

export default MainContextProvider