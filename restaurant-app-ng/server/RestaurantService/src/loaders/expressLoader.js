const bodyParser = require('body-parser');
const appRoutes = require('./../api');

module.exports = app => {
    app.use(bodyParser.json());

    appRoutes(app);
};
