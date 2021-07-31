const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLList } = graphql;
const RestaurantType = require("./restaurant_type");

const RestaurantListType = new GraphQLObjectType({
    name: 'RestaurantList',
    fields: {
        results_found: { type: GraphQLInt },
        results_start: { type: GraphQLInt },
        results_shown: { type: GraphQLInt },
        restaurants: { type: GraphQLList(RestaurantType) }
    }
});

module.exports = RestaurantListType;