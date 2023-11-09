import express from "express";
const router = express.Router();
import upload from "../middlewares/multer.js";
import authenticateMiddleware from "../middlewares/authMiddleware.js";
import { RegisterAdminController, addMember, getMembers } from "../controllers/adminController.js";

router.post('/register-admin',RegisterAdminController)
router.post('/add-member',addMember)
router.get('/get-members',getMembers)

export default router;
