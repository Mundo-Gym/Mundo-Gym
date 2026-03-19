import { Router } from "express";
import { getProducts, postProduct } from "../controllers/productController";
import requireAuth from "../middlewares/auth";

export const productRouter = Router();
productRouter.get("/", getProducts);
productRouter.post("/", postProduct);
