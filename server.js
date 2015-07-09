'use strict'
//application setup
var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose')
var port = 3000;

app.use(express.static(path.join(__dirname, '/public')));
//view setup
app.set('views', path.join(__dirname, 'views'));

//view engine setup
app.set('view engine', 'jade');

//get request
app.get('/', function(req,res){
  res.render('index');
});

//app listener
app.listen(port, function(){
  console.log('server running on ' + port);
});
