const AuthenticationService = require("./../../services/AuthenticationService");
const requireAuth = require("../middlewares").requireAuth;
const requireLogin = require("../middlewares").requireLogin;

module.exports = app => {
  app.post("/api/signup", async (req, res, next) => {
    try {
      const user = {...req.body.user};
      const result = await AuthenticationService.signupUser(user);
      if (result.error) {
        res.status(422).send(result.error);
      } else {
        res.send(result);
      }
    } catch (error) {
      return next(error);
    }
  });
  app.post("/api/signin", requireLogin, (req, res, next) => {
    try {
      const result = AuthenticationService.signinUser(req.user);
      res.send(result);
    } catch (error) {
      return next(error);
    }
  });
  app.get("/api/signInUser", requireAuth, (req, res) => {
    const user = {
      email: req.user.email,
      username: req.user.username,
      date_of_birth: req.user.date_of_birth,
      image_url: req.user.image_url
    };
    res.send(user);
  });
};
