import express from "express";
import { upload } from "../middlewares/multer.js";
import { uploadFile } from "../controller/file.controller.js";

const router = express.Router();

router.post(
  "/single",
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
  ]),
  uploadFile
);

export default router;
