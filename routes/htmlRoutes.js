var db = require("../models");

module.exports = function(app) {
  // Load index page, display all pets
  app.get("/", function(req, res) {
    db.Pet.findAll({}).then(function(allPets) {
      res.render("index", {
        Pets: allPets
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/pets/:id", function(req, res) {
    db.Pet.findOne({ where: { id: req.params.id } }).then(function(onePet) {
      res.render("example", {
        Pets: onePet
      });
    });
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/signin", function(req, res) {
    res.render("signin");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
