import express from "express";
import { getAllUsers, loginController, registerController } from "../controllers/userController";
import authorize from "../middlewares/authMiddleware";

const router = express.Router();

router.get('/',authorize, getAllUsers)
router.post('/login', loginController)
router.post('/register', registerController)

export default router