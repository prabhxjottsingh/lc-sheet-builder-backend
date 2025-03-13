import express from "express";
import { decryptAuthToken } from "../Middlewares/tokenDecryption.js";
import { validateRequest } from "../Middlewares/tyepSafetyValidationCheck.js";
import { getUserAnalytics } from "../controllers/userController.js";
const router = express.Router();

router.get("/useranalytics", decryptAuthToken, getUserAnalytics);

export default router;
