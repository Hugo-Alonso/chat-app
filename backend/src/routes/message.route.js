import expres from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSideBar, sendMessage } from "../controllers/message.controller.js";

const router = expres.Router();

router.get("/users", protectRoute, getUsersForSideBar);

// To be able to collect the messages between two users for the chat (History)
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;