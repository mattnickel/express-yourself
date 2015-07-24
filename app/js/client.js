'use strict';

require ('angular/angular');
require ('angular-route')

var blogPost = angular.module('blogPost', ['ngRoute']);

//services
require ('./services/resourceService.js')(blogPost)

//controlers
require ('./blogPost/controller.js')(blogPost);
// require ('./settings/controllers/controller.js')()



//directives
require ('./settings/directives/newSettingDirective')(blogPost);

blogPost.config([$routeProvider], function($routeProvider) {
  $routeProvider
  .when('/settings', {
    templateurl:'/templates/settings/directives/new_settings_template.html',
    controller: '/settings/controllers/settingsController.js'
  })
})
