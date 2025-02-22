import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import cloudinary from "../config/cloudinary.js";
//register user
export const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    //check is fiels are provided
    if(!fullName || !email || !password) {
        return res.status(400).json({ success: false, message: "Please fill in all fields" });
    }
    //check is password is more than 6 or not
    if(password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }
    
    try {
        //check if user already exists
        const checkExisting = await User.findOne({ email });

        if (checkExisting) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //createing new user
        const newUser = await new User({
          fullName,
          email,
          password: hashedPassword,
        });

        await newUser.save();

        //genterate jwt token
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{
            expiresIn: "7d"
        });

        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          secure: process.env.NODE_ENV === "development",
          sameSite: "lax",
        });

        return res.status(201).json({success: true, message: "User created successfully", token});

    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

//login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    //check if all files are provided
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please fill in all fields" });
    }

    try {
        //check if user exits or not
        const user = await User.findOne({ email });
        if (!user) { 
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        //check if password is correct or not
        const validPassword = await bcrypt.compare(password, user.password);
        //check if password is correct
        if (!validPassword) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        //genetrate jwt token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === "development",
            sameSite: "lax",
        });

        return res.status(200).json({ success: true, message: "User logged in successfully", token });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });  
    }

}

//logout user
export const logoutUser = async (req, res) => {
    try {
        //check if token exites
        if(!req.cookies.token) {
            return res.status(400).json({success: false, message: "User not logged in"});
        }
   
        res.cookie("token", null, {
            httpOnly: true,
            expires: new Date(Date.now()),
            secure: process.env.NODE_ENV === "development",
            sameSite: "lax",
        });
        return res.status(200).json({success: true, message: "User logged out successfully"});
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

//upload user profile
export const updateProfile = async (req, res) => {
    const { userProfile } = req.body;
    const userId = req.user._id;     

    if(!userId) {
        return res.status(400).json({ success: false, message: "User not logged in" });
    }
    if(!userProfile) {
        return res.status(400).json({ success: false, message: "Please upload a profile picture" });
    }
    try {
        //get user by id
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        //upload profile picture to cloudinary
        const uploadProfile = await cloudinary.uploader.upload(userProfile);
        const updatedUser = await User.findByIdAndUpdate(
          userId,{ userProfile: uploadProfile.secure_url },{ new: true }
        );

        return res.status(200).json({ success: true, message: "Profile picture uploaded successfully" , updatedUser});
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

//check auth
export const checkAuth = async (req, res) => {
    try {
       const token = req.cookies.token; 
          if(!token) {
             return res.status(401).json({ success: false, message: "Unauthorized - Token not found" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ success: true, user: decoded });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}