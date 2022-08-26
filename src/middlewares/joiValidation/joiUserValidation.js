import joi from "joi";
import {
  address,
  date,
  email,
  fName,
  lName,
  password,
  phone,
  SHORTSTR,
  validator,
  STATUS,
  LONGSTR,
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

// Category
export const newCategoryValidation = (req, res, next) => {
  req.body.parentId = req.body.parentId ? req.body.parentId : null;
  const schema = joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    parentId: SHORTSTR.allow(null, ""),
  });

  validator(schema, req, res, next);
};
export const updateCategoryValidation = (req, res, next) => {
  req.body.parentId = req.body.parentId ? req.body.parentId : null;
  const schema = joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    parentId: SHORTSTR.allow(null, ""),
    _id: SHORTSTR.required(),
  });

  validator(schema, req, res, next);
};

// ===========Payment Validation
export const newPaymentMethodValidation = (req, res, next) => {
  const schema = joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    description: LONGSTR.required(),
  });
  validator(schema, req, res, next);
};
export const updatePaymentMethodValidation = (req, res, next) => {
  const schema = joi.object({
    _id: SHORTSTR.required(),
    status: STATUS,
    name: SHORTSTR.required(),
    description: LONGSTR.required(),
  });
  validator(schema, req, res, next);
};
