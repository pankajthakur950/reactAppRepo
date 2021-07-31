const graphql = require("graphql");
const { GraphQLString, GraphQLInt } = graphql;
const ReviewType = require("../types/review_type");
const RestaurantService = require("../../services/RestaurantService");

const addReviewMutation = {
  type: ReviewType,
  args: {
    bathroom_quality: { type: GraphQLInt },
    cleanliness: { type: GraphQLInt },
    staff_behavior: { type: GraphQLInt },
    delivery_speed: { type: GraphQLInt },
    drive_thru_sassy_level: { type: GraphQLInt },
    review: { type: GraphQLString },
    _restaurantId: { type: GraphQLInt },
    _userId: { type: GraphQLString }
  },
  async resolve(parentValue, args, req) {
    return await RestaurantService.addReview(args)
      .catch(error => {
        throw new Error(error);
      });
  }
};

module.exports = addReviewMutation;
