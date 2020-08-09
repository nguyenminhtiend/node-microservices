const getUsers = async () => ({
  users: [{ id: 1, name: 'Messi' }],
});

const createUser = async (user) => ({
  ...user,
  id: new Date().getTime(),
});

module.exports = {
  getUsers,
  createUser,
};
