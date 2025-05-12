import db from "../db/index.js";

export class Productcontroller {
  async createProduct(req, res) {
    try {
      const { name, price, category_id } = req.body;
      const result = await db.query(
        "INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *",
        [name, price, category_id]
      );

      return res.status(201).json({
        statusCode: 201,
        message: "succes",
        data: result.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async getAllProduct(_, res) {
    try {
      const result = await db.query("select * from products");

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: result?.rows,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const result = await db.query("select * from products where id = $1", [
        req.params.id,
      ]);
      if (!result?.rows[0]) {
        return res.status(404).json({ error: "Guruh not fount" });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: result?.rows,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const { name, price, category_id } = req.body;
      const { id } = req.params;

      const categoryCheck = await db.query(
        "SELECT id FROM categories WHERE id = $1",
        [category_id]
      );
      if (!categoryCheck.rows[0]) {
        return res
          .status(404)
          .json({ error: `Category not found: ${category_id}` });
      }

      const result = await db.query(
        `UPDATE products
       SET name = $1,
           price = $2,
           category_id = $3
       WHERE id = $4
       RETURNING *`,
        [name, price, category_id, id]
      );

      if (!result.rows.length) {
        return res
          .status(404)
          .json({ error: `Product not found with ID: ${id}` });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Product updated successfully",
        data: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const result = await db.query(
        "DELETE FROM products WHERE id = $1 RETURNING *",
        [req.params.id]
      );

      if (!result.rows[0]) {
        return res.status(404).json({
          error: "Product not found or already deleted",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Product deleted successfully",
        data: {},
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}
