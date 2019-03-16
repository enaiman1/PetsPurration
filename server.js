require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var seed = require("./seed.js");
var petSeeds = require("./petsSeed.js");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {

  for (var i = 0; i < userSeeds.length; i++) {
    db.User.build(seed[i]).save();
  };

  for (var j = 0; j < petSeeds.length; j++) {
    db.Pet.build(petSeeds[j]).save();
  };

  app.listen(PORT, function() {
    console.log("==> Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

module.exports = app;
