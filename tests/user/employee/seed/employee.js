const { Employee, Department } = require('../../../../src/user/models');

module.exports = async () => {
  await Employee.destroy({ truncate: { cascade: true } });
  await Department.destroy({ truncate: { cascade: true } });

  const { id: departmentId } = await Department.create({ name: 'IT' });
  const data = [
    { name: 'Messi', departmentId },
    { name: 'Ronaldo', departmentId },
  ];
  await Employee.bulkCreate(data);
};
