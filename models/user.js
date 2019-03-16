module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        username: {
            type: Sequelize.TEXT
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
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
        last_login: {
            type: Sequelize.DATE
        },
 
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }        
    });

    return User;
};