import { Booking } from "../models/booking.model.js";

const createBooking = async (req, res) => {
  try {
    const { property, startDate, endDate, totalAmount } = req.body;
    const booking = new Booking({
      property,
      tenant: req.user.id,
      startDate,
      endDate,
      totalAmount,
    });
    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = status;
    await booking.save();
    res
      .status(200)
      .json({ message: "Booking status updated successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error updating booking status", error });
  }
};
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("property")
      .populate("tenant");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

export { createBooking, getBookings, changeStatus };
