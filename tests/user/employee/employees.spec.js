const { seedEmployee, seedDepartment } = require('./seed');
const generateToken = require('../../../src/auth/service/generateToken');

let accessToken = null;

describe('## Employee APIs', () => {
  beforeEach(async () => {
    accessToken = await generateToken({ id: 1, username: 'test' });
  });

  describe('# GET /user/employees', () => {
    it('should return all employees', async () => {
      await seedEmployee();

      const res = await chai
        .request(app)
        .get('/user/employees')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res).to.have.status(200);
      expect(res.body.total).to.equal(2);
    });
  });

  describe('# POST /employees', () => {
    it('should create a new employee', async () => {
      const departmentId = await seedDepartment();
      const employee = {
        name: 'Tien',
        departmentId,
      };
      const res = await chai
        .request(app)
        .post('/user/employees')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(employee);

      expect(res).to.have.status(201);
      expect(res.body).to.like(employee);
      expect(res.body).to.have.property('id').and.not.equal(undefined);
    });

    it('should get bad request with invalid input', async () => {
      const employee = {};

      const res = await chai
        .request(app)
        .post('/user/employees')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(employee);

      expect(res).to.have.status(400);
    });
  });
});
