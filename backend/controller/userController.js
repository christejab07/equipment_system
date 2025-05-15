const { check, validationResult } = require("express-validator");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const userController = {
  register: [
    check("email").isEmail().withMessage("Invalid email"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
    check("confirmPassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match"),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
      try {
        if (await User.emailExists(email)) {
          return res.status(400).json({ error: "Email already exists" });
        }
        await User.create({ email, password });
        res.status(201).json({ message: "User created", email: email });
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
    },
  ],
  login: [
    check("email").isEmail().withMessage("Invalid email"),
    check("password").notEmpty().withMessage("Password is required"),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array()});

      const { email, password } = req.body;
      try {
        const user = await User.findByEmail(email);
        if (!user || !(await User.verifyPassword(password, user.password))) {
          return res.status(401).json({ message: "Invalid credentials." });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "15m",
        });
        res.json({ message: 'Login successful.', token });
      } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "Server error", error: error });
      }
    },
  ],
  async getUserByEmail(req, res) {
    const email = req.params.email;
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Server error.", error: error.message });
    }
  },
  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Server error.", error: error.message });
    }
  },
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json({ users });
    } catch (error) {
      res.status(500).json({ message: "Server error.", error: error.message });
    }
  },
};

module.exports = userController;
