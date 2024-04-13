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
      for (let sessionID in sessions){
      let userID = sessions[sessionID].passport.user;
        console.log("user id in admin: ", userID)
        console.log("session in admin: ", sessionID)
        if (userID !== req.user.id){
          all_sessions.push({"sessionId": sessionID, "userId": userID})
          console.log("all sessions: ", all_sessions)
        }
      }
      console.log(all_sessions)
      if (all_sessions[0]){
        console.log("first session: ", all_sessions[0])
        console.log("first session id: ", all_sessions[0]['sessionId'])
      }
      res.render("auth/admin", {sessions: all_sessions})
    });
  },

  revoke: (req, res) => {
    const sessionId = req.params.id;
    // console.log("User: ", user)
    console.log("Session ID: ", sessionId)
    req.sessionStore.destroy(sessionId, (err) => {
      if (err) {
        return console.log(err);
      }
        console.log('Session destroyed successfully');
        res.redirect('/auth/admin');
    });
  }
};

module.exports = authController;
