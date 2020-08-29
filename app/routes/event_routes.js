const express = require('express')
const passport = require('passport')
const Events = require('../models/event')
const errors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')
const RSVP = require('../models/rsvp')
const handle404 = errors.handle404
const requireOwnership = errors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// rsvp route to RSVP to an event
// INDEX
router.post('/events/:id/rsvp', requireToken, (req, res, next) => {
  // Temporary variable to be used later in the chain
  let createdRSVP
  // create the actually rsvp = where owner == is the user.
  // NOTE: this needs to be an object. Before you were trying to create an rsvp as just an object ID but that will not work.
  RSVP.create({ owner: req.user.id })
    .then(rsvp => {
      // store the created rsvp in a variable
      createdRSVP = rsvp
      // return the .findById call to return the promise to the next .then
      return Event.findById(req.params.id)
    })
    .then(event => { // this is the found event
      // Add the createdRSVP to the event we just found and push the ._id
      event.rsvps.push(createdRSVP._id)
      return event.save()
      // your code here
      // return & save the event
      // your code here
    })
    .then(event => { // this is the saved event
      // return a json response as the FINAL step in the chain
      console.log(event)
      res.status(201).json({ createdRSVP: createdRSVP.toObject })
    })
    .catch(next)
})

router.post('/userevents', (req, res, next) => {
  Events.find({ owner: req.body.ownerEvent })
    .then(events => {
      return events.map(event => event.toObject())
    })
    .then(events => res.status(200).json({ events: events }))
    .catch(next)
})

// INDEX
router.get('/events', (req, res, next) => {
  Events.find()
    .then(events => {
      return events.map(event => event.toObject())
    })
    .then(events => res.status(200).json({ events: events }))
    .catch(next)
})

// SHOW
router.get('/events/:id', requireToken, (req, res, next) => {
  Events.findById(req.params.id)
    .then(handle404)
    .then(event => res.status(200).json({ event: event.toObject() }))
    .catch(next)
})

// CREATE:
router.post('/events', requireToken, (req, res, next) => {
  req.body.event.owner = req.user.id

  Events.create(req.body.event)
    .then(event => {
      res.status(201).json({ event: event.toObject() })
      //res.status(201).json({ snippet: snippet.toObject() })
    })
    .catch(next)
})

// UPDATE
router.patch('/events/:id', requireToken, removeBlanks, (req, res, next) => {

  req.body.event.owner = req.user.id
  console.log(req.body)

  Events.findById(req.params.id)
    .then(handle404)
    .then(event => {
      requireOwnership(req, event)
      return event.updateOne(req.body.event)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY

router.delete('/events/:id', requireToken, (req, res, next) => {
  Events.findById(req.params.id)
    .then(handle404)
    .then(event => {
      requireOwnership(req, event)
      event.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
