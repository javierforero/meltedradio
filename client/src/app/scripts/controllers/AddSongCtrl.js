'use strict';

/**
 * @ngdoc function
 * @name meltedRadioApp.controller:AddSongCtrl
 * @description
 * # AddSongCtrl
 * Controller of the meltedRadio
 */
angular.module('meltedRadio')
  .controller('AddSongCtrl', [
    '$scope',
    '$rootScope',
    '$auth',
    '$location',
    'User',
    'Playlist',
    'localStorageService',
    '$uibModalInstance',
    '$http',
    'ApiSync',
     function ($scope, $rootScope, $auth, $location, User, Playlist,localStorageService, $uibModalInstance, $http, ApiSync) {
       $scope.currentPlaylist = localStorageService.get('currentPlaylist');
       $scope.submit = function() {
         if($scope.songTitle && $scope.songArtist && $scope.songUrl) {

           $http({
             method: 'POST',
             url: 'http://localhost:3000/playlists/' + $scope.currentPlaylist.id +'/songs',
             data: {
               title: $scope.songTitle,
               artist: $scope.songArtist,
               url: $scope.songUrl
             }
           }).then(function(results){
             ApiSync.setSongs(results.data);
           }, function(error){
             console.log(error);
           });
         }

         $scope.newSong = '';
         $uibModalInstance.close();
       };
       $scope.dismiss = function() {
         $uibModalInstance.dismiss('cancel');
       };

    }]);
