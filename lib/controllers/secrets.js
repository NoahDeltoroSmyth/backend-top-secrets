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
          created_at: '02:26:00',
        },
      ];

      res.send(secrets);
    } catch (error) {
      next(error);
    }
  });
