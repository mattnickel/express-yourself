'user strict';

require('angular/angular');
require('angular-route');

var blogPosting = angular.module('blogPosting', ['ngRoute']);

require("./BlogPost/postingController.js")(blogPosting);
