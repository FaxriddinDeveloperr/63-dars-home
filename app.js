import express from "express";
import { config } from "dotenv";
import category from "./src/router/category.route.js";
import product from "./src/router/product.route.js";

config();
const app = express();

const PORT = Number(process.env.PORT);

app.use(express.json());
app.use("/category", category);
app.use("/product", product);

app.listen(PORT, () => console.log("server runnin on port ", PORT));