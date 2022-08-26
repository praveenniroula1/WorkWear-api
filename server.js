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
import categoryRouter from "./src/routers/CategoryRouter.js";
import paymentMethodRouter from "./src/routers/paymentMethodRouter.js";
import { adminAuth } from "./src/middlewares/joiValidation/authMiddleWare/authMiddleWare.js";
app.use("/api/v1/admin-user", adminUserRouter);
app.use("/api/v1/category", adminAuth, categoryRouter);
app.use("/api/v1/payment-method", adminAuth, paymentMethodRouter);

// serverSide Rendering
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
