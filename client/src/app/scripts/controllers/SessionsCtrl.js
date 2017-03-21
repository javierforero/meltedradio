'use strict';

/**
 * @ngdoc function
 * @name meltedRadioApp.controller:UserSessionsCtrl
 * @description
 * # UserSessionsCtrl
 * Controller of the meltedRadio
 */
angular.module('meltedRadio')
  .controller('SessionsCtrl', [
    '$scope',
    '$auth',
    '$rootScope',
    '$location',
    'User',
    'Playlist',
    'localStorageService',
    function($scope, $auth, $rootScope, $location, User, Playlist, localStorageService){


       var setUser = function(obj) {
          localStorageService.set('currentUser', obj);
       };


      $scope.submitLogin = function(loginForm) {
        $auth.submitLogin(loginForm).then(function(user) {

                setUser(user);
        });
      };

      $rootScope.$on('auth:login-success', function(ev, user) {

        $location.path('/users/'+ user.id);

      });
      $rootScope.$on('auth:login-error', function(ev, reason) {
        $scope.error = reason.errors[0];
      });

      User.query({playlistId: ''},{userId: 1}).then(function(results){
        $scope.users = results;
      });


      $scope.signOut = function() {
        $auth.signOut();
      };

      $rootScope.$on('auth:logout-success', function(ev) {
        $location.path('/');
      });
  }]);
