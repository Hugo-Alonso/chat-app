import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    // Collect params from the request
    const { fullName, email, password } = req.body

    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters "});
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
            // Generate JWT (Json Web Token)
            
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        
    }
}

export const login = (req, res) => {
    res.send("login up");
}

export const logout = (req, res) => {
    res.send("logout up");
}