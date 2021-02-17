const express = require('express')
const logger = require('morgan')
const app = express()

const routesWeather = require('./routes/api/weather')

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/weather', routesWeather)

module.exports = app