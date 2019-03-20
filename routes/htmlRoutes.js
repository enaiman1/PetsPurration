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
        res.json(petsAdopted);
      // res.render("adopted", {
      //   Pets: petsAdopted
      // });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())

        return next();

    res.redirect("/signin");
  }

  function isAuthentic(req, res, next) {
    if (req.user) {
      console.log(req.user)
      return next();
    } else {
      return res.status(401).json({error: "User not authenticated"})
    }
  }
};
