// server.js

const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const passportConfig = require('./config/passport');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // If you're using cookies or sessions
  }));

// Sessions
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false
}));

// Passport Config
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern-passport-auth')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error('Connection error', err));
