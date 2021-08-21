const express = require("express");
const env = require("dotenv");

const mongoose = require("mongoose");
const { Router } = require("express");

const userRoutes = require("./routes/user");

env.config();
const app = express();

app.use(express.json());

mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connected");
  });

app.use(userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello test",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
