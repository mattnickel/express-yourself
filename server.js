'use strict'
//application setup
var express = require('express');
var path = require('path');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));
//view setup
app.set('views', path.join(__dirname, 'views'));

//view engine setup
app.set('view engine', 'jade');

app.post('/index', function(req,res){
  console.log(req.body);
  res.json(req.body);
});

app.get('/index',function(req,res){
  var title = ["one","two"];
  res.json(title);
  console.log(title);
});
app.delete('/index',function(req,res){
  req.body.remove;
  res.json("That sucker has been destroyed");
});
app.put('/index',function(req,res){
  req.body.find;
  req.body.remove;
  req.body.save;
  res.json("Changed");
});
app.listen(port, function(){
  console.log('server running on ' + port);
});
