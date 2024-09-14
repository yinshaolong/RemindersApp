const express = require("express");
const session = require("express-session");
const app = express(); //→ returns a web server (app = server)
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const authRouter = require("./routes/authRoute");
const indexRouter = require("./routes/indexRoute");
const reminderRoutes = require("./routes/reminderRoutes");

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

const {passport} = require('./middleware/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: false}));

app.use(ejsLayouts);

// tells server that we will be using ejs files
app.set("view engine", "ejs");

app.use('/', indexRouter);
// Handle authentication routes with `authRouter` mounted at `/auth`
// This includes routes like /auth/login, /auth/register, etc.
app.use('/auth', authRouter);
// Routes handled by authRouter
app.use('/reminders', reminderRoutes);

// NOTE: Port 8080 is used because AWS Elastic Beanstalk (EB) defaults to using this port.
// When deploying to EB, the load balancer will forward traffic to the application's port 8080.
// Using the same port in local development ensures consistency with the production environment.
app.listen(8080, function () { //→ allows us to access server by going to localhost:8080
  console.log(
    "Server running. Visit: http://localhost:8080/reminders in your browser 🚀"
  );
});
