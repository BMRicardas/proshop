import express from "express";
import {
  getProductById,
  getProducts,
} from "../controllers/product-controller.js";

export const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

