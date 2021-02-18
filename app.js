const express = require('express')
const logger = require('morgan')

const app = express()

const routesWeather = require('./routes/api/weather')

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/weather', routesWeather)

app.use((_req, res) => {
  res.status(404).send({ message: 'Not  found'})
})

app.use((err, _req, res, _next) => {
  res.status(500).send({ message: err.message })
})

module.exports = app