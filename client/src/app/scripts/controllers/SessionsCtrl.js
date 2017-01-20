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
    function($scope, $auth, $rootScope, $location){
       var setUser = function(obj) {
           $window.sessionStorage.currentUser = obj;
       };
      $scope.submitLogin = function(loginForm) {
        $auth.submitLogin(loginForm).then(function(user) {
                setUser(user);
        });
      };

      $rootScope.$on('auth:login-success', function(ev, user) {
        $location.path('/home');

      });
      $rootScope.$on('auth:login-error', function(ev, reason) {
        $scope.error = reason.errors[0];
      });
  }]);
