const jwt = require('jsonwebtoken')
const Articles = require('../models/articles.model')
const pwdtoken = process.env.pwdtoken

module.exports = {
  getArticles: function (req, res) {
    Articles.find()
      .populate('author')
      .exec()
      .then(data => {
        res.status(200).json({
          message: 'Show All Articles',
          articles: data
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      })
  },
  getOneArticle: function (req, res) {
    let articleId = req.params.id
    Articles.findOne({_id: articleId})
      .populate('author')
      .exec()
      .then(data => {
        res.status(200).json({
          message: 'Show One Article',
          article: data
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      })
  },
  getByAuthor: function (req, res) {
    let authorId = req.params.id
    Articles.find({author: authorId})
      .populate('author')
      .exec()
      .then(data => {
        res.status(200).json({
          message: 'Show All Article by Author',
          articles: data
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      })
  },
  getByCategory: function (req, res) {
    let category = req.params.name
    Articles.find({category})
      .populate('author')
      .exec()
      .then(data => {
        res.status(200).json({
          message: 'Show All Article by Category',
          articles: data
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      })
  },
  create: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, pwdtoken)
    let user_id = decoded.id

    let newArticle = new Articles({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: user_id
    })
    
    newArticle.save((err, article) => {
      console.log('Dalem sini?', article)
      if (err) {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      } else {
        res.status(201).json({
          message: `Article has Succesfully created`,
          article
        })
      }
    })
  },
  update: function (req, res) {
    let articleId = req.params.id
    let title = req.body.title
    let content = req.body.content
    let category = req.body.category

    Articles.update({_id: articleId}, {$set: {title, content, category}})
      .then(result => {
        res.status(200).json({
          message: "Edit Article Success",
          result
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "error",
          err
        })
      })
  },
  deletes: function (req, res) {
    if (req.params.id) {
      let articleId = req.params.id

      Articles.remove({_id: articleId})
        .then(result => {
          res.status(200).json({
            message: "Delete Blog Success",
            result
          })
        })
        .catch(err => {
          res.status(500).json({
            message: "error",
            err
          })
        })
    } else {
      res.status(406).json({
        message: "Article Id is undefined"
      })
    }
  }
}