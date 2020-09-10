require('dotenv').config()
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

// Reads file elsewhere; just accepts it here
module.exports = function (file) {
  const uploadParams = {
    Bucket: 'project-3-bucket',
    Key: file.originalname,
    Body: file.buffer,
    ACL: 'public-read',
    ContentType: file.mimetype
  }

  return s3.upload(uploadParams).promise()
}
