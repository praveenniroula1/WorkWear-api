import express from "express";
import {
  newPaymentMethodValidation,
  updatePaymentMethodValidation,
} from "../middlewares/joiValidation/joiUserValidation.js";
import {
  deletePaymentMethodById,
  getPaymentMethod,
  insertPaymentMethod,
  updatePaymentMethodById,
} from "../models/Payment-Method/PaymentMethodModel.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const pm = await getPaymentMethod();
    res.json({
      status: "success",
      message: "todo",
      pm,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});
router.post("/", newPaymentMethodValidation, async (req, res, next) => {
  try {
    const pm = await insertPaymentMethod(req.body);
    pm?._id
      ? res.json({
          status: "success",
          message: "New payment method added",
        })
      : res.json({
          status: "error",
          message: "Cannot add new payment method",
        });
  } catch (error) {
    error.status = 500;

    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Already added, edit them instead.";
      error.status = 200;
    }
    next(error);
  }
});
router.put("/", updatePaymentMethodValidation, async (req, res, next) => {
  try {
    const pm = await updatePaymentMethodById(req.body);
    pm?._id
      ? res.json({
          status: "success",
          message: "New payment method updated",
        })
      : res.json({
          status: "error",
          message: "Cannot add new payment method",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const pm = await deletePaymentMethodById(_id);
    pm?._id
      ? res.json({
          status: "success",
          message: "New payment method deleted",
        })
      : res.json({
          status: "error",
          message: "Cannot delete payment method",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});
export default router;
