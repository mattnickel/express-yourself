'use strict';

module.exports = function(app){

  app.controller('postController', ['$scope', '$http', function ($scope, $http){
    var refresh = function (){
      $http.get('/articles').success(function(response){
        console.log ("I did the getting");
        console.log (response)
        $scope.posts = response;
        $scope.post = " ";
      });
    };
    refresh();

    $scope.submitForm = function(article){
      console.log(article);
      $http.post('/articles', article).success(function(response){
        refresh();
      });
    };

    $scope.destroy = function(id){
      console.log(id);
      $http.delete('/articles/' + id).success(function(response){
        refresh();
      });
    };

    $scope.edit = function(id, data, callback){
      article.editing = true;
      console.log ("It's Gone");
      console.log (article);
    };
  }]);
};

