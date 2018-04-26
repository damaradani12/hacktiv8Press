const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../models/users.model')
const saltRounds = 10
const pwdtoken = process.env.pwdtoken

module.exports = {
  signin: function (req, res) {
    let email = req.body.email
    let password = req.body.password

    Users.findOne({email})
      .then(user => {
        if (!user) {
          res.status(406).json({
            message: 'Email / password is wrong'
          })
        } else {
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
              res.status(500).json({
                message: 'Something went wrong',
                err
              })
            } else {
              if (result) {
                let token = jwt.sign({id: user._id, email: user.email}, pwdtoken)
                res.status(200).json({
                  message: 'User Login Successfully',
                  user,
                  token
                })
              } else {
                res.status(406).json({
                  message: 'Password is Wrong'
                })
              }
            }
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      })
  },
  signup: function (req, res) {
    let password = req.body.password
    let cekFormatEmail = validateEmail(req.body.email)

    Users.findOne({email: req.body.email})
      .then(user => {
        if (user) {
          res.status(406).json({
            message: 'Email is not available'
          })
        } else {
          if (!cekFormatEmail) {
            res.status(406).json({
              message: 'Email format is wrong'
            })
          } else {
            bcrypt.hash(password, saltRounds, function (err, hash) {
              let newUser = {
                name: req.body.name,
                email: req.body.email,
                password: hash
              }

              saveUser(req, res, newUser)
            })
          }
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      })
  }
}

validateEmail = function(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

saveUser = function (req, res, objUser) {
  // console.log(objUser);
  let newUser = new Users (objUser)

  //nanti masukin token jwt
  newUser.save((err, user) => {
    if(err){
      res.status(500).json({
        message: err
      })
    }else{
      res.status(201).json({
        message: `User has Succesfully added`,
        user: user
      })
    }
  })
}