import { dbCreateNewCategory } from "../dbAccessor/categoryDbAccessor.js";
import {
  dbCreateNewSheet,
  dbGetSheetsMetadataByUserId,
} from "../dbAccessor/sheetDbAccessor.js";
import { Category } from "../models/Category.js";
import { Sheet } from "../models/Sheet.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { constants } from "../utils/constants.js";

const INTERNAL_SERVER_ERROR = constants.STATUS_CODE.INTERNAL_SERVER;
const RESOURCE_CREATED_SUCCESS = constants.STATUS_CODE.RESOURCE_CREATED_SUCCESS;
const SUCCESS = constants.STATUS_CODE.SUCCESS;

export const addNewSheet = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user;

  try {
    const newCategory = new Category({
      metadata: {
        name: "Uncategorised",
        description: `This is an uncategorised Id automatically generated everytime a sheet is created`,
        isUserGenerated: false,
        color: "bg-gray-600",
      },
      //   data: {
      //     sheetIds: [],
      //   },
    });

    await dbCreateNewCategory(newCategory);

    const newSheet = new Sheet({
      metadata: {
        name: name,
        description: description,
      },
      data: {
        categoryIds: [newCategory._id],
      },
      createdBy: userId,
    });
    await dbCreateNewSheet(newSheet);
    return successResponse(res, RESOURCE_CREATED_SUCCESS, {
      message: "Sheet created successfully",
    });
  } catch (error) {
    console.error("Error while creating new sheet", error);
    return errorResponse(res, INTERNAL_SERVER_ERROR, {
      message: "Error while creating new new sheet",
    });
  }
};

export const getSheetsMetadataByUserId = async (req, res) => {
  const { user } = req;
  try {
    const response = await dbGetSheetsMetadataByUserId({ userId: user._id });
    return successResponse(res, SUCCESS, { data: response });
  } catch (error) {
    console.error("Error while fetching users sheet:", error);
    return errorResponse(res, INTERNAL_SERVER_ERROR, {
      message: "Error while fetching users sheet",
    });
  }
};
