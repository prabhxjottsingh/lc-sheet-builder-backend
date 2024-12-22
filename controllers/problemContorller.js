import {
  dbAddProblemsToCategory,
  dbGetCategoryById,
  dbUpdateProblemIdsInCategory,
} from "../dbAccessor/categoryDbAccessor.js";
import {
  dbCreateNewProblem,
  dbDeleteProblemById,
  dbGetProblemById,
  dbUpdateProblemMarkedDoneState,
} from "../dbAccessor/problemDbAccessor.js";
import {} from "../dbAccessor/sheetDbAccessor.js";
import { Problem } from "../models/Problem.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { constants } from "../utils/constants.js";

const INTERNAL_SERVER_ERROR = constants.STATUS_CODE.INTERNAL_SERVER;
const RESOURCE_CREATED_SUCCESS = constants.STATUS_CODE.RESOURCE_CREATED_SUCCESS;
const SUCCESS = constants.STATUS_CODE.SUCCESS;

export const addNewProblem = async (req, res) => {
  const { categoryId, problemIds } = req.body;
  const userId = req.user;

  try {
    const problemIdsObjectIds = await Promise.all(
      problemIds.map(async (problemId) => {
        const newProblem = new Problem({
          lcproblemId: problemId.lcid,
          createdBy: userId,
        });
        const createdProblem = await dbCreateNewProblem(newProblem); // Save to DB
        return createdProblem._id; // Return the ObjectId of the created problem
      })
    );

    await dbAddProblemsToCategory({
      categoryId,
      problemIds: problemIdsObjectIds,
    });

    return successResponse(res, RESOURCE_CREATED_SUCCESS, {
      message: "Problems added successfully",
    });
  } catch (error) {
    console.error("Error while adding new problem", error);
    return errorResponse(res, INTERNAL_SERVER_ERROR, {
      message: "Error while adding new problems",
    });
  }
};

export const getProblems = async (req, res) => {
  const { problemIds } = req.body;
  try {
    const responses = await Promise.all(
      problemIds.map((problemId) => dbGetProblemById({ problemId }))
    );

    return successResponse(res, SUCCESS, { data: responses });
  } catch (error) {
    console.error("Error while fetching problems:", error);
    return errorResponse(res, INTERNAL_SERVER_ERROR, {
      message: "Error while fetching the problems",
    });
  }
};

export const getProblemsByCategoryId = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const categoryData = await dbGetCategoryById({ categoryId });
    const problemIds = categoryData?.data?.problemIds || [];
    const responses = await Promise.all(
      problemIds.map((problemId) => dbGetProblemById({ problemId }))
    );

    return successResponse(res, SUCCESS, { data: responses });
  } catch (error) {
    console.error("Error while fetching problems by categoryIds:", error);
    return errorResponse(res, INTERNAL_SERVER_ERROR, {
      message: "Error while fetching problems by categoryIds",
    });
  }
};

export const deleteProblem = async (req, res) => {
  const { problemId, categoryId } = req.query;
  try {
    const categoryData = await dbGetCategoryById({ categoryId });
    const updatedCategoryProblems = categoryData.data.problemIds.filter(
      (id) => id != problemId
    );
    await dbUpdateProblemIdsInCategory({
      categoryId,
      problemIds: updatedCategoryProblems,
    });
    await dbDeleteProblemById({ problemId });
    return successResponse(res, SUCCESS, {
      message: "Problem deleted successfully",
    });
  } catch (error) {
    console.error("Error occured while deleting problem: ", error);
    return errorResponse(res, INTERNAL_SERVER_ERROR, {
      message: "Error while deleting the problem",
    });
  }
};

export const markProblemStateChange = async (req, res) => {
  const { problemId, isMarkedDone } = req.body;
  try {
    const result = await dbUpdateProblemMarkedDoneState({
      problemObjectId: problemId,
      isMarkedDone,
    });
    return successResponse(res, SUCCESS, {
      message: "Problem marked done state updated successfuly.",
    });
  } catch (error) {
    console.error(
      "Error occured while changing the problem done state: ",
      error
    );
    return errorResponse(res, INTERNAL_SERVER_ERROR, {
      message: "Error while changing the problem state",
    });
  }
};
