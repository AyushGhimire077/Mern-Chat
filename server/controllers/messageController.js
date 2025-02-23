import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from "../config/cloudinary.js";
//fetch users
export const fetchUsers = async (req, res) => {
    try {
        const loggedUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedUser } }).select("-password").exec();        
        return res.status(200).json({ success: true, users: filteredUsers });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

//fetch message
export const fetchMessages = async (req, res) => { 
    const loggedUser = req.user._id;
    const { id: userChatId } = req.params
    
    try {
        const messages = await Message.find({
            $or: [
                { sender: loggedUser, receiver: userChatId },
                { sender: userChatId, receiver: loggedUser }
            ]
        });

        res.status(200).json(messages);

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

//send message
export const sendMessage=async(req, res) => {
    try {
        const { text, image } = req.body; 
        const { receiverId } = req.params;
        const { senderId } = req.user._id;

        let imageUri;

        //check if image is provided
        if (image) {
            const ulpoadImage = await cloudinary.uploader.upload(image);
            imageUri = ulpoadImage.secure_url
        }
        //create new message
        const message = new Message({
            sender: senderId,
            receiver: receiverId,
            text,
            image: imageUri
        })

        await message.save();

        return res.status(200).json(message);

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

//get user info by id
export const getUserInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password").exec();
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        return res.status(200).json({ success: true, user: user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
