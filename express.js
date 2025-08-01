import express from "express";
const app = express();
import userRouter from "./routes/user.route.js";
import propertyRoute from "./routes/property.route.js"
import fileRouter from "./routes/file.route.js"
import { connectDB } from "./config/db.js";
connectDB()
app.use(express.json());

app.use("/users", userRouter);
app.use("/file",fileRouter)
app.use("/property",propertyRoute);

app.listen(3000, (req, res) => {
  console.log(" app is running on port 3000");
});
