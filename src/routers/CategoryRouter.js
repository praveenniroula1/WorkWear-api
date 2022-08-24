import express from "express";
import {
  newCategoryValidation,
  updateCategoryValidation,
} from "../middlewares/joiValidation/joiUserValidation.js";
import {
  deleteCategoryById,
  getAllCategory,
  hasChildCategoryById,
  insertCategory,
  updateCategoryById,
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

// Update category
router.put("/", updateCategoryValidation, async (req, res, next) => {
  try {
    const hasChildCats = await hasChildCategoryById(req.body._id);
    if (hasChildCats) {
      return res.json({
        status: "error",
        message: "This cateory has other child category, cannot delete",
      });
    }
    const catUpdate = await updateCategoryById(req.body);

    catUpdate?._id
      ? res.json({
          status: "success",
          message: "Category has been updated",
        })
      : res.json({
          status: "error",
          message: "Category could not be updated",
        });
  } catch (error) {
    next(error);
  }
});
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const hasChildCats = await hasChildCategoryById(_id);
    if (hasChildCats) {
      return res.json({
        status: "error",
        message: "This cateory has other child category, cannot delete",
      });
    }
    const catDelete = await deleteCategoryById(_id);

    catDelete?._id
      ? res.json({
          status: "success",
          message: "Category has been deleted",
        })
      : res.json({
          status: "error",
          message: "Category cannot be deleted",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
