const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

module.exports = app => {
    userRoutes(app);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};