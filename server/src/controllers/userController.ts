import {Request, Response} from "express"
import User from "../models/userModel"
import generateToken from "../config/generateToken";

const loginController = async (req : Request, res: Response) => {
    const {userName, email, password} = req.body;

    const user = await User.findOne({$or: [
        {email}, {userName}
    ]});
    
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id)
        });
    }
    else{
        res.status(400).json({ message: 'Failed to login' });
    }
}

const registerController = async (req : Request, res: Response) => {
    const { name, userName, email, password } = req.body;

    if(!name || !userName || !email || !password){
        res.status(400).json({ message: "Please enter all the Fields" });
    }
    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400).json({
            message: "User already exists with this email"
        });
    }

    const user = await User.create({
        name, userName, email, password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id)
        });
    }
    else{
        res.status(400).json({message : "Failed to create user"});
    }
}

export {loginController, registerController}