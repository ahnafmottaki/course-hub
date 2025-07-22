// Importing dependencies
import dotenv from "dotenv";
dotenv.config();
import express from "express";

// Importing routes
import authRoutes from "./routes/auth.routes.js";
// Importing middlewares
import notFound from "./middlewares/not-found.js";
import errorMiddleware from "./middlewares/error.js";

const app = express();

// Middlewares
app.use(express.json());

app.get("/api/healthCheck", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HealthCheck  Successful",
  });
});

// Routes
app.use("/api/auth", authRoutes);

// Not found middleware
app.use(notFound);

// Error Middleware
app.use(errorMiddleware);

// Server is running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
