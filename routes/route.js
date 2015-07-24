'use strict'

var article = require('../models/model.js');
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(bodyParser.json());

  app.get('/articles', function(req,res){
    article.find({},function(err,article) {
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

  app.put('/articles/:article_id',function(req,res){
    console.log(req.body);
   article.findOne({_id : req.params.article_id} , function (err, article){
     article.title = req.body.title;
     article.blog = req.body.blog;
     article.save();
    });
   article.find(function(err,article) {
     res.json(article);
   });
  });
}
