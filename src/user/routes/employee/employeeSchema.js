module.exports = {
  create: {
    body: {
      properties: {
        name: { type: 'string', minLength: 1 },
        departmentId: { type: 'number' },
      },
      required: ['name', 'departmentId'],
    },
  },
};
