import React from "react";

import StarRatingComponent from 'react-star-rating-component';

export default function RatingCategory({ name, text, value, onRatingSelected }) {
    return (
        <div className="rating-category__item">
            <div className="name">{text}</div>
            <div className="rating">
                <StarRatingComponent
                    name={name}
                    starCount={5}
                    value={value}
                    onStarClick={onRatingSelected}
                />
            </div>
        </div>
    );
}
