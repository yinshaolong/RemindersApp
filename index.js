const express = require("express");
const session = require("express-session");
const app = express(); //→ returns a web server (app = server)
const path = require("path"); 
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
const passport = require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs"); //→ tells server that we will be using ejs files

// Routes start here
app.get("/reminders", reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);

// 👌 Ignore for now
app.get("/auth/register", authController.register);
app.get("/auth/login", authController.login);
app.get("/reminder/:id/edit", reminderController.edit);
app.get('/auth/admin', authController.admin);


app.post("/reminder/", reminderController.create);
// ⭐ Implement these two routes below!
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);
app.post("/register", authController.registerSubmit);
app.get("/auth/revoke/:id", authController.revoke);
app.post("/auth/revoke/:id", authController.revoke);
app.post(
  "/auth/login",
  authController.loginSubmit
);
app.get("/auth/logout", authController.logout);
app.post(
  "/auth/logout",
  authController.logout
);

app.listen(3001, function () { //→ allows us to access server by going to localhost:8080
  console.log(
    "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
  );
});
