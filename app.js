const createError = require('http-errors')
const express = require('express')
const http = require('http')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const feedbackRouter = require('./routes/feedback')
const { initDb } = require('./initializeDb')
const app = express()
app.server = http.createServer(app)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', feedbackRouter)
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  const error = {
    status: err.status || 500,
    message: err.message || 'Server Error'
  }
  res.status(err.status).json(error)
})

//Initialize database
initDb()
const listener = app.server.listen(
  process.env.PORT || 3000,
  '127.0.0.1',
  () => {
    console.log(
      `Server started on  http://${listener.address().address +
        ':' +
        listener.address().port}`
    )
  }
)
