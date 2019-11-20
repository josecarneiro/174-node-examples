'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [
      {
        type: Number,
        min: -180,
        max: 180
      }
    ]
  }
});

schema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', schema);
