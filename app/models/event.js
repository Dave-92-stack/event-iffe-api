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
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // one to many - one event has many rsvp's
  rsvps: [{
    type: mongoose.Schema.Types.Mixed,
    ref: 'RSVP'
  }],
  uploads: [{
    type: mongoose.Schema.Types.Mixed,
    ref: 'Upload'
  }]
}, {
  timestamps: true
})

eventSchema.virtual('prettyDate').get(() => {
  return moment(this.date).fromat('MMM Do YY')
})

module.exports = mongoose.model('Events', eventSchema)
