'user strict';

require('angular/angular');

var blogPosting = angular.module('blogPosting', []);

require("./BlogPost/blogPosting.js")(blogPosting);
