const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/register", async function (req, res) {
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    res.status(409).send("Username already exists");
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.send("User created");
  }
});

router.post("/login", passport.authenticate("local"), function (req, res) {
  res.send(req.user);
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});
module.exports = router;
