import express from "express";
import { newCategoryValidation } from "../middlewares/joiValidation/joiUserValidation.js";
import {
  getAllCategory,
  insertCategory,
} from "../models/category/CategoryModel.js";
const router = express.Router();
import slugify from "slugify";

// get category
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const categories = _id
      ? await getOneCategorybyId(_id)
      : await getAllCategory();

    res.json({
      status: "success",
      message: "Category list.",
      categories,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// Post the category
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name, {
      lower: true,
      trim: true,
    });
    const result = await insertCategory(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "Category list.",
        })
      : res.json({
          status: "error",
          message: "Cannot create Category list, Try again later.",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
