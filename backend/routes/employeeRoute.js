const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authorisation');
const employeeController = require('../controller/employeeController');

/**
 * @swagger
 * /employees/create:
 *   post:
 *     summary: Add a new employee laptop record
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - national_identity
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: Samanta
 *               lastname:
 *                 type: string
 *                 example: ISHIMWE
 *               national_identity:
 *                 type: string
 *                 example: 12000710913307
 *               telephone:
 *                 type: string
 *                 example: 0788888888
 *               email:
 *                 type: string
 *                 format: email
 *                 example: samanta@gmail.com
 *               department:
 *                 type: string
 *                 example: Human resource
 *               position:
 *                 type: string
 *                 example: Manager
 *               laptop_manufacturer:
 *                 type: string
 *                 example: HP
 *               model:
 *                 type: string
 *                 example: envy
 *               serial_number:
 *                 type: string
 *                 example: 3400
 *     responses:
 *       201:
 *         description: Employee added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Employee added
 *       400:
 *         description: Validation error or duplicate entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *                       value:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access denied
 *       403:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid token
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/create', authenticateToken, employeeController.createEmployee);

/**
 * @swagger
 * /employees/all:
 *   get:
 *     summary: Get paginated employee records
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       firstname:
 *                         type: string
 *                         example: Samanta
 *                       lastname:
 *                         type: string
 *                         example: ISHIMWE
 *                       national_identity:
 *                         type: string
 *                         example: 12000710913307
 *                       telephone:
 *                         type: string
 *                         example: 0788888888
 *                       email:
 *                         type: string
 *                         example: samanta@gmail.com
 *                       department:
 *                         type: string
 *                         example: Human resource
 *                       position:
 *                         type: string
 *                         example: Manager
 *                       laptop_manufacturer:
 *                         type: string
 *                         example: HP
 *                       model:
 *                         type: string
 *                         example: envy
 *                       serial_number:
 *                         type: string
 *                         example: 3400
 *                 total:
 *                   type: integer
 *                   example: 50
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pages:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *                       value:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access denied
 *       403:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid token
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/all', authenticateToken, employeeController.getEmployees);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 101
 *                 firstname:
 *                   type: string
 *                   example: Samanta
 *                 lastname:
 *                   type: string
 *                   example: ISHIMWE
 *                 national_identity:
 *                   type: string
 *                   example: 12000710913307
 *                 telephone:
 *                   type: string
 *                   example: 0788888888
 *                 email:
 *                   type: string
 *                   example: samanta@gmail.com
 *                 department:
 *                   type: string
 *                   example: Human resource
 *                 position:
 *                   type: string
 *                   example: Manager
 *                 laptop_manufacturer:
 *                   type: string
 *                   example: HP
 *                 model:
 *                   type: string
 *                   example: envy
 *                 serial_number:
 *                   type: string
 *                   example: 3400
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid employee ID
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access denied
 *       403:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid token
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Employee not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', authenticateToken, employeeController.getEmployeeById);

module.exports = router;