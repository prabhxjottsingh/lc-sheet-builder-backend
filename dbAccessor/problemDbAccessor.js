import { Problem } from "../models/Problem.js";

export const dbCreateNewProblem = async (params) => {
  const problem = new Problem(params);
  await problem.save();
  return problem;
};

export const dbGetProblemById = async (params) => {
  const problem = await Problem.findOne({
    _id: params.problemId,
  });
  return problem;
};

export const dbDeleteProblemById = async (params) => {
  await Problem.findByIdAndDelete(params.problemId);
};

export const dbUpdateProblemMarkedDoneState = async (params) => {
  const updatedProblem = await Problem.findByIdAndUpdate(
    params.problemObjectId,
    { isMarkedDone: params.isMarkedDone },
    { new: true }
  );
  return updatedProblem;
};
