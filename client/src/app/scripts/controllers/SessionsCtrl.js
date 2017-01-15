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
    '$log',
    function($scope, $auth, $rootScope, $location, $log){


      $scope.submitLogin = function(loginForm) {
        $auth.submitLogin(loginForm);
      };

      $rootScope.$on('auth:login-success', function(ev, user) {
        $scope.user = user;
        $location.path('/home');
      });
      $rootScope.$on('auth:login-error', function(ev, reason) {
        $scope.error = reason.errors[0];
      });
  }]);
