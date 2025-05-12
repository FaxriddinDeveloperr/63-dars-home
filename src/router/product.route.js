import { Router } from "express";
import { Productcontroller } from "../controller/products.controller.js";

const route = Router();
const controller = new Productcontroller();

route.post("/", controller.createProduct);
route.get("/", controller.getAllProduct);
route.get("/:id", controller.getById);
route.put("/:id", controller.updateProduct);
route.delete("/:id", controller.deleteById);

export default route;
