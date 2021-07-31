const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const { Schema } = mongoose;

//This scema needs to contain all the keys which can be there in any user record.
const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  username: String,
  firstName: String,
  lastName: String,
  date_of_birth: Date,
  image_url: String
});

userSchema.pre("save", function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    //hash(encrypt) our password with generated salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassowrd, callback) {
  bcrypt.compare(candidatePassowrd, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

//Create a mongoose class which corresponds to users collection in MongoDB
mongoose.model("User", userSchema);
