const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const userController = require("../controllers/userController");
const userModel = require('../models/userModel').userModel;
require('dotenv').config()
// console.log("ENV",process.env)
const githubLogin = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3001/auth/github/callback",
  },
  (accessToken, refreshToken, profile, done) => {
    // Creates a user if none exists for profile.id; gets user
    const user = userModel.findOrCreate(profile);
    return done(null, user);
  }
);
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin), passport.use(githubLogin);
