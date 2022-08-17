import joi from "joi";
import {
  address,
  date,
  email,
  fName,
  lName,
  password,
  phone,
  validator,
} from "./constant.js";

export const newAdminUserValidation = (req, res, next) => {
  // Define rules
  const schema = joi.object({
    fName: fName.required(),
    lName: lName.required(),
    email: email.required(),
    password: password.required(),
    phone: phone.required(),
    address: address,
    dob: date.allow("", null),
  });
  // give data to the rules
  validator(schema, req, res, next);
};
export const emailVerification = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    emailValidationCode: joi.string().max(100).required(),
  });

  validator(schema, req, res, next);
};
export const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: email.required(),
    password: password.required(),
  });

  validator(schema, req, res, next);
};
