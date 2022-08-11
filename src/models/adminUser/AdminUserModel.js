import AdminUserSchema from "./AdminUserSchema.js";

// InsertUser
export const insertAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};

// UpdateUser
export const UpdateOneAdminUser = ({ filter, update }) => {
  return AdminUserSchema.findOneAndUpdate(filter, update, { new: true });
};
// FindOneUser
export const FindOneAdminUser = (filter) => {
  return AdminUserSchema.findOne(filter);
};
