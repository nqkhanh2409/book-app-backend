require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./user.model");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Authentication successful",
      token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.log("Failed to login", error);
    res.status(401).json({ message: "Failed to login" });
  }
});

module.exports = router;
