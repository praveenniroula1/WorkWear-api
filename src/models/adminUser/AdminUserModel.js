import AdminUserSchema from "./AdminUserSchema.js";

// InsertUser
export const insertAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};
