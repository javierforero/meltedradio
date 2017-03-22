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
    '$window',
     function ($scope, $rootScope, $auth, $location, User, Playlist,localStorageService, $uibModal, Song, ApiSync, $http,$sce, $window) {

       $scope.userSignedIn = localStorageService.get('currentUser');
       $scope.currentPlaylist = null;
       $scope.songs = null;

       (function changeNavColor(){
         $('nav.nav-bar').css('color','white');
         $('nav.nav-bar').css('background-color','black');
         $('ul.nav-menu a').css('color','white');
       })();

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
                console.log(songs);
                ApiSync.setSongs(songs);
             });
         }
       };

       $scope.addSong = function(playlist, video) {

         $('ul#'+video.id.videoId).toggle("slow");

         $http({
           method: 'POST',
           url: 'http://localhost:3000/playlists/' + playlist.id +'/songs',
           data: {
             title: video.snippet.title,
             artist: video.snippet.description,
             url: video.id.videoId
           }
         }).then(
           function(results){
             ApiSync.setSongs(results.data);
            },
            function(error){
              console.log(error);
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
                         $window.__env.apiKey;
           $http({
             method: 'GET',
             url: myUrl

           }).then(function(response){
             console.log(response);
             setSearchResults(response.data.items);

           },function(error){
             console.log(error);
           });
          }
       };


       $scope.getUrl = function(video) {
         return "//www.youtube.com/embed/"+video.id.videoId+"?controls=2";
       };

       $scope.trustSrc = function(src) {
         return $sce.trustAsResourceUrl(src);
       };

       $scope.toggleMenu = function(videoId) {
         $('ul#'+videoId).toggle("slow");
       };


    }]);
