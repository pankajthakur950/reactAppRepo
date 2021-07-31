const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const UserType = require("./user_type");

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => {
        const RestaurantType = require("./restaurant_type");
        return {
            review: { type: GraphQLString },
            bathroom_quality: { type: GraphQLInt },
            staff_behavior: { type: GraphQLInt },
            cleanliness: { type: GraphQLInt },
            delivery_speed: { type: GraphQLInt },
            drive_thru_sassy_level: { type: GraphQLInt },
            average_rating: { type: GraphQLInt },
            review_date: { type: GraphQLString },
            user: { type: UserType },
            restaurant: {
                type: RestaurantType,
                resolve: async (parentValue, args) => {
                    //get restaurant detail here if required...
                    console.log(parentValue);
                }
            }
        }
    }
});

module.exports = ReviewType;