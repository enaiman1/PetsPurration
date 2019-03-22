var db = require("../models");

module.exports = function(app) {

  // Get all users, return as JSON
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(allUsers) {
      res.json(allUsers);
    });
  });

  app.get("/api/users/data", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username
      });
    }
  });
  
  // Get all dogs of a param, of param, return as JSON
  // Search any column (col) and any value (val) and get back all dogs
  // Example: find all dogs where age = 5; find all dogs where location = Orlando; find all dogs where breed = chiahuahua
  // app.get("/api/pets/:col/:val", function(req, res) {
  //   var col = req.params.col;
  //   var val = req.params.val;

  //   db.Pet.findAll({
  //     where: {
  //       [col]: val
  //     }
  //   }).then(function(selectedPets) {
  //     res.json(selectedPets);
  //   });
  // });


  app.get("/api/pets/", function(req, res) {
    console.log(req.body);
    var query = req.query;

    // query = {gender: "male", age: "puppy"}

    console.log(query);

    db.Pet.findAll({
      where: query
    }).then(function(result) {
      res.json(result)     
    });
  });

  app.put("/api/pets/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("Condition", condition);

    db.Pet.update({
      adopted: true,
      UserId: req.user.id
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });
  });

};
