import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    address: String,
    location: {
      type: String,
    },
    propertyType: {
      type: String,
      enum: ["apartment", "room", "flat"],
      required: true,
    },
    monthlyRent: {
      type: Number,
      required: true,
    },
    bedRooms: {
      type: Number,
      default: 1,
    },
    size: Number,
    sizeUnit: {
      type: String,
      enum: ["sqft", "sqm", "acre", "other"], // customize as needed
    },
    petsAllowed: {
      type: Boolean,
      default: false,
    },
    amenities: [String],
    images: [String],
    available: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const  Property = mongoose.model("Property",propertySchema)