import { decode, jwt } from "jsonwebtoken";
import User from "../models/user.model";

export const protectRoute = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unathorized - No token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;

        next();

    } catch (error) {
        console.error("Error en protectRoute middleware:", error.message);
        res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
}