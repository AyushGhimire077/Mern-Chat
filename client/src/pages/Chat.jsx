import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";
import Sidebar from "../components/Sidebar";
import { FaImage, FaUser, FaPaperPlane } from "react-icons/fa";

const Chat = () => {
  const { receiverId } = useParams();
  const { messages, fetchMessages, fetchUserInfo, receiverInfo, userInfo, sendMessage } = useContext(ChatContext);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  // Fetch data with error handling
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          fetchMessages(receiverId),
          fetchUserInfo(receiverId)
        ]);
        setError(null);
      } catch (err) {
        setError("Failed to load conversation");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (receiverId) loadData();
  }, [receiverId]);

  // Improved message sending with error handling
  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;
    
    try {
      setIsSending(true);
      await sendMessage(receiverId, newMessage);
      setNewMessage("");
    } catch (err) {
      setError("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  // Handle Enter key for sending
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen ml-[62px] bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Chat Header */}
        {receiverInfo && (
          <div className="flex items-center ml-5 rounded-4xl p-4 bg-white border-b border-gray-200">
            <div className="flex items-center space-x-4">
              {receiverInfo?.userProfile ? (
                <img
                  src={receiverInfo.userProfile}
                  alt={receiverInfo.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <FaUser className="w-10 h-10 p-1.5 rounded-full border border-gray-600 shadow-md text-[#2D3250]" />
              )}
              <div>
                <h2 className="text-lg font-semibold">{receiverInfo.fullName}</h2>
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
            messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.senderId === userInfo.id ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-start gap-2 max-w-[80%]">
                  {msg.senderId !== userInfo.id && (
                    <img
                      src={receiverInfo?.userProfile || "/default-avatar.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full mt-2"
                      loading="lazy"
                    />
                  )}
                  <div className={`p-3 rounded-2xl ${
                    msg.senderId === userInfo.id 
                      ? "bg-blue-500 text-white" 
                      : "bg-white text-gray-800 shadow-sm"
                  }`}>
                    <p className="break-words">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.senderId === userInfo.id 
                        ? "text-blue-100" 
                        : "text-gray-500"
                    }`}>
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
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
        <div className="p-4 ml-4 bg-gray-50 border-t mb-2.5 border-gray-200 rounded-2xl">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 py-2.5 px-6 bg-gray-100 outline-none focus:ring-0 focus:border-gray-600 rounded-3xl"
              disabled={isSending}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isSending}
              className={`p-2.5 rounded-full transition-colors ${
                newMessage.trim() && !isSending
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaPaperPlane className="w-5 h-5" />
            </button>
            <button className="p-2.5 text-[#2D3250] hover:bg-gray-200 rounded-full transition-colors">
              <FaImage className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;