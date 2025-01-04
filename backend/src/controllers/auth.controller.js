import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';


export const signup = async (req, res) => {
    // Collect params from the request
    const { fullName, email, password } = req.body

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required"});
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters"});
        }

        const emailExists = await User.findOne({email});

        if (emailExists) return res.status(400).json({ message: "Email already exists"});

        // Hash Password before send it to DataBase
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new User
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })

            res.status
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ mesage: "Invalid credentials" })
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(400).json({ mesage: "Invalid credentials" })
        } 

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out succesfully "});
    } catch (error) {
        console.log("Error in logout controller", error);
        res.status(500).json({ message: "Internal Server Error "});
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.staus(400).json({ message: "Profile pic is required "});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { profilePic: uploadResponse.secure_url }, 
            { new:true }
        );

        res.status(200).json({updatedUser})
    } catch (error) {
        console.log("Error in update profile", error.message);
        res.status(500).json({ message: "Internal Server Error "});
    }
};