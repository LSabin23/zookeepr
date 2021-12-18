const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')
const { animals } = require('./data/animals')
const express = require('express')
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()

// make files in the public directory readily available
app.use(express.static('public'))

// parse incoming string or array data and extended means look deeper into the object for nested items
app.use(express.urlencoded({ extended: true }))

// parse incoming JSON data
app.use(express.json())

app.use('/api', apiRoutes)
app.use('/', htmlRoutes)

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`)
})
