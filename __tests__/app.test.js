const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('registers a user', async () => {
    const res = await request(app)
      .post('/api/v1/users/register')
      .send({ email: 'test@gmail.com', password: 'password' });

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'test@gmail.com',
    });
  });
});
