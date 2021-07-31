const graphql = require("graphql");
const { GraphQLString } = graphql;
const UserType = require("../types/user_type");
const AuthService = require("../../services/AuthenticationService");

const signinMutation = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(parentValue, { email, password }, req) {
    return await AuthService.signinUser({ email, password })
      .catch(error => {
        throw new Error(error);
      });
  }
};

module.exports = signinMutation;
