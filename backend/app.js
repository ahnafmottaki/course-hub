// Importing dependencies
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// importing db
import mongoConnect from "./db/mongodb.init.js";
// Importing routes
import authRoutes from "./routes/auth.routes.js";
// Importing middlewares
import notFound from "./middlewares/not-found.js";
import errorMiddleware from "./middlewares/error.js";

const app = express();

// cors policy
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

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
mongoConnect().then(() =>
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
);
