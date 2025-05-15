const db = require("../config/db");
const pool = db;

const Employee = {
  async create(data) {
    const {
      firstname,
      lastname,
      nationalIdentity,
      telephone,
      email,
      department,
      position,
      laptop_manufacturer,
      model,
      serial_number,
    } = data;
    const [result] = await pool.query(
      `INSERT INTO employee_laptops (
        firstname, lastname, nationalIdentity, telephone, email, department,
        position, laptop_manufacturer, model, serial_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstname,
        lastname,
        nationalIdentity,
        telephone,
        email,
        department,
        position,
        laptop_manufacturer,
        model,
        serial_number,
      ]
    );
    return result.insertId;
  },

  async findAll({ page = 1, limit = 10 }) {
    // Ensure page and limit are valid integers
    const safePage = Math.max(1, parseInt(page) || 1);
    const safeLimit = Math.max(1, parseInt(limit) || 10);
    const offset = (safePage - 1) * safeLimit;

    const [employees] = await pool.query(
      'SELECT * FROM employee_laptops LIMIT ? OFFSET ?',
      [safeLimit, offset]
    );
    const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM employee_laptops');
    return { employees, total, page: safePage, pages: Math.ceil(total / safeLimit) };
  },
  async findById(id) {
    const [employee] = await pool.query(
      "SELECT * FROM employee_laptops WHERE id = ?",
      [id]
    );
    if (employee.length === 0) {
      return null;
    }
    return employee[0];
  },
};

module.exports = Employee;
