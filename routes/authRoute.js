const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated, isAdmin } = require("../middleware/checkAuth");
const { admin, revoke } = require('../controllers/adminController');
const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));
router.get('/auth/admin', isAdmin, admin);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

// router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// router.get('/github/callback', 
//   passport.authenticate('github', { 
//     successRedirect: "/dashboard",
//     failureRedirect: "/auth/login", 
//   }),
// );


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
