var db = require("../models");

module.exports = function(app) {

  
  // Get all pets, return as JSON
  // app.get("/api/pets", function(req, res) {
  //   db.Pet.findAll({}).then(function(allPets) {
  //     res.json(allPets);
  //   });
  // });

  // Get all users, return as JSON
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(allUsers) {
      res.json(allUsers);
    });
  });
  
  // Get all males or females, return as JSON
  // app.get("/api/pets/gender/:gender", function(req, res) {
  //   db.Pet.findAll({
  //     where: {
  //       gender: req.params.gender
  //     }
  //   }).then(function(allMales) {
  //     res.json(allMales);
  //   });
  // });

  // Get all dogs of a param, of param, return as JSON
  // Search any column (col) and any value (val) and get back all dogs
  // Example: find all dogs where age = 5; find all dogs where location = Orlando; find all dogs where breed = chiahuahua
  app.get("/api/pets/", function(req, res) {
    var query = req.query;
    console.log(query);

    db.Pet.findAll({
      where: query
    }).then(function(result) {
      res.json(result)
      // res.render("index", {
      //   Pets: result
      // });
     
    });
  });

  app.get("api/sendmales", function(res,res){
    res.json({site:"/gender/males"})
  })


  // app.get("/api/pets/:gender", function(req, res) {
  //   console.log("hey there");
  //   console.log(req.params);
  // })
  // Create a new example
  // app.post("/api/", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
