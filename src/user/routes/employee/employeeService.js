const { Op } = require('sequelize');
const { Employee, Department } = require('../../models');
const { AppError } = require('../../../shared/utils');

module.exports = class EmployeeService {
  static async getBy({ search = '', page = 1, perPage = 10 }) {
    const where = {};
    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }
    const [total, data] = await Promise.all([
      Employee.count({
        where,
      }),
      Employee.findAll({
        where,
        attributes: { exclude: ['updatedAt'] },
        include: [
          { model: Department, as: 'department', attributes: ['name'] },
        ],
        offset: (page - 1) * perPage,
        limit: parseInt(perPage, 10),
      }),
    ]);
    return { total, data };
  }

  static async getById(id) {
    const employee = await Employee.findByPk(id, {
      attributes: { exclude: ['updatedAt'] },
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name'],
        },
      ],
    });
    return employee;
  }

  static async create(employee) {
    const savedEmployee = await Employee.create(employee);
    return savedEmployee;
  }

  static async update(id, employee) {
    const [affectedRows] = await Employee.update(employee, {
      where: {
        id,
      },
    });
    if (affectedRows === 0) throw new AppError('No record is updated.');
  }
};
