const axios = require("axios");
const BASE_URL = process.env.RESTAURANT_HOST && process.env.RESTAURANT_PORT ?
                `http://${process.env.RESTAURANT_HOST}:${process.env.RESTAURANT_PORT}` :
                "http://localhost:3001";

const getAllRestaurants = async (page_num) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/restaurants?page_num=${page_num}`);
        const restaurantList = response.data;
        return restaurantList;
    } catch (error) {
        return Promise.reject(error);
    }
};

const getRestaurant = async (id) => {
    try {
        const restaurantResponse = await axios.get(`${BASE_URL}/api/restaurants/${id}`);
        const reviewResponse = await axios.get(`${BASE_URL}/api/reviews/${id}`);
        const restaurant = restaurantResponse.data;
        restaurant.reviews = reviewResponse.data;
        return restaurant;
    } catch (error) {
        return Promise.reject(error);
    }
};

const searchRestaurant = async args => {
    try {
        let query = '';
        for(key in args){
            value=args[key];
            key = key.replace("_",".");
            query = `${query}${key}=${value}&`;
        }
        console.log(`${BASE_URL}/api/search/?${query}`)
        const response = await axios.get(`${BASE_URL}/api/search/?${query}`);
        const restaurantList = {};
        restaurantList.restaurants = response.data;
        restaurantList.results_found = response.data.length;
        return restaurantList;
    } catch (error) {
        return Promise.reject(error);
    }
};

const addReview = async (args) => {
    try {
        const reviewObject = {review: {...args}};
        const response = await axios.post(`${BASE_URL}/api/reviews`, reviewObject);
        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

module.exports = {
    getAllRestaurants,
    getRestaurant,
    addReview,
    searchRestaurant
};
