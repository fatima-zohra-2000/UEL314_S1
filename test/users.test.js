const request = require('supertest');
const app = require('../index');
const { User } = require('../models');

describe('User Controller', () => {
  let user;

  beforeAll(async () => {
    // Création d'un utilisateur pour les tests
    user = await User.create({ firstname: 'Monsieur', lastname: 'Test' });
  });

  describe('GET /users', () => {
    it('should get all users', async () => {
      const res = await request(app).get('/users');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /users/:id', () => {
    it('should get a user by id', async () => {
      const res = await request(app).get(`/users/${user.id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body.firstname).toBe(user.firstname);
      expect(res.body.lastname).toBe(user.lastname);
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app).get('/users/999');

      expect(res.statusCode).toEqual(404);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/users')
        .send({
          firstname: 'Monsieur',
          lastname: 'Test'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.firstname).toBe('Monsieur');
      expect(res.body.lastname).toBe('Test');
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user by id', async () => {
      const res = await request(app)
        .put(`/users/${user.id}`)
        .send({
          firstname: 'Monsieur2',
          lastname: 'Test Modifié'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'User updated successfully');

      const updatedUser = await User.findByPk(user.id);
      expect(updatedUser.firstname).toBe('Monsieur2');
      expect(updatedUser.lastname).toBe('Test Modifié');
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app)
        .put('/users/999')
        .send({
          firstname: 'Monsieur2',
          lastname: 'Test Modifié'
        });

      expect(res.statusCode).toEqual(404);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user by id', async () => {
      const res = await request(app).delete(`/users/${user.id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'User deleted successfully');

      const deletedUser = await User.findByPk(user.id);
      expect(deletedUser).toBeNull();
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app).delete('/users/999');

      expect(res.statusCode).toEqual(404);
    });
  });
});
