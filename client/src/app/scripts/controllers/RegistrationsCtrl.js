'use strict';

/**
 * @ngdoc function
 * @name meltedRadioApp.controller:RegistrationsCtrl
 * @description
 * # RegistrationsCtrl
 * Controller of the meltedRadioApp
 */
angular.module('meltedRadio')
  .controller('RegistrationsCtrl', ['$scope', '$location','$auth', function($scope, $location, $auth) {
    $scope.handleRegBtnClick = function() {
      console.log('handleregbtn clicked!');
       $auth.submitRegistration($scope.registrationForm)
         .then(function(resp) {
           alert("success!");
           console.log(resp, "in the then function");
         });
        //  .catch(function(resp) {
        //    alert("sign up failed!");
        //    console.log(resp);
        //  });
    };
  }]);


  // angular.module('fakeLunchHubApp')
  // .controller('UserRegistrationsCtrl', ['$scope', '$location', '$auth', function ($scope, $location, $auth) {
  //   $scope.handleRegBtnClick = function() {
  //     $auth.submitRegistration($scope.registrationForm)
  //       .then(function() {
  //         $auth.submitLogin({
  //           email: $scope.registrationForm.email,
  //           password: $scope.registrationForm.password
  //         });
  //       });
  //   };
  // }]);
