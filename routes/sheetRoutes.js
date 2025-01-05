import express from "express";
import { decryptAuthToken } from "../Middlewares/tokenDecryption.js";
import {
  addNewSheet,
  deleteSheet,
  getSheetsMetadataBySheetId,
  getSheetsMetadataByUserId,
  makesheetpublic,
} from "../controllers/sheetController.js";
import { validateRequest } from "../Middlewares/tyepSafetyValidationCheck.js";
import { addNewSheetRequest } from "../Middlewares/apiRequestModels/sheetRequestModels.js";
const router = express.Router();

router.post("/addnewsheet", decryptAuthToken, validateRequest(addNewSheetRequest), addNewSheet);

router.get("/getusersheetsmetadata", decryptAuthToken, getSheetsMetadataByUserId);

router.get("/getsheetdetails", decryptAuthToken, getSheetsMetadataBySheetId);

router.delete("/deletesheet", decryptAuthToken, deleteSheet);

router.post("/makesheetpublic", decryptAuthToken, makesheetpublic);

export default router;
