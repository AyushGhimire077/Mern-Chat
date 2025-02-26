import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import socket from "../socket/Socket.jsx";

const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const backendUI = "http://localhost:4000";

  const [receiverInfo, setReceiverInfo] = useState(null);
  const [messages, setMessages] = useState([]);

  // Fetch receiver info
  const fetchReceiverInfo = async (receiverId) => {
    try {
      const { data } = await axios.get(`${backendUI}/api/message/${receiverId}`, { withCredentials: true });
      if (data.success) {
        setReceiverInfo(data.user);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch receiver info");
      console.error(error);
    }
  };

  // Fetch messages
  const fetchMessages = async (receiverId) => {
    try {
      const { data } = await axios.get(`${backendUI}/api/message/get-messages/${receiverId}`, { withCredentials: true });
      setMessages(data.messages);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
      console.error(error);
    }
  };

  // Send message
const sendMessage = async (text, image, receiverId) => {
  try {
    const { data } = await axios.post(`${backendUI}/api/message/send/${receiverId}`, { text, image }, { withCredentials: true });

    if (data.success) {
      const newMessage = data.message;
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Emit message to server
      socket.emit("send-message", newMessage);

    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send message");
    console.error(error);
  }
};


  // Listen for incoming messages
useEffect(() => {
  console.log("Socket connected:", socket.connected);

  const handleReceiveMessage = (message) => {
    console.log('Received message:', message);
    setMessages((prevMessages) => {
      if (!prevMessages.some((msg) => msg._id === message._id)) {
        return [...prevMessages, message];
      }
      return prevMessages;
    });
  };

  socket.on("receive-message", handleReceiveMessage);

  return () => {
    socket.off("receive-message", handleReceiveMessage);
  };
}, []);

  return (
    <ChatContext.Provider value={{
      fetchReceiverInfo,
      receiverInfo,
      fetchMessages,
      messages,
      sendMessage,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
