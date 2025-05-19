import express from "express";
const app = express();
import userRouter from "./routes/user.route.js";

app.use(express.json());

app.use("/users", userRouter);
app.listen(3000, (req, res) => {
  console.log(" app is running on port 3000");
});
