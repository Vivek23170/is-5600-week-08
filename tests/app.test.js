const { mockDb } = require('./db.mock'); // Import mockDb

// Mock the db module to use our mockDb
jest.mock('../db', () => mockDb);

const request = require('supertest');
const app = require('../app.js');

describe('The Express Server', () => {
  beforeAll(done => {
    done();
  });

  // afterAll(async () => {
  //   await mockDb.connection.close(); // Ensure the mock DB connection is closed
  // });

  test('should return response', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  test('should respond at /products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
  });

  test('should respond at /orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toEqual(200);
  });
});