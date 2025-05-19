import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);
const dataPath = path.join(__dirname, "data", "users.json");
console.log(dataPath);
const router = Router();

router.route("/").get((req, res) => {
  const data = fs.readFileSync(dataPath, "utf-8");
  console.log(data);
  res.json(JSON.parse(data));
});
router.route("/:id").get((req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(dataPath, "utf-8");
  const parseData = JSON.parse(data);
  const actualData = parseData[id];
  res.json(actualData);
});
router.route("/").post((req, res) => {
  const { name, email, password } = req.body;
  if(!email || !name || !password){
    res.status(400).json({"message":"All fields are required"})
  }
  console.log(name, email, password);
  fs.writeFileSync(dataPath,JSON.stringify(req.body))

  res.status(201).json({"message":"User successfully registered"})
});

export default router;
