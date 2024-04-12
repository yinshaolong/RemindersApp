let database = require("../models/userModel");
const passport = require("../middleware/passport");


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
  }),
  logout: (req, res) => {
    res.redirect("/auth/login");
  },
  registerSubmit: (req, res) => {
    //implement later
  },
  admin: (req, res) => {
    let all_sessions = [];
    req.sessionStore.all(function(err, sessions){
      for (let session in sessions){
        console.log("session in admin: ", session)
        all_sessions.push(session)
      }
      console.log(all_sessions)
      res.render("auth/admin", {sessions: all_sessions})
    });
    // console.log("All sessions", all_sessions)
  },
  revoke: (req, res) => {
const sessionId = req.params.id;
console.log("Session ID: ", sessionId)
    req.sessionStore.destroy(sessionId, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: 'Failed to destroy session' });
      } else {
        console.log('Session destroyed successfully');
        res.redirect('/auth/admin');
      }
    });
  }
};

module.exports = authController;
