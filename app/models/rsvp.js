const mongoose = require('mongoose')

const rsvpSchema = new mongoose.Schema({
  owner_rsvp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  goingtoEvent: {
    type: Boolean,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('RSVP', rsvpSchema)