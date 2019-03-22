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
      type: DataTypes.STRING
    },
    breed: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.STRING,
      validate: {
        isIn: [
          ["puppy", "young", "adult", "senior", "Puppy", "Young", "Adult", "Senior"]
        ]
      }
    },
    size: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["Small", "Medium", "Large"]]
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["Male", "Female"]]
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

  Pet.associate = function(models) {
    Pet.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  }

  return Pet;
};
