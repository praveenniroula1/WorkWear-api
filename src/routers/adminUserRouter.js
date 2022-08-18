import express from "express";
import { ComparePassowrd, hashPassowrd } from "../helpers/bcryptHelper.js";
import {
  emailVerification,
  loginValidation,
  newAdminUserValidation,
} from "../middlewares/joiValidation/joiUserValidation.js";
import {
  FindOneAdminUser,
  insertAdminUser,
  UpdateOneAdminUser,
} from "../models/adminUser/AdminUserModel.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import {
  userVerifiedEmail,
  verificationEmail,
} from "../helpers/emailHelper.js";
import { createJWT, signAccessJwt } from "../helpers/jwtHelper.js";

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
router.patch("/verify-email", emailVerification, async (req, res, next) => {
  try {
    const { emailValidationCode, email } = req.body;
    const user = await UpdateOneAdminUser(
      { emailValidationCode, email },
      { status: "active", emailValidationCode: "" }
    );
    user?._id
      ? res.json({
          status: "success",
          message: "You have been verified, please login now.",
        }) && userVerifiedEmail(user)
      : res.json({
          status: "error",
          message: "Already verified or Invalid/Expired link.",
        });
  } catch (error) {
    next(error);
  }
});

router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // find if
    const user = await FindOneAdminUser({ email });

    if (user?._id) {
      if (user.status !== "active") {
        return res.json({
          status: "error",
          message: "You have not been verified yet, please verify.",
        });
      }
      // we need to verify if the password send by the user and hash password stored in our db is the same
      const isMatched = ComparePassowrd(password, user.password);
      if (isMatched) {
        user.password = undefined;
        // JWT
        const jwts = await createJWT({ email });
        return res.json({
          status: "success",
          message: "You have logged in successfully.",
          user,
          ...jwts,
        });
      }
    }
    res.json({
      status: "error",
      message: "Invalid login or password",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
