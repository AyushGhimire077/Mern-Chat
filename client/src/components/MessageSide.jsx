import React, { useContext } from 'react';
import { SidebarContext } from '../context/SidebarChatContext.jsx';
import { FaUser } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const MessageSide = () => {
  const { sidebarChats } = useContext(SidebarContext);
  const { userData } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleClick = (receiverId) => {
  console.log('Receiver ID:', receiverId)
  navigate(`/chat/${receiverId}`);
}


  return (
    <div className="w-[300px] h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 border-r border-gray-700">
      <div className='flex items-center justify-between px-6 py-3 mx-2 mb-6 bg-[#FEF9F2] cursor-pointer transition-all duration-200 ease-out rounded-lg group border-b border-gray-700/30'>
        <div className='flex items-center gap-6'>
          {userData?.userProfile !== '' ?
          <img 
         src={userData.userProfile } 
         alt={userData?.fullName } 
         className="w-12 h-12 rounded-full border border-gray-600 shadow-md"
       />: <FaUser className="w-12 h-12 rounded-full border border-gray-600 shadow-md text-[#2D3250] p-2"/>}
        <h3 className='capitalize'>{userData?.fullName}</h3>
       </div>
        <p className='text-2xl'>+</p>
      </div>
      {sidebarChats.map((chat) => (
        <div 
          onClick={() => handleClick(chat._id)} key={chat._id}
          className="flex items-center gap-4 p-4 mx-2 hover:bg-gray-200 cursor-pointer transition-all 
          duration-200 ease-out rounded-lg group border-b border-gray-700/30 last:border-0"
        >
          {/* Profile Picture */}
          <div className="relative shrink-0">
            {chat.userProfile ? (
              <img 
                className="w-10 h-10 rounded-full border border-gray-600 group-hover:border-gray-400 
                transition-colors object-cover shadow-lg"
                src={chat.userProfile} 
                alt={chat.fullName} 
              />
            ) : (    
              <div className="p-2 rounded-full border border-gray-600 group-hover:border-gray-400 bg-gray-600 transition-colors">
                <FaUser className="w-5 h-5 text-gray-50" />
              </div>
            )}
            {chat.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full 
              border-2 border-gray-800 shadow-sm"></span>
            )}
          </div>

          {/* User Info */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-[#0F0F0F] capitalize text-sm font-medium truncate">{chat.fullName}</h3>
              {chat.unread > 0 && (
                <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {chat.unread}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[#0F0F0F] text-xs truncate max-w-[140px]">
                {chat.lastMessage || 'Start a conversation'}
              </p>
              {chat.timestamp && (
                <span className="text-[10px] text-[#021526] whitespace-nowrap">
                  {chat.timestamp}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSide;