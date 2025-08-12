import express from "express";
const app = express();
import userRouter from "./routes/user.route.js";
import propertyRoute from "./routes/property.route.js"
import bookingRoute from "./routes/booking.route.js";
import fileRouter from "./routes/file.route.js"
import { connectDB } from "./config/db.js";
import morgan from "morgan";
connectDB()
app.use(express.json());

app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/file",fileRouter)
app.use("/property",propertyRoute);
app.use("/booking",bookingRoute)

app.use("/", (req, res) => {
  res.send("Welcome to the Booking API");
});

app.listen(3000, (req, res) => {
  console.log(" app is running on port 3000");
});
