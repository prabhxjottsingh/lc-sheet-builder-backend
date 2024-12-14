import {
  dbCreateNewCategory,
  dbDeleteCategoryById,
  dbGetCategoryById,
} from "../dbAccessor/categoryDbAccessor.js";
import {
  dbAddNewCategoryToSheet,
  dbGetCategoryIdsBySheetId,
  dbGetSheetBySheetId,
  dbUpdateCategoryIdsInSheet,
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

export const deleteCategory = async (req, res) => {
  const { categoryId, sheetId } = req.query;
  try {
    console.log("DeleteCategoryL: ", categoryId);
    console.log("updatedhSheetId: ", sheetId);
    const categoryData = await dbGetCategoryById({ categoryId });
    const sheetData = await dbGetSheetBySheetId({ sheetId });
    if (categoryData.data.problemIds.length > 0) {
      return errorResponse(res, INTERNAL_SERVER_ERROR, {
        message: "Delete all the problems under the category first",
      });
    }

    // Filter out the category ID from the sheet's category list
    const updatedSheetCategories = sheetData.data.categoryIds.filter(
      (id) => id != categoryId
    );
    console.log("UpdatedSheetCat: ", updatedSheetCategories);
    // Update the sheet with the new list of categories
    await dbUpdateCategoryIdsInSheet({
      sheetId,
      categoryIds: updatedSheetCategories,
    });

    // await dbDeleteCategoryById({ categoryId });
    return successResponse(res, SUCCESS, {
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error occured while deleting sheets: ", error);
    return errorResponse(res, INTERNAL_SERVER_ERROR, {
      message: "Error while deleting the sheet",
    });
  }
};
