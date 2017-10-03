const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const images = require('./api/images')
// const users = require('./api/users')
const auth = require('./auth/index')
const authMiddleware = require('./auth/middleware')
const dotenv = require('dotenv').config()

app.use(cors({
  credentials: true,
  origin: '*'
}))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/auth', auth)

app.use('/api/v1/images', images)
// app.use('/api/v1/users', authMiddleware.ensureLoggedIn, users)

app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404;
  next(err);
})

app.use(function(err, req, res, next) {
  res.status(500)
  // res.status(err.status || res.statusCode || 500)
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
})

module.exports = app
