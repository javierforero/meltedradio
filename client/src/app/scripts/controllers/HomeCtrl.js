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
    '$uibModal',
     function ($scope, $rootScope, $auth, $location, User, Playlist,localStorageService, $uibModal) {

       $scope.userSignedIn = localStorageService.get('currentUser');

       User.query({playlistId: ''},{userId: $scope.userSignedIn.id}).then(function(results){
         $scope.playlists = results;
       });

       $scope.open = function() {
         $uibModal.open({
           templateUrl: '/app/views/addplaylist.html',
           controller: 'AddPlaylistCtrl as play'
         });
       };


    }]);
