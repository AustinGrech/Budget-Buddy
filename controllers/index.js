const express = require("express");
const router = express.Router();

// Import your controllers here
const apiRoutes = require("./api");
const homeRoutes = require("./userController");
// Define your routes
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
