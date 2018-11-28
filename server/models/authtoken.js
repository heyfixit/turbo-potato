module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define('AuthToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  AuthToken.associate = function({ User }) {
    // associations can be defined here
    AuthToken.belongsTo(User);
  };

  AuthToken.generate = async function(UserId) {
    if (!UserId) {
      throw new Error('AuthToken requires a user ID');
    }

    let token = '';
    const possibleCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    for (let i = 0; i < 15; i++) {
      token += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }

    return AuthToken.create({ token, UserId });
  };
  return AuthToken;
};
