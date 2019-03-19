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
   // Load page of the dogs that have been adopted
   app.get("/adopted", function(req, res) {
    db.Pet.findAll({
      where: {
        adopted: true
      }
    }).then(function(petsAdopted) {
        // res.json(petsAdopted);
      res.render("adopted", {
        Pets: petsAdopted
      });
    });
  });

  // // Load second page, display one pet
  // app.get("/pets/:id", function(req, res) {
  //   db.Pet.findOne({ where: { id: req.params.id } }).then(function(onePet) {
  //     res.render("example", {
  //       Pets: onePet
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())

        return next();

    res.redirect("/signin");
  }
};
