const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

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

  it('signs in an existing user', async () => {
    const user = await UserService.create({
      email: 'test@gmail.com',
      password: 'password',
    });

    const res = await request(app)
      .post('/api/v1/users/session')
      .send({ email: 'test@gmail.com', password: 'password' });

    expect(res.body).toEqual({
      message: 'Signed in successfully!',
      user,
    });
  });

  it('allows a signed in user to view secrets', async () => {
    const agent = request.agent(app);

    await UserService.create({
      email: 'test2@gmail.com',
      password: 'password',
    });

    let res = await agent.get('/api/v1/secrets');
    expect(res.status).toEqual(401);

    await agent
      .post('/api/v1/users/session')
      .send({ email: 'test2@gmail.com', password: 'password' });
    res = await agent.get('/api/v1/secrets');
    expect(res.status).toEqual(200);
  });

  it('allows a signed in user to create secrets', async () => {
    const agent = request.agent(app);

    const secret = {
      title: 'This is my secret',
      description: 'One time I went to the store',
      createdAt: expect.any(String),
    };

    await UserService.create({
      email: 'test3@gmail.com',
      password: 'password',
    });
    await agent
      .post('/api/v1/users/session')
      .send({ email: 'test3@gmail.com', password: 'password' });

    const res = await request(app).post('/api/v1/secrets').send(secret);
    expect(res.body).toEqual({ id: expect.any(String), ...secret });
  });
});
