import React from 'react';
import { connect } from "react-redux";

import { FaMapMarkerAlt, FaRegStar } from "react-icons/fa";
import StarRatingComponent from 'react-star-rating-component';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Login from 'components/Login/Login';
import Review from "components/Review";

class HeroDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }
    dismissModalPopup = () => {
        this.setState({ isModalOpen: false });
    }
    render() {
        const { name, image_url, location, average_rating, all_reviews_count } = this.props.restaurant;
        const { isSignedIn } = this.props;
        return (
            <div className="hero restaurant-hero-detail" style={{ backgroundImage: `url(${image_url})` }}>
                <div className="container">
                    <div className="restaurant-hero-detail__content">
                        <div className="restaurant-detail-inner">
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
                                        starColor={"#3277C0"}
                                        emptyStarColor={"white"}
                                    />
                                </span>
                                <span className="texting"> based on {all_reviews_count} reviews</span>
                            </div>
                        </div>
                        <div className="restaurant-links">
                            <Button classes="hero-restaurant-btn"
                                onClick={() => this.setState({ isModalOpen: true })}>
                                <span className="icon"><FaRegStar /></span>
                                <span>Write a Review</span>
                            </Button>
                            <Modal dismissHandler={this.dismissModalPopup}
                                showModal={this.state.isModalOpen}>
                                {
                                    isSignedIn ?
                                        <Review addReviewCallback={this.dismissModalPopup} /> :
                                        (<Login hideHeader={true}
                                            signInCallback={this.dismissModalPopup} />
                                        )
                                }
                            </Modal>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { isSignedIn: auth.isSignedIn };
}

export default connect(mapStateToProps)(HeroDetail);