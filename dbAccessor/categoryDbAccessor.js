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
