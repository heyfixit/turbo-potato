const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type:DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, 10);
      }
    },
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    scopes: {
      withPassword: {
        attributes: { }
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.AuthToken);
  };

  // Class method, instance methods go on prototype
  User.authenticate = async function(username, password) {
    const user = await User.scope('withPassword').findOne({ where: { username } });

    if (bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }

    throw new Error('invalid password');
  };

  // Instance method
  User.prototype.authorize = async function() {
    const { AuthToken } = sequelize.models;
    const user = this;

    const authToken = await AuthToken.generate(user.id);

    await user.addAuthToken(authToken);

    // Filter the password
    return { user: { ...( user.get({ plain: true }) ), password: undefined }, authToken };
  };

  User.prototype.logout = async function(token) {
    sequelize.models.AuthToken.destroy({ where: { token }});
  };

  return User;
};
