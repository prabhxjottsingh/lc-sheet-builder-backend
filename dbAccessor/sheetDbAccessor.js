import { Sheet } from "../models/Sheet.js";

export const dbCreateNewSheet = async (params) => {
  const sheet = new Sheet(params);
  await sheet.save();
  return sheet;
};

export const dbGetSheetsMetadataByUserId = async (params) => {
  const sheets = await Sheet.find(
    { createdBy: params.userId }
    // { metadata: 1, _id: 1 }
  );
  return sheets;
};

export const dbAddNewCategoryToSheet = async (params) => {
  await Sheet.findByIdAndUpdate(params.sheetId, {
    $addToSet: { "data.categoryIds": params.categoryId },
  });
};

export const dbGetCategoryIdsBySheetId = async (params) => {
  console.log("Params: ", params);
  const sheet = await Sheet.findById(params.sheetId, {
    "data.categoryIds": 1,
    _id: 0,
  });
  console.log("This is the sheetdata: ", sheet);
  return sheet.data.categoryIds;
};
