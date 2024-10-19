import jwt from "jsonwebtoken"
import { Types } from "mongoose"

const generateToken = (userId: Types.ObjectId) : String => {
    const secret = process.env.JWT_SECRET;
  
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    return jwt.sign({ userId: userId.toString() }, secret, {
        expiresIn: "1d"
    });
}

export default generateToken