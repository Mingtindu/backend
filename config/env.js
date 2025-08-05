import dotenv from "dotenv";
dotenv.config();


export const {
  DB_URL,
  SMTP_EMAIL,
  SMTP_PASS,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  JWT_SECRET_KEY,
  JWT_EXPIRATION,
} = process.env;
