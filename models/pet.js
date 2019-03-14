module.exports = function(sequelize, DataTypes) {
    var Pet = sequelize.define("Pet", {
        name: {
            type: DataTypes.STRING
        },
        photo: {
            type: DataTypes.TINYINT
        },
        breed: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.TINYINT
        },
        size: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.BOOLEAN
        },
        location: {
            type: DataTypes.STRING
        },
        adopted: {
            type: DataTypes.BOOLEAN
        }
    });

    return Pet;
};