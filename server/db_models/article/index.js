const mongoose = require('mongoose')
const Schema = mongoose.Schema
const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  labels: {
    type: Array,
    required: true,
  },
  gist: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

});
const Article = mongoose.model('Article', articleSchema)
// 默认关联到数据库的articles集合
module.exports=Article