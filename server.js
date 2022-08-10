import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

// DB COnnection
import { dbConnect } from "./src/config/dbConfig.js";
dbConnect();

// middleware
import cors from "cors";
import helmet from "helmet";
app.use(cors());
app.use(helmet());
app.use(express.json());

// APIS
import adminUserRouter from "./src/routers/adminUserRouter.js";
app.use("/api/v1/admin-user", adminUserRouter);

app.get("/", (req, res) => {
  res.json({
    Status: "Hi there",
    message: "Go Away",
  });
});

// global handler throughout the express App
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.status || 404;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

// Listening the serverr
app.listen(PORT, (error) => {
  error && console.log(error);
  console.log(`your server is serving at http://localhost:${PORT}`);
});
