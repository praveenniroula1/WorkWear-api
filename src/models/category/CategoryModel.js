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
export const updateCategoryById = ({ _id, ...rest }) => {
  return CategorySchema.findByIdAndUpdate(_id, rest, { new: true });
};
export const hasChildCategoryById = async (parentId) => {
  const cat = await CategorySchema.findOne({ parentId });
  return cat?._id ? true : false;
};
export const deleteCategoryById = (_id) => {
  return CategorySchema.findByIdAndDelete(_id);
};
