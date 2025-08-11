import express from "express";
import {
    changeStatus,
  createBooking,
  getBookings,
} from "../controller/booking.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticate, createBooking);
router.get("/", getBookings);
router.patch("/:id",changeStatus);

export default router;
