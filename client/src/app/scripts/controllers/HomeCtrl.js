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
       $scope.currentSong = null;
       var player;

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
          $('div.playlist-content').removeClass('overflow');
           localStorageService.set('currentPlaylist', playlist);
           $scope.currentPlaylist =  localStorageService.get('currentPlaylist');

           if($scope.currentPlaylist) {

             Song.query({songId: ''},{playlistId: $scope.currentPlaylist.id}).then(function(songs){
                ApiSync.setSongs(songs);
             });
         }
       };

       $scope.getVideoSong = function(playlist, video) {

         $('ul#'+video.id.videoId).toggle("slow");

        var getVideoInfoUrl = 'https://www.googleapis.com/youtube/v3/videos?'+
                      'id='+
                      video.id.videoId+
                      '&key='+
                      $window.__env.apiKey+
                      '&part=snippet,contentDetails';
            $http({

              method: 'GET',
              url: getVideoInfoUrl

            }).then(function(results){

              addVideoToPlaylist(playlist,results.data.items[0]);

            },function(error){
              console.log(error);
            });
       };

       $scope.convertDuration = function(string) {

           var array = string.match(/(\d+)(?=[MHS])/ig)||[];
           var formatted = array.map(function(item){
             if(item.length<2) return '0'+item;
               return item;
           }).join(':');

           return formatted;

       };

      function addVideoToPlaylist(playlist, video) {
          $http({
            method: 'POST',
            url: 'http://localhost:3000/playlists/' + playlist.id +'/songs',
            data: {
              title: video.snippet.title,
              artist: video.snippet.description,
              url: video.id,
              duration: video.contentDetails.duration
            }
          }).then(
            function(results){
              ApiSync.setSongs(results.data);
             },
             function(error){
               console.log(error);
           });
       }

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

       $scope.onPlayerReady = function(event) {
         event.target.playVideo();
       };

       $scope.onPlayerStateChange = function(event) {

       };

       function stopVideo() {

         player.stopVideo();
       }

       $scope.play = function() {
           var vidHeight = $('div.video').height();
           var vidWidth = $('div.video').width();

           player = new YT.Player('iframe-utube-player', {
             height: vidHeight,
             width:  vidWidth,
             videoId: $scope.songs()[0].url,
             events: {
               'onReady': $scope.onPlayerReady,
               'onStateChange': $scope.onPlayerStateChange
             }
           });


       };


    }]);
