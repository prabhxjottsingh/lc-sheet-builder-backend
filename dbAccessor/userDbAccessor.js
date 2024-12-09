import { User } from "../models/User.js";

export const dbGetUserByEmail = async (params) => {
  const userData = await User.findOne({
    email: {
      $regex: new RegExp(`^${params.email}$`, "i"),
    },
  });
  return userData;
};

export const dbCreateNewUser = async (params) => {
  const user = new User(params);
  await user.save();
};
