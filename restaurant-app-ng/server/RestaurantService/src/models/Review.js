const mongoose = require("mongoose");
const Location = require("./Location");

const { Schema } = mongoose;

//This scema needs to contain all the keys which can be there in any user record.
const reviewSchema = new Schema({
  bathroom_quality: Number,
  staff_behavior: Number,
  cleanliness: Number,
  delivery_speed: Number,
  drive_thru_sassy_level: Number,
  average_rating: Number,
  review: String,
  review_date: Date,
  _restaurantId: { type: Number, ref: "restaurants" },
  _userId: { type: Schema.Types.ObjectId, ref: "users" }
  //images: Array[]
});

//Create a mongoose class which corresponds to users collection in MongoDB
mongoose.model("review", reviewSchema);
