const mongoose = require("mongoose");

const { Schema } = mongoose;

//This scema needs to contain all the keys which can be there in any user record.
const locationSchema = new Schema({
  address: String,
  locality: String,
  city: String,
  zipcode: String,
  country: String,
  latitude: Number,
  longitude: Number
});

module.exports = locationSchema;
