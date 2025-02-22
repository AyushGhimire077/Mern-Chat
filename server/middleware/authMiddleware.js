import jwt from "jsonwebtoken";
import 'dotenv/config'
import User from "../models/userModel.js";

const isProtectedRoute = async(req, res, next) => {
    try {
        //get token from cookie
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({success: false, message: "Unauthorized - Token not found"});
        }

        //decode jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //check if user exists
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized - User not found" });
        }
        
        req.user = user;

       next();
     
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export default isProtectedRoute;