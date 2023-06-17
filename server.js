// Importing required modules and dependencies
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers: require("./utils/auth") });
const path = require("path");

// Creating express app and setting port
const app = express();
const PORT = process.env.PORT || 3001;

// Setting up session object with secret, cookie, and store
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Using session middleware with session object
app.use(session(sess));

// Parsing incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTANT FOR PUBLIC FOLDERS - serving static files such as images from public directory
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.set("view options", { layout: "/index" });

// Using session middleware again with a different session object
app.use(
  session({
    secret: process.env.SECRET,
    store: new SequelizeStore({ db: sequelize }),
    resave: false,
    saveUninitialized: false,
  })
);

// Setting up the views directory
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/expenses", (req, res) => {
  res.render("expenses");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});
// Using routes from controller
app.use(routes);

// Syncing sequelize models with the database and starting the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});
