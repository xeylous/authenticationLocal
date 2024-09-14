// config/passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Adjust the path to your User model

// Configure Passport to use the Local Strategy
module.exports = function(passport) {
    passport.use(new LocalStrategy(
        async (username, password, done) => {
          try {
            
            const user = await User.findOne({ username });
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
      
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
              return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
          } catch (err) {
            console.error(err); // Log the error for debugging
            return done(err);
          }
        }
      ));

//   Serialize user ID into session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

//   Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
