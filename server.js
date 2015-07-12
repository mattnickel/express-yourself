'use strict'
//application setup
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var port = 3000;
var routes = require('./routes/routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/blogs');

app.use(express.static(path.join(__dirname, '/public')));
//view setup
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {  // '/' is GET route, then callback function for get
  res.render('index');
});
//view engine setup
app.set('view engine', 'jade');

app.listen(port, function(){
  console.log('server running on ' + port);
});
