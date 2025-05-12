import db from "../db/index.js";

export class Categorycontroller {
  async createCategory(req, res) {
    try {
      const { name, description } = req.body;
      const result = await db.query(
        "Insert into categories (name,description) VALUES($1,$2) RETURNING *",
        [name, description]
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

  async getAllcategory(_, res) {
    try {
      const result = await db.query("select * from categories");

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
      const result = await db.query("select * from categories where id = $1", [
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

  async updateById(req, res) {
    try {
      const result = await db.query(
        "update  categories set name = $1, description = $2  where id = $3 returning *",
        [req.body.name, req.body.description, req.params.id]
      );
      if (!result?.rows[0]) {
        return res.status(400).json({
          error: "Error on update categories",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: result?.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async deleteById(req, res) {
    try {
      const result = await db.query(
        "delete from categories where id = $1 returning *",
        [req.params.id]
      );
      if (!result?.rows[0]) {
        return res.status(400).json({
          error: "Error on deleteing categories",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: {},
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}
