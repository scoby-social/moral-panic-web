import Joi from "joi";
import { Pronouns } from "lib/models/user";

export const schema = Joi.object({
  username: Joi.string().alphanum().max(15).required().messages({
    "string.empty": "Name is required",
    "string.max": "Name must be less than 15 characters long!",
    "string.alphanum": "Name must contain only alphanumeric characters!",
  }),
  amplifierRole: Joi.string().alphanum().required().messages({
    "string.empty": "Adjective is required",
    "string.alphanum": "Adjective must contain only alphanumeric characters!",
  }),
  superpowerRole: Joi.string().alphanum().required().messages({
    "string.empty": "Noun is required",
    "string.alphanum": "Noun must contain only alphanumeric characters!",
  }),
  pronouns: Joi.string().valid(...Object.values(Pronouns)),
  bio: Joi.string().max(160).required().messages({
    "string.empty": "Biography is required",
    "string.max": "Biography must be less than 160 characters",
  }),
  twitterHandle: Joi.optional().disallow(`"`, `'`).messages({
    "any.invalid": "Twitter Handle contains an invalid character",
  }),
  discordHandle: Joi.optional().disallow(`"`, `'`, "@").messages({
    "any.invalid": "Discord Handle contains an invalid character",
  }),
  telegramHandle: Joi.optional().disallow(`"`, `'`).messages({
    "any.invalid": "Telegram Handle contains an invalid character",
  }),
});
