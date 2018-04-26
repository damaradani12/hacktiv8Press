const jwt = require('jsonwebtoken')
const Articles = require('../models/articles.model')
const pwdtoken = process.env.pwdtoken

module.exports = {
  getArticles: function (req, res) {
    Articles.find()
      .exec()
      .then(data => {
        res.status(200).json({
          message: 'Show All Articles',
          article: data
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Something wnet wrong',
          err
        })
      })
  },
  getOneArticle: function (req, res) {

  },
  getByAuthor: function (req, res) {

  },
  getByCategory: function (req, res) {

  },
  create: function (req, res) {

  },
  update: function (req, res) {

  },
  deletes: function (req, res) {

  }
}