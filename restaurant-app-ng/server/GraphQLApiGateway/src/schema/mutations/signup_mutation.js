const graphql = require("graphql");
const { GraphQLString } = graphql;
const UserType = require("../types/user_type");
const AuthService = require("./../../services/AuthenticationService");

const signupMutation = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString }
  },
  async resolve(parentValue, { email, password, firstName, lastName, dateOfBirth }) {
    return await AuthService.signupUser({ email, password, firstName, lastName, dateOfBirth })
      .catch(error => {
        throw new Error(error);
      });
  }
};

module.exports = signupMutation;
