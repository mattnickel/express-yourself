'use strict';
var mongoose = require('mongoose');

var articleSchema= mongoose.Schema ({
  title: String,
  blog: String
});
var article = mongoose.model('article',articleSchema);

module.exports = article;
