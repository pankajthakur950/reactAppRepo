import React from "react";

import "components/RestaurantList/RestaurantList.scss";
import RestaurantItem from "components/RestaurantItem";

const renderRestaurants = (restaurants, restaurantHovered) =>{
  return restaurants.map(restaurant =><RestaurantItem key={restaurant._id} restaurantHovered={restaurantHovered} restaurant={restaurant}/>);
}

export default function RestaurantList(props) {
  return (
    <div className="restaurant-list">
      {renderRestaurants(props.restaurants, props.restaurantHovered)}
    </div>
  );
}
