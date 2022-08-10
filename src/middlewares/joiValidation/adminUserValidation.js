import joi from "joi";

export const newAdminUserValidation = (req, res, next) => {
  try {
    // Define rules
    const schema = joi.object({
      fName: joi.string().max(20).required(),
      lName: joi.string().max(20).required(),
      email: joi.string().email({ minDomainSegments: 2 }).required(),
      password: joi.string().max(100).required(),
      phone: joi.string().max(20).required().allow("", null),
      address: joi.string().max(100).required().allow("", null),
      dob: joi.date().allow("", null),
    });
    // give data to the rules
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 200;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
