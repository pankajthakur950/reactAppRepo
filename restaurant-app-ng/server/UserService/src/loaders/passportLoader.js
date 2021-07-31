const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const config = require("../config/keys");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStartegy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

//setup option for jwt
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};

const localOptions = {
  usernameField: "email"
};

const localAuthentication = new LocalStartegy(localOptions, async function(
  email,
  password,
  done
) {
  try {
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      existingUser.comparePassword(password, function(err, isMatch) {
        if (err) return done(err);

        if (!isMatch) return done(null, false);

        return done(null, existingUser);
      });
    } else {
      done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

const jwtAuthenication = new JwtStrategy(jwtOptions, async function(
  payload,
  done
) {
  try {
    const existingUser = await User.findById(payload.sub);
    if (existingUser) {
      done(null, existingUser);
    } else {
      done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtAuthenication);
passport.use(localAuthentication);
