import express from "express";
const router = express.Router();
import upload from "../middlewares/multer.js";
import authenticateMiddleware from "../middlewares/authMiddleware.js";
import { getUserDetails, loginController } from "../controllers/userController.js";
import { checkIn } from "../controllers/attendenceController.js";

router.post('/login',loginController)
router.get('/getUserData',authenticateMiddleware,getUserDetails)
router.post('/check-in',authenticateMiddleware,checkIn)


export default router;
