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

export const maintenanceSchema = Joi.object({
  name: Joi.string().required(),
  pre_scm_summary_total: Joi.number(),
  post_scm_summary_total: Joi.number(),
  pre_scm_summary_total_count: Joi.number(),
  post_scm_summary_total_count: Joi.number(),
  pre_rpd: Joi.number(),
  post_rpd: Joi.number(),
  pre_cm_partial: Joi.number(),
  post_cm_partial: Joi.number(),
  pre_cpe_total_count: Joi.number(),
  post_cpe_total_count: Joi.number(),
  pre_cpe_erouter_count: Joi.number(),
  post_cpe_erouter_count: Joi.number(),
  pre_cpe_cpe_count: Joi.number(),
  post_cpe_cpe_count: Joi.number(),
  pre_cpe_edva_count: Joi.number(),
  post_cpe_edva_count: Joi.number(),
  pre_cpe_emta_count: Joi.number(),
  post_cpe_emta_count: Joi.number(),
  pre_cpe_estb_count: Joi.number(),
  post_cpe_estb_count: Joi.number(),
  pre_cpe_d4_count: Joi.number(),
  post_cpe_d4_count: Joi.number(),
  pre_cpe_d6_count: Joi.number(),
  post_cpe_d6_count: Joi.number(),
  pre_cpe_exclude_d4d6: Joi.number(),
  post_cpe_exclude_d4d6: Joi.number(),
});

export const updateMaintenanceSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string(),
  pre_scm_summary_total: Joi.number(),
  post_scm_summary_total: Joi.number(),
  pre_scm_summary_total_count: Joi.number(),
  post_scm_summary_total_count: Joi.number(),
  pre_rpd: Joi.number(),
  post_rpd: Joi.number(),
  pre_cm_partial: Joi.number(),
  post_cm_partial: Joi.number(),
  pre_cpe_total_count: Joi.number(),
  post_cpe_total_count: Joi.number(),
  pre_cpe_erouter_count: Joi.number(),
  post_cpe_erouter_count: Joi.number(),
  pre_cpe_cpe_count: Joi.number(),
  post_cpe_cpe_count: Joi.number(),
  pre_cpe_edva_count: Joi.number(),
  post_cpe_edva_count: Joi.number(),
  pre_cpe_emta_count: Joi.number(),
  post_cpe_emta_count: Joi.number(),
  pre_cpe_estb_count: Joi.number(),
  post_cpe_estb_count: Joi.number(),
  pre_cpe_d4_count: Joi.number(),
  post_cpe_d4_count: Joi.number(),
  pre_cpe_d6_count: Joi.number(),
  post_cpe_d6_count: Joi.number(),
  pre_cpe_exclude_d4d6: Joi.number(),
  post_cpe_exclude_d4d6: Joi.number(),
});
