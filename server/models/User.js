// models/user.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


// Method to compare passwords
UserSchema.methods.comparePassword = async function(password) {

  return bcrypt.compare(password, this.password);
};

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Use the existing model if it's already registered
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
