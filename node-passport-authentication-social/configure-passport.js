// Passport configuration

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');
const bcryptjs = require('bcryptjs');

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

const GitHubStrategy = require('passport-github').Strategy;
// const { Strategy: GitHubStrategy } = require('passport-github');

passport.use(
  'github',
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/authentication/github-callback',
      scope: 'user:email'
    },
    (accessToken, refreshToken, profile, callback) => {
      const {
        displayName: name,
        emails,
        photos: [{ value: photo } = {}] = []
      } = profile;
      const primaryEmail = emails.find(email => email.primary).value;
      User.findOne({ email: primaryEmail })
        .then(user => {
          if (user) {
            return Promise.resolve(user);
          } else {
            return User.create({
              email: primaryEmail,
              photo,
              name,
              githubToken: accessToken
            });
          }
        })
        .then(user => {
          callback(null, user);
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);

// passport.use(
//   'sign-up',
//   new LocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
//     bcryptjs
//       .hash(password, 10)
//       .then(hash => {
//         return User.create({
//           email,
//           passwordHash: hash
//         });
//       })
//       .then(user => {
//         callback(null, user);
//       })
//       .catch(error => {
//         // ...
//         callback(error);
//       });
//   })
// );

// passport.use(
//   'sign-in',
//   new LocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
//     let user;
//     User.findOne({
//       email
//     })
//       .then(document => {
//         user = document;
//         return bcryptjs.compare(password, user.passwordHash);
//       })
//       .then(passwordMatchesHash => {
//         if (passwordMatchesHash) {
//           callback(null, user);
//         } else {
//           callback(new Error('Passwords dont match'));
//         }
//       })
//       .catch(error => {
//         callback(error);
//       });
//   })
// );
