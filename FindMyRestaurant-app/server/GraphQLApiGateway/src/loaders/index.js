const graphQLLoader = require('./graphQLLoader');
const expressLoader = require('./expressLoader');

module.exports = app => {
    expressLoader(app);
    graphQLLoader(app); 
};
