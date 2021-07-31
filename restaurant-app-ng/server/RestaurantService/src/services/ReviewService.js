const mongoose = require("mongoose");
const Review = mongoose.model("review");
const RestaurantService = require("./RestaurantService");

const addReview = async review => {
  try {
    const {
      bathroom_quality,
      staff_behavior,
      cleanliness,
      delivery_speed,
      drive_thru_sassy_level,
      _restaurantId
    } = review;
    const average_rating =
      (bathroom_quality +
        staff_behavior +
        cleanliness +
        delivery_speed +
        drive_thru_sassy_level) /
      5;
    review.review_date = new Date();
    const response = await new Review(review).save();
    RestaurantService.updateRestaurantReviewAndRating(_restaurantId, average_rating);
    return response;
  } catch (error) {
    throw error;
  }
};

const getReviewsByRestaurant = async _restaurantId => {
    try {
        const reviews = await Review.find({_restaurantId});
        return reviews;
    } catch (error) {
        throw error;
    }
}

module.exports = {
  addReview,
  getReviewsByRestaurant
};