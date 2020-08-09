const bcrypt = require('bcryptjs');
const { User } = require('../../models');

const encryptPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

const password = async (user) => {
  const passwordHash = await encryptPassword(user.password);
  return User.create({
    username: user.username,
    password: passwordHash,
  });
};

module.exports = {
  password,
};
