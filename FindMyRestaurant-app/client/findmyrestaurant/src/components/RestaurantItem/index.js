import React from "react";
import { Link } from "react-router-dom";

import "components/RestaurantItem/RestaurantItem.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import StarRatingComponent from 'react-star-rating-component';

export default function RestaurantItem(props) {
  const { _id, image_url, name, location, average_rating, all_reviews_count, cuisines } = props.restaurant;
  const {restaurantHovered} = props;
  return (
    <div className="restaurant-item-container">
      <div className="restaurant-item">
        <Link to={`/restaurant/${_id}`} 
              onMouseOver={restaurantHovered ? ()=> restaurantHovered(props.restaurant): null}>
          <div className="restaurant-item__image">
            <img src={image_url} alt={`${name}`} />
          </div>
          <div className="restaurant-item__content">
            <h5 className="name">{name}</h5>
            <p className="location">
              <FaMapMarkerAlt />
              <span>{location.address}</span>
            </p>

            <div className="rating-item">
              <span style={{ cursor: "default", verticalAlign: "middle", fontSize: 20 }}>
                <StarRatingComponent
                  name="rate"
                  editing={false}
                  starCount={5}
                  value={average_rating}
                />
              </span>
              <span className="texting"> ({all_reviews_count} reviews)</span>
            </div>
            <p className="cuisine">
              <span>
                Cuisine:
                </span>
              <span>
                {
                  cuisines.split(",").map((cuisine, index) => <span key={index} className="cuisine-item">{cuisine}</span>)
                }
              </span>
            </p>

          </div>
        </Link>
      </div>
    </div>
  );
}
