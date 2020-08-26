const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // one to many - one event has many rsvp's
  rsvps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RSVP',
    required: true
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)
