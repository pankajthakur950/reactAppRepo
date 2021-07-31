const mongoose = require("mongoose");
const Restaurant = mongoose.model("restaurant");
const RestaurantService = require("../../services/RestaurantService");

module.exports = app => {
  app.get("/api/restaurants", async (req, res, next) => {
    
    try {
      const pageSize= 20;
      const skips = pageSize * (req.query.page_num - 1);
      const restaurantCount = await Restaurant.countDocuments();
      const results = await Restaurant.find({}).skip(skips).limit(pageSize);
      var responseObject = {
        restaurants: results,
        results_found: restaurantCount,
        results_start: skips,
        results_shown: skips + pageSize
      };
      res.send(responseObject);
    } catch (error) {
      return next(error);
    }
  });

  app.get("/api/restaurants/:restaurant_id", async (req, res, next) => {
    try {
      const { restaurant_id } = req.params;
      const restaurant = await RestaurantService.getRestaurantById(restaurant_id);
      if (restaurant.length === 0) {
        return res.status(404).send({ error: "No restaurant found with given ID" });
      } 
      res.send(restaurant);
    } catch (error) {
      return next(error);
    }
  });

  app.get("/api/search", async (req, res, next) => {
    try {
      const criteria = req.query;
      const restaurant = await RestaurantService.searchRestaurant(criteria);
      res.send(restaurant);
    } catch (error) {
      return next(error);
    }
  });

  app.post("/api/restaurants", (req, res) => {
    const fs = require("fs");

    let rawdata = fs.readFileSync("./src/config/restaurantData.json");
    let restaurantData = JSON.parse(rawdata);

    for (var i = 0; i < 100; i++) {
      (function(index) {
        let obj = restaurantData[index];
        obj._id = obj.id;
        new Restaurant(obj).save().then(
          restaurant => {
            console.log(restaurant);
          },
          error => {
            console.log(error);
          }
        );
      })(i);
    }

    res.send("saving restaurants");
  });
};
