const userModel = require("../models/userModel").userModel;
const passport = require("../middleware/passport");


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  registerSubmit: (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
      // Handle missing fields
      return res.status(400).send('Name, email, and password are required');
    }

    //  User register logic
    userModel.createUser(name, email, password, (err, user) => {
      if (err) {
        // handle error
        res.status(500).send('Error registering user');
      } else {
        // login user
        req.login(user, (loginErr) => {
          if (loginErr) {
            return res.status(500).send('Error logging in');
          }
          res.redirect('/reminders');
        });
      }
    });
  },

  loginSubmit: passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  }),

  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).send('Error logging out');
      }
      res.redirect("/auth/login");
    });
  },

  admin: (req, res) => {
    let all_sessions = [];

    req.sessionStore.all(function (err, sessions) {
      for (let sessionID in sessions) {
        let userID = sessions[sessionID].passport.user;
        console.log("user id in admin: ", userID)
        console.log("session in admin: ", sessionID)
        if (userID !== req.user.id) {
          all_sessions.push({"sessionId": sessionID, "userId": userID})
          console.log("all sessions: ", all_sessions)
        }
      }
      console.log(all_sessions)
      if (all_sessions[0]) {
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
