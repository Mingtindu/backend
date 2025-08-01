import express from "express";
import { createProperty, deleteProperty, getAllProperties, getPropertyById, updateProperty } from "../controller/property.controller.js";


const router = express.Router();

router.post("/", createProperty);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router;