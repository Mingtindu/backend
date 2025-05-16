import express from "express";
const app = express();

app.use(express.json())
const user = [
    {
        "name":"hari"
    }
];

const message = {
  message: "No data found",
};

app.get("/", (req, res) => {
  //404
  if (user.length === 0) {
    return res.status(404).json(message);
  }
  res.status(201).json(user);
});

app.post("/sum",(req,res)=>{
    const {num1,num2} = req.body;

    const sum = num1+num2;

    res.status(201).json({
        "sum":sum
    })


    // console.log(num1,num2)
})
app.get("/user", (req, res) => {
  res.send("Users data");
});
app.get("/profile", (req, res) => {
  res.send("This is profile data");
});
app.listen(3000, (req, res) => {
  console.log(" app is running on port 3000");
});
