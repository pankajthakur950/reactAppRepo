const ReviewService = require("../../services/ReviewService");

module.exports = app => {
    app.post("/api/reviews", async (req, res, next) => {
        try {
            const review = { ...req.body.review };
            review.average_rating = Math.round((review.cleanliness +
                review.staff_behavior +
                review.delivery_speed +
                review.drive_thru_sassy_level +
                review.bathroom_quality) / 5)
            const result = await ReviewService.addReview(review);
            res.send(result);
        } catch (error) {
            return next(error);
        }
    });
    app.get("/api/reviews/:restaurant_id", async (req, res, next) => {
        try {
            const { restaurant_id } = req.params;
            const reviews = await ReviewService.getReviewsByRestaurant(restaurant_id);
            res.send(reviews);
        } catch (error) {
            return next(error);
        }
    });
};