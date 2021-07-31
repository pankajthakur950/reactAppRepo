const mongoose = require("mongoose");
const Restaurant = mongoose.model("restaurant");

const getRestaurantById = async _id => {
  try {
    let restaurant = await Restaurant.findById({ _id });
    if (!restaurant)
      restaurant = [];
    return restaurant;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) return [];
    throw error;
  }
};

const searchRestaurant = async searchCriteria => {
  try {
    let restaurants;
    if (searchCriteria.searchType === "coordinates") {
      return new Promise(function (resolve, reject) {
        Restaurant.create_query()
          ._select("location.longitude")
          ._gte(searchCriteria.minLong)
          ._lte(searchCriteria.maxLong)
          ._select("location.latitude")
          ._gte(searchCriteria.minLat)
          ._lte(searchCriteria.maxLat)
          .run(function (err, result) {
            console.log(result);
            if (err) {
              reject();
            }
            resolve(result);
          });
      });
    } else {
      restaurant = await Restaurant.filterData(searchCriteria);
      return restaurant;
    }
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) return [];
    throw error;
  }
};

const updateRestaurantReviewAndRating = async (_id, rating) => {
  try {
    const restaurant = await Restaurant.findById({ _id });
    const totalRating = (restaurant.all_reviews_count * restaurant.average_rating) + rating;
    restaurant.all_reviews_count = restaurant.all_reviews_count + 1;
    restaurant.average_rating = (totalRating / restaurant.all_reviews_count).toFixed(2);
    restaurant.save();
  } catch (error) {
    console.log("Not updated");
  }
};

module.exports = {
  getRestaurantById,
  updateRestaurantReviewAndRating,
  searchRestaurant
};
