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
  }
}, {
  timestamps: true
})

eventSchema.virtual('prettyDate').get(() => {
return moment(this.date).fromat('MMM Do YY')
})

module.exports = mongoose.model('Events', eventSchema)
