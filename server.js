'use strict'
//application setup
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

app.use(express.static(path.join(__dirname, '/public')));
//view setup
app.set('views', path.join(__dirname, 'views'));

var articleSchema = mongoose.Schema({
  title : String,
  blog : String
});
var article = mongoose.model('article', articleSchema);

app.get('/articles',function(req,res){
  mongoose.model('article').find(function(err,users){
    res.send(article);
    console.log(article);
  });
});
app.post('/articles',function(req,res){
  article.create({
    title : req.body.text,
    blog :req.body.text,
    done : false
  },function(err,article){
    article.find(function(err,article){
      res.json(article);
    });
  });
});
app.delete('/articles:article_id',function(req,res){
  article.remove({
    _id : req.params.article_id
  });
  article.find(function(err,article){
    res.json(article);
  });
});
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
