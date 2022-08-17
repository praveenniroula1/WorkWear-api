import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    assosiate: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
export default mongoose.model("session", SessionSchema);
