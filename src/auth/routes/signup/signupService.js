const bcrypt = require('bcryptjs');
const { User } = require('../../models');

const encryptPassword = (password) => bcrypt.genSalt(10).then((result) => bcrypt.hash(password, result));

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
