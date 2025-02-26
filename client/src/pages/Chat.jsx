import React, { useContext, useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { ChatContext } from "../context/ChatContext";
import { useParams } from "react-router-dom";
import { FaImage, FaUser } from "react-icons/fa";
import { MdSend } from "react-icons/md";

const Chat = () => {
  const { fetchReceiverInfo, fetchMessages, receiverInfo, messages, sendMessage } = useContext(ChatContext);
  const { receiverId } = useParams();
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (receiverId) {
      fetchReceiverInfo(receiverId);
      fetchMessages(receiverId);
    }
  }, [receiverId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (text.trim() || image) {
      await sendMessage(text, image, receiverId);
      fetchMessages(receiverId);
      setText('');
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex ml-[62px] bg-gray-100">
      <Sidebar />
      <div className="flex flex-col w-full h-screen">
        {/* Receiver Info */}
        <div className="flex justify-between p-4 bg-white shadow-md items-center">
          <p className="font-semibold text-lg text-gray-800">{receiverInfo?.fullName || "User"}</p>
          <div className="flex items-center">
            {receiverInfo?.userProfile ? (
              <img src={receiverInfo.userProfile} className="w-12 h-12 rounded-full border border-gray-300 object-cover" alt="Profile" />
            ) : (
              <FaUser className="w-12 h-12 text-gray-400 p-2 rounded-full border border-gray-300" />
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages?.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={msg.id || msg.timestamp}
                ref={index === messages.length - 1 ? messagesEndRef : null}
                className={`flex ${msg.sender === receiverId ? "justify-start" : "justify-end"} mb-3`}
              >
                <div className={`max-w-[75%] rounded-xl px-4 py-3 shadow-lg ${msg.sender === receiverId ? "bg-white text-gray-800" : "bg-blue-600 text-white"}`}>
                  <p className="text-sm">{msg.text}</p>
                  {msg.image && <img src={msg.image} alt="Message" className="mt-2 rounded-lg max-w-[250px]" />}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-400 text-lg">Start a conversation with {receiverInfo?.fullName || "this user"}</p>
            </div>
          )}
          {/* Reference for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-300 bg-white">
          <div className="flex items-center gap-2">
            <input type="file" ref={fileInputRef} accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="hidden" />
            <button onClick={() => fileInputRef.current.click()} className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
              <FaImage size={24} />
            </button>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Type a message..."
              className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition-all"
            />
            <button onClick={handleSend} disabled={!text.trim() && !image} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition-all">
              <MdSend size={24} />
            </button>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Chat;
