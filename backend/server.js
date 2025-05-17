const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const employeeRoute = require("./routes/employeeRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); 

// Routes
app.use("/users", userRoute);
app.use("/employees", employeeRoute);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send("Use postman or navigate to /api-docs for better experience!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
