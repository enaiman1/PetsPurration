module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define("Pet", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    photo: {
      type: DataTypes.TINYINT
    },
    breed: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.STRING,
      validate: {
        isIn: [
          ["puppy", "young adult", "senior", "Puppy", "Young Adult", "Senior"]
        ]
      }
    },
    size: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["small", "medium", "large", "Small", "Medium", "Large"]]
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["male", "female", "Male", "Female"]]
      }
    },
    location: {
      type: DataTypes.STRING
    },
    adopted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Pet;
};
