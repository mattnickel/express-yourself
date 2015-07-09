'use strict'
//application setup
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/blogs')
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
//view setup
app.set('views', path.join(__dirname, 'views'));


var articleSchema= mongoose.Schema ({
  title: String,
  blog: String,
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
  postArticle.save(function(err,postArticle){
    if (err){
      console.log("Bummer");
    }else {
      console.log("Cool");
      res.json(postArticle);
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

//get request
app.get('/', function(req,res){
  res.render('index');
});
//app listener
app.listen(port, function(){
  console.log('server running on ' + port);
});
