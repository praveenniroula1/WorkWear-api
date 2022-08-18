import CategorySchema from "./CategorySchema.js";

export const insertCategory = (obj) => {
  return CategorySchema(obj).save();
};
export const getAllCategory = () => {
  return CategorySchema.find();
};
export const getOneCategorybyId = (_id) => {
  return CategorySchema.findById(_id);
};
export const postCategory = (obj) => {
  return CategorySchema(obj).save();
};
