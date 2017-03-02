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
    'Song',
    'ApiSync',
    '$http',
     function ($scope, $rootScope, $auth, $location, User, Playlist,localStorageService, $uibModal, Song, ApiSync, $http) {

       $scope.userSignedIn = localStorageService.get('currentUser');
       $scope.currentPlaylist = null;
       $scope.songs = null;

       User.query({playlistId: ''},{userId: $scope.userSignedIn.id}).then(function(results){
         ApiSync.setPlaylists(results);
       });


       $scope.playlists = function() {
         return ApiSync.getPlaylists();
       };

       $scope.songs = function() {
         return  ApiSync.getSongs();
       };

       $scope.newPlaylist = function() {
         $uibModal.open({
           templateUrl: '/app/views/addplaylist.html',
           controller: 'AddPlaylistCtrl as play'
         });
       };

       $scope.setPlaylist = function(playlist) {
           localStorageService.set('currentPlaylist', playlist);
           $scope.currentPlaylist =  localStorageService.get('currentPlaylist');

           Song.query({songId: ''},{playlistId: $scope.currentPlaylist.id}).then(function(songs){
              ApiSync.setSongs(songs);
           });
       };

       $scope.newSong = function() {
         $uibModal.open({
           templateUrl: '/app/views/addsong.html',
           controller: 'AddSongCtrl as song'
         });
       };

       $scope.deleteSong = function(song) {

          $http({
            method: 'DELETE',
            url: 'http://localhost:3000/playlists/' + $scope.currentPlaylist.id +'/songs/'+ song.id
          }).then(function(response){

            $scope.setPlaylist(response.data.current_playlist);
          }, function(error){
            console.log(error);
          });
       };


    }]);
