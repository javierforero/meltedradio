'use strict';

/**
 * @ngdoc function
 * @name meltedRadioApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the meltedRadio
 */
angular.module('meltedRadio')
  .controller('HomeCtrl', [
    '$scope',
    '$rootScope',
    '$auth',
    '$location',
    'User',
    'Playlist',
     function ($scope, $rootScope, $auth, $location, User, Playlist) {

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
