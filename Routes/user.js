const express = require("express");
const router = express.Router();

const { signup, login, getPandits } = require("../Controllers/userController");
const { auth, isSuperAdmin, isAdmin } = require("../middlewares/Auth");
router.post("/signup", signup);
router.post("/login", login);

router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected Route for Tests",
  });
});

//Protected Routes
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected routes for Admin",
  });
});

router.get("/superadmin", auth, isSuperAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for SuperAdmin",
  });
});

router.get("/role", auth, (req, res) => {
  // Send the role back to the frontend
  res.status(200).json({ role: req.user.role });
});

router.get("/pandits", getPandits);

module.exports = router;
