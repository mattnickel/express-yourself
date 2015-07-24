'use strict';

modile.exports = function(app){
  app.directive('newSettingDirective', function(){
    return {
      restrict:'AC',
      templateUrl: '../../templates/settings/directives/new_settings_templates.html'
    }
  })
}
