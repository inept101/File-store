const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/signin", (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ err, message: "user not found" });
    }

    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
        const { _id, firstName, lastName, email, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, fullName },
        });
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      return res.status(400).json({ message: "somthing went wrong." });
    }
  });
});

router.post("/signup", (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    //checking if user already exist
    if (user) {
      return res.status(400).json({
        message: "user already registerd.",
      });
    }
    //getting the req.body values by destructuring
    const { firstName, lastName, email, password } = req.body;
    // creating a new user by passing the value that we got in the body.
    const _user = new User({ firstName, lastName, email, password });

    //saving the new _user that we created in the database.
    _user.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: "Error! user not created",
        });
      }
      if (data) {
        return res.status(200).json({
          message: "User created successfully",
        });
      }
    });
  });
});

module.exports = router;
