import {
  dbCreateNewCategory,
  dbGetCategoryById,
} from "../dbAccessor/categoryDbAccessor.js";
import {
  dbAddNewCategoryToSheet,
  dbGetCategoryIdsBySheetId,
} from "../dbAccessor/sheetDbAccessor.js";
import { Category } from "../models/Category.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { constants } from "../utils/constants.js";

const INTERNAL_SERVER_ERROR = constants.STATUS_CODE.INTERNAL_SERVER;
const RESOURCE_CREATED_SUCCESS = constants.STATUS_CODE.RESOURCE_CREATED_SUCCESS;
const SUCCESS = constants.STATUS_CODE.SUCCESS;

export const addNewCategory = async (req, res) => {
  const { sheetId, name, color } = req.body;
  const userId = req.user;

  try {
    const newCategory = new Category({
      metadata: {
        name: name,
        description: `This is an uncategorised Id automatically generated everytime a sheet is created`,
        isUserGenerated: true,
        color: color,
      },
      data: {
        problemIds: [],
      },
    });

    await dbCreateNewCategory(newCategory);

    await dbAddNewCategoryToSheet({ sheetId, categoryId: newCategory._id });
    return successResponse(res, RESOURCE_CREATED_SUCCESS, {
      message: "Category created successfully",
    });
  } catch (error) {
    console.error("Error while creating new category", error);
    return errorResponse(res, INTERNAL_SERVER_ERROR, {
      message: "Error while creating new category",
    });
  }
};

export const getCategoryMetadataBySheetId = async (req, res) => {
  const { sheetId } = req.query;
  try {
    const categories = await dbGetCategoryIdsBySheetId({ sheetId });

    const response = await Promise.all(
      categories.map((categoryId) => dbGetCategoryById({ categoryId }))
    );

    return successResponse(res, SUCCESS, { data: response });
  } catch (error) {
    console.error("Error while fetching users sheet:", error);
    return errorResponse(res, INTERNAL_SERVER_ERROR, {
      message: "Error while fetching users sheet",
    });
  }
};

export const getCategoryMetadataById = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const response = await dbGetCategoryById({ categoryId });
    return successResponse(res, SUCCESS, { data: response });
  } catch (error) {
    console.error("Error while fetching users sheet:", error);
    return errorResponse(res, INTERNAL_SERVER_ERROR, {
      message: "Error while fetching users sheet",
    });
  }
};
