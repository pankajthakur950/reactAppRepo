import React from "react";
import { connect } from "react-redux";
import RestaurantList from "components/RestaurantList";
import Button from "components/Button";

import { fetchRestaurants, searchRestaurants } from "actions";
import HeroImage from "assets/hero-image.jpg";

import "pages/homepage/homepage.scss";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page_num: 1,
      searchInput: ""
    }
  }
  fetchMoreRestaurants = () => {
    const page_num = this.state.page_num + 1
    this.setState({ page_num })
    this.props.fetchRestaurants(page_num);
  }
  componentDidMount() {
    this.props.fetchRestaurants(1);
  }
  submitSearchForm = async event => {
    event.preventDefault();
    const { searchInput } = this.state;
    try {
      const searchQuery = { "location_city": searchInput };
      await this.props.searchRestaurants(searchQuery);
      this.props.history.push({
        pathname: '/search',
        state: {searchLocation: searchInput}
      });
    } catch (error) {
      console.log("Something went wrong while search", error.message);
    }
  };
  searchRestaurantNearYou = async () => {
    try {
      if (navigator.geolocation) {
        const coordinates = await new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(function (location) {
            resolve(location);
          });
        });
        const { latitude, longitude } = coordinates.coords;
        const searchQuery = {
          "minLong": longitude - .2,
          "maxLong": longitude + .2,
          "minLat": latitude - .2,
          "maxLat": latitude + .2,
          "searchType": "coordinates"
        };
        await this.props.searchRestaurants(searchQuery);
        this.props.history.push({
          pathname: '/search',
          state: {searchLocation: "current"}
        });
      } else {
        throw new Error("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.log("Something went wrong while search", error.message);
    }
  };
  render() {
    return (
      <section className="restaurant-list-section">
        <div className="hero-image-container">
          <div className="hero-banner" style={{ backgroundImage: `url(${HeroImage})` }}>
            <div className="hero-banner__content">
              <h1 className="hero-header">FIND THE BEST RESTAURANTS AT THE BEST PRICE</h1>
              <p className="hero-subHeader">More than 20,000 restaurants all around the world and in your country or city</p>
              <form id="searchForm" onSubmit={this.submitSearchForm}>
                <input className="search-input" value={this.state.searchInput}
                  onChange={(event) => this.setState({ searchInput: event.target.value })}
                  placeholder="Search restaurants in city" />
                <Button classes="search-btn">Find</Button>
              </form>
              <p><button className="search-near-you" onClick={this.searchRestaurantNearYou}>
                Or view all 360 restaurants in and/or around your current city
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="section-title text-center">
              <h3>
                <span>Featured Restaurants in Your City</span>
              </h3>
              <p>Hand-Picked Restaurants with Exclusive Menus near you</p>
            </div>
          </div>
          <div className="restaurant-list-wrapper">
            <RestaurantList restaurants={this.props.restaurants} />
          </div>
          <div className="text-center">
            {
              this.props.restaurantRendered < this.props.restaurantCount ?
                <Button onClick={this.fetchMoreRestaurants}>More Restaurants</Button> :
                null
            }
          </div>
        </div>
      </section>
    );
  }
}

const mapStatetoProps = ({ restaurant }) => {
  return {
    restaurants: restaurant.restaurants,
    restaurantCount: restaurant.results_found,
    restaurantRendered: restaurant.results_shown
  }
}

export default connect(mapStatetoProps, { fetchRestaurants, searchRestaurants })(Homepage)
