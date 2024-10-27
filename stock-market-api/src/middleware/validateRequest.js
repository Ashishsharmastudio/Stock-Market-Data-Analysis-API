const Joi = require("joi");
const { errorResponse } = require("../utils/response");

// Define validation schemas
const dateRangeSchema = Joi.object({
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().min(Joi.ref("start_date")).required(),
});

const symbolSchema = Joi.object({
  symbol: Joi.string().required(),
});

const paginationSchema = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(10),
});

// Middleware function
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return errorResponse(res, error.details[0].message, 400);
    }
    next();
  };
};

module.exports = {
  validateQuery,
  dateRangeSchema,
  symbolSchema,
  paginationSchema,
};
