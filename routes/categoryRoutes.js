import express from "express";
import { decryptAuthToken } from "../Middlewares/tokenDecryption.js";
import { validateRequest } from "../Middlewares/tyepSafetyValidationCheck.js";
import {
  addNewCategoryRequest,
  getCategoriesBySheetIdRequest,
  getCategoryMetadataByIdRequest,
} from "../Middlewares/apiRequestModels/categoryRequestModal.js";
import {
  addNewCategory,
  getCategoryMetadataById,
  getCategoryMetadataBySheetId,
} from "../controllers/categoryController.js";
const router = express.Router();

router.post(
  "/addnewcategory",
  decryptAuthToken,
  validateRequest(addNewCategoryRequest),
  addNewCategory
);

router.get(
  "/getcategoriesbysheetid",
  decryptAuthToken,
  validateRequest(getCategoriesBySheetIdRequest),
  getCategoryMetadataBySheetId
);

router.get(
  "/getcategorymetadatabyid",
  decryptAuthToken,
  validateRequest(getCategoryMetadataByIdRequest),
  getCategoryMetadataById
);

export default router;
