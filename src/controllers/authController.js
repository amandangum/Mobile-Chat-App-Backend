import User from "../models/users.js";
import bcrypt from "bcrypt"

export const signup = async (req, res) => {
    const {firstName, lastName, email, phone, username, password} = req.body;
          
    try{
       if(!firstName || !lastName || !email || !phone || !username || !password){
        return res.status(400).json({success: false, message: "All Fields are required"})
       }

       const emailExists = await User.findOne({email: email});
       if (emailExists){
        return res.status(400).json({success: false, message: "Email already exists"});
       }

       const usernameExists = await User.findOne({username: username});
       if (usernameExists){
        return res.status(400).json({success: false, message: "Username already exists"});
       }

       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser = new User({
        firstName,
        lastName,
        email,
        phone, 
        username,
        password: hashedPassword
       });

       await newUser.save();
       res.status(200).json({success: true, message: "User registerd Successfully"})
    }
    catch(error){
        console.log("Error during user signup: ", error);
        res.status(500).json({success: false, message: "Internal Server error"})
    }

}