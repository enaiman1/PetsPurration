// Require bCrypt to secure passwords
var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require("passport-local").Strategy;

    // Serialize - save the user id to the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialized user
    passport.deserializeUser(function(id, done) {
        // Get the user and if successful, return an instance of the model, "get" the user object
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    // Define our custom strategy with our instance of the LocalStrategy
    passport.use("local-signup", new LocalStrategy(
        // Define what request fields our usernameField and passwordField are (passport variables)
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true // lets us pass back the entire request
        },
        
        function(req, email, password, done) {
            // Handle storing user's details
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            // Check if the user already exists, if not add them
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user) {
                    return done(null, false, {
                        message: "That email is already taken."
                    });
                } else {
                    var userPassword = generateHash(password);

                    // Grab user's data and store here
                    var data = {
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    };

                    // Add new user to the database
                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }

                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    // Local Signin
    passport.use("local-signin", new LocalStrategy(
        {
            // By default, local strategy uses username and password, we override with email
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true // lets us pass back the entire request
        },

        function(req, email, password, done) {
            var User = user;

            // Compare password entered with the bCrypt comparison method
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            // Find the user in the db via email
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {

                // If the user (email) doesn't exist
                if (!user) {
                    return done(null, false, {
                        message: "Email does not exist."
                    });
                }

                // If password isn't right
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: "Incorrect password."
                    })
                }

                // If password is right, log user in, get their info from db
                var userinfo = user.get();
                return done(null, userinfo);

            }).catch(function(err) {
                console.log("Error:", err);

                return done(null, false, {
                    message: "Something went wrong with your Signin."
                });
            });
        }
    ));
}