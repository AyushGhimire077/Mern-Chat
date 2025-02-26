import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from "../config/cloudinary.js";
import { users, io } from "../config/socket.js";  // Import io

// Fetch Users
export const fetchUsers = async (req, res) => {
  try {
    const loggedUser = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedUser } }).select("-password").exec();        
    return res.status(200).json({ success: true, users: filteredUsers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//fetch messages
export const fetchMessages = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user?._id.toString();

    if (!senderId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Sender ID not found" });
    }

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId }
      ]
    }).sort({ createdAt: 1 }); // Sort messages in chronological order

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Send Message
// Send Message
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user?._id.toString();

    if (!senderId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Sender ID not found" });
    }

    if (!receiverId) {
      return res.status(400).json({ success: false, message: "Receiver ID is required" });
    }

    if (!text?.trim() && !image) {
      return res.status(400).json({ success: false, message: "Message cannot be empty" });
    }

    let imageUri = null;
    if (image) {
      try {
        const uploadImage = await cloudinary.uploader.upload(image);
        imageUri = uploadImage.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        return res.status(500).json({ success: false, message: "Image upload failed" });
      }
    }

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      text,
      image: imageUri
    });

    await message.save();

    console.log("Message saved:", message);

    // Emit real-time event to the receiver
    const receiverSocket = users.get(receiverId);
    if (receiverSocket) {
      io.to(receiverSocket).emit("receive-message", {  // ✅ Ensure this event name matches frontend
        senderId,
        text,
        image: imageUri
      });
    }

    return res.status(200).json({ success: true, message: "Message sent successfully", data: message });

  } catch (error) {
    console.error("Send Message Error:", error);
    return res.status(500).json({ success: false, message: "Server error, please try again" });
  }
};


// Get User Info by ID
export const getUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password").exec();

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
