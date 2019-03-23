require("dotenv").config();
// var env = require("dotenv").load();
var express = require("express");
var exphbs = require("express-handlebars");

// Grab our models
var db = require("./models");

// Seed database
var userSeeds = require("./userSeeds.js");
var petSeeds = require("./petSeeds.js");

// For User Authentication
var passport = require("passport");
var session = require("express-session");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
// Use session to keep track of user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/auth.js")(app, passport);
require("./routes/htmlRoutes")(app);

// Load passport strategies
require("./config/passport/passport.js")(passport, db.User);

// Don't delete the database when in production
var syncOptions = { force: false };

// If running in development, recreate the database tables every time
if (process.env.NODE_ENV === "development") {
  syncOptions.force = true;
}

// Starting the server, syncing our models
db.sequelize.sync(syncOptions).then(function() {

  db.Pet.findAndCountAll({
    where: {}
  }).then(function(res) {
    console.log(res.count);
    if (res.count === 0) {
      // Seed the users
      for (var i = 0; i < userSeeds.length; i++) {
        db.User.build(userSeeds[i]).save();
      }
  
      // Seed the pets
      for (var j = 0; j < petSeeds.length; j++) {
        db.Pet.build(petSeeds[j]).save();
      }
    }

    // Start the server
    app.listen(PORT, function() {
      console.log(
        "\n===> Listening on port %s. Visit http://localhost:%s/ in your browser.\n",
        PORT,
        PORT
      );
    });
  });

  }).catch(function(err) {
    console.log(err, "Something went wrong in the server");
  });

    // Start the server
  //   app.listen(PORT, function() {
  //     console.log(
  //       "\n===> Listening on port %s. Visit http://localhost:%s/ in your browser.\n",
  //       PORT,
  //       PORT
  //     );
  //   });
  // })
  // .catch(function(err) {
  //   console.log(err, "Something went wrong in the server");
  // });

module.exports = app;

// https://boiling-everglades-73840.herokuapp.com/