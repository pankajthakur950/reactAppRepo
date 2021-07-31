const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;
const UserType = require('./user_type');
const RestaurantListType = require('./restaurant_list_type');
const RestaurantType = require('./restaurant_type');

const RestaurantService = require('../../services/RestaurantService');


const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return { email: "pankajthakur950@gmail.com" };
      }
    },
    restaurantList: {
      type: RestaurantListType,
      args: { page_num: { type: GraphQLInt } },
      async resolve(parentValue, args) {
        return await RestaurantService.getAllRestaurants(args.page_num).catch(error => {
          throw new Error(error);
        });
      }
    },
    searchRestaurant: {
      type: RestaurantListType,
      args: {
        name: { type: GraphQLString },
        "location_city" : {type:GraphQLString},
        "searchType":{type:GraphQLString},
        "minLong":{type:GraphQLString},
        "maxLong":{type:GraphQLString},
        "minLat":{type:GraphQLString},
        "maxLat":{type:GraphQLString}
      },
      async resolve(parentValue, args) {
        return await RestaurantService.searchRestaurant(args).catch(error => {
          throw new Error(error);
        });
      }
    },
    restaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLInt } },
      async resolve(parentValue, args) {
        return await RestaurantService.getRestaurant(args.id).catch(error => {
          throw new Error(error);
        });
      }
    }
  }
});

module.exports = RootQueryType;
