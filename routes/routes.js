'use strict'
var article = require('../models/article.js');
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(bodyParser.json());

  app.post('/index', function(req,res){
    console.log(req.body);
    res.json(req.body);
  });

  app.get('/articles', function(req,res){
    article.find(function(err,article) {
      if (err){
        console.log("Not Getting Anywhere");
      }else {
        res.json(article);
      }
    });
  });

  app.post('/articles', function(req,res){
    var postArticleData = JSON.parse(JSON.stringify(req.body));
    var postArticle = new article(postArticleData);
    postArticle.save(function(err,postArticle){
      if (err){
        console.log("Not Posted");
      }else {
        console.log("Posted");
        article.find(function(err, article){
          if (err){
            console.log("Couldn't find any articles");
          }else {
            res.json(article);
          }
        });
      }
    });
  });

  app.delete('/articles/:article_id',function(req,res){
    article.findByIdAndRemove(req.params.article_id, function(err) {
      if (err){
        res.send(err);
        console.log ("Not Deleted");
      }else {
        res.json({ message: 'Article removed from the database!'
        });
      }
    });
  });

  app.put('/articles/:article_id', function(req,res){
    article.findById(req.params.article_id, function (err, article) {
      if (err){
        console.log ("broken Find");
        res.send(err);
      }else {
        console.log("Article Found");
        article.title = req.body.title;
        article.blog = req.body.blog;
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
}
