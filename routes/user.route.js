import { Router } from "express";
import {
  emailVerify,
  getMyProfile,
  getUser,
  getUserById,
  login,
  registeruser,
  updateUser,
} from "../controller/user.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// console.log(__filename);
// const __dirname = path.dirname(__filename);
// console.log(__dirname);
// const dataPath = path.join(__dirname, "data", "users.json");
// console.log(dataPath);
const router = Router();
router.route("/").post(
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
  ]),
  registeruser
);
router.route("/login").post(login);
router.route("/my-profile").get(authenticate, getMyProfile);

router.route("/verify").get(emailVerify);
router.route("/").get(getUser);
router.route("/:id").get(getUserById);
router.route("/:id").put(updateUser);

// router.route("/").post((req, res) => {
//   const { name, email, password } = req.body;

//   if (!email || !name || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   let parseData;

//     const data = fs.readFileSync(dataPath, "utf-8");
//     console.log(data)
//     parseData = JSON.parse(data);

//   parseData.push(req.body);

//   fs.writeFileSync(dataPath, JSON.stringify(parseData, null, 2));

//   res.status(201).json({ message: "User successfully registered" });
// });

export default router;
