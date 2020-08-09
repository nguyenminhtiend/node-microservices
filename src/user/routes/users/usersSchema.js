module.exports = {
  createUser: {
    body: {
      properties: {
        name: { type: 'string', minLength: 1 },
        email: { type: 'string', format: 'email' },
      },
      required: ['name', 'email'],
    },
  },
};
