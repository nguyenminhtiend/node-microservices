module.exports = {
  password: {
    body: {
      properties: {
        username: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 6 },
      },
      required: ['username', 'password'],
    },
  },
};
