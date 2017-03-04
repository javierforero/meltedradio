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
    '$sce',
     function ($scope, $rootScope, $auth, $location, User, Playlist,localStorageService, $uibModal, Song, ApiSync, $http,$sce) {

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
           if($scope.currentPlaylist) {

             Song.query({songId: ''},{playlistId: $scope.currentPlaylist.id}).then(function(songs){
                ApiSync.setSongs(songs);
             });
         }
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

       var setSearchResults = function(obj) {
         $scope.videos = obj;
       };

       $scope.getVideos = function () {

         if($scope.text) {


            $scope.setPlaylist(null);
            var searchText = encodeURIComponent($scope.text).replace(/%20/g, '+');
            var myUrl =  'https://www.googleapis.com/youtube/v3/'+
                         'search?part=snippet'+
                         '&type=video'+
                         '&q='+
                         searchText+
                         '&key='+
                         YOUTUBE_API_KEY;
           $http({
             method: 'GET',
             url: myUrl

           }).then(function(response){

             console.log(response.data.items);
             setSearchResults(response.data.items);

           },function(error){
             console.log(error);
           });
          }
       };

       $scope.getUrl = function(video) {
         return "//www.youtube.com/embed/"+video.id.videoId;
       };

       $scope.trustSrc = function(src) {
         return $sce.trustAsResourceUrl(src);
       };


    }]);
