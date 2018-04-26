const router = require('express').Router()
const {signin, signup} = require('../controllers/users.controller')

router.get('/', function (req, res) {
    res.status(200).send({
        message: 'Users'
    })
})
    .post('/signin', signin)
    .post('/signup', signup)

module.exports = router