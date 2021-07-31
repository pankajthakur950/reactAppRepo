const mongooseLoader = require('./mongooseLoader');
const expressLoader = require('./expressLoader');

module.exports = app => {
    mongooseLoader();
    expressLoader(app);
    require('./passportLoader');
};
