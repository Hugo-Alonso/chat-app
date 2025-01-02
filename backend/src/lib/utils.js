import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    // Token creation 
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    }) 

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // Milliseconds
        httpOnly: true, // prevent XSS attacks (Cross-site Scripting Attacks)
        sameSite: "strict", // CSRF attacks (Cross-site Rquest Forgery Attacks)
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}