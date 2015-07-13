'use strict'
//application setup
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/blogs')
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
//app listener
app.listen(port, function(){
  console.log('server running on ' + port);
});
