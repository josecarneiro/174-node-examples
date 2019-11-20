'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  console.log(req.user);
  res.render('index', { title: 'Hello World!' });
});

router.get('/private', (req, res, next) => {
  res.render('private');
});

const routerGuard = allowedRoles => {
  return (req, res, next) => {
    if (req.user && allowedRoles.includes(req.user.role)) {
      next();
    } else {
      next(new Error('User has no permission to visit that page'));
    }
  };
};

router.get(
  '/private-editor',
  routerGuard(['editor', 'admin']),
  (req, res, next) => {
    res.render('private-editor');
  }
);

router.get('/private-admin', routerGuard('admin'), (req, res, next) => {
  res.render('private-admin');
});

module.exports = router;
