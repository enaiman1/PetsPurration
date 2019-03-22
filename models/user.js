module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstname: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    lastname: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    username: {
      type: DataTypes.TEXT
    },

    phone: {
      type: DataTypes.STRING,
      validate: {
        not: ["[a-z]", "i"],
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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    last_login: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW 
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive"
    }
  });

  return User;
};
