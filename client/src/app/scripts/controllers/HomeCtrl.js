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
    'ApiSync',
     function ($scope, $rootScope, $auth, $location, User, Playlist,localStorageService, $uibModal, ApiSync) {

       $scope.userSignedIn = localStorageService.get('currentUser');
       $scope.currentPlaylist = null;

       User.query({playlistId: ''},{userId: $scope.userSignedIn.id}).then(function(results){
         ApiSync.setPlaylists(results);
       });

       $scope.playlists = function() {
         return ApiSync.getPlaylists();
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
       };

       $scope.newSong = function() {
         $uibModal.open({
           templateUrl: '/app/views/addsong.html',
           controller: 'AddSongCtrl as song'
         });
       };


    }]);
