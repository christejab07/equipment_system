const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Equipment Distribution System API',
      version: '1.0.0',
      description: 'API for managing employee laptop assignments'
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Local development server' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(swaggerOptions);