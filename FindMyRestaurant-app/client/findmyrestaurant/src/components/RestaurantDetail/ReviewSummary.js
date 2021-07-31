import React from 'react';

import CircularBar from "components/CircularBar";

const renderRatingAverage = (reviews) => {
    const ratingObj = reviews.reduce((ratingObj, review) => {
        return {
            cleanliness: ratingObj.cleanliness + review.cleanliness,
            staff_behavior: ratingObj.staff_behavior + review.staff_behavior,
            delivery_speed: ratingObj.delivery_speed + review.delivery_speed,
            drive_thru_sassy_level: ratingObj.drive_thru_sassy_level + review.drive_thru_sassy_level,
            bathroom_quality: ratingObj.bathroom_quality + review.bathroom_quality
        }
    }, {
        cleanliness: 0,
        staff_behavior: 0,
        delivery_speed: 0,
        drive_thru_sassy_level: 0,
        bathroom_quality: 0
    });
    const averageRatingObj = {
        cleanliness: Math.round(ratingObj.cleanliness / reviews.length),
        staff_behavior: Math.round(ratingObj.staff_behavior / reviews.length),
        delivery_speed: Math.round(ratingObj.delivery_speed / reviews.length),
        drive_thru_sassy_level: Math.round(ratingObj.drive_thru_sassy_level / reviews.length),
        bathroom_quality: Math.round(ratingObj.bathroom_quality / reviews.length)
    }
    const averageRating = Math.round((averageRatingObj.cleanliness +
        averageRatingObj.staff_behavior +
        averageRatingObj.delivery_speed +
        averageRatingObj.drive_thru_sassy_level +
        averageRatingObj.bathroom_quality) / 5);

    return (
        <div className="rating-stats">
            <CircularBar text={`(based on ${reviews.length} reviews)`} value={averageRating} classes="average-rating" />
            <div className="rating-by-criteria">
                <CircularBar text="Cleanliness" value={averageRatingObj.cleanliness} classes="rating-by-criteria__item" />
                <CircularBar text="Staff Behavior" value={averageRatingObj.staff_behavior} classes="rating-by-criteria__item" />
                <CircularBar text="Delivery Speed" value={averageRatingObj.delivery_speed} classes="rating-by-criteria__item" />
                <CircularBar text="Sassy Level" value={averageRatingObj.drive_thru_sassy_level} classes="rating-by-criteria__item" />
                <CircularBar text="Bathroom Quality" value={averageRatingObj.bathroom_quality} classes="rating-by-criteria__item" />
            </div>
        </div>
    );
}

export default function componentName({ reviews }) {
    return (
        renderRatingAverage(reviews)
    );
}
