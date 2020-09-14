const express = require('express')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const Upload = require('../models/upload')
const router = express.Router()
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

const s3Upload = require('../../lib/s3_upload')

router.post('/uploads', requireToken, upload.single('upload'), (req, res, next) => {
  console.log(req.file)
  s3Upload(req.file)
    .then(awsFile => {
      return Upload.create({ owner: req.user.id, url: awsFile.Location })
    })
    .then(uploadDoc => {
      res.status(201).json({ upload: uploadDoc })
    })
    .catch(next)
})

router.get('/uploads/:filename', requireToken, (req, res, next) => {
  Upload.find(req.params.id)
    .then(upload => {
      return upload.map(upload => upload.toObject())
    })
    .then(upload => res.status(201).json({ upload: upload }))
    .catch(next)
})

module.exports = router
