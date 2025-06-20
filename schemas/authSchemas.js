import Joi from "joi";

export const userSchema = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string().email().required(),
});

export const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
