const { getUsers, createUser } = require('./usersService');

module.exports = {
  async getUsers(req, res) {
    const result = await getUsers();
    res.json(result);
  },
  async createUser(req, res) {
    const result = await createUser(req.body);
    res.status(201).json(result);
  },
};
