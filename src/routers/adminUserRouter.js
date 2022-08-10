import express from "express";
import { hashPassowrd } from "../helpers/bcryptHelper.js";
import { newAdminUserValidation } from "../middlewares/joiValidation/adminUserValidation.js";
import { insertAdminUser } from "../models/adminUser/AdminUserModel.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import { verificationEmail } from "../helpers/emailHelper.js";

// server side validation
//encrypt user passowrd
// insert into database
// create unique verification code
// send create a link pointing to our frontENd with email and verification code and send to their email

router.post("/", newAdminUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;

    req.body.password = hashPassowrd(password);
    req.body.emailValidationCode = uuidv4();

    const user = await insertAdminUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message: "Please verify your email",
      });
      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;
      // send email
      verificationEmail({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        url,
      });
      return;
    }

    res.json({
      status: "error",
      message: "unable to create new user",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message = "Email already in use.";
    }
    next(error);
  }
});
router.patch("/verify-email", (req, res, next) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "verify your email to create the user",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
