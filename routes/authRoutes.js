import express from "express";
import { signup, login } from "../controllers/authController.js";
import { validateRequest } from "../Middlewares/tyepSafetyValidationCheck.js";
import {
  loginRequest,
  signUpRequest,
} from "../Middlewares/apiRequestModels/authRequestsModels.js";

const router = express.Router();

router.post("/signup", validateRequest(signUpRequest), signup);
router.post("/login", validateRequest(loginRequest), login);

export default router;
