import jwt from "jsonwebtoken";

import HttpError from "../helpers/HttpError.js";

import User from "../models/user.js";

export const registerUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw HttpError(409, "Email is already in use");
  }

  const newUser = await User.create({ email, password });
  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    throw HttpError(401, "Invalid email or password");
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};
