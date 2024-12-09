import { z } from "zod";

export const signUpRequest = z.object({
  body: z.object({
    name: z.string().nonempty(),
    email: z.string().nonempty(),
    password: z.string().nonempty(),
  }),
});

export const loginRequest = z.object({
  body: z.object({
    email: z.string().nonempty(),
    password: z.string().nonempty(),
  }),
});
