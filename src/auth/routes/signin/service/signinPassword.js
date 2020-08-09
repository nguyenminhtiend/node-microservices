const bcrypt = require('bcryptjs');
const moment = require('moment');
const { User, RefreshToken } = require('../../../models');
const { AppError } = require('../../../../shared/utils');
const generateToken = require('../../../service/generateToken');

const signinPassword = async ({ username, password }) => {
  const user = await User.findOne({
    where: { username },
  });
  if (!user) throw new AppError('Username or password is not correct!');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError('Username or password is not correct!');

  const jwtData = {
    id: user.id,
    username: user.username,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 3600,
  };

  const accessToken = await generateToken(jwtData);
  const refreshToken = await RefreshToken.create({
    userId: user.id,
    expireAt: moment().add(30, 'days'),
  });
  return {
    accessToken,
    refreshToken: refreshToken.id,
  };
};

module.exports = {
  signinPassword,
};
