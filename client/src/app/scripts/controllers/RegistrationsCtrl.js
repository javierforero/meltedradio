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
    'localStorageService',
    function($scope, $auth, $rootScope, $location, localStorageService) {

      var changeNavColor = function() {
         $('nav.nav-bar').addClass('black-nav');
         $('ul.nav-menu a').css('color','white');
      };

      var setUser = function(obj) {
         localStorageService.set('currentUser', obj);
      };

      $scope.submitRegistration = function(registrationForm) {

        $auth.submitRegistration(registrationForm)
          .then(function() {

            $auth.submitLogin({
              email: registrationForm.email,
              password: registrationForm.password
            });
          });
      };


      $rootScope.$on('auth:login-success', function(ev, user) {

        setUser(user);
        changeNavColor();
        $location.path('/users/'+ user.id);

      });


  }]);
