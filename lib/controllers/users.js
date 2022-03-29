const { Router } = require('express');

module.exports = Router()
  //
  .post('/register', async (req, res, next) => {
    try {
      const user = { id: '1', email: 'test@gmail.com' };
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
