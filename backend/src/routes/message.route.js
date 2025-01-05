import expres from "express";
import { protectRoute } from "../middleware/auth.middleware";

const router = expres.Router();

router.get("/users", protectRoute, getUsersForSideBar );



export default router;