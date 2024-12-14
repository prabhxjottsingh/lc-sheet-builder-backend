import { z } from "zod";

export const addNewProblemRequest = z.object({
  body: z.object({
    categoryId: z.string().nonempty(),
    problemIds: z.array(z.object({})).nonempty(),
  }),
});
