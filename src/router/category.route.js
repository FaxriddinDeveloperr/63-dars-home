import { Router } from "express";
import { Categorycontroller } from "../controller/category.controller.js";


const router = Router()
const controller = new Categorycontroller()

router.post("/", controller.createCategory);
router.get("/", controller.getAllcategory);
router.get("/:id", controller.getById);
router.put("/:id", controller.updateById);
router.delete("/:id", controller.deleteById);

export default router;
