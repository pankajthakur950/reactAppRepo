import React from "react";

import Button from "components/Button";
import RatingCategory from "components/Review/RatingCategory";
import { connect } from "react-redux";
import { addReview } from "actions";

import "components/Review/Review.scss"

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "cleanliness": 0,
      "bathroom_quality": 0,
      "staff_behavior": 0,
      "delivery_speed": 0,
      "drive_thru_sassy_level": 0,
      "review": ""
    }
  }
  onRatingSelected = (currentValue, previousValue, name) => {
    this.setState({ [name]: currentValue });
  }
  onReviewTextChange = (event) => {
    this.setState({ review: event.target.value })
  }
  submitReview = async (event) => {
    event.preventDefault();
    
    try {
      const reviewAdded = await this.props.addReview({ 
        ...this.state, 
        _restaurantId: this.props.selectedRestaurant._id, 
        _userId: this.props.currentUser._id 
      });
      if(reviewAdded){
        this.props.addReviewCallback();
      }
    } catch (error) {
      console.log("Something went wrong while adding review", error.message);
    }
  }

  render() {
    return (
      <div className="review-container">
        <h2 className="review-header">Write a Review</h2>
        <div className="review-rating-content">
          <p>Tap to rate your experience in below categories </p>
          <div className="rating-category">
            <RatingCategory
              name="cleanliness"
              text="Cleanliness"
              value={this.state.cleanliness}
              onRatingSelected={this.onRatingSelected} />
            <RatingCategory
              name="bathroom_quality"
              value={this.state.bathroom_quality}
              text="Bathroom Quality"
              onRatingSelected={this.onRatingSelected} />
            <RatingCategory
              name="staff_behavior"
              value={this.state.staff_behavior}
              text="Staff Behavior"
              onRatingSelected={this.onRatingSelected} />
            <RatingCategory
              name="delivery_speed"
              value={this.state.delivery_speed}
              text="Delivery Speed"
              onRatingSelected={this.onRatingSelected} />
            <RatingCategory
              name="drive_thru_sassy_level"
              value={this.state.drive_thru_sassy_level}
              text="Drive Through Sassy"
              onRatingSelected={this.onRatingSelected} />
          </div>
          <textarea
            className="review-text"
            name="review"
            placeholder="Write a Review"
            onChange={this.onReviewTextChange}
            value={this.state.review}>
          </textarea>
          <div className="review-buttons">
            <Button classes="add-review-btn" onClick={this.submitReview}>Add review</Button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, restaurant }) => {
  return { selectedRestaurant: restaurant.selectedRestaurant, currentUser: auth.currentUser };
};

export default connect(mapStateToProps, { addReview })(Review);