import express from "express";

export const router = express.Router();

import { asyncHandler } from "../middleware/async-handler.js";
import { Product } from "../models/product-model.js";

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    }

    res.status(404);
    throw new Error("Resource not found"); 
  })
);
