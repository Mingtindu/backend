import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../lib/email/sendEmail.js";
import { welcomeAndVerifyEmailTemplate } from "../lib/email/templates/welcomeUser.js";
import { uploadToCloudinary } from "../lib/email/cloudinary.js";

const registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({ message: "User name is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "User email is required" });
    }

    const userExist = await User.find({ email: email.toLowerCase() });
    if (userExist.length > 0) {
      return res
        .status(400)
        .json({ message: "User already exist with this email" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const verificationToken = Math.random();
    console.log(verificationToken);

    const verificationLink = `http://localhost:3000/users/verify?token=${verificationToken}`;

    // Generate verification token (you can save it in DB if needed)

    // await sendMail({
    //   to: email,
    //   subject: "Welcome to Test Test Company - Please Verify Your Email ",
    //   text: `Hello ${name} ,please verify your email by clicking the following link`,
    //   html: welcomeAndVerifyEmailTemplate(name, verificationLink),
    // });

    let image;
    const photoLocalPath = req.files?.photo?.[0]?.path;
    if (photoLocalPath) {
      try {
        image = await uploadToCloudinary(photoLocalPath);
      } catch (error) {}
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashPassword,
      isVerified: false, // optional flag
      verificationToken: verificationToken, // Save the token
      photo:image?.secure_url
    });

    res.status(201).json({
      message: "User successfully registered. Please verify your email.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong " });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " });
  }
};
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "User successfully updated" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " });
  }
};

// Create a new route:

// POST /api/users/login

// Login Logic (in your controller):

// Check if both email and password are provided

// Convert email to lowercase

// Find the user in the database using the email

// If user is not found, return error: "Invalid credentials"

// If user is found:

// Use bcrypt.compare() to check if password is correct

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const existUser = await User.findOne({ email: email.toLowerCase() });
    console.log(existUser);

    if (!existUser) {
      return res
        .status(400)
        .json({ message: "User not found with this email" });
    }
    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    // Generate JWT token
    const token = jwt.sign({ id: existUser._id }, "jwtsecretkey", {
      expiresIn: "1d",
    });
    // Attach token to response
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong " });
  }
};

const emailVerify = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }
    user.emailVerified = true;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export {
  registeruser,
  getUser,
  getUserById,
  updateUser,
  login,
  getMyProfile,
  emailVerify,
};
