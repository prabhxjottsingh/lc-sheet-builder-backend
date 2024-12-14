import express from "express";
import { decryptAuthToken } from "../Middlewares/tokenDecryption.js";
import { validateRequest } from "../Middlewares/tyepSafetyValidationCheck.js";
import { addNewProblemRequest } from "../Middlewares/apiRequestModels/problemRequestModels.js";
import {
  addNewProblem,
  deleteProblem,
  getProblems,
  getProblemsByCategoryId,
} from "../controllers/problemContorller.js";
const router = express.Router();

router.post(
  "/addnewproblems",
  decryptAuthToken,
  validateRequest(addNewProblemRequest),
  addNewProblem
);

router.get(
  "/getproblemsbycategoryid",
  decryptAuthToken,
  getProblemsByCategoryId
);

router.get("/getproblems", decryptAuthToken, getProblems);

router.delete("/deleteproblem", decryptAuthToken, deleteProblem);

export default router;
