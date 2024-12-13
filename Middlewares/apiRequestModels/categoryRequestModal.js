import { z } from "zod";

export const addNewCategoryRequest = z.object({
  body: z.object({
    sheetId: z.string().nonempty(),
    name: z.string().nonempty(),
    color: z.string().nonempty(),
  }),
});

export const getCategoryMetadataByIdRequest = z.object({
  query: z.object({
    categoryId: z.string().nonempty(),
  }),
});

export const getCategoriesBySheetIdRequest = z.object({
  query: z.object({
    sheetId: z.string().nonempty(),
  }),
});
