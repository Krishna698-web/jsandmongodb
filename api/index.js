const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const cors = require("cors");

dotenv.config();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE"],
  })
);

// console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/upload", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    res.json(user);
  } catch (error) {
    console.log(error.message);
    throw new Error();
  }
});

app.get("/upload", async (req, res) => {
  res.json(await User.find());
  // res.send(req.body);
});

app.listen(3001, console.log("listening to port 3001"));

module.exports = app;
