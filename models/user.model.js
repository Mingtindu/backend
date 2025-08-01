import mongoose from "mongoose";

//schema blueprownerint
// model interaction create read update delete
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
  },
  role: { type: String, enum: ["tenant", "owner", "admin"], default: "tenant" },
  emailVerified: {
    type: Boolean,
  },
  verificationToken: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "deactive"],
    default: "active",
  },
  photo: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
