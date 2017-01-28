/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('meltedRadio', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'ng-token-auth', 'rails', 'LocalStorageModule'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .config(function($authProvider) {
     $authProvider.configure({
         apiUrl: 'http://localhost:3000'
     });
   })
   .config(function(localStorageServiceProvider){
     localStorageServiceProvider.setPrefix('meltedRadio');
   })
   .config(function(railsSerializerProvider){
     railsSerializerProvider.underscore(angular.identity).camelize(angular.identity);
   })
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .controller('MainController', MainController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective)
  .factory('ApiSync', function(){
    var ApiSync = {};

    ApiSync.setPlaylists = function(obj) {
         ApiSync.playlists = obj;
    };

    ApiSync.getPlaylists = function() {
      return ApiSync.playlists;
    };

    return ApiSync;
  })
  .factory('Playlist', railsResourceFactory => {
    return railsResourceFactory({
      url: 'http://localhost:3000/playlists',
      name: 'playlist'
    });
  })
  .factory('User',function(railsResourceFactory){
    return railsResourceFactory({
      url: 'http://localhost:3000/users/{{userId}}/playlists',
      name: 'user'
    });
  });
