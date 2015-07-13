'use strict';

var article = require('../models/model.js');
var bodyParser = require('body-parser');

app.get('/articles', function(req,res){
  console.log("test");
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
//view setup
app.set('views', path.join(__dirname, 'views'));
//view engine setup
app.set('view engine', 'jade');

//get request
app.get('/', function(req,res){
  res.render('index');
});
