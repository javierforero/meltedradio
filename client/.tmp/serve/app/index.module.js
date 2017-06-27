/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _index = __webpack_require__(1);
	
	var _index2 = __webpack_require__(2);
	
	var _index3 = __webpack_require__(3);
	
	var _main = __webpack_require__(4);
	
	var _home = __webpack_require__(5);
	
	var _nav = __webpack_require__(6);
	
	var _registrations = __webpack_require__(7);
	
	var _sessions = __webpack_require__(8);
	
	var _bubble = __webpack_require__(9);
	
	var _githubContributor = __webpack_require__(10);
	
	var _webDevTec = __webpack_require__(11);
	
	var _youTubeApiKey = __webpack_require__(12);
	
	var _navbar = __webpack_require__(13);
	
	var _malarkey = __webpack_require__(14);
	
	/* global malarkey:false, moment:false */
	
	var devApiUrl = 'http://localhost:3000';
	var prodApiUrl = 'https://meltedradio.herokuapp.com';
	
	angular.module('meltedRadio', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'ng-token-auth', 'rails', 'LocalStorageModule']).constant('malarkey', malarkey).constant('moment', moment).config(_index.config).config(_index2.routerConfig).config(["$authProvider", function ($authProvider) {
	  $authProvider.configure({
	    apiUrl: devApiUrl
	  });
	}]).config(["localStorageServiceProvider", function (localStorageServiceProvider) {
	  localStorageServiceProvider.setPrefix('meltedRadio');
	}]).config(["railsSerializerProvider", function (railsSerializerProvider) {
	  railsSerializerProvider.underscore(angular.identity).camelize(angular.identity);
	}]).run(_index3.runBlock).service('githubContributor', _githubContributor.GithubContributorService).service('webDevTec', _webDevTec.WebDevTecService).service('YouTubeApiKeyService', _youTubeApiKey.YouTubeApiKeyService).controller('MainController', _main.MainController).controller('HomeController', _home.HomeController).controller('NavController', _nav.NavController).controller('RegistrationsController', _registrations.RegistrationsController).controller('SessionsController', _sessions.SessionsController).controller('BubbleController', _bubble.BubbleController).directive('acmeNavbar', _navbar.NavbarDirective).directive('acmeMalarkey', _malarkey.MalarkeyDirective).directive('onFinishRender', ["$timeout", function ($timeout) {
	  return {
	    restrict: 'A',
	    link: function link(scope, element, attr) {
	      if (scope.$last === true) {
	        $timeout(function () {
	          scope.$emit(attr.onFinishRender);
	        });
	      }
	    }
	  };
	}]).factory('ApiSync', function () {
	  var ApiSync = {};
	
	  ApiSync.setPlaylists = function (obj) {
	    ApiSync.playlists = obj;
	  };
	
	  ApiSync.setSongs = function (obj) {
	    ApiSync.songs = obj;
	  };
	
	  ApiSync.getPlaylists = function () {
	    return ApiSync.playlists;
	  };
	
	  ApiSync.getSongs = function () {
	    return ApiSync.songs;
	  };
	
	  return ApiSync;
	}).factory('Playlist', ["railsResourceFactory", function (railsResourceFactory) {
	  return railsResourceFactory({
	    url: devApiUrl + '/playlists',
	    name: 'playlist'
	  });
	}]).factory('User', ["railsResourceFactory", function (railsResourceFactory) {
	  return railsResourceFactory({
	    url: devApiUrl + '/users/{{userId}}/playlists',
	    name: 'user'
	  });
	}]).factory('Song', ["railsResourceFactory", function (railsResourceFactory) {
	  return railsResourceFactory({
	    url: devApiUrl + '/playlists/{{playlistId}}/songs',
	    name: 'song'
	  });
	}]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	config.$inject = ["$logProvider", "toastrConfig"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.config = config;
	function config($logProvider, toastrConfig) {
	  'ngInject';
	  // Enable log
	
	  $logProvider.debugEnabled(true);
	
	  // Set options third-party lib
	  toastrConfig.allowHtml = true;
	  toastrConfig.timeOut = 3000;
	  toastrConfig.positionClass = 'toast-top-right';
	  toastrConfig.preventDuplicates = true;
	  toastrConfig.progressBar = true;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	routerConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.routerConfig = routerConfig;
	function routerConfig($stateProvider, $urlRouterProvider) {
	  'ngInject';
	
	  $stateProvider.state('main', {
	    url: '/',
	    templateUrl: 'app/main/main.html',
	    controller: 'MainController',
	    controllerAs: 'main'
	  }).state('sign_in', {
	    url: '/sign_in',
	    templateUrl: 'app/views/user_sessions/new.html',
	    controller: 'SessionsController as signin'
	  }).state('sign_up', {
	    url: '/sign_up',
	    templateUrl: 'app/views/user_registrations/new.html',
	    controller: 'RegistrationsController as signup'
	  }).state('home', {
	    url: '/users/:id',
	    templateUrl: 'app/views/home.html',
	    controller: 'HomeController as home',
	    resolve: {
	      auth: ["$auth", function auth($auth) {
	        return $auth.validateUser();
	      }]
	    }
	  });
	
	  $urlRouterProvider.otherwise('/');
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	runBlock.$inject = ["$log"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.runBlock = runBlock;
	function runBlock($log) {
	  'ngInject';
	
	  $log.debug('runBlock end');
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MainController = exports.MainController = function () {
	  MainController.$inject = ["$timeout", "webDevTec", "toastr"];
	  function MainController($timeout, webDevTec, toastr) {
	    'ngInject';
	
	    _classCallCheck(this, MainController);
	
	    this.awesomeThings = [];
	    this.classAnimation = '';
	    this.creationDate = 1481639704107;
	    this.toastr = toastr;
	
	    this.activate($timeout, webDevTec);
	  }
	
	  _createClass(MainController, [{
	    key: 'activate',
	    value: function activate($timeout, webDevTec) {
	      var _this = this;
	
	      this.getWebDevTec(webDevTec);
	      $timeout(function () {
	        _this.classAnimation = 'rubberBand';
	      }, 4000);
	    }
	  }, {
	    key: 'getWebDevTec',
	    value: function getWebDevTec(webDevTec) {
	      this.awesomeThings = webDevTec.getTec();
	
	      angular.forEach(this.awesomeThings, function (awesomeThing) {
	        awesomeThing.rank = Math.random();
	      });
	    }
	  }, {
	    key: 'showToastr',
	    value: function showToastr() {
	      this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
	      this.classAnimation = '';
	    }
	  }]);
	
	  return MainController;
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HomeController = exports.HomeController = ["$scope", "$rootScope", "$auth", "$location", "User", "Playlist", "localStorageService", "$uibModal", "Song", "ApiSync", "$http", "$sce", "$window", "$log", "YouTubeApiKeyService", function HomeController($scope, $rootScope, $auth, $location, User, Playlist, localStorageService, $uibModal, Song, ApiSync, $http, $sce, $window, $log, YouTubeApiKeyService) {
	  'ngInject';
	
	  _classCallCheck(this, HomeController);
	
	  $scope.userSignedIn = localStorageService.get('currentUser');
	  $rootScope.currentPlaylist = null;
	  $scope.songs = null;
	  $scope.currentSong = null;
	  $scope.previousSong = null;
	  $scope.isPlaying = false;
	  var player;
	  var vidArray = [];
	  var searchCurrentSong = null;
	  var prodApiUrl = 'https://meltedradio.herokuapp.com/';
	  var devApiUrl = 'http://localhost:3000/';
	
	  (function changeNavColor() {
	    angular.element('nav.nav-bar').css('color', 'white');
	    angular.element('nav.nav-bar').css('background-color', 'black');
	    angular.element('ul#desktop-nav-menu').css('background-color', 'black');
	    angular.element('ul#mobile-nav-menu-black').css('background-color', 'black');
	    angular.element('ul.nav-menu a').css('color', 'white');
	  })();
	
	  if ($scope.userSignedIn) {
	
	    User.query({ playlistId: '' }, { userId: $scope.userSignedIn.id }).then(function (results) {
	      ApiSync.setPlaylists(results);
	    });
	  }
	
	  $scope.getCurrentPlaylist = function () {
	    return $rootScope.currentPlaylist;
	  };
	
	  $scope.playlists = function () {
	    return ApiSync.getPlaylists();
	  };
	
	  $scope.songs = function () {
	    return ApiSync.getSongs();
	  };
	
	  $scope.newPlaylist = function () {
	    $scope.modalInstance = $uibModal.open({
	      templateUrl: 'app/views/addplaylist.html',
	      scope: $scope,
	      controller: 'HomeController'
	    });
	  };
	
	  $scope.submit = function () {
	    if ($scope.text) {
	
	      $http({
	        method: 'POST',
	        url: devApiUrl + 'users/' + $scope.userSignedIn.id + '/playlists',
	        data: {
	          title: $scope.text
	        }
	      }).then(function (results) {
	
	        ApiSync.setPlaylists(results.data);
	        $scope.setPlaylist(results.data[results.data.length - 1]);
	      }, function (error) {
	        $log(error);
	      });
	
	      $scope.text = '';
	      $scope.modalInstance.close();
	    }
	  };
	
	  $scope.dismiss = function () {
	    $scope.modalInstance.dismiss('cancel');
	  };
	
	  $scope.setPlaylist = function (playlist) {
	
	    angular.element('div.playlist-content').removeClass('overflow');
	    localStorageService.set('currentPlaylist', playlist);
	    $rootScope.currentPlaylist = localStorageService.get('currentPlaylist');
	
	    if ($rootScope.currentPlaylist) {
	
	      Song.query({ songId: '' }, { playlistId: $rootScope.currentPlaylist.id }).then(function (songs) {
	
	        ApiSync.setSongs(songs);
	      });
	    }
	  };
	
	  $scope.getVideoSong = function (playlist, video) {
	
	    angular.element('ul#' + video.id.videoId).toggle("slow");
	
	    var getVideoInfoUrl = 'https://www.googleapis.com/youtube/v3/videos?' + 'id=' + video.id.videoId + '&key=' + YouTubeApiKeyService.apiKey() + '&part=snippet,contentDetails';
	    $http({
	
	      method: 'GET',
	      url: getVideoInfoUrl
	
	    }).then(function (results) {
	
	      addVideoToPlaylist(playlist, results.data.items[0]);
	    }, function (error) {
	      $log(error);
	    });
	  };
	
	  $scope.convertDuration = function (string) {
	
	    var array = string.match(/(\d+)(?=[MHS])/ig) || [];
	    var formatted = array.map(function (item) {
	      if (item.length < 2) return '0' + item;
	      return item;
	    }).join(':');
	
	    return formatted;
	  };
	
	  function addVideoToPlaylist(playlist, video) {
	
	    $http({
	      method: 'POST',
	      url: devApiUrl + 'playlists/' + playlist.id + '/songs',
	      data: {
	        title: video.snippet.title,
	        artist: video.snippet.description,
	        url: video.id,
	        duration: video.contentDetails.duration
	      }
	    }).then(function (results) {
	      ApiSync.setSongs(results.data);
	    }, function (error) {
	      $log(error);
	    });
	  }
	
	  $scope.deleteSong = function (song) {
	
	    $http({
	      method: 'DELETE',
	      url: devApiUrl + 'playlists/' + $rootScope.currentPlaylist.id + '/songs/' + song.id
	    }).then(function (response) {
	
	      $scope.setPlaylist(response.data.current_playlist);
	    }, function (error) {
	      $log(error);
	    });
	  };
	
	  $scope.deletePlaylist = function (playlist) {
	
	    $http({
	      method: 'DELETE',
	      url: devApiUrl + '/users/' + playlist.user_id + '/playlists/' + playlist.id
	    }).then(function (response) {
	      ApiSync.setPlaylists(response.data.user_playlists);
	    }, function (error) {
	      $log(error);
	    });
	  };
	
	  var setSearchResults = function setSearchResults(obj) {
	    $scope.videos = obj;
	  };
	
	  $scope.getVideos = function () {
	
	    if ($scope.text) {
	
	      $scope.setPlaylist(null);
	      var searchText = encodeURIComponent($scope.text).replace(/%20/g, '+');
	      var myUrl = 'https://www.googleapis.com/youtube/v3/' + 'search?part=snippet' + '&type=video' + '&q=' + searchText + '&key=' + YouTubeApiKeyService.apiKey();
	      $http({
	        method: 'GET',
	        url: myUrl
	
	      }).then(function (response) {
	
	        setSearchResults(response.data.items);
	      }, function (error) {
	        console.log(error);
	      });
	    }
	  };
	
	  $scope.getUrl = function (video) {
	    return "//www.youtube.com/embed/" + video.id.videoId + "?enablejsapi=1";
	  };
	
	  $scope.trustSrc = function (src) {
	    return $sce.trustAsResourceUrl(src);
	  };
	
	  $scope.toggleMenu = function (videoId) {
	    angular.element('ul#' + videoId).toggle("slow");
	  };
	
	  function createPlayer() {
	
	    for (var i = 0; i < $scope.videos.length; i++) {
	
	      var id = 'vid-' + (i + 1);
	      var vidPlayerObj = new YT.Player(id, {
	        events: {
	          'onStateChange': $scope.onPlayerStateChange
	        }
	      });
	      vidArray.push(vidPlayerObj);
	    }
	  }
	  $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
	
	    createPlayer();
	  });
	
	  $scope.onPlayerReady = function (event) {
	
	    event.target.playVideo();
	  };
	
	  $scope.onPlayerStateChange = function (event) {
	
	    if (event.data == YT.PlayerState.PLAYING) {
	      searchVidLogic(event.target);
	    }
	  };
	
	  function searchVidLogic(video) {
	
	    if ($scope.currentSong && $scope.isPlaying) {
	      $scope.pause();
	    }
	
	    if (searchCurrentSong && searchCurrentSong !== video) {
	      searchCurrentSong.pauseVideo();
	      searchCurrentSong = video;
	    } else if (searchCurrentSong && searchCurrentSong == video) {
	      searchCurrentSong.playVideo();
	    } else {
	      searchCurrentSong = video;
	      searchCurrentSong.playVideo();
	    }
	  }
	
	  function stopVideo() {
	
	    player.stopVideo();
	  }
	
	  $scope.play = function (song) {
	
	    var vidHeight = angular.element('div.video').height();
	    var vidWidth = angular.element('div.video').width();
	    var initialSong = $scope.currentSong || $scope.songs()[0];
	    var vidPlay = song || initialSong;
	
	    // stops player playing in search results when playing another song in playlist
	
	    if (searchCurrentSong) {
	      searchCurrentSong.stopVideo();
	      searchCurrentSong = null;
	    }
	    // if there's no currentSong create youtube player
	    if (!$scope.currentSong) {
	
	      player = new YT.Player('iframe-utube-player', {
	        height: vidHeight,
	        width: vidWidth,
	        videoId: vidPlay.url,
	        playerVars: { 'controls': 0, 'rel': 0 },
	        events: {
	          'onReady': $scope.onPlayerReady
	        }
	      });
	    } else if (song == $scope.currentSong || $scope.currentSong && !song) {
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
	
	    if (song) {
	      song.playing = true;
	    }
	  };
	
	  $scope.pause = function (song) {
	
	    $scope.isPlaying = false;
	    player.pauseVideo();
	    if (song) {
	      song.playing = null;
	    } else {
	      $scope.currentSong.playing = null;
	    }
	  };
	
	  function getSongIndex(song) {
	    return songs().indexOf(song);
	  }
	
	  $scope.next = function () {
	
	    var songsArray = $scope.songs();
	    var lastIndex = songsArray.length - 1;
	    var indexOfCurrentSong = songsArray.indexOf($scope.currentSong);
	    var songToPlay = null;
	
	    if ($scope.currentSong) {
	      if (indexOfCurrentSong < lastIndex) {
	
	        songToPlay = songsArray[indexOfCurrentSong + 1];
	      } else {
	
	        indexOfCurrentSong = 0;
	        songToPlay = songsArray[indexOfCurrentSong];
	      }
	    } else {
	      songToPlay = songsArray[0];
	    }
	
	    $scope.play(songToPlay);
	  };
	
	  $scope.previous = function () {
	
	    var songsArray = $scope.songs();
	    var lastIndex = songsArray.length - 1;
	    var indexOfCurrentSong = songsArray.indexOf($scope.currentSong);
	    var songToPlay = null;
	
	    if ($scope.currentSong) {
	      if (indexOfCurrentSong > 0) {
	
	        songToPlay = songsArray[indexOfCurrentSong - 1];
	      } else {
	
	        indexOfCurrentSong = lastIndex;
	        songToPlay = songsArray[indexOfCurrentSong];
	      }
	    } else {
	      songToPlay = songsArray[lastIndex];
	    }
	
	    $scope.play(songToPlay);
	  };
	}];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NavController = exports.NavController = ["$scope", "$rootScope", "$auth", "$location", "localStorageService", "$http", "ApiSync", "Song", function NavController($scope, $rootScope, $auth, $location, localStorageService, $http, ApiSync, Song) {
	  'ngInject';
	
	  _classCallCheck(this, NavController);
	
	  function changeNavColor() {
	    angular.element('nav.nav-bar').css('color', 'black');
	    angular.element('nav.nav-bar').css('background-color', 'white');
	    angular.element('nav.nav-bar ul').css('background-color', 'white');
	    angular.element('ul.nav-menu a').css('color', 'black');
	  }
	
	  $scope.is_open = false;
	
	  $scope.playlists = function () {
	    return ApiSync.getPlaylists();
	  };
	
	  $scope.setPlaylist = function (playlist) {
	
	    angular.element('div.playlist-content').removeClass('overflow');
	    localStorageService.set('currentPlaylist', playlist);
	    $rootScope.currentPlaylist = localStorageService.get('currentPlaylist');
	
	    if ($rootScope.currentPlaylist) {
	
	      Song.query({ songId: '' }, { playlistId: $rootScope.currentPlaylist.id }).then(function (songs) {
	
	        ApiSync.setSongs(songs);
	      });
	    }
	  };
	
	  this.pageRedirect = function () {
	
	    if ($rootScope.user.id) {
	      $location.path('/users/' + $rootScope.user.id);
	    } else {
	      $location.path('/');
	    }
	  };
	
	  $scope.signOut = function () {
	    $auth.signOut();
	  };
	
	  $rootScope.$on('auth:logout-success', function (ev) {
	    $scope.userSignedIn = null;
	    localStorageService.remove('currentUser');
	    changeNavColor();
	    $location.path('/');
	  });
	
	  $scope.toggleMenu = function (event, x_id) {
	
	    angular.element('#mobile-ham-black').toggleClass('hide');
	    angular.element('#mobile-ham-white').toggleClass('hide');
	    angular.element('#mobile-x-black').toggleClass('display');
	    angular.element('#mobile-x-white').toggleClass('display');
	    angular.element('div#' + x_id).toggleClass('display');
	  };
	}];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var RegistrationsController = exports.RegistrationsController = ["$scope", "$auth", "$rootScope", "$location", "localStorageService", function RegistrationsController($scope, $auth, $rootScope, $location, localStorageService) {
	  'ngInject';
	
	  _classCallCheck(this, RegistrationsController);
	
	  var setUser = function setUser(obj) {
	    localStorageService.set('currentUser', obj);
	  };
	
	  $scope.submitRegistration = function (registrationForm) {
	
	    $auth.submitRegistration(registrationForm).then(function () {
	
	      $auth.submitLogin({
	        email: registrationForm.email,
	        password: registrationForm.password
	      });
	    });
	  };
	
	  $rootScope.$on('auth:login-success', function (ev, user) {
	
	    setUser(user);
	    $location.path('/users/' + user.id);
	  });
	}];

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SessionsController = exports.SessionsController = ["$scope", "$auth", "$rootScope", "$location", "User", "Playlist", "localStorageService", function SessionsController($scope, $auth, $rootScope, $location, User, Playlist, localStorageService) {
	  'ngInject';
	
	  _classCallCheck(this, SessionsController);
	
	  $scope.error = null;
	
	  var setUser = function setUser(obj) {
	    localStorageService.set('currentUser', obj);
	  };
	
	  $scope.submitLogin = function (loginForm) {
	    $auth.submitLogin(loginForm).then(function (user) {
	
	      setUser(user);
	    });
	  };
	
	  $rootScope.$on('auth:login-success', function (ev, user) {
	
	    $location.path('/users/' + user.id);
	  });
	  $rootScope.$on('auth:login-error', function (ev, reason) {
	    $scope.error = reason.errors[0];
	  });
	
	  User.query({ playlistId: '' }, { userId: 1 }).then(function (results) {
	    $scope.users = results;
	  });
	
	  $scope.signOut = function () {
	    $auth.signOut();
	  };
	
	  $rootScope.$on('auth:logout-success', function (ev) {
	    $location.path('/');
	  });
	}];

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BubbleController = exports.BubbleController = ["$rootScope", "$scope", "$window", "$document", function BubbleController($rootScope, $scope, $window, $document) {
	  'ngInject';
	
	  _classCallCheck(this, BubbleController);
	
	  var lava0;
	  var ge1doot = {
	    screen: {
	      elem: null,
	      callback: null,
	      ctx: null,
	      width: 0,
	      height: 0,
	      left: 0,
	      top: 0,
	      init: function init(id, callback, initRes) {
	        this.elem = document.getElementById(id);
	        this.callback = callback || null;
	        if (this.elem.tagName == "CANVAS") this.ctx = this.elem.getContext("2d");
	        window.addEventListener('resize', function () {
	          this.resize();
	        }.bind(this), false);
	        this.elem.onselectstart = function () {
	          return false;
	        };
	        this.elem.ondrag = function () {
	          return false;
	        };
	        initRes && this.resize();
	        return this;
	      },
	      resize: function resize() {
	        var o = this.elem;
	        this.width = o.offsetWidth;
	        this.height = o.offsetHeight;
	        for (this.left = 0, this.top = 0; o != null; o = o.offsetParent) {
	          this.left += o.offsetLeft;
	          this.top += o.offsetTop;
	        }
	        if (this.ctx) {
	          this.elem.width = this.width;
	          this.elem.height = this.height;
	        }
	        this.callback && this.callback();
	      }
	    }
	  };
	
	  // Point constructor
	  var Point = function Point(x, y) {
	    this.x = x;
	    this.y = y;
	    this.magnitude = x * x + y * y;
	    this.computed = 0;
	    this.force = 0;
	  };
	  Point.prototype.add = function (p) {
	    return new Point(this.x + p.x, this.y + p.y);
	  };
	
	  // Ball constructor
	  var Ball = function Ball(parent) {
	    var min = .1;
	    var max = 1.5;
	    this.vel = new Point((Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.025), (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random()));
	    this.pos = new Point(parent.width * 0.2 + Math.random() * parent.width * 0.6, parent.height * 0.2 + Math.random() * parent.height * 0.6);
	    this.size = parent.wh / 15 + (Math.random() * (max - min) + min) * (parent.wh / 15);
	    this.width = parent.width;
	    this.height = parent.height;
	  };
	
	  // move balls
	  Ball.prototype.move = function () {
	
	    // bounce borders
	    if (this.pos.x >= this.width - this.size) {
	      if (this.vel.x > 0) this.vel.x = -this.vel.x;
	      this.pos.x = this.width - this.size;
	    } else if (this.pos.x <= this.size) {
	      if (this.vel.x < 0) this.vel.x = -this.vel.x;
	      this.pos.x = this.size;
	    }
	
	    if (this.pos.y >= this.height - this.size) {
	      if (this.vel.y > 0) this.vel.y = -this.vel.y;
	      this.pos.y = this.height - this.size;
	    } else if (this.pos.y <= this.size) {
	      if (this.vel.y < 0) this.vel.y = -this.vel.y;
	      this.pos.y = this.size;
	    }
	
	    // velocity
	    this.pos = this.pos.add(this.vel);
	  };
	
	  // lavalamp constructor
	  var LavaLamp = function LavaLamp(width, height, numBalls, c0, c1) {
	    this.step = 5;
	    this.width = width;
	    this.height = height;
	    this.wh = Math.min(width, height);
	    this.sx = Math.floor(this.width / this.step);
	    this.sy = Math.floor(this.height / this.step);
	    this.paint = false;
	    this.metaFill = createRadialGradient(width, height, width, c0, c1);
	    this.plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
	    this.ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1];
	    this.mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0];
	    this.ix = [1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1];
	    this.grid = [];
	    this.balls = [];
	    this.iter = 0;
	    this.sign = 1;
	
	    // init grid
	    for (var i = 0; i < (this.sx + 2) * (this.sy + 2); i++) {
	      this.grid[i] = new Point(i % (this.sx + 2) * this.step, Math.floor(i / (this.sx + 2)) * this.step);
	    }
	
	    // create metaballs
	    for (var k = 0; k < 10; k++) {
	      this.balls[k] = new Ball(this);
	    }
	  };
	
	  // compute cell force
	  LavaLamp.prototype.computeForce = function (x, y, idx) {
	
	    var force;
	    var id = idx || x + y * (this.sx + 2);
	
	    if (x === 0 || y === 0 || x === this.sx || y === this.sy) {
	      force = 0.06 * this.sign;
	    } else {
	      force = 0;
	      var cell = this.grid[id];
	      var i = 0;
	      var ball;
	      while (ball = this.balls[i++]) {
	        force += ball.size * ball.size / (-2 * cell.x * ball.pos.x - 2 * cell.y * ball.pos.y + ball.pos.magnitude + cell.magnitude);
	      }
	      force *= this.sign;
	    }
	    this.grid[id].force = force;
	    return force;
	  };
	
	  // compute cell
	  LavaLamp.prototype.marchingSquares = function (next) {
	    var x = next[0];
	    var y = next[1];
	    var pdir = next[2];
	    var id = x + y * (this.sx + 2);
	    if (this.grid[id].computed === this.iter) {
	      return false;
	    }
	    var dir,
	        mscase = 0;
	
	    // neighbors force
	    for (var i = 0; i < 4; i++) {
	      var idn = x + this.ix[i + 12] + (y + this.ix[i + 16]) * (this.sx + 2);
	      var force = this.grid[idn].force;
	      if (force > 0 && this.sign < 0 || force < 0 && this.sign > 0 || !force) {
	        // compute force if not in buffer
	        force = this.computeForce(x + this.ix[i + 12], y + this.ix[i + 16], idn);
	      }
	      if (Math.abs(force) > 1) mscase += Math.pow(2, i);
	    }
	    if (mscase === 15) {
	      // inside
	      return [x, y - 1, false];
	    } else {
	      // ambiguous cases
	      if (mscase === 5) dir = pdir === 2 ? 3 : 1;else if (mscase === 10) dir = pdir === 3 ? 0 : 2;else {
	        // lookup
	        dir = this.mscases[mscase];
	        this.grid[id].computed = this.iter;
	      }
	      // draw line
	      var ix = this.step / (Math.abs(Math.abs(this.grid[x + this.plx[4 * dir + 2] + (y + this.ply[4 * dir + 2]) * (this.sx + 2)].force) - 1) / Math.abs(Math.abs(this.grid[x + this.plx[4 * dir + 3] + (y + this.ply[4 * dir + 3]) * (this.sx + 2)].force) - 1) + 1);
	      ctx.lineTo(this.grid[x + this.plx[4 * dir] + (y + this.ply[4 * dir]) * (this.sx + 2)].x + this.ix[dir] * ix, this.grid[x + this.plx[4 * dir + 1] + (y + this.ply[4 * dir + 1]) * (this.sx + 2)].y + this.ix[dir + 4] * ix);
	      this.paint = true;
	      // next
	      return [x + this.ix[dir + 4], y + this.ix[dir + 8], dir];
	    }
	  };
	
	  LavaLamp.prototype.renderMetaballs = function () {
	    var i = 0,
	        ball;
	    while (ball = this.balls[i++]) {
	      ball.move();
	    } // reset grid
	    this.iter++;
	    this.sign = -this.sign;
	    this.paint = false;
	    ctx.fillStyle = this.metaFill;
	    ctx.beginPath();
	    // compute metaballs
	    i = 0;
	    //ctx.shadowBlur = 50;
	    //ctx.shadowColor = "green";
	    while (ball = this.balls[i++]) {
	      // first cell
	      var next = [Math.round(ball.pos.x / this.step), Math.round(ball.pos.y / this.step), false];
	      // marching squares
	      do {
	        next = this.marchingSquares(next);
	      } while (next);
	      // fill and close path
	      if (this.paint) {
	        ctx.fill();
	        ctx.closePath();
	        ctx.beginPath();
	        this.paint = false;
	      }
	    }
	  };
	
	  // gradients
	  var createRadialGradient = function createRadialGradient(w, h, r, c0, c1) {
	    var gradient = ctx.createRadialGradient(w / 1, h / 1, 0, w / 1, h / 1, r);
	    gradient.addColorStop(0, c0);
	    gradient.addColorStop(1, c1);
	    return gradient;
	  };
	
	  // main loop
	  var run = function run(state) {
	
	    if (state) {
	      requestAnimationFrame(run);
	      ctx.clearRect(0, 0, screen.width, screen.height);
	      lava0.renderMetaballs();
	    }
	  };
	
	  // canvas
	  var screen = ge1doot.screen.init("bubble", null, true),
	      ctx = screen.ctx;
	  screen.resize();
	  // create LavaLamps
	  lava0 = new LavaLamp(screen.width, screen.height, 100, "#f512b5", "#5f25b8");
	
	  run(angular.element('#bubble').is(':visible'));
	
	  window.addEventListener("resize", function () {
	    if (angular.element('#bubble').is(':visible')) {
	      lava0 = new LavaLamp(screen.width, screen.height, 100, "#f512b5", "#5f25b8");
	    }
	  });
	}];

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GithubContributorService = exports.GithubContributorService = function () {
	  GithubContributorService.$inject = ["$log", "$http"];
	  function GithubContributorService($log, $http) {
	    'ngInject';
	
	    _classCallCheck(this, GithubContributorService);
	
	    this.$log = $log;
	    this.$http = $http;
	    this.apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';
	  }
	
	  _createClass(GithubContributorService, [{
	    key: 'getContributors',
	    value: function getContributors() {
	      var _this = this;
	
	      var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
	
	      return this.$http.get(this.apiHost + '/contributors?per_page=' + limit).then(function (response) {
	        return response.data;
	      }).catch(function (error) {
	        _this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
	      });
	    }
	  }]);
	
	  return GithubContributorService;
	}();

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var WebDevTecService = exports.WebDevTecService = function () {
	  function WebDevTecService() {
	    'ngInject';
	
	    _classCallCheck(this, WebDevTecService);
	
	    this.data = [{
	      'title': 'AngularJS',
	      'url': 'https://angularjs.org/',
	      'description': 'HTML enhanced for web apps!',
	      'logo': 'angular.png'
	    }, {
	      'title': 'BrowserSync',
	      'url': 'http://browsersync.io/',
	      'description': 'Time-saving synchronised browser testing.',
	      'logo': 'browsersync.png'
	    }, {
	      'title': 'GulpJS',
	      'url': 'http://gulpjs.com/',
	      'description': 'The streaming build system.',
	      'logo': 'gulp.png'
	    }, {
	      'title': 'Jasmine',
	      'url': 'http://jasmine.github.io/',
	      'description': 'Behavior-Driven JavaScript.',
	      'logo': 'jasmine.png'
	    }, {
	      'title': 'Karma',
	      'url': 'http://karma-runner.github.io/',
	      'description': 'Spectacular Test Runner for JavaScript.',
	      'logo': 'karma.png'
	    }, {
	      'title': 'Protractor',
	      'url': 'https://github.com/angular/protractor',
	      'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
	      'logo': 'protractor.png'
	    }, {
	      'title': 'Bootstrap',
	      'url': 'http://getbootstrap.com/',
	      'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
	      'logo': 'bootstrap.png'
	    }, {
	      'title': 'Angular UI Bootstrap',
	      'url': 'http://angular-ui.github.io/bootstrap/',
	      'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
	      'logo': 'ui-bootstrap.png'
	    }, {
	      'title': 'Sass (Node)',
	      'url': 'https://github.com/sass/node-sass',
	      'description': 'Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.',
	      'logo': 'node-sass.png'
	    }, {
	      'title': 'ES6 (Babel formerly 6to5)',
	      'url': 'https://babeljs.io/',
	      'description': 'Turns ES6+ code into vanilla ES5, so you can use next generation features today.',
	      'logo': 'babel.png'
	    }];
	  }
	
	  _createClass(WebDevTecService, [{
	    key: 'getTec',
	    value: function getTec() {
	      return this.data;
	    }
	  }]);
	
	  return WebDevTecService;
	}();

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var YouTubeApiKeyService = exports.YouTubeApiKeyService = function YouTubeApiKeyService() {
	  'ngInject';
	
	  _classCallCheck(this, YouTubeApiKeyService);
	
	  this.apiKey = function () {
	    return 'AIzaSyDawyPLlt7NB3e7ZSg0TUEkr1A3DSYClCE';
	  };
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NavbarDirective = NavbarDirective;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function NavbarDirective() {
	  'ngInject';
	
	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/components/navbar/navbar.html',
	    scope: {
	      creationDate: '='
	    },
	    controller: NavbarController,
	    controllerAs: 'vm',
	    bindToController: true
	  };
	
	  return directive;
	}
	
	var NavbarController = function NavbarController(moment) {
	  'ngInject';
	
	  // "this.creationDate" is available by directive option "bindToController: true"
	
	  _classCallCheck(this, NavbarController);
	
	  this.relativeDate = moment(this.creationDate).fromNow();
	};
	NavbarController.$inject = ["moment"];

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	MalarkeyDirective.$inject = ["malarkey"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.MalarkeyDirective = MalarkeyDirective;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function MalarkeyDirective(malarkey) {
	  'ngInject';
	
	  var directive = {
	    restrict: 'E',
	    scope: {
	      extraValues: '='
	    },
	    template: '&nbsp;',
	    link: linkFunc,
	    controller: MalarkeyController,
	    controllerAs: 'vm'
	  };
	
	  return directive;
	
	  function linkFunc(scope, el, attr, vm) {
	    var watcher = void 0;
	    var typist = malarkey(el[0], {
	      typeSpeed: 40,
	      deleteSpeed: 40,
	      pauseDelay: 800,
	      loop: true,
	      postfix: ' '
	    });
	
	    el.addClass('acme-malarkey');
	
	    angular.forEach(scope.extraValues, function (value) {
	      typist.type(value).pause().delete();
	    });
	
	    watcher = scope.$watch('vm.contributors', function () {
	      angular.forEach(vm.contributors, function (contributor) {
	        typist.type(contributor.login).pause().delete();
	      });
	    });
	
	    scope.$on('$destroy', function () {
	      watcher();
	    });
	  }
	}
	
	var MalarkeyController = function () {
	  MalarkeyController.$inject = ["$log", "githubContributor"];
	  function MalarkeyController($log, githubContributor) {
	    'ngInject';
	
	    _classCallCheck(this, MalarkeyController);
	
	    this.$log = $log;
	    this.contributors = [];
	
	    this.activate(githubContributor);
	  }
	
	  _createClass(MalarkeyController, [{
	    key: 'activate',
	    value: function activate(githubContributor) {
	      var _this = this;
	
	      return this.getContributors(githubContributor).then(function () {
	        _this.$log.info('Activated Contributors View');
	      });
	    }
	  }, {
	    key: 'getContributors',
	    value: function getContributors(githubContributor) {
	      var _this2 = this;
	
	      return githubContributor.getContributors(10).then(function (data) {
	        _this2.contributors = data;
	
	        return _this2.contributors;
	      });
	    }
	  }]);
	
	  return MalarkeyController;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmM3Mzc5MWVlY2Q5NTM3NjcwNmMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9ob21lLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL25hdi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9yZWdpc3RyYXRpb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL3Nlc3Npb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL2J1YmJsZS5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2FwaWtleXMveW91VHViZUFwaUtleS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbImRldkFwaVVybCIsInByb2RBcGlVcmwiLCJhbmd1bGFyIiwibW9kdWxlIiwiY29uc3RhbnQiLCJtYWxhcmtleSIsIm1vbWVudCIsImNvbmZpZyIsIiRhdXRoUHJvdmlkZXIiLCJjb25maWd1cmUiLCJhcGlVcmwiLCJsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIiLCJzZXRQcmVmaXgiLCJyYWlsc1NlcmlhbGl6ZXJQcm92aWRlciIsInVuZGVyc2NvcmUiLCJpZGVudGl0eSIsImNhbWVsaXplIiwicnVuIiwic2VydmljZSIsImNvbnRyb2xsZXIiLCJkaXJlY3RpdmUiLCIkdGltZW91dCIsInJlc3RyaWN0IiwibGluayIsInNjb3BlIiwiZWxlbWVudCIsImF0dHIiLCIkbGFzdCIsIiRlbWl0Iiwib25GaW5pc2hSZW5kZXIiLCJmYWN0b3J5IiwiQXBpU3luYyIsInNldFBsYXlsaXN0cyIsIm9iaiIsInBsYXlsaXN0cyIsInNldFNvbmdzIiwic29uZ3MiLCJnZXRQbGF5bGlzdHMiLCJnZXRTb25ncyIsInJhaWxzUmVzb3VyY2VGYWN0b3J5IiwidXJsIiwibmFtZSIsIiRsb2dQcm92aWRlciIsInRvYXN0ckNvbmZpZyIsImRlYnVnRW5hYmxlZCIsImFsbG93SHRtbCIsInRpbWVPdXQiLCJwb3NpdGlvbkNsYXNzIiwicHJldmVudER1cGxpY2F0ZXMiLCJwcm9ncmVzc0JhciIsInJvdXRlckNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwic3RhdGUiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXJBcyIsInJlc29sdmUiLCJhdXRoIiwiJGF1dGgiLCJ2YWxpZGF0ZVVzZXIiLCJvdGhlcndpc2UiLCJydW5CbG9jayIsIiRsb2ciLCJkZWJ1ZyIsIndlYkRldlRlYyIsInRvYXN0ciIsImF3ZXNvbWVUaGluZ3MiLCJjbGFzc0FuaW1hdGlvbiIsImNyZWF0aW9uRGF0ZSIsImFjdGl2YXRlIiwiZ2V0V2ViRGV2VGVjIiwiZ2V0VGVjIiwiZm9yRWFjaCIsImF3ZXNvbWVUaGluZyIsInJhbmsiLCJNYXRoIiwicmFuZG9tIiwiaW5mbyIsIkhvbWVDb250cm9sbGVyIiwiJHNjb3BlIiwiJHJvb3RTY29wZSIsIiRsb2NhdGlvbiIsIlVzZXIiLCJQbGF5bGlzdCIsImxvY2FsU3RvcmFnZVNlcnZpY2UiLCIkdWliTW9kYWwiLCJTb25nIiwiJGh0dHAiLCIkc2NlIiwiJHdpbmRvdyIsIllvdVR1YmVBcGlLZXlTZXJ2aWNlIiwidXNlclNpZ25lZEluIiwiZ2V0IiwiY3VycmVudFBsYXlsaXN0IiwiY3VycmVudFNvbmciLCJwcmV2aW91c1NvbmciLCJpc1BsYXlpbmciLCJwbGF5ZXIiLCJ2aWRBcnJheSIsInNlYXJjaEN1cnJlbnRTb25nIiwiY2hhbmdlTmF2Q29sb3IiLCJjc3MiLCJxdWVyeSIsInBsYXlsaXN0SWQiLCJ1c2VySWQiLCJpZCIsInRoZW4iLCJyZXN1bHRzIiwiZ2V0Q3VycmVudFBsYXlsaXN0IiwibmV3UGxheWxpc3QiLCJtb2RhbEluc3RhbmNlIiwib3BlbiIsInN1Ym1pdCIsInRleHQiLCJtZXRob2QiLCJkYXRhIiwidGl0bGUiLCJzZXRQbGF5bGlzdCIsImxlbmd0aCIsImVycm9yIiwiY2xvc2UiLCJkaXNtaXNzIiwicGxheWxpc3QiLCJyZW1vdmVDbGFzcyIsInNldCIsInNvbmdJZCIsImdldFZpZGVvU29uZyIsInZpZGVvIiwidmlkZW9JZCIsInRvZ2dsZSIsImdldFZpZGVvSW5mb1VybCIsImFwaUtleSIsImFkZFZpZGVvVG9QbGF5bGlzdCIsIml0ZW1zIiwiY29udmVydER1cmF0aW9uIiwic3RyaW5nIiwiYXJyYXkiLCJtYXRjaCIsImZvcm1hdHRlZCIsIm1hcCIsIml0ZW0iLCJqb2luIiwic25pcHBldCIsImFydGlzdCIsImRlc2NyaXB0aW9uIiwiZHVyYXRpb24iLCJjb250ZW50RGV0YWlscyIsImRlbGV0ZVNvbmciLCJzb25nIiwicmVzcG9uc2UiLCJjdXJyZW50X3BsYXlsaXN0IiwiZGVsZXRlUGxheWxpc3QiLCJ1c2VyX2lkIiwidXNlcl9wbGF5bGlzdHMiLCJzZXRTZWFyY2hSZXN1bHRzIiwidmlkZW9zIiwiZ2V0VmlkZW9zIiwic2VhcmNoVGV4dCIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlcGxhY2UiLCJteVVybCIsImNvbnNvbGUiLCJsb2ciLCJnZXRVcmwiLCJ0cnVzdFNyYyIsInNyYyIsInRydXN0QXNSZXNvdXJjZVVybCIsInRvZ2dsZU1lbnUiLCJjcmVhdGVQbGF5ZXIiLCJpIiwidmlkUGxheWVyT2JqIiwiWVQiLCJQbGF5ZXIiLCJldmVudHMiLCJvblBsYXllclN0YXRlQ2hhbmdlIiwicHVzaCIsIiRvbiIsIm5nUmVwZWF0RmluaXNoZWRFdmVudCIsIm9uUGxheWVyUmVhZHkiLCJldmVudCIsInRhcmdldCIsInBsYXlWaWRlbyIsIlBsYXllclN0YXRlIiwiUExBWUlORyIsInNlYXJjaFZpZExvZ2ljIiwicGF1c2UiLCJwYXVzZVZpZGVvIiwic3RvcFZpZGVvIiwicGxheSIsInZpZEhlaWdodCIsImhlaWdodCIsInZpZFdpZHRoIiwid2lkdGgiLCJpbml0aWFsU29uZyIsInZpZFBsYXkiLCJwbGF5ZXJWYXJzIiwibG9hZFZpZGVvQnlJZCIsInBsYXlpbmciLCJnZXRTb25nSW5kZXgiLCJpbmRleE9mIiwibmV4dCIsInNvbmdzQXJyYXkiLCJsYXN0SW5kZXgiLCJpbmRleE9mQ3VycmVudFNvbmciLCJzb25nVG9QbGF5IiwicHJldmlvdXMiLCJOYXZDb250cm9sbGVyIiwiaXNfb3BlbiIsInBhZ2VSZWRpcmVjdCIsInVzZXIiLCJwYXRoIiwic2lnbk91dCIsImV2IiwicmVtb3ZlIiwieF9pZCIsInRvZ2dsZUNsYXNzIiwiUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXIiLCJzZXRVc2VyIiwic3VibWl0UmVnaXN0cmF0aW9uIiwicmVnaXN0cmF0aW9uRm9ybSIsInN1Ym1pdExvZ2luIiwiZW1haWwiLCJwYXNzd29yZCIsIlNlc3Npb25zQ29udHJvbGxlciIsImxvZ2luRm9ybSIsInJlYXNvbiIsImVycm9ycyIsInVzZXJzIiwiQnViYmxlQ29udHJvbGxlciIsIiRkb2N1bWVudCIsImxhdmEwIiwiZ2UxZG9vdCIsInNjcmVlbiIsImVsZW0iLCJjYWxsYmFjayIsImN0eCIsImxlZnQiLCJ0b3AiLCJpbml0IiwiaW5pdFJlcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0YWdOYW1lIiwiZ2V0Q29udGV4dCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiLCJiaW5kIiwib25zZWxlY3RzdGFydCIsIm9uZHJhZyIsIm8iLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsIm9mZnNldFBhcmVudCIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJQb2ludCIsIngiLCJ5IiwibWFnbml0dWRlIiwiY29tcHV0ZWQiLCJmb3JjZSIsInByb3RvdHlwZSIsImFkZCIsInAiLCJCYWxsIiwicGFyZW50IiwibWluIiwibWF4IiwidmVsIiwicG9zIiwic2l6ZSIsIndoIiwibW92ZSIsIkxhdmFMYW1wIiwibnVtQmFsbHMiLCJjMCIsImMxIiwic3RlcCIsInN4IiwiZmxvb3IiLCJzeSIsInBhaW50IiwibWV0YUZpbGwiLCJjcmVhdGVSYWRpYWxHcmFkaWVudCIsInBseCIsInBseSIsIm1zY2FzZXMiLCJpeCIsImdyaWQiLCJiYWxscyIsIml0ZXIiLCJzaWduIiwiayIsImNvbXB1dGVGb3JjZSIsImlkeCIsImNlbGwiLCJiYWxsIiwibWFyY2hpbmdTcXVhcmVzIiwicGRpciIsImRpciIsIm1zY2FzZSIsImlkbiIsImFicyIsInBvdyIsImxpbmVUbyIsInJlbmRlck1ldGFiYWxscyIsImZpbGxTdHlsZSIsImJlZ2luUGF0aCIsInJvdW5kIiwiZmlsbCIsImNsb3NlUGF0aCIsInciLCJoIiwiciIsImdyYWRpZW50IiwiYWRkQ29sb3JTdG9wIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2xlYXJSZWN0IiwiaXMiLCJhcGlIb3N0IiwibGltaXQiLCJjYXRjaCIsInRvSnNvbiIsIldlYkRldlRlY1NlcnZpY2UiLCJOYXZiYXJEaXJlY3RpdmUiLCJOYXZiYXJDb250cm9sbGVyIiwiYmluZFRvQ29udHJvbGxlciIsInJlbGF0aXZlRGF0ZSIsImZyb21Ob3ciLCJNYWxhcmtleURpcmVjdGl2ZSIsImV4dHJhVmFsdWVzIiwidGVtcGxhdGUiLCJsaW5rRnVuYyIsIk1hbGFya2V5Q29udHJvbGxlciIsImVsIiwidm0iLCJ3YXRjaGVyIiwidHlwaXN0IiwidHlwZVNwZWVkIiwiZGVsZXRlU3BlZWQiLCJwYXVzZURlbGF5IiwibG9vcCIsInBvc3RmaXgiLCJhZGRDbGFzcyIsInZhbHVlIiwidHlwZSIsImRlbGV0ZSIsIiR3YXRjaCIsImNvbnRyaWJ1dG9ycyIsImNvbnRyaWJ1dG9yIiwibG9naW4iLCJnaXRodWJDb250cmlidXRvciIsImdldENvbnRyaWJ1dG9ycyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxLQUFJQSxZQUFZO0FBQ2hCLEtBQUlDLGFBQWE7O0FBRWpCQyxTQUFRQyxPQUFPLGVBQWUsQ0FBQyxhQUFhLGFBQWEsV0FBVyxjQUFjLGNBQWMsVUFBVSxjQUFjLGFBQWEsZ0JBQWdCLFVBQVUsaUJBQWlCLFNBQVMsdUJBQ3RMQyxTQUFTLFlBQVlDLFVBQ3JCRCxTQUFTLFVBQVVFLFFBQ25CQyxPQUhILGVBSUdBLE9BSkgsc0JBS0dBLHlCQUFPLFVBQVNDLGVBQWU7R0FDN0JBLGNBQWNDLFVBQVU7S0FDcEJDLFFBQVFWOztL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T3VULElBQUlyVCxNQUFNc1QsSUFBSTtLQUNyQyxJQUFJQztLQUNKLElBQUlDLFNBQVM3VSxTQUFTMFUsR0FBRyxJQUFJO09BQzNCSSxXQUFXO09BQ1hDLGFBQWE7T0FDYkMsWUFBWTtPQUNaQyxNQUFNO09BQ05DLFNBQVM7OztLQUdYUixHQUFHUyxTQUFTOztLQUVadFYsUUFBUXNFLFFBQVFoRCxNQUFNbVQsYUFBYSxVQUFDYyxPQUFVO09BQzVDUCxPQUFPUSxLQUFLRCxPQUFPaEssUUFBUWtLOzs7S0FHN0JWLFVBQVV6VCxNQUFNb1UsT0FBTyxtQkFBbUIsWUFBTTtPQUM5QzFWLFFBQVFzRSxRQUFRd1EsR0FBR2EsY0FBYyxVQUFDQyxhQUFnQjtTQUNoRFosT0FBT1EsS0FBS0ksWUFBWUMsT0FBT3RLLFFBQVFrSzs7OztLQUkzQ25VLE1BQU13SixJQUFJLFlBQVksWUFBTTtPQUMxQmlLOzs7Ozs7OERBaUIrQjtHQVZuQyw0QkFBYW5SLE1BQU1rUyxtQkFBbUI7S0FDcEM7O0tBRG9DOztLQUdwQyxLQUFLbFMsT0FBT0E7S0FDWixLQUFLK1IsZUFBZTs7S0FFcEIsS0FBS3hSLFNBQVMyUjs7O0dBZ0JoQixhQUFhLG9CQUFvQixDQUFDO0tBQ2hDLEtBQUs7S0FDTCxPQUFPLFNBQVMsU0FmVEEsbUJBQW1CO09BQUE7O09BQzFCLE9BQU8sS0FBS0MsZ0JBQWdCRCxtQkFBbUJ0UCxLQUFLLFlBQU07U0FDeEQsTUFBSzVDLEtBQUtlLEtBQUs7OztNQW9CaEI7S0FDRCxLQUFLO0tBQ0wsT0FBTyxTQUFTLGdCQWxCRm1SLG1CQUFtQjtPQUFBOztPQUNqQyxPQUFPQSxrQkFBa0JDLGdCQUFnQixJQUFJdlAsS0FBSyxVQUFDUyxNQUFTO1NBQzFELE9BQUswTyxlQUFlMU87O1NBRXBCLE9BQU8sT0FBSzBPOzs7OztHQXlCaEIsT0FBTyIsImZpbGUiOiJpbmRleC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2YzczNzkxZWVjZDk1Mzc2NzA2YyIsIi8qIGdsb2JhbCBtYWxhcmtleTpmYWxzZSwgbW9tZW50OmZhbHNlICovXG5cbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vaW5kZXguY29uZmlnJztcbmltcG9ydCB7IHJvdXRlckNvbmZpZyB9IGZyb20gJy4vaW5kZXgucm91dGUnO1xuaW1wb3J0IHsgcnVuQmxvY2sgfSBmcm9tICcuL2luZGV4LnJ1bic7XG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciB9IGZyb20gJy4vbWFpbi9tYWluLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgSG9tZUNvbnRyb2xsZXIgfSBmcm9tICcuL3NjcmlwdHMvY29udHJvbGxlcnMvaG9tZS5jb250cm9sbGVyJztcbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICcuL3NjcmlwdHMvY29udHJvbGxlcnMvbmF2LmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXIgfSBmcm9tICcuL3NjcmlwdHMvY29udHJvbGxlcnMvcmVnaXN0cmF0aW9ucy5jb250cm9sbGVyJztcbmltcG9ydCB7IFNlc3Npb25zQ29udHJvbGxlciB9IGZyb20gJy4vc2NyaXB0cy9jb250cm9sbGVycy9zZXNzaW9ucy5jb250cm9sbGVyJztcbmltcG9ydCB7IEJ1YmJsZUNvbnRyb2xsZXIgfSBmcm9tICcuL3NjcmlwdHMvY29udHJvbGxlcnMvYnViYmxlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvZ2l0aHViQ29udHJpYnV0b3IvZ2l0aHViQ29udHJpYnV0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBXZWJEZXZUZWNTZXJ2aWNlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvd2ViRGV2VGVjL3dlYkRldlRlYy5zZXJ2aWNlJztcbmltcG9ydCB7IFlvdVR1YmVBcGlLZXlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvYXBpa2V5cy95b3VUdWJlQXBpS2V5LnNlcnZpY2UnO1xuaW1wb3J0IHsgTmF2YmFyRGlyZWN0aXZlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWFsYXJrZXlEaXJlY3RpdmUgfSBmcm9tICcuLi9hcHAvY29tcG9uZW50cy9tYWxhcmtleS9tYWxhcmtleS5kaXJlY3RpdmUnO1xuXG52YXIgZGV2QXBpVXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcgO1xudmFyIHByb2RBcGlVcmwgPSAnaHR0cHM6Ly9tZWx0ZWRyYWRpby5oZXJva3VhcHAuY29tJztcblxuYW5ndWxhci5tb2R1bGUoJ21lbHRlZFJhZGlvJywgWyduZ0FuaW1hdGUnLCAnbmdDb29raWVzJywgJ25nVG91Y2gnLCAnbmdTYW5pdGl6ZScsICduZ01lc3NhZ2VzJywgJ25nQXJpYScsICduZ1Jlc291cmNlJywgJ3VpLnJvdXRlcicsICd1aS5ib290c3RyYXAnLCAndG9hc3RyJywgJ25nLXRva2VuLWF1dGgnLCAncmFpbHMnLCAnTG9jYWxTdG9yYWdlTW9kdWxlJ10pXG4gIC5jb25zdGFudCgnbWFsYXJrZXknLCBtYWxhcmtleSlcbiAgLmNvbnN0YW50KCdtb21lbnQnLCBtb21lbnQpXG4gIC5jb25maWcoY29uZmlnKVxuICAuY29uZmlnKHJvdXRlckNvbmZpZylcbiAgLmNvbmZpZyhmdW5jdGlvbigkYXV0aFByb3ZpZGVyKSB7XG4gICAgICRhdXRoUHJvdmlkZXIuY29uZmlndXJlKHtcbiAgICAgICAgIGFwaVVybDogZGV2QXBpVXJsXG4gICAgIH0pO1xuICAgfSlcbiAgIC5jb25maWcoZnVuY3Rpb24obG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyKXtcbiAgICAgbG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyLnNldFByZWZpeCgnbWVsdGVkUmFkaW8nKTtcbiAgIH0pXG4gICAuY29uZmlnKGZ1bmN0aW9uKHJhaWxzU2VyaWFsaXplclByb3ZpZGVyKXtcbiAgICAgcmFpbHNTZXJpYWxpemVyUHJvdmlkZXIudW5kZXJzY29yZShhbmd1bGFyLmlkZW50aXR5KS5jYW1lbGl6ZShhbmd1bGFyLmlkZW50aXR5KTtcbiAgIH0pXG4gIC5ydW4ocnVuQmxvY2spXG4gIC5zZXJ2aWNlKCdnaXRodWJDb250cmlidXRvcicsIEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSlcbiAgLnNlcnZpY2UoJ3dlYkRldlRlYycsIFdlYkRldlRlY1NlcnZpY2UpXG4gIC5zZXJ2aWNlKCdZb3VUdWJlQXBpS2V5U2VydmljZScsIFlvdVR1YmVBcGlLZXlTZXJ2aWNlKVxuICAuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgSG9tZUNvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdOYXZDb250cm9sbGVyJywgTmF2Q29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ1JlZ2lzdHJhdGlvbnNDb250cm9sbGVyJywgUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdTZXNzaW9uc0NvbnRyb2xsZXInLCBTZXNzaW9uc0NvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdCdWJibGVDb250cm9sbGVyJywgQnViYmxlQ29udHJvbGxlcilcbiAgLmRpcmVjdGl2ZSgnYWNtZU5hdmJhcicsIE5hdmJhckRpcmVjdGl2ZSlcbiAgLmRpcmVjdGl2ZSgnYWNtZU1hbGFya2V5JywgTWFsYXJrZXlEaXJlY3RpdmUpXG4gIC5kaXJlY3RpdmUoJ29uRmluaXNoUmVuZGVyJywgZnVuY3Rpb24oJHRpbWVvdXQpe1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XG4gICAgICAgIGlmIChzY29wZS4kbGFzdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLiRlbWl0KGF0dHIub25GaW5pc2hSZW5kZXIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICB9O1xuXG4gIH0pXG4gIC5mYWN0b3J5KCdBcGlTeW5jJywgZnVuY3Rpb24oKXtcbiAgICB2YXIgQXBpU3luYyA9IHt9O1xuXG4gICAgQXBpU3luYy5zZXRQbGF5bGlzdHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgIEFwaVN5bmMucGxheWxpc3RzID0gb2JqO1xuICAgIH07XG5cbiAgICBBcGlTeW5jLnNldFNvbmdzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIEFwaVN5bmMuc29uZ3MgPSBvYmo7XG4gICAgfTtcblxuICAgIEFwaVN5bmMuZ2V0UGxheWxpc3RzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gQXBpU3luYy5wbGF5bGlzdHM7XG4gICAgfTtcblxuICAgIEFwaVN5bmMuZ2V0U29uZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBBcGlTeW5jLnNvbmdzO1xuICAgIH07XG5cbiAgICByZXR1cm4gQXBpU3luYztcbiAgfSlcbiAgLmZhY3RvcnkoJ1BsYXlsaXN0JywgZnVuY3Rpb24ocmFpbHNSZXNvdXJjZUZhY3RvcnkpIHtcbiAgICByZXR1cm4gcmFpbHNSZXNvdXJjZUZhY3Rvcnkoe1xuICAgICAgdXJsOiBkZXZBcGlVcmwrJy9wbGF5bGlzdHMnLFxuICAgICAgbmFtZTogJ3BsYXlsaXN0J1xuICAgIH0pO1xuICB9KVxuICAuZmFjdG9yeSgnVXNlcicsZnVuY3Rpb24ocmFpbHNSZXNvdXJjZUZhY3Rvcnkpe1xuICAgIHJldHVybiByYWlsc1Jlc291cmNlRmFjdG9yeSh7XG4gICAgICB1cmw6IGRldkFwaVVybCArJy91c2Vycy97e3VzZXJJZH19L3BsYXlsaXN0cycsXG4gICAgICBuYW1lOiAndXNlcidcbiAgICB9KTtcbiAgfSlcbiAgLmZhY3RvcnkoJ1NvbmcnLCBmdW5jdGlvbihyYWlsc1Jlc291cmNlRmFjdG9yeSl7XG4gICAgcmV0dXJuIHJhaWxzUmVzb3VyY2VGYWN0b3J5KHtcbiAgICAgIHVybDogZGV2QXBpVXJsICsgJy9wbGF5bGlzdHMve3twbGF5bGlzdElkfX0vc29uZ3MnLFxuICAgICAgbmFtZTogJ3NvbmcnXG4gICAgfSk7XG4gIH0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJleHBvcnQgZnVuY3Rpb24gY29uZmlnICgkbG9nUHJvdmlkZXIsIHRvYXN0ckNvbmZpZykge1xuICAnbmdJbmplY3QnO1xuICAvLyBFbmFibGUgbG9nXG4gICRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XG5cbiAgLy8gU2V0IG9wdGlvbnMgdGhpcmQtcGFydHkgbGliXG4gIHRvYXN0ckNvbmZpZy5hbGxvd0h0bWwgPSB0cnVlO1xuICB0b2FzdHJDb25maWcudGltZU91dCA9IDMwMDA7XG4gIHRvYXN0ckNvbmZpZy5wb3NpdGlvbkNsYXNzID0gJ3RvYXN0LXRvcC1yaWdodCc7XG4gIHRvYXN0ckNvbmZpZy5wcmV2ZW50RHVwbGljYXRlcyA9IHRydWU7XG4gIHRvYXN0ckNvbmZpZy5wcm9ncmVzc0JhciA9IHRydWU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4LmNvbmZpZy5qcyIsImV4cG9ydCBmdW5jdGlvbiByb3V0ZXJDb25maWcgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgJ25nSW5qZWN0JztcbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ21haW4nLCB7XG4gICAgICB1cmw6ICcvJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL21haW4vbWFpbi5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcicsXG4gICAgICBjb250cm9sbGVyQXM6ICdtYWluJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdzaWduX2luJywge1xuICAgICAgdXJsOiAnL3NpZ25faW4nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdmlld3MvdXNlcl9zZXNzaW9ucy9uZXcuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnU2Vzc2lvbnNDb250cm9sbGVyIGFzIHNpZ25pbidcbiAgICB9KVxuICAgIC5zdGF0ZSgnc2lnbl91cCcsIHtcbiAgICAgIHVybDogJy9zaWduX3VwJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL3VzZXJfcmVnaXN0cmF0aW9ucy9uZXcuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXIgYXMgc2lnbnVwJ1xuICAgIH0pXG4gICAgLnN0YXRlICAoJ2hvbWUnLCB7XG4gICAgICB1cmw6ICcvdXNlcnMvOmlkJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL2hvbWUuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXIgYXMgaG9tZScsXG4gICAgICByZXNvbHZlOiB7XG4gICAgICAgICBhdXRoOiBmdW5jdGlvbigkYXV0aCkge1xuICAgICAgICAgICByZXR1cm4gJGF1dGgudmFsaWRhdGVVc2VyKCk7XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgIH0pO1xuXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXgucm91dGUuanMiLCJleHBvcnQgZnVuY3Rpb24gcnVuQmxvY2sgKCRsb2cpIHtcbiAgJ25nSW5qZWN0JztcbiAgJGxvZy5kZWJ1ZygncnVuQmxvY2sgZW5kJyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsImV4cG9ydCBjbGFzcyBNYWluQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yICgkdGltZW91dCwgd2ViRGV2VGVjLCB0b2FzdHIpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy5hd2Vzb21lVGhpbmdzID0gW107XG4gICAgdGhpcy5jbGFzc0FuaW1hdGlvbiA9ICcnO1xuICAgIHRoaXMuY3JlYXRpb25EYXRlID0gMTQ4MTYzOTcwNDEwNztcbiAgICB0aGlzLnRvYXN0ciA9IHRvYXN0cjtcblxuXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGltZW91dCwgd2ViRGV2VGVjKTtcbiAgfVxuXG4gIGFjdGl2YXRlKCR0aW1lb3V0LCB3ZWJEZXZUZWMpIHtcbiAgICB0aGlzLmdldFdlYkRldlRlYyh3ZWJEZXZUZWMpO1xuICAgICR0aW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xhc3NBbmltYXRpb24gPSAncnViYmVyQmFuZCc7XG4gICAgfSwgNDAwMCk7XG4gIH1cblxuICBnZXRXZWJEZXZUZWMod2ViRGV2VGVjKSB7XG4gICAgdGhpcy5hd2Vzb21lVGhpbmdzID0gd2ViRGV2VGVjLmdldFRlYygpO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuYXdlc29tZVRoaW5ncywgKGF3ZXNvbWVUaGluZykgPT4ge1xuICAgICAgYXdlc29tZVRoaW5nLnJhbmsgPSBNYXRoLnJhbmRvbSgpO1xuICAgIH0pO1xuICB9XG5cbiAgc2hvd1RvYXN0cigpIHtcbiAgICB0aGlzLnRvYXN0ci5pbmZvKCdGb3JrIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vU3dpaXAvZ2VuZXJhdG9yLWd1bHAtYW5ndWxhclwiIHRhcmdldD1cIl9ibGFua1wiPjxiPmdlbmVyYXRvci1ndWxwLWFuZ3VsYXI8L2I+PC9hPicpO1xuICAgIHRoaXMuY2xhc3NBbmltYXRpb24gPSAnJztcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9tYWluL21haW4uY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBIb21lQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yICgkc2NvcGUsICRyb290U2NvcGUsICRhdXRoLCAkbG9jYXRpb24sIFVzZXIsIFBsYXlsaXN0LGxvY2FsU3RvcmFnZVNlcnZpY2UsICR1aWJNb2RhbCwgU29uZywgQXBpU3luYywgJGh0dHAsJHNjZSwgJHdpbmRvdywgJGxvZywgWW91VHViZUFwaUtleVNlcnZpY2UpIHtcbiAgICAnbmdJbmplY3QnO1xuICAgICRzY29wZS51c2VyU2lnbmVkSW4gPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnY3VycmVudFVzZXInKTtcbiAgICAkcm9vdFNjb3BlLmN1cnJlbnRQbGF5bGlzdCA9IG51bGw7XG4gICAgJHNjb3BlLnNvbmdzID0gbnVsbDtcbiAgICAkc2NvcGUuY3VycmVudFNvbmcgPSBudWxsO1xuICAgICRzY29wZS5wcmV2aW91c1NvbmcgPSBudWxsO1xuICAgICRzY29wZS5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICB2YXIgcGxheWVyO1xuICAgIHZhciB2aWRBcnJheSA9IFtdO1xuICAgIHZhciBzZWFyY2hDdXJyZW50U29uZyA9IG51bGw7XG4gICAgdmFyIHByb2RBcGlVcmwgPSAnaHR0cHM6Ly9tZWx0ZWRyYWRpby5oZXJva3VhcHAuY29tLyc7XG4gICAgdmFyIGRldkFwaVVybCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvJztcblxuICAgIChmdW5jdGlvbiBjaGFuZ2VOYXZDb2xvcigpe1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnY29sb3InLCd3aGl0ZScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ2JsYWNrJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsI2Rlc2t0b3AtbmF2LW1lbnUnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCdibGFjaycpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCd1bCNtb2JpbGUtbmF2LW1lbnUtYmxhY2snKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCdibGFjaycpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCd1bC5uYXYtbWVudSBhJykuY3NzKCdjb2xvcicsJ3doaXRlJyk7XG4gICAgfSkoKTtcblxuICAgIGlmKCRzY29wZS51c2VyU2lnbmVkSW4pIHtcblxuICAgICAgVXNlci5xdWVyeSh7cGxheWxpc3RJZDogJyd9LHt1c2VySWQ6ICRzY29wZS51c2VyU2lnbmVkSW4uaWR9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpe1xuICAgICAgICBBcGlTeW5jLnNldFBsYXlsaXN0cyhyZXN1bHRzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgICRzY29wZS5nZXRDdXJyZW50UGxheWxpc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkcm9vdFNjb3BlLmN1cnJlbnRQbGF5bGlzdDtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnBsYXlsaXN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEFwaVN5bmMuZ2V0UGxheWxpc3RzKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5zb25ncyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICBBcGlTeW5jLmdldFNvbmdzKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5uZXdQbGF5bGlzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLm1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL2FkZHBsYXlsaXN0Lmh0bWwnLFxuICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYoJHNjb3BlLnRleHQpIHtcblxuICAgICAgICRodHRwKHtcbiAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgdXJsOiAgZGV2QXBpVXJsICsndXNlcnMvJyArICRzY29wZS51c2VyU2lnbmVkSW4uaWQgKyAnL3BsYXlsaXN0cycsXG4gICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgIHRpdGxlOiAkc2NvcGUudGV4dFxuICAgICAgICAgfVxuICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0cyl7XG5cbiAgICAgICAgIEFwaVN5bmMuc2V0UGxheWxpc3RzKHJlc3VsdHMuZGF0YSk7XG4gICAgICAgICAkc2NvcGUuc2V0UGxheWxpc3QocmVzdWx0cy5kYXRhW3Jlc3VsdHMuZGF0YS5sZW5ndGggLSAxXSk7XG4gICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS50ZXh0ID0gJyc7XG4gICAgICAgICRzY29wZS5tb2RhbEluc3RhbmNlLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5kaXNtaXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUubW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnNldFBsYXlsaXN0ID0gZnVuY3Rpb24ocGxheWxpc3QpIHtcblxuICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnZGl2LnBsYXlsaXN0LWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnb3ZlcmZsb3cnKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2N1cnJlbnRQbGF5bGlzdCcsIHBsYXlsaXN0KTtcbiAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50UGxheWxpc3QgPSAgbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2N1cnJlbnRQbGF5bGlzdCcpO1xuXG4gICAgICAgIGlmKCRyb290U2NvcGUuY3VycmVudFBsYXlsaXN0KSB7XG5cbiAgICAgICAgICBTb25nLnF1ZXJ5KHtzb25nSWQ6ICcnfSx7cGxheWxpc3RJZDogJHJvb3RTY29wZS5jdXJyZW50UGxheWxpc3QuaWR9KS50aGVuKGZ1bmN0aW9uKHNvbmdzKXtcblxuICAgICAgICAgICAgIEFwaVN5bmMuc2V0U29uZ3Moc29uZ3MpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0VmlkZW9Tb25nID0gZnVuY3Rpb24ocGxheWxpc3QsIHZpZGVvKSB7XG5cbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgndWwjJyt2aWRlby5pZC52aWRlb0lkKS50b2dnbGUoXCJzbG93XCIpO1xuXG4gICAgIHZhciBnZXRWaWRlb0luZm9VcmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My92aWRlb3M/JytcbiAgICAgICAgICAgICAgICAgICAnaWQ9JytcbiAgICAgICAgICAgICAgICAgICB2aWRlby5pZC52aWRlb0lkK1xuICAgICAgICAgICAgICAgICAgICcma2V5PScrXG4gICAgICAgICAgICAgICAgICAgWW91VHViZUFwaUtleVNlcnZpY2UuYXBpS2V5KCkrXG4gICAgICAgICAgICAgICAgICAgJyZwYXJ0PXNuaXBwZXQsY29udGVudERldGFpbHMnO1xuICAgICAgICAgJGh0dHAoe1xuXG4gICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgIHVybDogZ2V0VmlkZW9JbmZvVXJsXG5cbiAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0cyl7XG5cbiAgICAgICAgICAgYWRkVmlkZW9Ub1BsYXlsaXN0KHBsYXlsaXN0LHJlc3VsdHMuZGF0YS5pdGVtc1swXSk7XG5cbiAgICAgICAgIH0sZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAkbG9nKGVycm9yKTtcbiAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuY29udmVydER1cmF0aW9uID0gZnVuY3Rpb24oc3RyaW5nKSB7XG5cbiAgICAgICAgdmFyIGFycmF5ID0gc3RyaW5nLm1hdGNoKC8oXFxkKykoPz1bTUhTXSkvaWcpfHxbXTtcbiAgICAgICAgdmFyIGZvcm1hdHRlZCA9IGFycmF5Lm1hcChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICBpZihpdGVtLmxlbmd0aDwyKSByZXR1cm4gJzAnK2l0ZW07XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSkuam9pbignOicpO1xuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWQ7XG5cbiAgICB9O1xuXG4gICBmdW5jdGlvbiBhZGRWaWRlb1RvUGxheWxpc3QocGxheWxpc3QsIHZpZGVvKSB7XG5cbiAgICAgICAkaHR0cCh7XG4gICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgIHVybDogZGV2QXBpVXJsICsgJ3BsYXlsaXN0cy8nICsgcGxheWxpc3QuaWQgKycvc29uZ3MnLFxuICAgICAgICAgZGF0YToge1xuICAgICAgICAgICB0aXRsZTogdmlkZW8uc25pcHBldC50aXRsZSxcbiAgICAgICAgICAgYXJ0aXN0OiB2aWRlby5zbmlwcGV0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICB1cmw6IHZpZGVvLmlkLFxuICAgICAgICAgICBkdXJhdGlvbjogdmlkZW8uY29udGVudERldGFpbHMuZHVyYXRpb25cbiAgICAgICAgIH1cbiAgICAgICB9KS50aGVuKFxuICAgICAgICAgZnVuY3Rpb24ocmVzdWx0cyl7XG4gICAgICAgICAgIEFwaVN5bmMuc2V0U29uZ3MocmVzdWx0cy5kYXRhKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVsZXRlU29uZyA9IGZ1bmN0aW9uKHNvbmcpIHtcblxuICAgICAgICRodHRwKHtcbiAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICB1cmw6IGRldkFwaVVybCArICdwbGF5bGlzdHMvJyArICRyb290U2NvcGUuY3VycmVudFBsYXlsaXN0LmlkICsnL3NvbmdzLycrIHNvbmcuaWRcbiAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcblxuICAgICAgICAgJHNjb3BlLnNldFBsYXlsaXN0KHJlc3BvbnNlLmRhdGEuY3VycmVudF9wbGF5bGlzdCk7XG4gICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgJGxvZyhlcnJvcik7XG4gICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5kZWxldGVQbGF5bGlzdCA9IGZ1bmN0aW9uKHBsYXlsaXN0KXtcblxuICAgICAgJGh0dHAoe1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICB1cmw6IGRldkFwaVVybCArICcvdXNlcnMvJyArIHBsYXlsaXN0LnVzZXJfaWQgKycvcGxheWxpc3RzLycgKyBwbGF5bGlzdC5pZFxuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICBBcGlTeW5jLnNldFBsYXlsaXN0cyhyZXNwb25zZS5kYXRhLnVzZXJfcGxheWxpc3RzKTtcbiAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgJGxvZyhlcnJvcik7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHNldFNlYXJjaFJlc3VsdHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICRzY29wZS52aWRlb3MgPSBvYmo7XG4gICAgfTtcblxuICAgICRzY29wZS5nZXRWaWRlb3MgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIGlmKCRzY29wZS50ZXh0KSB7XG5cbiAgICAgICAgICRzY29wZS5zZXRQbGF5bGlzdChudWxsKTtcbiAgICAgICAgIHZhciBzZWFyY2hUZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KCRzY29wZS50ZXh0KS5yZXBsYWNlKC8lMjAvZywgJysnKTtcbiAgICAgICAgIHZhciBteVVybCA9ICAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My8nK1xuICAgICAgICAgICAgICAgICAgICAgICdzZWFyY2g/cGFydD1zbmlwcGV0JytcbiAgICAgICAgICAgICAgICAgICAgICAnJnR5cGU9dmlkZW8nK1xuICAgICAgICAgICAgICAgICAgICAgICcmcT0nK1xuICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFRleHQrXG4gICAgICAgICAgICAgICAgICAgICAgJyZrZXk9JytcbiAgICAgICAgICAgICAgICAgICAgICBZb3VUdWJlQXBpS2V5U2VydmljZS5hcGlLZXkoKTtcbiAgICAgICAgJGh0dHAoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBteVVybFxuXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuXG4gICAgICAgICAgc2V0U2VhcmNoUmVzdWx0cyhyZXNwb25zZS5kYXRhLml0ZW1zKTtcblxuICAgICAgICB9LGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldFVybCA9IGZ1bmN0aW9uKHZpZGVvKSB7XG4gICAgICByZXR1cm4gXCIvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9cIit2aWRlby5pZC52aWRlb0lkK1wiP2VuYWJsZWpzYXBpPTFcIjtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnRydXN0U3JjID0gZnVuY3Rpb24oc3JjKSB7XG4gICAgICByZXR1cm4gJHNjZS50cnVzdEFzUmVzb3VyY2VVcmwoc3JjKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnRvZ2dsZU1lbnUgPSBmdW5jdGlvbih2aWRlb0lkKSB7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsIycrdmlkZW9JZCkudG9nZ2xlKFwic2xvd1wiKTtcbiAgICB9O1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoKSB7XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8ICRzY29wZS52aWRlb3MubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgIHZhciBpZCA9ICd2aWQtJysoaSsxKTtcbiAgICAgICAgICB2YXIgdmlkUGxheWVyT2JqID0gbmV3IFlULlBsYXllcihpZCwge1xuICAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgJ29uU3RhdGVDaGFuZ2UnOiAkc2NvcGUub25QbGF5ZXJTdGF0ZUNoYW5nZVxuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSk7XG4gICAgICAgICAgIHZpZEFycmF5LnB1c2godmlkUGxheWVyT2JqKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICRzY29wZS4kb24oJ25nUmVwZWF0RmluaXNoZWQnLCBmdW5jdGlvbihuZ1JlcGVhdEZpbmlzaGVkRXZlbnQpIHtcblxuICAgICAgIGNyZWF0ZVBsYXllcigpO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLm9uUGxheWVyUmVhZHkgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICBldmVudC50YXJnZXQucGxheVZpZGVvKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5vblBsYXllclN0YXRlQ2hhbmdlID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICBpZihldmVudC5kYXRhID09IFlULlBsYXllclN0YXRlLlBMQVlJTkcpIHtcbiAgICAgICAgICBzZWFyY2hWaWRMb2dpYyhldmVudC50YXJnZXQpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2VhcmNoVmlkTG9naWModmlkZW8pIHtcblxuICAgICAgaWYoJHNjb3BlLmN1cnJlbnRTb25nICYmICRzY29wZS5pc1BsYXlpbmcpIHtcbiAgICAgICAgJHNjb3BlLnBhdXNlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmKHNlYXJjaEN1cnJlbnRTb25nICYmIChzZWFyY2hDdXJyZW50U29uZyAhPT0gdmlkZW8pKSB7XG4gICAgICAgIHNlYXJjaEN1cnJlbnRTb25nLnBhdXNlVmlkZW8oKTtcbiAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcgPSB2aWRlbztcbiAgICAgIH0gZWxzZSBpZihzZWFyY2hDdXJyZW50U29uZyAmJiAoc2VhcmNoQ3VycmVudFNvbmcgPT0gdmlkZW8pKSB7XG4gICAgICAgIHNlYXJjaEN1cnJlbnRTb25nLnBsYXlWaWRlbygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcgPSB2aWRlbztcbiAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcucGxheVZpZGVvKCk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wVmlkZW8oKSB7XG5cbiAgICAgIHBsYXllci5zdG9wVmlkZW8oKTtcbiAgICB9XG5cbiAgICAkc2NvcGUucGxheSA9IGZ1bmN0aW9uKHNvbmcpIHtcblxuICAgICAgICB2YXIgdmlkSGVpZ2h0ID0gYW5ndWxhci5lbGVtZW50KCdkaXYudmlkZW8nKS5oZWlnaHQoKTtcbiAgICAgICAgdmFyIHZpZFdpZHRoID0gYW5ndWxhci5lbGVtZW50KCdkaXYudmlkZW8nKS53aWR0aCgpO1xuICAgICAgICB2YXIgaW5pdGlhbFNvbmcgPSAkc2NvcGUuY3VycmVudFNvbmcgfHwgJHNjb3BlLnNvbmdzKClbMF07XG4gICAgICAgIHZhciB2aWRQbGF5ID0gc29uZyB8fCBpbml0aWFsU29uZztcblxuXG4gICAgICAgIC8vIHN0b3BzIHBsYXllciBwbGF5aW5nIGluIHNlYXJjaCByZXN1bHRzIHdoZW4gcGxheWluZyBhbm90aGVyIHNvbmcgaW4gcGxheWxpc3RcblxuICAgICAgICBpZihzZWFyY2hDdXJyZW50U29uZykge1xuICAgICAgICAgIHNlYXJjaEN1cnJlbnRTb25nLnN0b3BWaWRlbygpO1xuICAgICAgICAgIHNlYXJjaEN1cnJlbnRTb25nID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgIC8vIGlmIHRoZXJlJ3Mgbm8gY3VycmVudFNvbmcgY3JlYXRlIHlvdXR1YmUgcGxheWVyXG4gICAgICAgIGlmKCEkc2NvcGUuY3VycmVudFNvbmcpIHtcblxuICAgICAgICAgcGxheWVyID0gbmV3IFlULlBsYXllcignaWZyYW1lLXV0dWJlLXBsYXllcicsIHtcbiAgICAgICAgICAgaGVpZ2h0OiB2aWRIZWlnaHQsXG4gICAgICAgICAgIHdpZHRoOiAgdmlkV2lkdGgsXG4gICAgICAgICAgIHZpZGVvSWQ6IHZpZFBsYXkudXJsLFxuICAgICAgICAgICBwbGF5ZXJWYXJzOiB7J2NvbnRyb2xzJzogMCwgJ3JlbCc6IDB9LFxuICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAnb25SZWFkeSc6ICRzY29wZS5vblBsYXllclJlYWR5XG4gICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgICAgIH0gZWxzZSBpZihzb25nID09ICRzY29wZS5jdXJyZW50U29uZyB8fCAoJHNjb3BlLmN1cnJlbnRTb25nICYmICFzb25nKSkge1xuICAgICAgICAgICAgcGxheWVyLnBsYXlWaWRlbygpO1xuICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBwbGF5ZXIubG9hZFZpZGVvQnlJZCh7XG4gICAgICAgICAgICAndmlkZW9JZCc6IHZpZFBsYXkudXJsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkc2NvcGUuY3VycmVudFNvbmcucGxheWluZyA9IG51bGw7XG4gICAgICAgfVxuXG4gICAgICAgJHNjb3BlLmN1cnJlbnRTb25nID0gdmlkUGxheTtcbiAgICAgICAkc2NvcGUuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAkc2NvcGUuY3VycmVudFNvbmcucGxheWluZyA9IHRydWU7XG5cbiAgICAgICBpZihzb25nKSB7XG4gICAgICAgICBzb25nLnBsYXlpbmcgPSB0cnVlO1xuICAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLnBhdXNlID0gZnVuY3Rpb24oc29uZykge1xuXG4gICAgICAgJHNjb3BlLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICAgaWYoc29uZyl7XG4gICAgICAgICBzb25nLnBsYXlpbmcgPSBudWxsO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAkc2NvcGUuY3VycmVudFNvbmcucGxheWluZyA9IG51bGw7XG4gICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRTb25nSW5kZXgoc29uZykge1xuICAgICAgcmV0dXJuIHNvbmdzKCkuaW5kZXhPZihzb25nKTtcbiAgICB9XG5cbiAgICAkc2NvcGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgc29uZ3NBcnJheSA9ICRzY29wZS5zb25ncygpO1xuICAgICAgdmFyIGxhc3RJbmRleCA9IHNvbmdzQXJyYXkubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBpbmRleE9mQ3VycmVudFNvbmcgPSBzb25nc0FycmF5LmluZGV4T2YoJHNjb3BlLmN1cnJlbnRTb25nKTtcbiAgICAgIHZhciBzb25nVG9QbGF5ID0gbnVsbDtcblxuICAgICAgaWYoJHNjb3BlLmN1cnJlbnRTb25nKSB7XG4gICAgICAgIGlmKGluZGV4T2ZDdXJyZW50U29uZyA8IGxhc3RJbmRleCApIHtcblxuICAgICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtpbmRleE9mQ3VycmVudFNvbmcgKyAxXTtcblxuICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICBpbmRleE9mQ3VycmVudFNvbmcgPSAwO1xuICAgICAgICAgICBzb25nVG9QbGF5ICA9IHNvbmdzQXJyYXlbaW5kZXhPZkN1cnJlbnRTb25nXTtcbiAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVswXTtcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLnBsYXkoc29uZ1RvUGxheSk7XG4gICB9O1xuXG4gICAkc2NvcGUucHJldmlvdXMgPSBmdW5jdGlvbigpIHtcblxuICAgICB2YXIgc29uZ3NBcnJheSA9ICRzY29wZS5zb25ncygpO1xuICAgICB2YXIgbGFzdEluZGV4ID0gc29uZ3NBcnJheS5sZW5ndGggLSAxO1xuICAgICB2YXIgaW5kZXhPZkN1cnJlbnRTb25nID0gc29uZ3NBcnJheS5pbmRleE9mKCRzY29wZS5jdXJyZW50U29uZyk7XG4gICAgIHZhciBzb25nVG9QbGF5ID0gbnVsbDtcblxuICAgICBpZigkc2NvcGUuY3VycmVudFNvbmcpIHtcbiAgICAgICBpZihpbmRleE9mQ3VycmVudFNvbmcgPiAwICkge1xuXG4gICAgICAgICBzb25nVG9QbGF5ICA9IHNvbmdzQXJyYXlbaW5kZXhPZkN1cnJlbnRTb25nIC0gMV07XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIGluZGV4T2ZDdXJyZW50U29uZyA9IGxhc3RJbmRleDtcbiAgICAgICAgICBzb25nVG9QbGF5ICA9IHNvbmdzQXJyYXlbaW5kZXhPZkN1cnJlbnRTb25nXTtcbiAgICAgICAgfVxuICAgICB9IGVsc2Uge1xuICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtsYXN0SW5kZXhdO1xuICAgICB9XG5cbiAgICAgJHNjb3BlLnBsYXkoc29uZ1RvUGxheSk7XG4gICAgfTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL2hvbWUuY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBOYXZDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkcm9vdFNjb3BlLCAkYXV0aCwgJGxvY2F0aW9uLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlLCAkaHR0cCwgQXBpU3luYywgU29uZykge1xuICAgICduZ0luamVjdCc7XG4gICAgZnVuY3Rpb24gY2hhbmdlTmF2Q29sb3IoKXtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnbmF2Lm5hdi1iYXInKS5jc3MoJ2NvbG9yJywnYmxhY2snKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnbmF2Lm5hdi1iYXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCd3aGl0ZScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhciB1bCcpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ3doaXRlJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsLm5hdi1tZW51IGEnKS5jc3MoJ2NvbG9yJywnYmxhY2snKTtcbiAgICB9XG5cbiAgICAkc2NvcGUuaXNfb3BlbiA9IGZhbHNlO1xuXG4gICAgJHNjb3BlLnBsYXlsaXN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEFwaVN5bmMuZ2V0UGxheWxpc3RzKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5zZXRQbGF5bGlzdCA9IGZ1bmN0aW9uKHBsYXlsaXN0KSB7XG5cbiAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ2Rpdi5wbGF5bGlzdC1jb250ZW50JykucmVtb3ZlQ2xhc3MoJ292ZXJmbG93Jyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdjdXJyZW50UGxheWxpc3QnLCBwbGF5bGlzdCk7XG4gICAgICAgICRyb290U2NvcGUuY3VycmVudFBsYXlsaXN0ID0gIGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdjdXJyZW50UGxheWxpc3QnKTtcblxuICAgICAgICBpZigkcm9vdFNjb3BlLmN1cnJlbnRQbGF5bGlzdCkge1xuXG4gICAgICAgICAgU29uZy5xdWVyeSh7c29uZ0lkOiAnJ30se3BsYXlsaXN0SWQ6ICRyb290U2NvcGUuY3VycmVudFBsYXlsaXN0LmlkfSkudGhlbihmdW5jdGlvbihzb25ncyl7XG5cbiAgICAgICAgICAgICBBcGlTeW5jLnNldFNvbmdzKHNvbmdzKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5wYWdlUmVkaXJlY3QgPSBmdW5jdGlvbigpIHtcblxuICAgICAgaWYoJHJvb3RTY29wZS51c2VyLmlkKSB7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvdXNlcnMvJysgJHJvb3RTY29wZS51c2VyLmlkKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLnNpZ25PdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICRhdXRoLnNpZ25PdXQoKTtcbiAgICB9O1xuXG4gICAgJHJvb3RTY29wZS4kb24oJ2F1dGg6bG9nb3V0LXN1Y2Nlc3MnLCBmdW5jdGlvbihldikge1xuICAgICAgJHNjb3BlLnVzZXJTaWduZWRJbiA9IG51bGw7XG4gICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZSgnY3VycmVudFVzZXInKTtcbiAgICAgIGNoYW5nZU5hdkNvbG9yKCk7XG4gICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLnRvZ2dsZU1lbnUgPSBmdW5jdGlvbihldmVudCwgeF9pZCkge1xuXG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJyNtb2JpbGUtaGFtLWJsYWNrJykudG9nZ2xlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI21vYmlsZS1oYW0td2hpdGUnKS50b2dnbGVDbGFzcygnaGlkZScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCcjbW9iaWxlLXgtYmxhY2snKS50b2dnbGVDbGFzcygnZGlzcGxheScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCcjbW9iaWxlLXgtd2hpdGUnKS50b2dnbGVDbGFzcygnZGlzcGxheScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCdkaXYjJysgeF9pZCkudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXknKTtcblxuICAgIH07XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9uYXYuY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBSZWdpc3RyYXRpb25zQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGF1dGgsICRyb290U2NvcGUsICRsb2NhdGlvbiwgbG9jYWxTdG9yYWdlU2VydmljZSl7XG4gICAgJ25nSW5qZWN0JztcbiAgICBcbiAgICB2YXIgc2V0VXNlciA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdjdXJyZW50VXNlcicsIG9iaik7XG4gICAgfTtcblxuICAgICRzY29wZS5zdWJtaXRSZWdpc3RyYXRpb24gPSBmdW5jdGlvbihyZWdpc3RyYXRpb25Gb3JtKSB7XG5cbiAgICAgICRhdXRoLnN1Ym1pdFJlZ2lzdHJhdGlvbihyZWdpc3RyYXRpb25Gb3JtKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcblxuICAgICAgICAgICRhdXRoLnN1Ym1pdExvZ2luKHtcbiAgICAgICAgICAgIGVtYWlsOiByZWdpc3RyYXRpb25Gb3JtLmVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHJlZ2lzdHJhdGlvbkZvcm0ucGFzc3dvcmRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgJHJvb3RTY29wZS4kb24oJ2F1dGg6bG9naW4tc3VjY2VzcycsIGZ1bmN0aW9uKGV2LCB1c2VyKSB7XG5cbiAgICAgIHNldFVzZXIodXNlcik7XG4gICAgICAkbG9jYXRpb24ucGF0aCgnL3VzZXJzLycrIHVzZXIuaWQpO1xuXG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9yZWdpc3RyYXRpb25zLmNvbnRyb2xsZXIuanMiLCJleHBvcnQgY2xhc3MgU2Vzc2lvbnNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkYXV0aCwgJHJvb3RTY29wZSwgJGxvY2F0aW9uLCBVc2VyLCBQbGF5bGlzdCwgbG9jYWxTdG9yYWdlU2VydmljZSl7XG4gICAgJ25nSW5qZWN0JztcbiAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuXG4gICAgdmFyIHNldFVzZXIgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnY3VycmVudFVzZXInLCBvYmopO1xuICAgIH07XG5cblxuICAgJHNjb3BlLnN1Ym1pdExvZ2luID0gZnVuY3Rpb24obG9naW5Gb3JtKSB7XG4gICAgICRhdXRoLnN1Ym1pdExvZ2luKGxvZ2luRm9ybSkudGhlbihmdW5jdGlvbih1c2VyKSB7XG5cbiAgICAgICAgICAgICBzZXRVc2VyKHVzZXIpO1xuICAgICB9KTtcbiAgIH07XG5cbiAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ2luLXN1Y2Nlc3MnLCBmdW5jdGlvbihldiwgdXNlcikge1xuXG4gICAgICRsb2NhdGlvbi5wYXRoKCcvdXNlcnMvJysgdXNlci5pZCk7XG5cbiAgIH0pO1xuICAgJHJvb3RTY29wZS4kb24oJ2F1dGg6bG9naW4tZXJyb3InLCBmdW5jdGlvbihldiwgcmVhc29uKSB7XG4gICAgICRzY29wZS5lcnJvciA9IHJlYXNvbi5lcnJvcnNbMF07XG4gICB9KTtcblxuICAgVXNlci5xdWVyeSh7cGxheWxpc3RJZDogJyd9LHt1c2VySWQ6IDF9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpe1xuICAgICAkc2NvcGUudXNlcnMgPSByZXN1bHRzO1xuICAgfSk7XG5cblxuICAgJHNjb3BlLnNpZ25PdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgJGF1dGguc2lnbk91dCgpO1xuICAgfTtcblxuICAgJHJvb3RTY29wZS4kb24oJ2F1dGg6bG9nb3V0LXN1Y2Nlc3MnLCBmdW5jdGlvbihldikge1xuICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9zZXNzaW9ucy5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIEJ1YmJsZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkcm9vdFNjb3BlLCRzY29wZSwkd2luZG93LCAkZG9jdW1lbnQpIHtcbiAgJ25nSW5qZWN0JztcbiAgdmFyIGxhdmEwO1xuICB2YXIgZ2UxZG9vdCA9IHtcbiAgICBzY3JlZW46IHtcbiAgICAgIGVsZW06ICAgICBudWxsLFxuICAgICAgY2FsbGJhY2s6IG51bGwsXG4gICAgICBjdHg6ICAgICAgbnVsbCxcbiAgICAgIHdpZHRoOiAgICAwLFxuICAgICAgaGVpZ2h0OiAgIDAsXG4gICAgICBsZWZ0OiAgICAgMCxcbiAgICAgIHRvcDogICAgICAwLFxuICAgICAgaW5pdDogZnVuY3Rpb24gKGlkLCBjYWxsYmFjaywgaW5pdFJlcykge1xuICAgICAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBudWxsO1xuICAgICAgICBpZiAodGhpcy5lbGVtLnRhZ05hbWUgPT0gXCJDQU5WQVNcIikgdGhpcy5jdHggPSB0aGlzLmVsZW0uZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB0aGlzLmVsZW0ub25zZWxlY3RzdGFydCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIHRoaXMuZWxlbS5vbmRyYWcgICAgICAgID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgaW5pdFJlcyAmJiB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICByZXNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG8gPSB0aGlzLmVsZW07XG4gICAgICAgIHRoaXMud2lkdGggID0gby5vZmZzZXRXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBvLm9mZnNldEhlaWdodDtcbiAgICAgICAgZm9yICh0aGlzLmxlZnQgPSAwLCB0aGlzLnRvcCA9IDA7IG8gIT0gbnVsbDsgbyA9IG8ub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgdGhpcy5sZWZ0ICs9IG8ub2Zmc2V0TGVmdDtcbiAgICAgICAgICB0aGlzLnRvcCAgKz0gby5vZmZzZXRUb3A7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3R4KSB7XG4gICAgICAgICAgdGhpcy5lbGVtLndpZHRoICA9IHRoaXMud2lkdGg7XG4gICAgICAgICAgdGhpcy5lbGVtLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgJiYgdGhpcy5jYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBQb2ludCBjb25zdHJ1Y3RvclxuICB2YXIgUG9pbnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMubWFnbml0dWRlID0geCAqIHggKyB5ICogeTtcbiAgICB0aGlzLmNvbXB1dGVkID0gMDtcbiAgICB0aGlzLmZvcmNlID0gMDtcbiAgfTtcbiAgUG9pbnQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCArIHAueCwgdGhpcy55ICsgcC55KTtcbiAgfTtcblxuICAvLyBCYWxsIGNvbnN0cnVjdG9yXG4gIHZhciBCYWxsID0gZnVuY3Rpb24ocGFyZW50KSB7XG4gICAgdmFyIG1pbiA9IC4xO1xuICAgIHZhciBtYXggPSAxLjU7XG4gICAgdGhpcy52ZWwgPSBuZXcgUG9pbnQoXG4gICAgICAoTWF0aC5yYW5kb20oKSA+IDAuNSA/IDEgOiAtMSkgKiAoMC4yICsgTWF0aC5yYW5kb20oKSAqIDAuMDI1KSwgKE1hdGgucmFuZG9tKCkgPiAwLjUgPyAxIDogLTEpICogKDAuMiArIE1hdGgucmFuZG9tKCkpXG4gICAgKTtcbiAgICB0aGlzLnBvcyA9IG5ldyBQb2ludChcbiAgICAgIHBhcmVudC53aWR0aCAqIDAuMiArIE1hdGgucmFuZG9tKCkgKiBwYXJlbnQud2lkdGggKiAwLjYsXG4gICAgICBwYXJlbnQuaGVpZ2h0ICogMC4yICsgTWF0aC5yYW5kb20oKSAqIHBhcmVudC5oZWlnaHQgKiAwLjZcbiAgICApO1xuICAgIHRoaXMuc2l6ZSA9IChwYXJlbnQud2ggLyAxNSkgKyAoIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbiApICogKHBhcmVudC53aCAvIDE1KTtcbiAgICB0aGlzLndpZHRoID0gcGFyZW50LndpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gcGFyZW50LmhlaWdodDtcbiAgfTtcblxuICAvLyBtb3ZlIGJhbGxzXG4gIEJhbGwucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIGJvdW5jZSBib3JkZXJzXG4gICAgaWYgKHRoaXMucG9zLnggPj0gdGhpcy53aWR0aCAtIHRoaXMuc2l6ZSkge1xuICAgICAgaWYgKHRoaXMudmVsLnggPiAwKSB0aGlzLnZlbC54ID0gLXRoaXMudmVsLng7XG4gICAgICB0aGlzLnBvcy54ID0gdGhpcy53aWR0aCAtIHRoaXMuc2l6ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9zLnggPD0gdGhpcy5zaXplKSB7XG4gICAgICBpZiAodGhpcy52ZWwueCA8IDApIHRoaXMudmVsLnggPSAtdGhpcy52ZWwueDtcbiAgICAgIHRoaXMucG9zLnggPSB0aGlzLnNpemU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9zLnkgPj0gdGhpcy5oZWlnaHQgLSB0aGlzLnNpemUpIHtcbiAgICAgIGlmICh0aGlzLnZlbC55ID4gMCkgdGhpcy52ZWwueSA9IC10aGlzLnZlbC55O1xuICAgICAgdGhpcy5wb3MueSA9IHRoaXMuaGVpZ2h0IC0gdGhpcy5zaXplO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wb3MueSA8PSB0aGlzLnNpemUpIHtcbiAgICAgIGlmICh0aGlzLnZlbC55IDwgMCkgdGhpcy52ZWwueSA9IC10aGlzLnZlbC55O1xuICAgICAgdGhpcy5wb3MueSA9IHRoaXMuc2l6ZTtcbiAgICB9XG5cbiAgICAvLyB2ZWxvY2l0eVxuICAgIHRoaXMucG9zID0gdGhpcy5wb3MuYWRkKHRoaXMudmVsKTtcblxuICB9O1xuXG4gIC8vIGxhdmFsYW1wIGNvbnN0cnVjdG9yXG4gIHZhciBMYXZhTGFtcCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIG51bUJhbGxzLCBjMCwgYzEpIHtcbiAgICB0aGlzLnN0ZXAgPSA1O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLndoID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5zeCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIHRoaXMuc3RlcCk7XG4gICAgdGhpcy5zeSA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQgLyB0aGlzLnN0ZXApO1xuICAgIHRoaXMucGFpbnQgPSBmYWxzZTtcbiAgICB0aGlzLm1ldGFGaWxsID0gY3JlYXRlUmFkaWFsR3JhZGllbnQod2lkdGgsIGhlaWdodCwgd2lkdGgsIGMwLCBjMSk7XG4gICAgdGhpcy5wbHggPSBbMCwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMF07XG4gICAgdGhpcy5wbHkgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMV07XG4gICAgdGhpcy5tc2Nhc2VzID0gWzAsIDMsIDAsIDMsIDEsIDMsIDAsIDMsIDIsIDIsIDAsIDIsIDEsIDEsIDBdO1xuICAgIHRoaXMuaXggPSBbMSwgMCwgLTEsIDAsIDAsIDEsIDAsIC0xLCAtMSwgMCwgMSwgMCwgMCwgMSwgMSwgMCwgMCwgMCwgMSwgMV07XG4gICAgdGhpcy5ncmlkID0gW107XG4gICAgdGhpcy5iYWxscyA9IFtdO1xuICAgIHRoaXMuaXRlciA9IDA7XG4gICAgdGhpcy5zaWduID0gMTtcblxuICAgIC8vIGluaXQgZ3JpZFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgKHRoaXMuc3ggKyAyKSAqICh0aGlzLnN5ICsgMik7IGkrKykge1xuICAgICAgdGhpcy5ncmlkW2ldID0gbmV3IFBvaW50KFxuICAgICAgICAoaSAlICh0aGlzLnN4ICsgMikpICogdGhpcy5zdGVwLCAoTWF0aC5mbG9vcihpIC8gKHRoaXMuc3ggKyAyKSkpICogdGhpcy5zdGVwXG4gICAgICApXG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG1ldGFiYWxsc1xuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgMTA7IGsrKykge1xuICAgICAgdGhpcy5iYWxsc1trXSA9IG5ldyBCYWxsKHRoaXMpO1xuICAgIH1cbiAgfTtcblxuICAvLyBjb21wdXRlIGNlbGwgZm9yY2VcbiAgTGF2YUxhbXAucHJvdG90eXBlLmNvbXB1dGVGb3JjZSA9IGZ1bmN0aW9uKHgsIHksIGlkeCkge1xuXG4gICAgdmFyIGZvcmNlO1xuICAgIHZhciBpZCA9IGlkeCB8fCB4ICsgeSAqICh0aGlzLnN4ICsgMik7XG5cbiAgICBpZiAoeCA9PT0gMCB8fCB5ID09PSAwIHx8IHggPT09IHRoaXMuc3ggfHwgeSA9PT0gdGhpcy5zeSkge1xuICAgICAgZm9yY2UgPSAwLjA2ICogdGhpcy5zaWduO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JjZSA9IDA7XG4gICAgICB2YXIgY2VsbCA9IHRoaXMuZ3JpZFtpZF07XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB2YXIgYmFsbDtcbiAgICAgIHdoaWxlIChiYWxsID0gdGhpcy5iYWxsc1tpKytdKSB7XG4gICAgICAgIGZvcmNlICs9IGJhbGwuc2l6ZSAqIGJhbGwuc2l6ZSAvICgtMiAqIGNlbGwueCAqIGJhbGwucG9zLnggLSAyICogY2VsbC55ICogYmFsbC5wb3MueSArIGJhbGwucG9zLm1hZ25pdHVkZSArIGNlbGwubWFnbml0dWRlKTtcbiAgICAgIH1cbiAgICAgIGZvcmNlICo9IHRoaXMuc2lnblxuICAgIH1cbiAgICB0aGlzLmdyaWRbaWRdLmZvcmNlID0gZm9yY2U7XG4gICAgcmV0dXJuIGZvcmNlO1xuICB9O1xuXG4gIC8vIGNvbXB1dGUgY2VsbFxuICBMYXZhTGFtcC5wcm90b3R5cGUubWFyY2hpbmdTcXVhcmVzID0gZnVuY3Rpb24obmV4dCkge1xuICAgIHZhciB4ID0gbmV4dFswXTtcbiAgICB2YXIgeSA9IG5leHRbMV07XG4gICAgdmFyIHBkaXIgPSBuZXh0WzJdO1xuICAgIHZhciBpZCA9IHggKyB5ICogKHRoaXMuc3ggKyAyKTtcbiAgICBpZiAodGhpcy5ncmlkW2lkXS5jb21wdXRlZCA9PT0gdGhpcy5pdGVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBkaXIsIG1zY2FzZSA9IDA7XG5cbiAgICAvLyBuZWlnaGJvcnMgZm9yY2VcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgdmFyIGlkbiA9ICh4ICsgdGhpcy5peFtpICsgMTJdKSArICh5ICsgdGhpcy5peFtpICsgMTZdKSAqICh0aGlzLnN4ICsgMik7XG4gICAgICB2YXIgZm9yY2UgPSB0aGlzLmdyaWRbaWRuXS5mb3JjZTtcbiAgICAgIGlmICgoZm9yY2UgPiAwICYmIHRoaXMuc2lnbiA8IDApIHx8IChmb3JjZSA8IDAgJiYgdGhpcy5zaWduID4gMCkgfHwgIWZvcmNlKSB7XG4gICAgICAgIC8vIGNvbXB1dGUgZm9yY2UgaWYgbm90IGluIGJ1ZmZlclxuICAgICAgICBmb3JjZSA9IHRoaXMuY29tcHV0ZUZvcmNlKFxuICAgICAgICAgIHggKyB0aGlzLml4W2kgKyAxMl0sXG4gICAgICAgICAgeSArIHRoaXMuaXhbaSArIDE2XSxcbiAgICAgICAgICBpZG5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChNYXRoLmFicyhmb3JjZSkgPiAxKSBtc2Nhc2UgKz0gTWF0aC5wb3coMiwgaSk7XG4gICAgfVxuICAgIGlmIChtc2Nhc2UgPT09IDE1KSB7XG4gICAgICAvLyBpbnNpZGVcbiAgICAgIHJldHVybiBbeCwgeSAtIDEsIGZhbHNlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYW1iaWd1b3VzIGNhc2VzXG4gICAgICBpZiAobXNjYXNlID09PSA1KSBkaXIgPSAocGRpciA9PT0gMikgPyAzIDogMTtcbiAgICAgIGVsc2UgaWYgKG1zY2FzZSA9PT0gMTApIGRpciA9IChwZGlyID09PSAzKSA/IDAgOiAyO1xuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIGxvb2t1cFxuICAgICAgICBkaXIgPSB0aGlzLm1zY2FzZXNbbXNjYXNlXTtcbiAgICAgICAgdGhpcy5ncmlkW2lkXS5jb21wdXRlZCA9IHRoaXMuaXRlcjtcbiAgICAgIH1cbiAgICAgIC8vIGRyYXcgbGluZVxuICAgICAgdmFyIGl4ID0gdGhpcy5zdGVwIC8gKFxuICAgICAgICAgIE1hdGguYWJzKE1hdGguYWJzKHRoaXMuZ3JpZFsoeCArIHRoaXMucGx4WzQgKiBkaXIgKyAyXSkgKyAoeSArIHRoaXMucGx5WzQgKiBkaXIgKyAyXSkgKiAodGhpcy5zeCArIDIpXS5mb3JjZSkgLSAxKSAvXG4gICAgICAgICAgTWF0aC5hYnMoTWF0aC5hYnModGhpcy5ncmlkWyh4ICsgdGhpcy5wbHhbNCAqIGRpciArIDNdKSArICh5ICsgdGhpcy5wbHlbNCAqIGRpciArIDNdKSAqICh0aGlzLnN4ICsgMildLmZvcmNlKSAtIDEpICsgMVxuICAgICAgICApO1xuICAgICAgY3R4LmxpbmVUbyhcbiAgICAgICAgdGhpcy5ncmlkWyh4ICsgdGhpcy5wbHhbNCAqIGRpcl0pICsgKHkgKyB0aGlzLnBseVs0ICogZGlyXSkgKiAodGhpcy5zeCArIDIpXS54ICsgdGhpcy5peFtkaXJdICogaXgsXG4gICAgICAgIHRoaXMuZ3JpZFsoeCArIHRoaXMucGx4WzQgKiBkaXIgKyAxXSkgKyAoeSArIHRoaXMucGx5WzQgKiBkaXIgKyAxXSkgKiAodGhpcy5zeCArIDIpXS55ICsgdGhpcy5peFtkaXIgKyA0XSAqIGl4XG4gICAgICApO1xuICAgICAgdGhpcy5wYWludCA9IHRydWU7XG4gICAgICAvLyBuZXh0XG4gICAgICByZXR1cm4gW1xuICAgICAgICB4ICsgdGhpcy5peFtkaXIgKyA0XSxcbiAgICAgICAgeSArIHRoaXMuaXhbZGlyICsgOF0sXG4gICAgICAgIGRpclxuICAgICAgXTtcbiAgICB9XG4gIH07XG5cbiAgTGF2YUxhbXAucHJvdG90eXBlLnJlbmRlck1ldGFiYWxscyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpID0gMCwgYmFsbDtcbiAgICB3aGlsZSAoYmFsbCA9IHRoaXMuYmFsbHNbaSsrXSkgYmFsbC5tb3ZlKCk7XG4gICAgLy8gcmVzZXQgZ3JpZFxuICAgIHRoaXMuaXRlcisrO1xuICAgIHRoaXMuc2lnbiA9IC10aGlzLnNpZ247XG4gICAgdGhpcy5wYWludCA9IGZhbHNlO1xuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLm1ldGFGaWxsO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAvLyBjb21wdXRlIG1ldGFiYWxsc1xuICAgIGkgPSAwO1xuICAgIC8vY3R4LnNoYWRvd0JsdXIgPSA1MDtcbiAgICAvL2N0eC5zaGFkb3dDb2xvciA9IFwiZ3JlZW5cIjtcbiAgICB3aGlsZSAoYmFsbCA9IHRoaXMuYmFsbHNbaSsrXSkge1xuICAgICAgLy8gZmlyc3QgY2VsbFxuICAgICAgdmFyIG5leHQgPSBbXG4gICAgICAgIE1hdGgucm91bmQoYmFsbC5wb3MueCAvIHRoaXMuc3RlcCksXG4gICAgICAgIE1hdGgucm91bmQoYmFsbC5wb3MueSAvIHRoaXMuc3RlcCksIGZhbHNlXG4gICAgICBdO1xuICAgICAgLy8gbWFyY2hpbmcgc3F1YXJlc1xuICAgICAgZG8ge1xuICAgICAgICBuZXh0ID0gdGhpcy5tYXJjaGluZ1NxdWFyZXMobmV4dCk7XG4gICAgICB9IHdoaWxlIChuZXh0KTtcbiAgICAgIC8vIGZpbGwgYW5kIGNsb3NlIHBhdGhcbiAgICAgIGlmICh0aGlzLnBhaW50KSB7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLnBhaW50ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIGdyYWRpZW50c1xuICB2YXIgY3JlYXRlUmFkaWFsR3JhZGllbnQgPSBmdW5jdGlvbih3LCBoLCByLCBjMCwgYzEpIHtcbiAgICB2YXIgZ3JhZGllbnQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoXG4gICAgICB3IC8gMSwgaCAvIDEsIDAsXG4gICAgICB3IC8gMSwgaCAvIDEsIHJcbiAgICApO1xuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBjMCk7XG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsIGMxKTtcbiAgICByZXR1cm4gZ3JhZGllbnQ7XG4gIH07XG5cbiAgLy8gbWFpbiBsb29wXG4gIHZhciBydW4gPSBmdW5jdGlvbihzdGF0ZSkge1xuXG4gICAgaWYoc3RhdGUpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShydW4pO1xuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBzY3JlZW4ud2lkdGgsIHNjcmVlbi5oZWlnaHQpO1xuICAgICAgbGF2YTAucmVuZGVyTWV0YWJhbGxzKCk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGNhbnZhc1xuICB2YXIgc2NyZWVuID0gZ2UxZG9vdC5zY3JlZW4uaW5pdChcImJ1YmJsZVwiLCBudWxsLCB0cnVlKSxcbiAgICAgIGN0eCA9IHNjcmVlbi5jdHg7XG4gICAgICBzY3JlZW4ucmVzaXplKCk7XG4gIC8vIGNyZWF0ZSBMYXZhTGFtcHNcbiAgbGF2YTAgPSBuZXcgTGF2YUxhbXAoc2NyZWVuLndpZHRoLCBzY3JlZW4uaGVpZ2h0LCAxMDAsIFwiI2Y1MTJiNVwiLCBcIiM1ZjI1YjhcIik7XG5cbiAgICBydW4oYW5ndWxhci5lbGVtZW50KCcjYnViYmxlJykuaXMoJzp2aXNpYmxlJykpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGlmKGFuZ3VsYXIuZWxlbWVudCgnI2J1YmJsZScpLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgIGxhdmEwID0gbmV3IExhdmFMYW1wKHNjcmVlbi53aWR0aCwgc2NyZWVuLmhlaWdodCwgMTAwLCBcIiNmNTEyYjVcIiwgXCIjNWYyNWI4XCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvYnViYmxlLmNvbnRyb2xsZXIuanMiLCJleHBvcnQgY2xhc3MgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IgKCRsb2csICRodHRwKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgIHRoaXMuYXBpSG9zdCA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL1N3aWlwL2dlbmVyYXRvci1ndWxwLWFuZ3VsYXInO1xuICB9XG5cbiAgZ2V0Q29udHJpYnV0b3JzKGxpbWl0PTMwKSB7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KHRoaXMuYXBpSG9zdCArICcvY29udHJpYnV0b3JzP3Blcl9wYWdlPScgKyBsaW1pdClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuJGxvZy5lcnJvcignWEhSIEZhaWxlZCBmb3IgZ2V0Q29udHJpYnV0b3JzLlxcbicgKyBhbmd1bGFyLnRvSnNvbihlcnJvci5kYXRhLCB0cnVlKSk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL2dpdGh1YkNvbnRyaWJ1dG9yL2dpdGh1YkNvbnRyaWJ1dG9yLnNlcnZpY2UuanMiLCJleHBvcnQgY2xhc3MgV2ViRGV2VGVjU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy5kYXRhID0gW1xuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQW5ndWxhckpTJyxcbiAgICAgICAgJ3VybCc6ICdodHRwczovL2FuZ3VsYXJqcy5vcmcvJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0hUTUwgZW5oYW5jZWQgZm9yIHdlYiBhcHBzIScsXG4gICAgICAgICdsb2dvJzogJ2FuZ3VsYXIucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0Jyb3dzZXJTeW5jJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vYnJvd3NlcnN5bmMuaW8vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RpbWUtc2F2aW5nIHN5bmNocm9uaXNlZCBicm93c2VyIHRlc3RpbmcuJyxcbiAgICAgICAgJ2xvZ28nOiAnYnJvd3NlcnN5bmMucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0d1bHBKUycsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2d1bHBqcy5jb20vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBzdHJlYW1pbmcgYnVpbGQgc3lzdGVtLicsXG4gICAgICAgICdsb2dvJzogJ2d1bHAucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0phc21pbmUnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9qYXNtaW5lLmdpdGh1Yi5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQmVoYXZpb3ItRHJpdmVuIEphdmFTY3JpcHQuJyxcbiAgICAgICAgJ2xvZ28nOiAnamFzbWluZS5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnS2FybWEnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9rYXJtYS1ydW5uZXIuZ2l0aHViLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdTcGVjdGFjdWxhciBUZXN0IFJ1bm5lciBmb3IgSmF2YVNjcmlwdC4nLFxuICAgICAgICAnbG9nbyc6ICdrYXJtYS5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnUHJvdHJhY3RvcicsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvcHJvdHJhY3RvcicsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdFbmQgdG8gZW5kIHRlc3QgZnJhbWV3b3JrIGZvciBBbmd1bGFySlMgYXBwbGljYXRpb25zIGJ1aWx0IG9uIHRvcCBvZiBXZWJEcml2ZXJKUy4nLFxuICAgICAgICAnbG9nbyc6ICdwcm90cmFjdG9yLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdCb290c3RyYXAnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9nZXRib290c3RyYXAuY29tLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdCb290c3RyYXAgaXMgdGhlIG1vc3QgcG9wdWxhciBIVE1MLCBDU1MsIGFuZCBKUyBmcmFtZXdvcmsgZm9yIGRldmVsb3BpbmcgcmVzcG9uc2l2ZSwgbW9iaWxlIGZpcnN0IHByb2plY3RzIG9uIHRoZSB3ZWIuJyxcbiAgICAgICAgJ2xvZ28nOiAnYm9vdHN0cmFwLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdBbmd1bGFyIFVJIEJvb3RzdHJhcCcsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2FuZ3VsYXItdWkuZ2l0aHViLmlvL2Jvb3RzdHJhcC8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQm9vdHN0cmFwIGNvbXBvbmVudHMgd3JpdHRlbiBpbiBwdXJlIEFuZ3VsYXJKUyBieSB0aGUgQW5ndWxhclVJIFRlYW0uJyxcbiAgICAgICAgJ2xvZ28nOiAndWktYm9vdHN0cmFwLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdTYXNzIChOb2RlKScsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9naXRodWIuY29tL3Nhc3Mvbm9kZS1zYXNzJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ05vZGUuanMgYmluZGluZyB0byBsaWJzYXNzLCB0aGUgQyB2ZXJzaW9uIG9mIHRoZSBwb3B1bGFyIHN0eWxlc2hlZXQgcHJlcHJvY2Vzc29yLCBTYXNzLicsXG4gICAgICAgICdsb2dvJzogJ25vZGUtc2Fzcy5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnRVM2IChCYWJlbCBmb3JtZXJseSA2dG81KScsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9iYWJlbGpzLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUdXJucyBFUzYrIGNvZGUgaW50byB2YW5pbGxhIEVTNSwgc28geW91IGNhbiB1c2UgbmV4dCBnZW5lcmF0aW9uIGZlYXR1cmVzIHRvZGF5LicsXG4gICAgICAgICdsb2dvJzogJ2JhYmVsLnBuZydcbiAgICAgIH1cbiAgICBdO1xuICB9XG5cbiAgZ2V0VGVjKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCJleHBvcnQgY2xhc3MgWW91VHViZUFwaUtleVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy5hcGlLZXkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAnQUl6YVN5RGF3eVBMbHQ3TkIzZTdaU2cwVFVFa3IxQTNEU1lDbENFJztcbiAgICB9OyBcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL2FwaWtleXMveW91VHViZUFwaUtleS5zZXJ2aWNlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIE5hdmJhckRpcmVjdGl2ZSgpIHtcbiAgJ25nSW5qZWN0JztcblxuICBsZXQgZGlyZWN0aXZlID0ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmh0bWwnLFxuICAgIHNjb3BlOiB7XG4gICAgICAgIGNyZWF0aW9uRGF0ZTogJz0nXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBOYXZiYXJDb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn1cblxuY2xhc3MgTmF2YmFyQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yIChtb21lbnQpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgLy8gXCJ0aGlzLmNyZWF0aW9uRGF0ZVwiIGlzIGF2YWlsYWJsZSBieSBkaXJlY3RpdmUgb3B0aW9uIFwiYmluZFRvQ29udHJvbGxlcjogdHJ1ZVwiXG4gICAgdGhpcy5yZWxhdGl2ZURhdGUgPSBtb21lbnQodGhpcy5jcmVhdGlvbkRhdGUpLmZyb21Ob3coKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIE1hbGFya2V5RGlyZWN0aXZlKG1hbGFya2V5KSB7XG4gICduZ0luamVjdCc7XG5cbiAgbGV0IGRpcmVjdGl2ZSA9IHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICAgIGV4dHJhVmFsdWVzOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiAnJm5ic3A7JyxcbiAgICBsaW5rOiBsaW5rRnVuYyxcbiAgICBjb250cm9sbGVyOiBNYWxhcmtleUNvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiAndm0nXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICBmdW5jdGlvbiBsaW5rRnVuYyhzY29wZSwgZWwsIGF0dHIsIHZtKSB7XG4gICAgbGV0IHdhdGNoZXI7XG4gICAgbGV0IHR5cGlzdCA9IG1hbGFya2V5KGVsWzBdLCB7XG4gICAgICB0eXBlU3BlZWQ6IDQwLFxuICAgICAgZGVsZXRlU3BlZWQ6IDQwLFxuICAgICAgcGF1c2VEZWxheTogODAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIHBvc3RmaXg6ICcgJ1xuICAgIH0pO1xuXG4gICAgZWwuYWRkQ2xhc3MoJ2FjbWUtbWFsYXJrZXknKTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5leHRyYVZhbHVlcywgKHZhbHVlKSA9PiB7XG4gICAgICB0eXBpc3QudHlwZSh2YWx1ZSkucGF1c2UoKS5kZWxldGUoKTtcbiAgICB9KTtcblxuICAgIHdhdGNoZXIgPSBzY29wZS4kd2F0Y2goJ3ZtLmNvbnRyaWJ1dG9ycycsICgpID0+IHtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2bS5jb250cmlidXRvcnMsIChjb250cmlidXRvcikgPT4ge1xuICAgICAgICB0eXBpc3QudHlwZShjb250cmlidXRvci5sb2dpbikucGF1c2UoKS5kZWxldGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgIHdhdGNoZXIoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmNsYXNzIE1hbGFya2V5Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yICgkbG9nLCBnaXRodWJDb250cmlidXRvcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIHRoaXMuY29udHJpYnV0b3JzID0gW107XG5cbiAgICB0aGlzLmFjdGl2YXRlKGdpdGh1YkNvbnRyaWJ1dG9yKTtcbiAgfVxuXG4gIGFjdGl2YXRlKGdpdGh1YkNvbnRyaWJ1dG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29udHJpYnV0b3JzKGdpdGh1YkNvbnRyaWJ1dG9yKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuJGxvZy5pbmZvKCdBY3RpdmF0ZWQgQ29udHJpYnV0b3JzIFZpZXcnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvbnRyaWJ1dG9ycyhnaXRodWJDb250cmlidXRvcikge1xuICAgIHJldHVybiBnaXRodWJDb250cmlidXRvci5nZXRDb250cmlidXRvcnMoMTApLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuY29udHJpYnV0b3JzID0gZGF0YTtcblxuICAgICAgcmV0dXJuIHRoaXMuY29udHJpYnV0b3JzO1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==