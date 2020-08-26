'use strict'

// instantiate mongodb and mongoose
const mongoose = require('mongoose')

// telling mongoose to use node's promise
mongoose.Promise = global.Promise
// connecting mongoose to mongodb
const mongooseBaseName = 'event-iffe-api'
mongoose.connect(`mongodb://localhost/${mongooseBaseName}-test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

// require  model
const Rsvp = require('../models/rsvp')