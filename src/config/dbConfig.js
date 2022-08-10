import mongoose from "mongoose";

export const dbConnect = () => {
  try {
    const conStr = process.env.MONGO_CLIENT;
    if (!conStr) {
      return console.log(
        "there is no connection string available in process.env.MONGO_CLIENT"
      );
    }

    const conn = mongoose.connect(conStr);
    conn && console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
