const express = require('express')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const Upload = require('../models/upload')
const router = express.Router()

const s3Upload = require('../../lib/s3_upload')

router.post('/uploads', upload.single('upload'), (req, res, next) => {
  console.log(req.file)
  s3Upload(req.file)
    .then(awsFile => {
      console.log(awsFile)
      return Upload.create({ url: awsFile.Location })
    })
    .then(uploadDoc => {
      res.status(201).json({ upload: uploadDoc })
    })
    .catch(next)
})

module.exports = router