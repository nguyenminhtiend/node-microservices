const signupService = require('./signupService');

module.exports = {
  async password(req, res) {
    const result = await signupService.password(req.body);
    res.json(result);
  },
};
