const mongoose = require('mongoose');
const Location = require('./Location');

const { Schema } = mongoose;

//This scema needs to contain all the keys which can be there in any user record.
const restaurantSchema = new Schema({
  _id: Number,
  name: String,
  location: {
    type: Location
  },
  cuisines: String,
  timings: String,
  average_rating: { type: Number, default: 0 },
  all_reviews_count: { type: Number, default: 0 },
  image_url: String,
  phone_numbers: String
}, { _id: false });

restaurantSchema.statics = {

  // query obj for querying
  query_obj: null,
  create: function (data, cb) {
    var document = new this(data);
    document.save(cb);
  },
  filterData: async function(data){
    var filterObject = {}
    for(var key in data){
      filterObject[key] = {"$regex": data[key], "$options":"i"};
    }
    console.log(filterObject);
    const result = await this.find(filterObject);
    return result;
  },
  read: function (data, cb) {
    this.findOne({ _id: data.id }, cb);
  },
  update: function (data, cb) {
    this.findOneAndUpdate({ _id: data.id }, { $set: data }, cb);
  },
  delete: function (data, cb) {
    this.delete({ _id: data.id }, cb);
  },
  getAll: function () {
    return this.find({});
  },
  create_query: function () {
    this.query_obj = null;
    this.query_obj = this._find({});
    return this;
  },
  run: function (cb) {
    this.query_obj.exec(cb);
  },
  _find: function () {
    return this.find({});
  },
  _lte: function (val) {
    this.query_obj.lte(val);
    return this;
  },
  _select: function (param) {
    this.query_obj.where(param)
    return this;
  },
  _gte: function (val) {
    this.query_obj.gte(val);
    return this;
  },
  _equals: function (val) {
    this.query_obj.equals(val);
    return this;
  },
  _or: function (arr) {
    this.query_obj.or(arr);
    return this;
  },
  _with_tags: function (arr) {
    this.query_obj.filter_tags(arr);
    return this;
  }
}


//Create a mongoose class which corresponds to users collection in MongoDB
mongoose.model("restaurant", restaurantSchema);
