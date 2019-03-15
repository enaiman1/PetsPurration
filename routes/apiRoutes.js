var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/pets", function(req, res) {
    db.Pet.findAll({}).then(function(allPets) {
      res.json(allPets);
    });
  });

  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(allUsers) {
      res.json(allUsers);
    });
  });

  // Create a new example
  app.post("/api/", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
