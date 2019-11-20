'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  res.render('user', { name: 'James Dean' });
});

module.exports = router;
