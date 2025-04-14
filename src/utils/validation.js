import Joi from "joi";
import logger from "./logger.js";

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    logger.error(error);
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).max(30).required(),
  team_id: Joi.number().required(),
  role: Joi.string().valid("admin", "user").default("user"),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const ticketSchema = Joi.object({
  link: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string(),
  important: Joi.boolean(),
  shift_id: Joi.number().required(),
  user_id: Joi.string().required(),
  user_name: Joi.string(),
});

export const updateTicketSchema = Joi.object({
  link: Joi.string(),
  description: Joi.string(),
  status: Joi.string(),
  important: Joi.boolean(),
  shift_id: Joi.number(),
});
