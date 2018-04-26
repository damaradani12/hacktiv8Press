const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema({
  title: String,
  content: String,
  category: String,
  author: {type:Schema.Types.ObjectId, ref:'User'}
},{
  timestamps: true
})

let Article = mongoose.model('Article', articleSchema)
module.exports = Article