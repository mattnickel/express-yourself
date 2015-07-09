'use strict'
//application setup
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/blogs')
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
//view setup
app.set('views', path.join(__dirname, 'views'));

var articleSchema= mongoose.Schema ({
  title: String,
  blog: String
});

var article = mongoose.model('article',articleSchema);

//article get & post & delete
app.get('/articles', function(req,res){
  article.find(function(err,article) {
    res.json(article);
  });
});

app.post('/articles', function(req,res){
  console.log("Inside Post");
  console.log(req.body);
  var postArticleData = JSON.parse(JSON.stringify(req.body));
  var postArticle = new article(postArticleData);
  console.log(postArticle);
  console.log(postArticleData);
  postArticle.save(function(err,postArticle){
    if (err){
      console.log("Bummer");
    }else {
      console.log("Cool");
      article.find(function(err,article) {
        res.json(article);
      });
    }
  });
});

app.delete('/articles:article_id', function(req,res){
  article.remove({
    _id : req.params.article_id
  });
  article.find(function(err,article) {
    res.json(article);
  });
});
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
