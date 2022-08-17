import joi from "joi";

export const fName = joi.string().max(20);
export const lName = joi.string().max(20);
export const email = joi.string().email({ minDomainSegments: 2 });
export const password = joi.string().max(100);
export const phone = joi.string().max(20);
export const address = joi.string().max(100).allow("", null);
export const date = joi.date();

export const SHORTSTR = joi.string().max(50);
export const LONGSTR = joi.string().max(5000);

export const validator = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    error.status = 200;
    return next(error);
  }
  next();
};
