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
    'localStorageService',
     function ($scope, $rootScope, $auth, $location, User, Playlist,localStorageService) {

       $scope.userSignedIn = localStorageService.get('currentUser');

       User.query({playlistId: ''},{userId: $scope.userSignedIn.id}).then(function(results){
         $scope.playlists = results;
       });
       
    }]);
