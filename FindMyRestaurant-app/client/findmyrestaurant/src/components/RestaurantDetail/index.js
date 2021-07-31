import React from "react";
import { connect } from "react-redux";

import { fetchRestaurantDetails } from "actions";
import HeroDetail from "components/RestaurantDetail/HeroDetail";
import ReviewDetail from "components/RestaurantDetail/ReviewDetail";
import ReviewSummary from "components/RestaurantDetail/ReviewSummary";
import Map from "components/Map";
import { FaPhone, FaDirections } from "react-icons/fa";
import "components/RestaurantDetail/RestaurantDetail.scss";
import "react-circular-progressbar/dist/styles.css";

class RestaurantDetail extends React.Component {
    componentDidMount() {
        this.props.fetchRestaurantDetails(this.props.match.params.restaurantId);
    }
    render() {
        if (!this.props.restaurant) {
            return null;
        }
        const { reviews, phone_numbers, cuisines } = this.props.restaurant;
        const mapProps = {
            map: {
                initialCenter: {
                    lat: this.props.restaurant.location.latitude,
                    lng: this.props.restaurant.location.longitude
                },
                zoom: 16,
                containerStyle : {
                    width: "250px",
                    height: "250px"
                },
                draggable: false,
                zoomControl: false,
                fullscreenControl: false
            },
            restaurants: [this.props.restaurant],
            highlightRestaurant: this.props.restaurant
        }
        return (
            <div className="restaurant-detail" >
                <div className="restaurant-detail__hero-banner">
                    <HeroDetail restaurant={this.props.restaurant} />
                </div>
                <div className="restaurant-detail-section">
                    <div className="restaurant-detail__navigation">
                        <div className="restaurant-overview item">
                            <h2><span>Overview</span></h2>
                            <div className="item__content">
                                <div className="sub-item">
                                    <h5>Cuisines</h5>
                                    <div className="cuisines">
                                        {
                                            cuisines.split(",").map((cuisine, index) => <span key={index} className="cuisine-item">{cuisine}</span>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="restaurant-reviews item">
                            <h2><span>Reviews</span></h2>
                            <div className="item__content">
                                <div className="review-summary">
                                    <ReviewSummary reviews={reviews} />
                                </div>
                                <div className="review-list">
                                    {
                                        reviews.map((review, index) => <ReviewDetail key={index} review={review} />)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="restaurant-photos item">
                            <h2><span>Photos</span></h2>
                        </div>

                    </div>
                    <div className="restaurant-detail__aside">
                        <div className="restaurant-detail__aside__contact">
                            <div className="icon">
                                <FaPhone />
                            </div>
                            <div className="content">
                                <h5>Call for reservation</h5>
                                <p className="timings">Every day except Sunday from 10am to 8 pm</p>
                                <p className="phone-number">
                                    {
                                        phone_numbers.split(",").map(number => {
                                            return <span key={number} className="number">{number}</span>
                                        })
                                    }

                                </p>
                            </div>
                        </div>
                        <div className="restaurant-detail__aside-direction">
                            <div className="content">
                                <h5>
                                    <span className="icon"><FaDirections /></span>
                                    <span>Direction</span>
                                </h5>
                                <Map {...mapProps}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = ({ restaurant }) => {
    return { restaurant: restaurant.selectedRestaurant }
}

export default connect(mapStateToProps, { fetchRestaurantDetails })(RestaurantDetail);

