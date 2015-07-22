'use strict';
module.exports = function(app){
  app.controller('postingController',['$scope','$http',function($scope,$http){
    var refresh = function(){

      $http.get('/route').success(function(response){
        console.log('random shit data');
        $scope.posts = response;
        $scope.post ='';
      });
    };
    refresh();
      $scope.destroy = function(id) {
    		console.log(id);
    		$http.delete('/route/' + id).success(function(response) {
    			refresh();
    		});
    	}
  }]);
};
