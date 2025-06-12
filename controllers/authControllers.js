import HttpError from "../helpers/HttpError.js";
import * as authServices from "../services/authServices.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authServices.getUser(email);

    if (user) {
      throw HttpError(409, "Email is already in use");
    }
    const newUser = await authServices.addUser({ email, password });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    const { status = 500, message = "Internal Server Error" } = error;
    res.status(status).json({ message });
  }
};
