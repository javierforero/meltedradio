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
    function($scope, $auth) {
    $scope.handleRegBtnClick = function() {
       $auth.submitRegistration($scope.registrationForm)
         .then(function(resp) {
           alert("success!");
           console(resp);
         })
         .catch(function(resp) {
           alert("sign up failed!");
           console.log(resp);
         });
    };
  }]);
