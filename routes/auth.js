var exports = module.exports = {};

exports.signup = function(req, res) {

    res.render("signup");

};

app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/signin", function(req, res) {
    res.render("signin");
  });