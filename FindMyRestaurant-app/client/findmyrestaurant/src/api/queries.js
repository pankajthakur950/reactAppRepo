export const SIGNUP_MUTATION = ({ email, password, firstName, lastName, dateOfBirth }) =>
    `
    mutation{
        signup(email: "${email}", password:"${password}"){
            email,
            token
        }
    }`;

export const SIGNIN_MUTATION = ({ email, password }) =>
    `
    mutation{
        signin(email: "${email}", password:"${password}"){
            _id,
            email,
            token,
            username,
            image_url
        }
    }`;

export const ADDREVIEW_MUTATION = ({ bathroom_quality, cleanliness, staff_behavior, delivery_speed, drive_thru_sassy_level, review, _restaurantId, _userId }) =>
    `
    mutation{
        addReview(bathroom_quality: ${bathroom_quality}, cleanliness:${cleanliness}, staff_behavior: ${staff_behavior}, delivery_speed: ${delivery_speed}, drive_thru_sassy_level: ${drive_thru_sassy_level}, review: "${review}", _restaurantId: ${_restaurantId}, _userId: "${_userId}"){
            review
            bathroom_quality
            cleanliness
            staff_behavior
            delivery_speed
            drive_thru_sassy_level
        }
    }`;

export const FETCHRESTAURANTS_QUERY = (page_num) =>
    `{
                                    restaurantList(page_num:${page_num}){
                                        results_found
                                        results_shown
                                        restaurants{
                                            _id
                                            name
                                            cuisines
                                            average_rating
                                            all_reviews_count
                                            image_url
                                            location{
                                                address
                                            }
                                        }
                                    }
                                }`;
export const SEARCHRESTAURANTS_QUERY = (query) =>{
                        let searchCriteria='';
                        for(let key in query){
                            searchCriteria=`${searchCriteria} ${key}: "${query[key]}",`;
                        }
                        return `{
                                    searchRestaurant(${searchCriteria}){
                                        results_found
                                        restaurants{
                                            _id
                                            name
                                            cuisines
                                            average_rating
                                            all_reviews_count
                                            image_url
                                            location{
                                                latitude,
                                                longitude,
                                                address
                                            }
                                        }
                                    }
                                }`;
                            }
export const FETCHRESTAURANTDETAILS_QUERY = (id) =>
    `{
                                    restaurant(id:${id}){
                                        _id
                                        name
                                        cuisines
                                        average_rating
                                        all_reviews_count
                                        image_url
                                        phone_numbers
                                        location{
                                            address,
                                            latitude,
                                            longitude,
                                            locality
                                        }
                                        reviews{
                                            review
                                            bathroom_quality
                                            cleanliness
                                            staff_behavior
                                            delivery_speed
                                            drive_thru_sassy_level
                                            average_rating
                                            review_date
                                        }
                                    }
                                }`;

