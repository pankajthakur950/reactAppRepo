const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLFloat } = graphql;

const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: {
        address: {type: GraphQLString},
        locality: {type: GraphQLString},
        city: {type: GraphQLString},
        zipcode: {type: GraphQLString},
        country: {type: GraphQLString},
        latitude: {type: GraphQLFloat},
        longitude: {type: GraphQLFloat}
    }
});

module.exports = LocationType;