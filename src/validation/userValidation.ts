import Joi from "joi";

// Define the schema for creating a user
export const userCreateSchema = Joi.object({
  firstName: Joi.string().min(1).required().messages({
    "any.required": `"firstName" is required`,
    "string.min": `"firstName" should have a minimum length of {#limit}`,
  }),
  lastName: Joi.string().min(1).required().messages({
    "any.required": `"lastName" is required`,
    "string.min": `"lastName" should have a minimum length of {#limit}`,
  }),
  userName: Joi.string().min(1).required().messages({
    "any.required": `"userName" is required`,
    "string.min": `"userName" should have a minimum length of {#limit}`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `"email" is required`,
    "string.email": `"email" must be a valid email`,
  }),
});
