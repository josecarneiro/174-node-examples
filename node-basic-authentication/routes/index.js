const { Router } = require('express');
const router = new Router();

const User = require('./../models/user');
const bcryptjs = require('bcryptjs');

router.get('/', (req, res, next) => {
  res.render('index');
});

// Sign Up
router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const { name, email, password } = req.body;
  // We need to hash the password submitted by the user
  // so that it can be securely stored in the database
  bcryptjs
    .hash(password, 10)
    .then(hash => {
      // Now that we have the value of the hashed password,
      // create the user
      return User.create({
        name,
        email,
        passwordHash: hash
      });
    })
    .then(user => {
      // User was securely created
      // Save it's ID to the session (we call this process serialization),
      // so that it can later be loaded from the database and
      // bound to the request with req.body (deserialization)
      req.session.user = user._id;
      res.redirect('/');
    })
    .catch(error => {
      // If there was an error in the promise chain,
      // send to the error handler
      next(error);
    });
});

// Sign In
router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post('/sign-in', (req, res, next) => {
  let userId;
  const { email, password } = req.body;
  // Find a user with an email that corresponds to the one
  // inserted by the user in the sign in form
  User.findOne({ email })
    .then(user => {
      if (!user) {
        // If no user was found, return a rejection with an error
        // that will be sent to the error handler at the end of the promise chain
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        // If there is an user,
        // save their ID to an auxiliary variable
        userId = user._id;
        // Compare the password with the salt + hash stored in the user document
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then(result => {
      if (result) {
        // If they match, the user has successfully been signed up
        req.session.user = userId;
        res.redirect('/');
      } else {
        // If they don't match, reject with an error message
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch(error => {
      next(error);
    });
});

// Sign Out
router.post('/sign-out', (req, res, next) => {
  // When user submits form to sign out,
  // destroy the session
  req.session.destroy();
  res.redirect('/');
});

// Import custom middleware that stops unauthenticated users
// from visiting a route meant for authenticated users only
const routeGuard = require('./../middleware/route-guard');

// Private Page
// Set a controller for the private page,
// preceded by the middleware that prevents unauthenticated users to visit
router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

// Export the router that should be mounted in the app
module.exports = router;
