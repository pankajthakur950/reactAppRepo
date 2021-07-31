import React from 'react';

import CircularBar from "components/CircularBar";
import moment from 'moment'

export default function ReviewDetail({review}) {
    return (
        <div className="review-list__item">
            <div className="review-content">
                <CircularBar text={`reviewed on ${moment(review.review_date).format("MMM DD, YYYY")}`}
                    value={review.average_rating} classes="review-content_average-rating" />
                <div className="review-entry">
                    <p>{review.review}</p>
                </div>
                <div className="meta-bottom">
                    <ul className="review-score-list clearfix">
                        <li>Cleanliness: {review.cleanliness}</li>
                        <li>Staff Behavior: {review.staff_behavior}</li>
                        <li>Delivery Speed: {review.delivery_speed}</li>
                        <li>Sassy Level: {review.drive_thru_sassy_level}</li>
                        <li>Bathroom Quality: {review.bathroom_quality}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
