import express from "express";
import { decryptAuthToken } from "../Middlewares/tokenDecryption.js";
import {
  addNewSheet,
  deleteSheet,
  getSheetsMetadataByUserId,
} from "../controllers/sheetController.js";
import { validateRequest } from "../Middlewares/tyepSafetyValidationCheck.js";
import { addNewSheetRequest } from "../Middlewares/apiRequestModels/sheetRequestModels.js";
const router = express.Router();

router.post(
  "/addnewsheet",
  decryptAuthToken,
  validateRequest(addNewSheetRequest),
  addNewSheet
);

router.get(
  "/getusersheetsmetadata",
  decryptAuthToken,
  getSheetsMetadataByUserId
);

router.delete("/deletesheet", decryptAuthToken, deleteSheet);

export default router;
