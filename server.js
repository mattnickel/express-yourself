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
app.put('/articles/:article_id',function(req,res){
 article.findOne(req.params.article_id, function (err, article){
   article.title = req.body.title;
   article.blog = req.body.blog;
   article.save();
  });
 article.find(function(err,article) {
   res.json(article);
 });
});

// app.put('/articles:article_id', function(req,res){
//   article.findById(req.params.article_id, function(err, article) {
//     article.title = req.body.title;
//     article.blog = req.body.blog;
//     console.log(article.title = req.body.title); //it works but doesn't save
//     console.log("this is inside blog"+ article.blog);//works but doesn't save
//     article.save(function(err) {
//       if (err)
//         res.send(err);
//         res.json({ message: 'article updated!' });
//     });
//   });
// });


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
