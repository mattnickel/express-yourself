'use strict'

var Article = require('../models/article.js');
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(bodyParser.json());


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
