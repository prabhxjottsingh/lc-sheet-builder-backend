import { ObjectId } from "mongodb";
import { Category } from "../models/Category.js";

export const dbCreateNewCategory = async (params) => {
  const category = new Category(params);
  await category.save();
  return category;
};

export const dbGetCategoryById = async (params) => {
  const category = await Category.findOne({
    _id: params.categoryId,
  });
  return category;
};

export const dbAddProblemsToCategory = async (params) => {
  const category = await Category.findById(params.categoryId);
  category.data.problemIds = [
    ...new Set([...category.data.problemIds, ...params.problemIds]),
  ];
  await category.save();
};

export const dbDeleteCategoryById = async (params) => {
  await Category.findByIdAndDelete(params.problemId);
};

export const dbUpdateProblemIdsInCategory = async (params) => {
  await Category.findByIdAndUpdate(
    params.categoryId,
    { "data.problemIds": params.problemIds },
    { new: true }
  );
};
