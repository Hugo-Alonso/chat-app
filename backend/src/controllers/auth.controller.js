import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';

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

export const login = (req, res) => {
    res.send("login up");
}

export const logout = (req, res) => {
    res.send("logout up");
}