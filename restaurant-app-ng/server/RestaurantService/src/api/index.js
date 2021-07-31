const restaurantRoutes = require('./routes/restaurant');
const reviewRoutes = require('./routes/review');

module.exports = app => {
    restaurantRoutes(app);
    reviewRoutes(app);
};