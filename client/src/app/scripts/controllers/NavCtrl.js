'use strict';

/**
 * @ngdoc function
 * @name meltedRadioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the meltedRadio
 */
angular.module('meltedRadio')
  .controller('NavCtrl', [
    '$scope',
    '$rootScope',
    '$auth',
    '$location',
    'localStorageService',
     function ($scope, $rootScope, $auth, $location, localStorageService) {

       this.pageRedirect = function() {

         if($rootScope.user.id) {
           $location.path('/users/'+ $rootScope.user.id);
           
         } else {
           $location.path('/');
         }
       };

       $scope.signOut = function() {
         $auth.signOut();
       };

       $rootScope.$on('auth:logout-success', function(ev) {

         localStorageService.remove('currentUser');
         $location.path('/');
       });
   }]);