var authController = require("../controllers/authcontroller.js");
var db = require("../models");

module.exports = function(app, passport) {
    // When user goes to "/signup", render "signup" page (via authController)
    app.get("/signup", authController.signup);

    // When user goes to "/signin", render "signin" page (via authController)
    app.get("/signin", authController.signin);

    // User uses "signup" form and submits, run passport.js to authenticate and add to db
    // Redirect on success, reload on failure
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/dashboard",
        failureRedirect: "/signup"
        }
    ));

    // When user goes to "/dashboard", render "dashboard" page (via authController")
    // Only show dashboard if user is logged in, else redirect to "signin" page
    app.get("/dashboard", isLoggedIn, updateActive, authController.dashboard);

    // When user goes to "/logout", render "/" (via authController)
    // Destroy their login instance/session
    app.get("/logout", updateInactive, authController.logout);

    // When user uses "signin" form and submits, run passport.js to authenticate
    // Redirect on success, reload on failure
    app.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/dashboard",
        failureRedirect: "/signin"
        }
    ));

    // For accessing "dashboard", user must be logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();

        } else {
            res.redirect("/signin");

        }
    }

    function updateActive(req, res, next) {
        db.User.update(
            {status: "active"},
            {where: { id: req.user.id }}
        );

        return next();
    }

    function updateInactive(req, res, next) {
        db.User.update(
            {status: "inactive"},
            {where: { id: req.user.id }}
        );

        return  next();
    }
}