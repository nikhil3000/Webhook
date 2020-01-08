
const webhookSecret='/rHoXl+GGvaH/+xSpMW5';

const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
let crypto = require('crypto')
const exec = require('child_process').exec
const SimpleNodeLogger = require('simple-node-logger'),
  opts = {
    logFilePath: 'mylogfile.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
  },
  log = SimpleNodeLogger.createSimpleLogger(opts)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token,X-PINGOTHER'
  )
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/payload', (req, res) => {
  let sig =
    'sha1=' +
    crypto
      .createHmac('sha1', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex')

  if (req.headers['x-hub-signature'] == sig) {
    try {
      exec('~/./deploy.sh')
    } catch (e) {
      log.error(e)
    }
  } else {
    log.fatal('401 attempt to payload')
    log.fatal(req.body)
  }

  res.end()
})

app.get('/get', (req, res) => {
  res.send('hello')
})

var port = process.env.PORT || 8080

app.listen(port, () => {
  log.info(`server started at port ${port}`)
  //   console.log(`server started at port ${port}`)
})
