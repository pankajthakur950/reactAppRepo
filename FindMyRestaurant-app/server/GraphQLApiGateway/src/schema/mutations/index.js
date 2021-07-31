const graphql = require("graphql");
const { GraphQLObjectType } = graphql;

const signupMutation = require("./signup_mutation");
const signinMutation = require("./signin_mutation");
const addReviewMutation = require("./addReview_mutation");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: signupMutation,
    signin: signinMutation,
    addReview: addReviewMutation 
  }
});

module.exports = mutation;
