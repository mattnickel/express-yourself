'use strict';

var mongoose = require('mongoose');

var articleSchema= mongoose.Schema ({
  title: String,
  blog: String
});

module.exports = mongoose.model('article', articleSchema);
