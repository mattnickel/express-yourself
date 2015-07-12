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

//article get & post & delete & put
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
      console.log("Posted");
      article.find(function(err, article){
        res.json(article);
      });
    }
  });
});

app.delete('/articles/:article_id',function(req,res){
  console.log ("Inside Delete");
  article.findByIdAndRemove(req.params.article_id, function(err) {
    if (err){
      res.send(err);
      console.log ("broken");
    }else {
      res.json({ message: 'Article removed from the database!'
      });
    }
  });
});

app.put('/articles/:article_id', function(req,res){
  console.log("Inside PUT");
  article.findById(req.params.article_id, function (err, article) {
    if (err){
      console.log ("broken Find");
      res.send(err);
    }else {
      console.log("Article Found");
      res.json({ message: 'Article Found'});
      article.title = req.body.title;
      article.blog = req.body.blog;
      console.log("Still ok");
      article.save(function(err){
        if (err) {
          res.send(err);
          console.log ("Yikes:save error")
        }else {
          console.log("Saved!");
          res.json(article);
        }
      });
    }
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
