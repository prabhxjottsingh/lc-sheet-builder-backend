import express from "express";
import { signup, login, getUserByToken } from "../controllers/authController.js";
import { validateRequest } from "../Middlewares/tyepSafetyValidationCheck.js";
import { loginRequest, signUpRequest } from "../Middlewares/apiRequestModels/authRequestsModels.js";
import { decryptAuthToken } from "../Middlewares/tokenDecryption.js";

const router = express.Router();

router.post("/signup", validateRequest(signUpRequest), signup);
router.post("/login", validateRequest(loginRequest), login);

router.get("/getuserbytoken", decryptAuthToken, getUserByToken);

export default router;
