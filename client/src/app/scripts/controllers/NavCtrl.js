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
    '$http',
     function ($scope, $rootScope, $auth, $location, localStorageService, $http) {

       function changeNavColor(){
         console.log('yooo');
         $('nav.nav-bar').css('color','black');
         $('nav.nav-bar').css('background-color','white');
         $('ul.nav-menu a').css('color','black');
       }

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
         $scope.userSignedIn = null;
         localStorageService.remove('currentUser');
         changeNavColor();
         $location.path('/');
       });

   }]);
