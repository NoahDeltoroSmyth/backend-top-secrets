const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

module.exports = Router()
  //
  .get('/', authenticate, authorize, async (req, res, next) => {
    try {
      const secrets = [
        {
          id: '1',
          title: 'Super Secret',
          description: 'This is my secret',
          created_at: expect.any(Number),
        },
      ];

      res.send(secrets);
    } catch (error) {
      next(error);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const secret = {
        id: '1',
        title: 'This is my secret',
        description: 'One time I went to the store',
        created_at: 42,
      };
      res.send(secret);
    } catch (error) {
      next(error);
    }
  });
