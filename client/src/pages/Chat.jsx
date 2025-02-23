import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";
import Sidebar from "../components/Sidebar";
import { FaImage } from "react-icons/fa";

const Chat = () => {
  const { receiverId } = useParams();
    const { messages, fetchMessages, getReceiverInfo } = useContext(ChatContext);
    console.log(messages);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState(null);


  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen ml-[62px] bg-gray-100">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Chat Header */}
        {receiver && (
          <div className="flex items-center p-4 bg-white border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <img
                src={receiver?.profilePic || "/default-avatar.png"}
                alt={receiver?.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{receiver.name}</h2>
                <p className="text-sm text-gray-500">Active now</p>
              </div>
            </div>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">{error}</div>
          ) : messages?.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="flex items-start space-x-2">
                <img
                  src={receiver?.profilePic || "/default-avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mt-2"
                />
                <div className="bg-white p-3 rounded-2xl shadow-sm max-w-[70%]">
                  <p className="text-gray-800">{msg.text}</p>
                  <p className="text-xs text-gray-500 text-right mt-1">10:30 AM</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 p-4">
              No messages yet. Start a conversation!
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 ml-4 bg-gray-50 border-t mb-2.5 m border-gray-200 rounded-2xl overflow-x-auto">
          <div className="flex items-center gap-3 overflow-x-auto">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 py-2.5 px-6 bg-gray-100 outline-none focus:ring-0 focus:border-gray-600 rounded-3xl"
            />
            <button
              onClick={handleSendMessage}
              className="p-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
             </button>
               <FaImage className="p-2.5 bg-blue-500 text-[40px] rounded-full hover:bg-blue-600 transition-colors text-white"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;