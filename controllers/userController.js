import {
  dbCreateNewCategory,
  dbGetCategoryById,
} from "../dbAccessor/categoryDbAccessor.js";
import { dbGetProblemById } from "../dbAccessor/problemDbAccessor.js";
import {
  dbCreateNewSheet,
  dbDeleteSheetById,
  dbGetSheetBySheetId,
  dbGetSheetDataByUserId,
  dbGetSheetsByUserId,
  dbGetSheetsMetadataByUserId,
  dbToggleSheetPublicStatus,
} from "../dbAccessor/sheetDbAccessor.js";
import { Category } from "../models/Category.js";
import { Sheet } from "../models/Sheet.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { constants } from "../utils/constants.js";

const INTERNAL_SERVER_ERROR = constants.STATUS_CODE.INTERNAL_SERVER;
const RESOURCE_CREATED_SUCCESS = constants.STATUS_CODE.RESOURCE_CREATED_SUCCESS;
const SUCCESS = constants.STATUS_CODE.SUCCESS;
const UNAUTHORISED_CODE = constants.STATUS_CODE.UNAUTHORISED;

export const getUserAnalytics = async (req, res) => {
  const { userId } = req.query;
  try {
    const sheetsData = await dbGetSheetsByUserId({ userId });

    const resAnalyticsData = await Promise.all(
      sheetsData.map(async (sheet) => {
        const sheetData = sheet.data;
        const categories = sheetData.categoryIds;
        const sheetId = sheet._id;
        const sheetName = sheet.metadata.name;
        const sheetDescription = sheet.metadata.description;

        // Process categories for the current sheet
        const categoryData = await Promise.all(
          categories.map(async (categoryId) => {
            const category = await dbGetCategoryById({ categoryId });

            // Process problems for the current category
            const problems = await Promise.all(
              category.data.problemIds.map((problemId) =>
                dbGetProblemById({ problemId })
              )
            );

            const solvedProblemsCount = problems.filter(
              (problem) => problem.isMarkedDone
            ).length;
            const unsolvedProblemsCount = problems.filter(
              (problem) => !problem.isMarkedDone
            ).length;

            return {
              id: category.metadata.name,
              value: solvedProblemsCount + unsolvedProblemsCount,
              label: {
                solvedProblemsCount,
                unsolvedProblemsCount,
              },
              color: category.metadata.color, // Assuming the category has a color field
            };
          })
        );

        return {
          title: sheetName,
          description: sheetDescription,
          data: categoryData,
          innerRadius: 85,
        };
      })
    );

    return successResponse(res, SUCCESS, {
      message: "User analytics fetched successfully",
      data: resAnalyticsData,
    });
  } catch (error) {
    console.error("Error while fetching user analytcis", error);
    return errorResponse(res, INTERNAL_SERVER_ERROR, {
      message: "Error while fetching user analytcis",
    });
  }
};
