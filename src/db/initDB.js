import path from "path";
import db from "./index.js";
import{ readFileSync } from "fs";

function initDB() {
  try {
    const file = path.join('src/db/init.sql')
    const sql = readFileSync(file, "utf8");
    db.query(sql)
    console.log('Table create successfully');
    
  } catch (error) {
    console.log(error);
  }
}

initDB()