/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { HomeController } from './scripts/controllers/home.controller';
import { NavController } from './scripts/controllers/nav.controller';
import { RegistrationsController } from './scripts/controllers/registrations.controller';
import { SessionsController } from './scripts/controllers/sessions.controller';
import { BubbleController } from './scripts/controllers/bubble.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { YouTubeApiKeyService } from '../app/components/apikeys/youTubeApiKey.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

var devApiUrl = 'http://localhost:3000';
var prodApiUrl = 'https://meltedradio.herokuapp.com';
var backendApi = devApiUrl;

angular.module('meltedRadio', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'ng-token-auth', 'rails', 'LocalStorageModule'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .config(function($authProvider) {
     $authProvider.configure({
         apiUrl: backendApi
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
  .service('YouTubeApiKeyService', YouTubeApiKeyService)
  .controller('MainController', MainController)
  .controller('HomeController', HomeController)
  .controller('NavController', NavController)
  .controller('RegistrationsController', RegistrationsController)
  .controller('SessionsController', SessionsController)
  .controller('BubbleController', BubbleController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective)
  .directive('onFinishRender', function($timeout){
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit(attr.onFinishRender);
          });
        }
      }
   };

  })
  .factory('ApiSync', function(){
    var ApiSync = {};

    ApiSync.setPlaylists = function(obj) {
         ApiSync.playlists = obj;
    };

    ApiSync.setSongs = function(obj) {
        ApiSync.songs = obj;
    };

    ApiSync.getPlaylists = function() {
      return ApiSync.playlists;
    };

    ApiSync.getSongs = function() {
      return ApiSync.songs;
    };

    return ApiSync;
  })
  .factory('Playlist', function(railsResourceFactory) {
    return railsResourceFactory({
      url: backendApi +'/playlists',
      name: 'playlist'
    });
  })
  .factory('User',function(railsResourceFactory){
    return railsResourceFactory({
      url: backendApi +'/users/{{userId}}/playlists',
      name: 'user'
    });
  })
  .factory('Song', function(railsResourceFactory){
    return railsResourceFactory({
      url: backendApi + '/playlists/{{playlistId}}/songs',
      name: 'song'
    });
  });
