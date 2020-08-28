const express = require('express')
const passport = require('passport')
const Events = require('../models/event')
const errors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')

const handle404 = errors.handle404
const requireOwnership = errors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

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
