const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;
const LocationType = require("./location_type");
const ReviewType = require("./review_type");

const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: {
        _id: { type: GraphQLInt },
        name: { type: GraphQLString },
        cuisines: { type: GraphQLString },
        timings: { type: GraphQLString },
        average_rating: { type: GraphQLInt },
        all_reviews_count: { type: GraphQLInt },
        image_url: { type: GraphQLString },
        location: { type: LocationType },
        phone_numbers: { type: GraphQLString },
        reviews: {
            type: GraphQLList(ReviewType),
            resolve: async (parentValue, args) => {
                return parentValue.reviews;
            }
        }
    }
});

module.exports = RestaurantType;