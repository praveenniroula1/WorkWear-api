import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "Inactive",
    },
    fName: {
      type: String,
      required: true,
      maxLength: [20, "first name cannot be longer than 20 Character"],
    },
    lName: {
      type: String,
      required: true,
      maxLength: [20, "first name cannot be longer than 20 Character"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
      maxLength: [50, "first name cannot be longer than 20 Character"],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      maxLength: [70, "cannot be longer than 50 Character"],
      default: "n/a",
    },
    dob: {
      type: Date,
      default: null,
    },
    emailValidationCode: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Admin_user", adminUserSchema);
