const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

exports.requireAuth = requireAuth;
exports.requireLogin = requireLogin;