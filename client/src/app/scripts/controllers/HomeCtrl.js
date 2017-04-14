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
       $scope.isPlaying =  false;
       var player;
       var vidArray = [];
       var searchCurrentSong = null;

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
         $scope.modalInstance = $uibModal.open({
           templateUrl: '/app/views/addplaylist.html',
           scope: $scope,
           controller: 'HomeCtrl'
         });
       };

       $scope.submit = function() {
         if($scope.text) {

          $http({
            method: 'POST',
            url: 'http://localhost:3000/users/' + $scope.userSignedIn.id + '/playlists',
            data: {
              title: $scope.text
            }
          }).then(function(results){

            ApiSync.setPlaylists(results.data);
            $scope.setPlaylist(results.data[results.data.length - 1]);

          }, function(error) {
            console.log(error);
          });

           $scope.text = '';
           $scope.modalInstance.close();
         }
       };

       $scope.dismiss = function() {
         $scope.modalInstance.dismiss('cancel');
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
         return "http://www.youtube.com/embed/"+video.id.videoId+"?enablejsapi=1";
       };

       $scope.trustSrc = function(src) {
         return $sce.trustAsResourceUrl(src);
       };

       $scope.toggleMenu = function(videoId) {
         $('ul#'+videoId).toggle("slow");
       };


       function createPlayer() {

           for(var i = 0; i < $scope.videos.length; i++) {

             var id = 'vid-'+(i+1);
             var vidPlayerObj = new YT.Player(id, {
                events: {
                  'onStateChange': $scope.onPlayerStateChange
                }
              });
              vidArray.push(vidPlayerObj);
           }

       }
       $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {

          createPlayer();
       });
       $scope.onPlayerReady = function(event) {

         event.target.playVideo();
       };

       $scope.onPlayerStateChange = function(event) {

           if(event.data == YT.PlayerState.PLAYING) {
             searchVidLogic(event.target);
           }

       };

       function searchVidLogic(video) {
         if($scope.currentSong && $scope.isPlaying) {
           $scope.pause();
         }
         if(searchCurrentSong) {
           searchCurrentSong.pauseVideo();
           searchCurrentSong = video;
         } else {
           searchCurrentSong  = video;
         }

       }

       function stopVideo() {

         player.stopVideo();
       }

       $scope.play = function(song) {

           var vidHeight = $('div.video').height();
           var vidWidth = $('div.video').width();
           var vidPlay = song || $scope.songs()[0]

           if(searchCurrentSong) {
             searchCurrentSong.stopVideo();
             searchCurrentSong = null;
           }

           if(!$scope.currentSong) {

            player = new YT.Player('iframe-utube-player', {
              height: vidHeight,
              width:  vidWidth,
              videoId: vidPlay.url,
              events: {
                'onReady': $scope.onPlayerReady
              }
            });
          } else if($scope.currentSong && !song) {
               player.playVideo();
          } else {
             player.loadVideoById({
               'videoId': vidPlay.url
             });
          }

          $scope.currentSong = vidPlay;
          $scope.isPlaying = true;
       };

       $scope.pause = function() {

          $scope.isPlaying = false;
          player.pauseVideo();
       };

       function getSongIndex(song) {
         return songs().indexOf(song);
       }

       $scope.next = function() {

         var songsArray = $scope.songs();
         var lastIndex = songsArray.length - 1;
         var indexOfCurrentSong = songsArray.indexOf($scope.currentSong);
         var songToPlay = null;

         if($scope.currentSong) {
           if(indexOfCurrentSong < lastIndex ) {

             songToPlay  = songsArray[indexOfCurrentSong + 1];

            } else {

              indexOfCurrentSong = 0;
              songToPlay  = songsArray[indexOfCurrentSong];
            }
         } else {
           songToPlay  = songsArray[0];
         }

         $scope.play(songToPlay);
      };

      $scope.previous = function() {

        var songsArray = $scope.songs();
        var lastIndex = songsArray.length - 1;
        var indexOfCurrentSong = songsArray.indexOf($scope.currentSong);
        var songToPlay = null;

        if($scope.currentSong) {
          if(indexOfCurrentSong > 0 ) {

            songToPlay  = songsArray[indexOfCurrentSong - 1];

           } else {

             indexOfCurrentSong = lastIndex;
             songToPlay  = songsArray[indexOfCurrentSong];
           }
        } else {
          songToPlay  = songsArray[lastIndex];
        }

        $scope.play(songToPlay);
     };

    }]);
