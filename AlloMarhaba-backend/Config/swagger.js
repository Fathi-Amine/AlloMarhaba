const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: require('../Docs/swagger.json'),
    apis: ['Routes/AuthRoutes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
