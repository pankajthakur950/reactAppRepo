const axios = require('axios');
const BASE_URL = process.env.USER_HOST && process.env.USER_PORT ?
                `http://${process.env.USER_HOST}:${process.env.USER_PORT}` :
                "http://localhost:4001";

const signupUser = async user => {
    try {
        const userObject = {user:{...user}};
        const response = await axios.post(`${BASE_URL}/api/signup`, userObject);
        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }

};

const signinUser = async user => {
    console.log(user);
    try {
        const response = await axios.post(`${BASE_URL}/api/signin`, user);
        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

module.exports = {
    signupUser,
    signinUser
}