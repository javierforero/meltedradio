'use strict';

/**
 * @ngdoc function
 * @name meltedRadioApp.controller:RegistrationsCtrl
 * @description
 * # RegistrationsCtrl
 * Controller of the meltedRadioApp
 */
angular.module('meltedRadio')
  .controller('RegistrationsCtrl', [
    '$scope',
    '$auth',
    '$rootScope',
    '$location',
    function($scope, $auth, $rootScope, $location) {

      $scope.submitRegistration = function(registrationForm) {

        $auth.submitRegistration(registrationForm)
          .then(function() {

            $auth.submitLogin({
              email: registrationForm.email,
              password: registrationForm.password
            });
          });
      };

      $rootScope.$on('auth:registration-email-success', function(ev, message) {
        $location.path('/home');
      });


  }]);
