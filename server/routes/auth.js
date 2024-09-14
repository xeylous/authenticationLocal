const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

const { isAuthenticated } = require('../middleware/authentication'); 

// Register Route - Dynamic with username
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//dynamic login route
router.post('/login/:username?', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err); // Handle error
      }
      if (!user) {
        return res.status(401).json({ message: info.message }); // Invalid credentials
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err); // Handle error during login
        }
        return res.status(200).json({ message: 'Login successful', user }); // Successful login
      });
    })(req, res, next);
});

//logout dynamic route
router.get('/logout/', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout error', error: err });
      }
      res.json({ alert : `logged out successfully` });
    });
});


module.exports = router;
