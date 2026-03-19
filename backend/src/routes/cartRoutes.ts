import { Router } from "express";
import { buildSimpleCrudController } from "../controllers/simpleCrudController";
import { Cart } from "../models/Cart";
import requireAuth from "../middlewares/auth";

const controller = buildSimpleCrudController(Cart);

export const cartRouter = Router();
cartRouter.get("/", controller.list);
cartRouter.post("/", requireAuth, controller.create);

// Merge local cart into server-side cart for authenticated users
import * as shoppingCarController from "../controllers/shoppingCarController";
cartRouter.post("/merge", requireAuth, (req, res) => shoppingCarController.mergeCart(req, res));
