import { Sheet } from "../models/Sheet.js";

export const dbCreateNewSheet = async (params) => {
  const sheet = new Sheet(params);
  await sheet.save();
  return sheet;
};

export const dbGetSheetBySheetId = async (params) => {
  const sheet = Sheet.findOne({ _id: params.sheetId });
  return sheet;
};

export const dbGetSheetsByUserId = async (params) => {
  const sheets = await Sheet.find({ createdBy: params.userId });
  return sheets;
};

export const dbGetSheetsMetadataByUserId = async (params) => {
  const sheets = await Sheet.find({ createdBy: params.userId });
  return sheets;
};

export const dbGetSheetDataByUserId = async (params) => {
  const sheets = await Sheet.find({ createdBy: params.userId });
  return sheets.filter((sheet) => sheet.data).map((sheet) => sheet.data);
};

export const dbAddNewCategoryToSheet = async (params) => {
  await Sheet.findByIdAndUpdate(params.sheetId, {
    $addToSet: { "data.categoryIds": params.categoryId },
  });
};

export const dbUpdateCategoryIdsInSheet = async (params) => {
  await Sheet.findByIdAndUpdate(params.sheetId, { "data.categoryIds": params.categoryIds }, { new: true });
};

export const dbGetCategoryIdsBySheetId = async (params) => {
  const sheet = await Sheet.findById(params.sheetId, {
    "data.categoryIds": 1,
    _id: 0,
  });
  return sheet?.data?.categoryIds || [];
};

export const dbDeleteSheetById = async (params) => {
  await Sheet.findByIdAndDelete(params.sheetId);
};

export const dbToggleSheetPublicStatus = async (params) => {
  const res = await Sheet.findByIdAndUpdate(
    params.sheetId,
    {
      $set: {
        "metadata.isPublic": params.isPublic,
      },
    },
    { new: true }
  );
};
