const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Secret = require('../models/Secret');

module.exports = Router()
  //
  .get('/', authenticate, authorize, async (req, res, next) => {
    try {
      const secrets = [
        {
          id: '1',
          title: 'Super Secret',
          description: 'This is my secret',
          created_at: expect.any(String),
        },
      ];

      res.send(secrets);
    } catch (error) {
      next(error);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const secret = await Secret.insert(req.body);
      res.send(secret);
    } catch (error) {
      next(error);
    }
  });
