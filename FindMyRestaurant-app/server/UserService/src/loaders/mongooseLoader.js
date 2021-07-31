const mongoose = require("mongoose");
const keys = require("../config/keys");
const models = require("../models");

module.exports = () => {
  //load mongoose connection
  const mongooseURI = `${keys.mongoHost}:${keys.mongoPort}/${keys.mongoDB}`;
  mongoose
    .connect(mongooseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected the User service to MongoDB database");
    })
    .catch(error => {
      console.log(error);
    });
};
models();
