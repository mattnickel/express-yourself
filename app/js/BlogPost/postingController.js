'use strict';
module.exports = function(app){
  app.controller('postingController', ['$scope','$http',function($scope, $http){
    var refresh = function(){
      $http.get('/articles').success(function(response){
        console.log('Got some data');
        console.log(response);
        $scope.posts = response;
        $scope.post ='';
      });
    };
    refresh();
      $scope.destroy = function(id) {
    		console.log(id);
    		$http.delete('/articles/' + id).success(function(response) {
    			refresh();
    		});
    	};
      refresh();
      $scope.newArticle = function(article){
        console.log("This is what you pass in "+ article);
        $http.post('/articles', article).success(function(response){
          refresh();
        });
      };
      refresh();
      $scope.edit = function (post) {
          post.editing = true;
          console.log('edit post'+ post);
      };
      $scope.update = function (post){
        $http.put('/articles/' + post._id, post).success(function(response){
          post.edit = false;
        });
      }
      refresh();
  }]);
};
