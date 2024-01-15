import { validationResult } from "express-validator";
// import { Request } from "express";

// Check Validation For Requests
export const checkValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationError = {
      status: 400,
      message: errors.errors[0].msg,
    };
    throw validationError;
  }
};