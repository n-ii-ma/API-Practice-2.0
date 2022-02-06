const Joi = require("joi");

// POST Validation
const postValidation = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    username: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^\d+$/)
      .label("Invalid Phone Number"),
    website: Joi.string(),
  });
  return schema.validate(user);
};

// UPDATE Validation
const updateValidation = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    username: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\d+$/).label("Invalid Phone Number"),
    website: Joi.string(),
  });
  return schema.validate(user);
};

module.exports = { postValidation, updateValidation };
