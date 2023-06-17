const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  res.render("layouts/main");
});
// Route: POST /users
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Route: GET /users/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
});

// Route: PUT /users/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await User.findByPk(id);
    if (user) {
      user.email = email;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Route: DELETE /users/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
