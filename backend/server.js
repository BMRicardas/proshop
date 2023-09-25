import express from "express";
import { connectDB } from "./config/db.js";
import { configDotenv } from "dotenv";
import { router as productRoutes } from "./routes/product-routes.js";
import { router as userRoutes } from "./routes/user-routes.js";
import { errorHandler, notFound } from "./middleware/error-middleware.js";

configDotenv();

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (_req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
