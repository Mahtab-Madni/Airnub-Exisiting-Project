const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: String,
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: { 
    type: String,
    required: [true, 'Password is required']
  },
  userType: {
    type: String,
    enum: ['guest', 'owner'],
    default: 'guest'
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home'
  }],
  hostHomes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home'
  }]
})

module.exports = mongoose.model("User", userSchema);