const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
require('dotenv').config()

// mongodb local
mongoose.connect('mongodb://localhost/hacktiv8_press')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log(('Connected to mongoose'))
})

app.get('/', function (req, res) {
    res.send('Welcome to Hacktiv8 Press')
})

const users = require('./routes/users.route')
app.use('/api/users', users)

const articles = require('./routes/articles.route')
app.use('/api/articles', articles)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})