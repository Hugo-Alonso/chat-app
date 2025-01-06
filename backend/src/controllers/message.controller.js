import User from "../models/user.model";

export const getUsersForSideBar = async (req, res) => {
    try {
        // Your own id for later not put in at the chat side bar
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId }}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSideBar: ", error.message);
        res.status(500).json({ error: "Internal Server Error "}) 
    }
};

export const getMessages = async (req, res) => {

};