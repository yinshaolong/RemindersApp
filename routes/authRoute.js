const express = require("express");
const passport = require("../middleware/passport");
const {forwardAuthenticated, isAdmin} = require("../middleware/checkAuth");
const authController = require("../controller/auth_controller");
const router = express.Router();

router.get('/admin', isAdmin, authController.admin);

router.get("/login", forwardAuthenticated, authController.login);
router.post("/login", authController.loginSubmit);
router.get('/register', forwardAuthenticated, authController.register)
router.post('/register', authController.registerSubmit)
router.get("/logout", authController.logout);

router.get('/revoke/:id', authController.revoke);
router.post('/revoke/:id', authController.revoke);

// router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// router.get('/github/callback', 
//   passport.authenticate('github', { 
//     successRedirect: "/dashboard",
//     failureRedirect: "/auth/login", 
//   }),
// );


module.exports = router;
