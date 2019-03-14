module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                not: ["[a-z]", 'i'],
                len: [10]
            }
        },
        location: {
            type: DataTypes.STRING
        },
        housing: {
            type: DataTypes.STRING
        }        
    });

    return User;
};