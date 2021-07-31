const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        image_url: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        token: { type: GraphQLString }
    }
});

module.exports = UserType;