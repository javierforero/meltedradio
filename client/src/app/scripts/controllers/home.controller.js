export class HomeController {
  constructor ($scope, $rootScope, $auth, $location, User, Playlist,localStorageService, $uibModal, Song, ApiSync, $http,$sce, $window, $log, YouTubeApiKeyService) {
    'ngInject';
    $scope.userSignedIn = localStorageService.get('currentUser');
    $scope.currentPlaylist = null;
    $scope.songs = null;
    $scope.currentSong = null;
    $scope.previousSong = null;
    $scope.isPlaying =  false;
    var player;
    var vidArray = [];
    var searchCurrentSong = null;
    var prodApiUrl = 'https://meltedradio.herokuapp.com/';
    var devApiUrl = 'http://localhost:3000/';

    (function changeNavColor(){
      angular.element('nav.nav-bar').css('color','white');
      angular.element('nav.nav-bar').css('background-color','black');
      angular.element('ul#desktop-nav-menu').css('background-color','black');
      angular.element('ul#mobile-nav-menu-black').css('background-color','black');
      angular.element('ul.nav-menu a').css('color','white');
    })();

    if($scope.userSignedIn) {

      User.query({playlistId: ''},{userId: $scope.userSignedIn.id}).then(function(results){
        ApiSync.setPlaylists(results);
      });
    }

    $scope.getCurrentPlaylist = function() {
      return $scope.currentPlaylist;
    }

    $scope.playlists = function() {
      return ApiSync.getPlaylists();
    };

    $scope.songs = function() {
      return  ApiSync.getSongs();
    };

    $scope.newPlaylist = function() {
      $scope.modalInstance = $uibModal.open({
        templateUrl: 'app/views/addplaylist.html',
        scope: $scope,
        controller: 'HomeController'
      });
    };

    $scope.submit = function() {
      if($scope.text) {

       $http({
         method: 'POST',
         url:  devApiUrl +'users/' + $scope.userSignedIn.id + '/playlists',
         data: {
           title: $scope.text
         }
       }).then(function(results){

         ApiSync.setPlaylists(results.data);
         $scope.setPlaylist(results.data[results.data.length - 1]);
       }, function(error) {
         $log(error);
       });

        $scope.text = '';
        $scope.modalInstance.close();
      }
    };

    $scope.dismiss = function() {
      $scope.modalInstance.dismiss('cancel');
    };

    $scope.setPlaylist = function(playlist) {

       angular.element('div.playlist-content').removeClass('overflow');
        localStorageService.set('currentPlaylist', playlist);
        $scope.currentPlaylist =  localStorageService.get('currentPlaylist');

        if($scope.currentPlaylist) {

          Song.query({songId: ''},{playlistId: $scope.currentPlaylist.id}).then(function(songs){

             ApiSync.setSongs(songs);
          });
      }
    };

    $scope.getVideoSong = function(playlist, video) {

      angular.element('ul#'+video.id.videoId).toggle("slow");

     var getVideoInfoUrl = 'https://www.googleapis.com/youtube/v3/videos?'+
                   'id='+
                   video.id.videoId+
                   '&key='+
                   YouTubeApiKeyService.apiKey()+
                   '&part=snippet,contentDetails';
         $http({

           method: 'GET',
           url: getVideoInfoUrl

         }).then(function(results){

           addVideoToPlaylist(playlist,results.data.items[0]);

         },function(error){
           $log(error);
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
         url: devApiUrl + 'playlists/' + playlist.id +'/songs',
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
            $log(error);
        });
    }

    $scope.deleteSong = function(song) {

       $http({
         method: 'DELETE',
         url: devApiUrl + 'playlists/' + $scope.currentPlaylist.id +'/songs/'+ song.id
       }).then(function(response){

         $scope.setPlaylist(response.data.current_playlist);
       }, function(error){
            $log(error);
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
                      YouTubeApiKeyService.apiKey();
        console.log(myUrl);
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
      return "//www.youtube.com/embed/"+video.id.videoId+"?enablejsapi=1";
    };

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    $scope.toggleMenu = function(videoId) {
      angular.element('ul#'+videoId).toggle("slow");
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

      if(searchCurrentSong && (searchCurrentSong !== video)) {
        searchCurrentSong.pauseVideo();
        searchCurrentSong = video;
      } else if(searchCurrentSong && (searchCurrentSong == video)) {
        searchCurrentSong.playVideo();
      } else {
        searchCurrentSong = video;
        searchCurrentSong.playVideo();
      }

    }

    function stopVideo() {

      player.stopVideo();
    }

    $scope.play = function(song) {

        var vidHeight = angular.element('div.video').height();
        var vidWidth = angular.element('div.video').width();
        var initialSong = $scope.currentSong || $scope.songs()[0];
        var vidPlay = song || initialSong;


        // stops player playing in search results when playing another song in playlist

        if(searchCurrentSong) {
          searchCurrentSong.stopVideo();
          searchCurrentSong = null;
        }
       // if there's no currentSong create youtube player
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

          $scope.currentSong.playing = null;
       }

       $scope.currentSong = vidPlay;
       $scope.isPlaying = true;
       $scope.currentSong.playing = true;

       if(song) {
         song.playing = true;
       }
    };

    $scope.pause = function(song) {

       $scope.isPlaying = false;
       player.pauseVideo();
       if(song){
         song.playing = null;
       } else {
         $scope.currentSong.playing = null;
       }
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
  }
}
