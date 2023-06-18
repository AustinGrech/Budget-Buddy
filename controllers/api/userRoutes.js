const express = require("express");
const router = express.Router();
const User = require("../../models/User");
// localhost:3001/api/users

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// CREATE new user (Signup)
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // are signed in now
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData) {
      res.status(400).json({ message: "Unable to log in. Please try again." });
      return;
    }

    // email in db, validate password entered to password in database:
    const validatePassword = await userData.checkPassword(req.body.password);

    if (!validatePassword) {
      res.status(400).json({ message: "Unable to log in. Please try again." });
      return;
    }

    // everything is good! be loggedin now:
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = userData.id;
      res.status(200).json({ user: userData, message: "You are logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Logout --> only available if already loggedIn!
router.post("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
