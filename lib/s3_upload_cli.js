require('dotenv').config()
const fs = require('fs')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const fileName = process.argv[2]
console.log(s3)

const readFilePromise = function (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function (err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}

const uploadParams = {
  Bucket: 'project-3-bucket',
  Key: fileName
}

readFilePromise(fileName)
  .then(data => {
    uploadParams.Body = data
    s3.upload(uploadParams, function (err, data) {
      console.log(err, data)
    })
  })
  .catch(console.error)
