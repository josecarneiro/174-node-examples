'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  githubToken: {
    type: String,
    trim: true
  },
  photo: {
    type: String,
    default: ''
  }
  // passwordHash: {
  //   type: String,
  //   required: true
  // }
});

module.exports = mongoose.model('User', schema);
