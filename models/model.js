'use strict';
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var articleSchema= mongoose.Schema ({
  title: String,
  blog: String
});
var article = mongoose.model('article',articleSchema);
