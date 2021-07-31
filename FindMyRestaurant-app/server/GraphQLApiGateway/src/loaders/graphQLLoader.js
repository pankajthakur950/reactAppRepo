const expressGraphQL = require("express-graphql");
const schema = require("../schema");

module.exports = (app) => {
  app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
  }))
};
