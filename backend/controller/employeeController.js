const { check, validationResult } = require("express-validator");
const Employee = require("../model/employee");

const employeeController = {
  createEmployee: [
    check("firstname").notEmpty().withMessage("First name is required"),
    check("lastname").notEmpty().withMessage("Last name is required"),
    check("nationalIdentity")
      .notEmpty()
      .withMessage("National ID is required"),
    check("email").isEmail().optional().withMessage("Invalid email"),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

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
      } = req.body;

      try {
        await Employee.create({
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
        });
        res.status(201).json({ message: "Employee added" });
      } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ error: "Duplicate national ID, email, or serial number" });
        }
        console.error(error);
        res.status(500).json({ error: "Server error", error: error.message });
      }
    },
  ],

  getEmployees: [
    async (req, res) => {
      try {
        const result = await Employee.findAll();
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error", error: error.message });
      }
    },
  ],
  getEmployeesPerPage: [
    check("page")
      .optional()
      .isInt({ min: 1 })
      .toInt()
      .withMessage("Page must be a positive integer"),
    check("limit")
      .optional()
      .isInt({ min: 1 })
      .toInt()
      .withMessage("Limit must be a positive integer"),

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const page = req.query.page || 1; // Already sanitized to integer by express-validator
      const limit = req.query.limit || 10; // Already sanitized to integer by express-validator

      try {
        const result = await Employee.findAllPerPage({ page, limit });
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve employees.", error: error.message });
      }
    },
  ],
  getEmployeeById: [
    check("id").isInt().withMessage("ID must be an integer"),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const id = parseInt(req.params.id);

      try {
        const employee = await Employee.findById(id);
        if (!employee)
          return res.status(404).json({ error: "Employee not found" });
        res.json(employee);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error", error: error.message });
      }
    },
  ],
};

module.exports = employeeController;
