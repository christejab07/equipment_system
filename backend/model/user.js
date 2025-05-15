const db = require("../config/db");
const bcrypt = require("bcrypt");
const pool = db;

const User = {
  async create({ email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return users[0];
  },
  async findById(id) {
    const [rows] = await pool.query(
      "SELECT id, email FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  },
  async findAll() {
    const [rows] = await pool.query("SELECT id, email FROM users");
    return rows;
  },
  async emailExists(email) {
    const [users] = await pool.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    return users.length > 0;
  },
  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  },
};

module.exports = User;
