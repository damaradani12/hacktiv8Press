const jwt = require('jsonwebtoken')
const Users = require('../models/users.model')
const pwdtoken = process.env.pwdtoken

module.exports = {
  loginAuth: function(req, res, next){  
    if(req.headers.token){
      let token = req.headers.token
      jwt.verify(token, pwdtoken, function(err, decoded) {
        if(err){
          res.status(500).json({
            message: 'token is invalid'
          })
        }else{
          //cek id dan email di db user ada belum
          cekEmail(req, res, next, decoded)
        }
      });
    }else{
      res.status(403).json({
        message: 'U need to Login'
      })
    }
  } //,
  // tokenCheck: function (req, res) {
  //   if(req.headers.token){
  //     let token = req.headers.token
  //     jwt.verify(token, pwdtoken, function(err, decoded) {
  //       if(err){
  //         res.status(500).json({
  //           message: 'token is invalid'
  //         })
  //       }else{
  //         User.findOne({_id:decoded.id, email:decoded.email})
  //           .then(users =>{
  //             if(!users){
  //               res.status(401).json({
  //                message: "Token invalid",
  //                 states: false
  //               }) 
  //             }else{
  //               res.status(200).json({
  //                 message: "Token is valid",
  //                 states: true,
  //                 user: users
  //               }) 
  //             }
  //           })
  //           .catch(err => {
  //             res.status(500).json({
  //               message: err
  //             })
  //           })
  //             }
  //     });
  //   }else{
  //     res.status(403).json({
  //       message: 'U need to Login'
  //     })
  //   }
  // }
}


function cekEmail(req, res, next, decoded){
  Users.findOne({_id:decoded.id, email:decoded.email})
    .then(user =>{
      if (!user) {
        // console.log('user dan email ga ada di data user');
        res.status(401).json({
          message: "Anda harus Login"
        })
      } else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
}
