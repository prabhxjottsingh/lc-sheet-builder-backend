import { z } from "zod";

export const addNewSheetRequest = z.object({
  body: z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
  }),
});

