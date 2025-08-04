import express from "express";
import {
  createProperty,
  deleteProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
} from "../controller/property.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "owner"),
  createProperty
);
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "owner", "tenant"),
  getAllProperties
);
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "owner", "tenant"),
  getPropertyById
);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin", "owner"),
  updateProperty
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin", "owner"),
  deleteProperty
);

export default router;
