import User from "../models/user.js";

export const getUser = async (email) => {
  return await User.findOne({ where: { email } });
};

export const addUser = async ({ email, password }) => {
  try {
    return await User.create({ email, password });
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};
