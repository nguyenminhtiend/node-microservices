const { signinPassword } = require('./service/signinPassword');
const getGoogleLoginUrl = require('./service/getGoogleLoginUrl');
const validateGoogleCode = require('./service/validateGoogleCode');

module.exports = {
  async password(req, res) {
    const result = await signinPassword(req.body);
    res.json(result);
  },
  async requestGoogleLogin(req, res) {
    const url = getGoogleLoginUrl();
    res.json({ url });
  },
  async signinGoogle(req, res) {
    const result = await validateGoogleCode(req.body.code);
    res.json(result);
  },
};
