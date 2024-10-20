import express from "express"
import authorize from "../middlewares/authMiddleware";
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from "../controllers/chatController";

const router = express.Router();

router.post('/', authorize, accessChat);
router.get('/', authorize, fetchChats);
router.post('/group', authorize, createGroupChat);
router.put('/rename', authorize, renameGroup);
router.put('/removeuser', authorize, removeFromGroup);
router.put("/adduser", authorize, addToGroup);

export default router