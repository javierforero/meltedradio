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
	  $scope.currentPlaylist = null;
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
	    return $scope.currentPlaylist;
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
	
	  $rootScope.setPlaylist = function (playlist) {
	
	    angular.element('div.playlist-content').removeClass('overflow');
	    localStorageService.set('currentPlaylist', playlist);
	    $scope.currentPlaylist = localStorageService.get('currentPlaylist');
	
	    if ($scope.currentPlaylist) {
	
	      Song.query({ songId: '' }, { playlistId: $scope.currentPlaylist.id }).then(function (songs) {
	
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
	      url: devApiUrl + 'playlists/' + $scope.currentPlaylist.id + '/songs/' + song.id
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjMxZmZmOTBiNGM2ZTI1ODcxODQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9ob21lLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL25hdi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9yZWdpc3RyYXRpb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL3Nlc3Npb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL2J1YmJsZS5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2FwaWtleXMveW91VHViZUFwaUtleS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbImRldkFwaVVybCIsInByb2RBcGlVcmwiLCJhbmd1bGFyIiwibW9kdWxlIiwiY29uc3RhbnQiLCJtYWxhcmtleSIsIm1vbWVudCIsImNvbmZpZyIsIiRhdXRoUHJvdmlkZXIiLCJjb25maWd1cmUiLCJhcGlVcmwiLCJsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIiLCJzZXRQcmVmaXgiLCJyYWlsc1NlcmlhbGl6ZXJQcm92aWRlciIsInVuZGVyc2NvcmUiLCJpZGVudGl0eSIsImNhbWVsaXplIiwicnVuIiwic2VydmljZSIsImNvbnRyb2xsZXIiLCJkaXJlY3RpdmUiLCIkdGltZW91dCIsInJlc3RyaWN0IiwibGluayIsInNjb3BlIiwiZWxlbWVudCIsImF0dHIiLCIkbGFzdCIsIiRlbWl0Iiwib25GaW5pc2hSZW5kZXIiLCJmYWN0b3J5IiwiQXBpU3luYyIsInNldFBsYXlsaXN0cyIsIm9iaiIsInBsYXlsaXN0cyIsInNldFNvbmdzIiwic29uZ3MiLCJnZXRQbGF5bGlzdHMiLCJnZXRTb25ncyIsInJhaWxzUmVzb3VyY2VGYWN0b3J5IiwidXJsIiwibmFtZSIsIiRsb2dQcm92aWRlciIsInRvYXN0ckNvbmZpZyIsImRlYnVnRW5hYmxlZCIsImFsbG93SHRtbCIsInRpbWVPdXQiLCJwb3NpdGlvbkNsYXNzIiwicHJldmVudER1cGxpY2F0ZXMiLCJwcm9ncmVzc0JhciIsInJvdXRlckNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwic3RhdGUiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXJBcyIsInJlc29sdmUiLCJhdXRoIiwiJGF1dGgiLCJ2YWxpZGF0ZVVzZXIiLCJvdGhlcndpc2UiLCJydW5CbG9jayIsIiRsb2ciLCJkZWJ1ZyIsIndlYkRldlRlYyIsInRvYXN0ciIsImF3ZXNvbWVUaGluZ3MiLCJjbGFzc0FuaW1hdGlvbiIsImNyZWF0aW9uRGF0ZSIsImFjdGl2YXRlIiwiZ2V0V2ViRGV2VGVjIiwiZ2V0VGVjIiwiZm9yRWFjaCIsImF3ZXNvbWVUaGluZyIsInJhbmsiLCJNYXRoIiwicmFuZG9tIiwiaW5mbyIsIkhvbWVDb250cm9sbGVyIiwiJHNjb3BlIiwiJHJvb3RTY29wZSIsIiRsb2NhdGlvbiIsIlVzZXIiLCJQbGF5bGlzdCIsImxvY2FsU3RvcmFnZVNlcnZpY2UiLCIkdWliTW9kYWwiLCJTb25nIiwiJGh0dHAiLCIkc2NlIiwiJHdpbmRvdyIsIllvdVR1YmVBcGlLZXlTZXJ2aWNlIiwidXNlclNpZ25lZEluIiwiZ2V0IiwiY3VycmVudFBsYXlsaXN0IiwiY3VycmVudFNvbmciLCJwcmV2aW91c1NvbmciLCJpc1BsYXlpbmciLCJwbGF5ZXIiLCJ2aWRBcnJheSIsInNlYXJjaEN1cnJlbnRTb25nIiwiY2hhbmdlTmF2Q29sb3IiLCJjc3MiLCJxdWVyeSIsInBsYXlsaXN0SWQiLCJ1c2VySWQiLCJpZCIsInRoZW4iLCJyZXN1bHRzIiwiZ2V0Q3VycmVudFBsYXlsaXN0IiwibmV3UGxheWxpc3QiLCJtb2RhbEluc3RhbmNlIiwib3BlbiIsInN1Ym1pdCIsInRleHQiLCJtZXRob2QiLCJkYXRhIiwidGl0bGUiLCJzZXRQbGF5bGlzdCIsImxlbmd0aCIsImVycm9yIiwiY2xvc2UiLCJkaXNtaXNzIiwicGxheWxpc3QiLCJyZW1vdmVDbGFzcyIsInNldCIsInNvbmdJZCIsImdldFZpZGVvU29uZyIsInZpZGVvIiwidmlkZW9JZCIsInRvZ2dsZSIsImdldFZpZGVvSW5mb1VybCIsImFwaUtleSIsImFkZFZpZGVvVG9QbGF5bGlzdCIsIml0ZW1zIiwiY29udmVydER1cmF0aW9uIiwic3RyaW5nIiwiYXJyYXkiLCJtYXRjaCIsImZvcm1hdHRlZCIsIm1hcCIsIml0ZW0iLCJqb2luIiwic25pcHBldCIsImFydGlzdCIsImRlc2NyaXB0aW9uIiwiZHVyYXRpb24iLCJjb250ZW50RGV0YWlscyIsImRlbGV0ZVNvbmciLCJzb25nIiwicmVzcG9uc2UiLCJjdXJyZW50X3BsYXlsaXN0IiwiZGVsZXRlUGxheWxpc3QiLCJ1c2VyX2lkIiwidXNlcl9wbGF5bGlzdHMiLCJzZXRTZWFyY2hSZXN1bHRzIiwidmlkZW9zIiwiZ2V0VmlkZW9zIiwic2VhcmNoVGV4dCIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlcGxhY2UiLCJteVVybCIsImNvbnNvbGUiLCJsb2ciLCJnZXRVcmwiLCJ0cnVzdFNyYyIsInNyYyIsInRydXN0QXNSZXNvdXJjZVVybCIsInRvZ2dsZU1lbnUiLCJjcmVhdGVQbGF5ZXIiLCJpIiwidmlkUGxheWVyT2JqIiwiWVQiLCJQbGF5ZXIiLCJldmVudHMiLCJvblBsYXllclN0YXRlQ2hhbmdlIiwicHVzaCIsIiRvbiIsIm5nUmVwZWF0RmluaXNoZWRFdmVudCIsIm9uUGxheWVyUmVhZHkiLCJldmVudCIsInRhcmdldCIsInBsYXlWaWRlbyIsIlBsYXllclN0YXRlIiwiUExBWUlORyIsInNlYXJjaFZpZExvZ2ljIiwicGF1c2UiLCJwYXVzZVZpZGVvIiwic3RvcFZpZGVvIiwicGxheSIsInZpZEhlaWdodCIsImhlaWdodCIsInZpZFdpZHRoIiwid2lkdGgiLCJpbml0aWFsU29uZyIsInZpZFBsYXkiLCJwbGF5ZXJWYXJzIiwibG9hZFZpZGVvQnlJZCIsInBsYXlpbmciLCJnZXRTb25nSW5kZXgiLCJpbmRleE9mIiwibmV4dCIsInNvbmdzQXJyYXkiLCJsYXN0SW5kZXgiLCJpbmRleE9mQ3VycmVudFNvbmciLCJzb25nVG9QbGF5IiwicHJldmlvdXMiLCJOYXZDb250cm9sbGVyIiwiaXNfb3BlbiIsInBhZ2VSZWRpcmVjdCIsInVzZXIiLCJwYXRoIiwic2lnbk91dCIsImV2IiwicmVtb3ZlIiwieF9pZCIsInRvZ2dsZUNsYXNzIiwiUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXIiLCJzZXRVc2VyIiwic3VibWl0UmVnaXN0cmF0aW9uIiwicmVnaXN0cmF0aW9uRm9ybSIsInN1Ym1pdExvZ2luIiwiZW1haWwiLCJwYXNzd29yZCIsIlNlc3Npb25zQ29udHJvbGxlciIsImxvZ2luRm9ybSIsInJlYXNvbiIsImVycm9ycyIsInVzZXJzIiwiQnViYmxlQ29udHJvbGxlciIsIiRkb2N1bWVudCIsImxhdmEwIiwiZ2UxZG9vdCIsInNjcmVlbiIsImVsZW0iLCJjYWxsYmFjayIsImN0eCIsImxlZnQiLCJ0b3AiLCJpbml0IiwiaW5pdFJlcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0YWdOYW1lIiwiZ2V0Q29udGV4dCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiLCJiaW5kIiwib25zZWxlY3RzdGFydCIsIm9uZHJhZyIsIm8iLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsIm9mZnNldFBhcmVudCIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJQb2ludCIsIngiLCJ5IiwibWFnbml0dWRlIiwiY29tcHV0ZWQiLCJmb3JjZSIsInByb3RvdHlwZSIsImFkZCIsInAiLCJCYWxsIiwicGFyZW50IiwibWluIiwibWF4IiwidmVsIiwicG9zIiwic2l6ZSIsIndoIiwibW92ZSIsIkxhdmFMYW1wIiwibnVtQmFsbHMiLCJjMCIsImMxIiwic3RlcCIsInN4IiwiZmxvb3IiLCJzeSIsInBhaW50IiwibWV0YUZpbGwiLCJjcmVhdGVSYWRpYWxHcmFkaWVudCIsInBseCIsInBseSIsIm1zY2FzZXMiLCJpeCIsImdyaWQiLCJiYWxscyIsIml0ZXIiLCJzaWduIiwiayIsImNvbXB1dGVGb3JjZSIsImlkeCIsImNlbGwiLCJiYWxsIiwibWFyY2hpbmdTcXVhcmVzIiwicGRpciIsImRpciIsIm1zY2FzZSIsImlkbiIsImFicyIsInBvdyIsImxpbmVUbyIsInJlbmRlck1ldGFiYWxscyIsImZpbGxTdHlsZSIsImJlZ2luUGF0aCIsInJvdW5kIiwiZmlsbCIsImNsb3NlUGF0aCIsInciLCJoIiwiciIsImdyYWRpZW50IiwiYWRkQ29sb3JTdG9wIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2xlYXJSZWN0IiwiaXMiLCJhcGlIb3N0IiwibGltaXQiLCJjYXRjaCIsInRvSnNvbiIsIldlYkRldlRlY1NlcnZpY2UiLCJOYXZiYXJEaXJlY3RpdmUiLCJOYXZiYXJDb250cm9sbGVyIiwiYmluZFRvQ29udHJvbGxlciIsInJlbGF0aXZlRGF0ZSIsImZyb21Ob3ciLCJNYWxhcmtleURpcmVjdGl2ZSIsImV4dHJhVmFsdWVzIiwidGVtcGxhdGUiLCJsaW5rRnVuYyIsIk1hbGFya2V5Q29udHJvbGxlciIsImVsIiwidm0iLCJ3YXRjaGVyIiwidHlwaXN0IiwidHlwZVNwZWVkIiwiZGVsZXRlU3BlZWQiLCJwYXVzZURlbGF5IiwibG9vcCIsInBvc3RmaXgiLCJhZGRDbGFzcyIsInZhbHVlIiwidHlwZSIsImRlbGV0ZSIsIiR3YXRjaCIsImNvbnRyaWJ1dG9ycyIsImNvbnRyaWJ1dG9yIiwibG9naW4iLCJnaXRodWJDb250cmlidXRvciIsImdldENvbnRyaWJ1dG9ycyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxLQUFJQSxZQUFZO0FBQ2hCLEtBQUlDLGFBQWE7O0FBRWpCQyxTQUFRQyxPQUFPLGVBQWUsQ0FBQyxhQUFhLGFBQWEsV0FBVyxjQUFjLGNBQWMsVUFBVSxjQUFjLGFBQWEsZ0JBQWdCLFVBQVUsaUJBQWlCLFNBQVMsdUJBQ3RMQyxTQUFTLFlBQVlDLFVBQ3JCRCxTQUFTLFVBQVVFLFFBQ25CQyxPQUhILGVBSUdBLE9BSkgsc0JBS0dBLHlCQUFPLFVBQVNDLGVBQWU7R0FDN0JBLGNBQWNDLFVBQVU7S0FDcEJDLFFBQVFWOztL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VixRQUFRc0UsUUFBUXdRLEdBQUdhLGNBQWMsVUFBQ0MsYUFBZ0I7U0FDaERaLE9BQU9RLEtBQUtJLFlBQVlDLE9BQU90SyxRQUFRa0s7Ozs7S0FJM0NuVSxNQUFNd0osSUFBSSxZQUFZLFlBQU07T0FDMUJpSzs7Ozs7OzhEQWlCK0I7R0FWbkMsNEJBQWFuUixNQUFNa1MsbUJBQW1CO0tBQ3BDOztLQURvQzs7S0FHcEMsS0FBS2xTLE9BQU9BO0tBQ1osS0FBSytSLGVBQWU7O0tBRXBCLEtBQUt4UixTQUFTMlI7OztHQWdCaEIsYUFBYSxvQkFBb0IsQ0FBQztLQUNoQyxLQUFLO0tBQ0wsT0FBTyxTQUFTLFNBZlRBLG1CQUFtQjtPQUFBOztPQUMxQixPQUFPLEtBQUtDLGdCQUFnQkQsbUJBQW1CdFAsS0FBSyxZQUFNO1NBQ3hELE1BQUs1QyxLQUFLZSxLQUFLOzs7TUFvQmhCO0tBQ0QsS0FBSztLQUNMLE9BQU8sU0FBUyxnQkFsQkZtUixtQkFBbUI7T0FBQTs7T0FDakMsT0FBT0Esa0JBQWtCQyxnQkFBZ0IsSUFBSXZQLEtBQUssVUFBQ1MsTUFBUztTQUMxRCxPQUFLME8sZUFBZTFPOztTQUVwQixPQUFPLE9BQUswTzs7Ozs7R0F5QmhCLE9BQU8iLCJmaWxlIjoiaW5kZXgubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjMxZmZmOTBiNGM2ZTI1ODcxODQiLCIvKiBnbG9iYWwgbWFsYXJrZXk6ZmFsc2UsIG1vbWVudDpmYWxzZSAqL1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2luZGV4LmNvbmZpZyc7XG5pbXBvcnQgeyByb3V0ZXJDb25maWcgfSBmcm9tICcuL2luZGV4LnJvdXRlJztcbmltcG9ydCB7IHJ1bkJsb2NrIH0gZnJvbSAnLi9pbmRleC5ydW4nO1xuaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIgfSBmcm9tICcuL21haW4vbWFpbi5jb250cm9sbGVyJztcbmltcG9ydCB7IEhvbWVDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL2hvbWUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL25hdi5jb250cm9sbGVyJztcbmltcG9ydCB7IFJlZ2lzdHJhdGlvbnNDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL3JlZ2lzdHJhdGlvbnMuY29udHJvbGxlcic7XG5pbXBvcnQgeyBTZXNzaW9uc0NvbnRyb2xsZXIgfSBmcm9tICcuL3NjcmlwdHMvY29udHJvbGxlcnMvc2Vzc2lvbnMuY29udHJvbGxlcic7XG5pbXBvcnQgeyBCdWJibGVDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL2J1YmJsZS5jb250cm9sbGVyJztcbmltcG9ydCB7IEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL2dpdGh1YkNvbnRyaWJ1dG9yL2dpdGh1YkNvbnRyaWJ1dG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2ViRGV2VGVjU2VydmljZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL3dlYkRldlRlYy93ZWJEZXZUZWMuc2VydmljZSc7XG5pbXBvcnQgeyBZb3VUdWJlQXBpS2V5U2VydmljZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL2FwaWtleXMveW91VHViZUFwaUtleS5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdmJhckRpcmVjdGl2ZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hbGFya2V5RGlyZWN0aXZlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlJztcblxudmFyIGRldkFwaVVybCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnIDtcbnZhciBwcm9kQXBpVXJsID0gJ2h0dHBzOi8vbWVsdGVkcmFkaW8uaGVyb2t1YXBwLmNvbSc7XG5cbmFuZ3VsYXIubW9kdWxlKCdtZWx0ZWRSYWRpbycsIFsnbmdBbmltYXRlJywgJ25nQ29va2llcycsICduZ1RvdWNoJywgJ25nU2FuaXRpemUnLCAnbmdNZXNzYWdlcycsICduZ0FyaWEnLCAnbmdSZXNvdXJjZScsICd1aS5yb3V0ZXInLCAndWkuYm9vdHN0cmFwJywgJ3RvYXN0cicsICduZy10b2tlbi1hdXRoJywgJ3JhaWxzJywgJ0xvY2FsU3RvcmFnZU1vZHVsZSddKVxuICAuY29uc3RhbnQoJ21hbGFya2V5JywgbWFsYXJrZXkpXG4gIC5jb25zdGFudCgnbW9tZW50JywgbW9tZW50KVxuICAuY29uZmlnKGNvbmZpZylcbiAgLmNvbmZpZyhyb3V0ZXJDb25maWcpXG4gIC5jb25maWcoZnVuY3Rpb24oJGF1dGhQcm92aWRlcikge1xuICAgICAkYXV0aFByb3ZpZGVyLmNvbmZpZ3VyZSh7XG4gICAgICAgICBhcGlVcmw6IGRldkFwaVVybFxuICAgICB9KTtcbiAgIH0pXG4gICAuY29uZmlnKGZ1bmN0aW9uKGxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlcil7XG4gICAgIGxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlci5zZXRQcmVmaXgoJ21lbHRlZFJhZGlvJyk7XG4gICB9KVxuICAgLmNvbmZpZyhmdW5jdGlvbihyYWlsc1NlcmlhbGl6ZXJQcm92aWRlcil7XG4gICAgIHJhaWxzU2VyaWFsaXplclByb3ZpZGVyLnVuZGVyc2NvcmUoYW5ndWxhci5pZGVudGl0eSkuY2FtZWxpemUoYW5ndWxhci5pZGVudGl0eSk7XG4gICB9KVxuICAucnVuKHJ1bkJsb2NrKVxuICAuc2VydmljZSgnZ2l0aHViQ29udHJpYnV0b3InLCBHaXRodWJDb250cmlidXRvclNlcnZpY2UpXG4gIC5zZXJ2aWNlKCd3ZWJEZXZUZWMnLCBXZWJEZXZUZWNTZXJ2aWNlKVxuICAuc2VydmljZSgnWW91VHViZUFwaUtleVNlcnZpY2UnLCBZb3VUdWJlQXBpS2V5U2VydmljZSlcbiAgLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIEhvbWVDb250cm9sbGVyKVxuICAuY29udHJvbGxlcignTmF2Q29udHJvbGxlcicsIE5hdkNvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdSZWdpc3RyYXRpb25zQ29udHJvbGxlcicsIFJlZ2lzdHJhdGlvbnNDb250cm9sbGVyKVxuICAuY29udHJvbGxlcignU2Vzc2lvbnNDb250cm9sbGVyJywgU2Vzc2lvbnNDb250cm9sbGVyKVxuICAuY29udHJvbGxlcignQnViYmxlQ29udHJvbGxlcicsIEJ1YmJsZUNvbnRyb2xsZXIpXG4gIC5kaXJlY3RpdmUoJ2FjbWVOYXZiYXInLCBOYXZiYXJEaXJlY3RpdmUpXG4gIC5kaXJlY3RpdmUoJ2FjbWVNYWxhcmtleScsIE1hbGFya2V5RGlyZWN0aXZlKVxuICAuZGlyZWN0aXZlKCdvbkZpbmlzaFJlbmRlcicsIGZ1bmN0aW9uKCR0aW1lb3V0KXtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cikge1xuICAgICAgICBpZiAoc2NvcGUuJGxhc3QgPT09IHRydWUpIHtcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS4kZW1pdChhdHRyLm9uRmluaXNoUmVuZGVyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgfTtcblxuICB9KVxuICAuZmFjdG9yeSgnQXBpU3luYycsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIEFwaVN5bmMgPSB7fTtcblxuICAgIEFwaVN5bmMuc2V0UGxheWxpc3RzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICBBcGlTeW5jLnBsYXlsaXN0cyA9IG9iajtcbiAgICB9O1xuXG4gICAgQXBpU3luYy5zZXRTb25ncyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBBcGlTeW5jLnNvbmdzID0gb2JqO1xuICAgIH07XG5cbiAgICBBcGlTeW5jLmdldFBsYXlsaXN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEFwaVN5bmMucGxheWxpc3RzO1xuICAgIH07XG5cbiAgICBBcGlTeW5jLmdldFNvbmdzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gQXBpU3luYy5zb25ncztcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFwaVN5bmM7XG4gIH0pXG4gIC5mYWN0b3J5KCdQbGF5bGlzdCcsIGZ1bmN0aW9uKHJhaWxzUmVzb3VyY2VGYWN0b3J5KSB7XG4gICAgcmV0dXJuIHJhaWxzUmVzb3VyY2VGYWN0b3J5KHtcbiAgICAgIHVybDogZGV2QXBpVXJsKycvcGxheWxpc3RzJyxcbiAgICAgIG5hbWU6ICdwbGF5bGlzdCdcbiAgICB9KTtcbiAgfSlcbiAgLmZhY3RvcnkoJ1VzZXInLGZ1bmN0aW9uKHJhaWxzUmVzb3VyY2VGYWN0b3J5KXtcbiAgICByZXR1cm4gcmFpbHNSZXNvdXJjZUZhY3Rvcnkoe1xuICAgICAgdXJsOiBkZXZBcGlVcmwgKycvdXNlcnMve3t1c2VySWR9fS9wbGF5bGlzdHMnLFxuICAgICAgbmFtZTogJ3VzZXInXG4gICAgfSk7XG4gIH0pXG4gIC5mYWN0b3J5KCdTb25nJywgZnVuY3Rpb24ocmFpbHNSZXNvdXJjZUZhY3Rvcnkpe1xuICAgIHJldHVybiByYWlsc1Jlc291cmNlRmFjdG9yeSh7XG4gICAgICB1cmw6IGRldkFwaVVybCArICcvcGxheWxpc3RzL3t7cGxheWxpc3RJZH19L3NvbmdzJyxcbiAgICAgIG5hbWU6ICdzb25nJ1xuICAgIH0pO1xuICB9KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXgubW9kdWxlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZyAoJGxvZ1Byb3ZpZGVyLCB0b2FzdHJDb25maWcpIHtcbiAgJ25nSW5qZWN0JztcbiAgLy8gRW5hYmxlIGxvZ1xuICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xuXG4gIC8vIFNldCBvcHRpb25zIHRoaXJkLXBhcnR5IGxpYlxuICB0b2FzdHJDb25maWcuYWxsb3dIdG1sID0gdHJ1ZTtcbiAgdG9hc3RyQ29uZmlnLnRpbWVPdXQgPSAzMDAwO1xuICB0b2FzdHJDb25maWcucG9zaXRpb25DbGFzcyA9ICd0b2FzdC10b3AtcmlnaHQnO1xuICB0b2FzdHJDb25maWcucHJldmVudER1cGxpY2F0ZXMgPSB0cnVlO1xuICB0b2FzdHJDb25maWcucHJvZ3Jlc3NCYXIgPSB0cnVlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJleHBvcnQgZnVuY3Rpb24gcm91dGVyQ29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICduZ0luamVjdCc7XG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdtYWluJywge1xuICAgICAgdXJsOiAnLycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9tYWluL21haW4uaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInLFxuICAgICAgY29udHJvbGxlckFzOiAnbWFpbidcbiAgICB9KVxuICAgIC5zdGF0ZSgnc2lnbl9pbicsIHtcbiAgICAgIHVybDogJy9zaWduX2luJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL3VzZXJfc2Vzc2lvbnMvbmV3Lmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1Nlc3Npb25zQ29udHJvbGxlciBhcyBzaWduaW4nXG4gICAgfSlcbiAgICAuc3RhdGUoJ3NpZ25fdXAnLCB7XG4gICAgICB1cmw6ICcvc2lnbl91cCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC92aWV3cy91c2VyX3JlZ2lzdHJhdGlvbnMvbmV3Lmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdHJhdGlvbnNDb250cm9sbGVyIGFzIHNpZ251cCdcbiAgICB9KVxuICAgIC5zdGF0ZSAgKCdob21lJywge1xuICAgICAgdXJsOiAnL3VzZXJzLzppZCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC92aWV3cy9ob21lLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyIGFzIGhvbWUnLFxuICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgYXV0aDogZnVuY3Rpb24oJGF1dGgpIHtcbiAgICAgICAgICAgcmV0dXJuICRhdXRoLnZhbGlkYXRlVXNlcigpO1xuICAgICAgICAgfVxuICAgICAgIH1cbiAgICB9KTtcblxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4LnJvdXRlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIHJ1bkJsb2NrICgkbG9nKSB7XG4gICduZ0luamVjdCc7XG4gICRsb2cuZGVidWcoJ3J1bkJsb2NrIGVuZCcpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5ydW4uanMiLCJleHBvcnQgY2xhc3MgTWFpbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAoJHRpbWVvdXQsIHdlYkRldlRlYywgdG9hc3RyKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuYXdlc29tZVRoaW5ncyA9IFtdO1xuICAgIHRoaXMuY2xhc3NBbmltYXRpb24gPSAnJztcbiAgICB0aGlzLmNyZWF0aW9uRGF0ZSA9IDE0ODE2Mzk3MDQxMDc7XG4gICAgdGhpcy50b2FzdHIgPSB0b2FzdHI7XG5cblxuICAgIHRoaXMuYWN0aXZhdGUoJHRpbWVvdXQsIHdlYkRldlRlYyk7XG4gIH1cblxuICBhY3RpdmF0ZSgkdGltZW91dCwgd2ViRGV2VGVjKSB7XG4gICAgdGhpcy5nZXRXZWJEZXZUZWMod2ViRGV2VGVjKTtcbiAgICAkdGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNsYXNzQW5pbWF0aW9uID0gJ3J1YmJlckJhbmQnO1xuICAgIH0sIDQwMDApO1xuICB9XG5cbiAgZ2V0V2ViRGV2VGVjKHdlYkRldlRlYykge1xuICAgIHRoaXMuYXdlc29tZVRoaW5ncyA9IHdlYkRldlRlYy5nZXRUZWMoKTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLmF3ZXNvbWVUaGluZ3MsIChhd2Vzb21lVGhpbmcpID0+IHtcbiAgICAgIGF3ZXNvbWVUaGluZy5yYW5rID0gTWF0aC5yYW5kb20oKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dUb2FzdHIoKSB7XG4gICAgdGhpcy50b2FzdHIuaW5mbygnRm9yayA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL1N3aWlwL2dlbmVyYXRvci1ndWxwLWFuZ3VsYXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj48Yj5nZW5lcmF0b3ItZ3VscC1hbmd1bGFyPC9iPjwvYT4nKTtcbiAgICB0aGlzLmNsYXNzQW5pbWF0aW9uID0gJyc7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvbWFpbi9tYWluLmNvbnRyb2xsZXIuanMiLCJleHBvcnQgY2xhc3MgSG9tZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAoJHNjb3BlLCAkcm9vdFNjb3BlLCAkYXV0aCwgJGxvY2F0aW9uLCBVc2VyLCBQbGF5bGlzdCxsb2NhbFN0b3JhZ2VTZXJ2aWNlLCAkdWliTW9kYWwsIFNvbmcsIEFwaVN5bmMsICRodHRwLCRzY2UsICR3aW5kb3csICRsb2csIFlvdVR1YmVBcGlLZXlTZXJ2aWNlKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICAkc2NvcGUudXNlclNpZ25lZEluID0gbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2N1cnJlbnRVc2VyJyk7XG4gICAgJHNjb3BlLmN1cnJlbnRQbGF5bGlzdCA9IG51bGw7XG4gICAgJHNjb3BlLnNvbmdzID0gbnVsbDtcbiAgICAkc2NvcGUuY3VycmVudFNvbmcgPSBudWxsO1xuICAgICRzY29wZS5wcmV2aW91c1NvbmcgPSBudWxsO1xuICAgICRzY29wZS5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICB2YXIgcGxheWVyO1xuICAgIHZhciB2aWRBcnJheSA9IFtdO1xuICAgIHZhciBzZWFyY2hDdXJyZW50U29uZyA9IG51bGw7XG4gICAgdmFyIHByb2RBcGlVcmwgPSAnaHR0cHM6Ly9tZWx0ZWRyYWRpby5oZXJva3VhcHAuY29tLyc7XG4gICAgdmFyIGRldkFwaVVybCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvJztcblxuICAgIChmdW5jdGlvbiBjaGFuZ2VOYXZDb2xvcigpe1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnY29sb3InLCd3aGl0ZScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ2JsYWNrJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsI2Rlc2t0b3AtbmF2LW1lbnUnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCdibGFjaycpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCd1bCNtb2JpbGUtbmF2LW1lbnUtYmxhY2snKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCdibGFjaycpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCd1bC5uYXYtbWVudSBhJykuY3NzKCdjb2xvcicsJ3doaXRlJyk7XG4gICAgfSkoKTtcblxuICAgIGlmKCRzY29wZS51c2VyU2lnbmVkSW4pIHtcblxuICAgICAgVXNlci5xdWVyeSh7cGxheWxpc3RJZDogJyd9LHt1c2VySWQ6ICRzY29wZS51c2VyU2lnbmVkSW4uaWR9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpe1xuICAgICAgICBBcGlTeW5jLnNldFBsYXlsaXN0cyhyZXN1bHRzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgICRzY29wZS5nZXRDdXJyZW50UGxheWxpc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkc2NvcGUuY3VycmVudFBsYXlsaXN0O1xuICAgIH07XG5cbiAgICAkc2NvcGUucGxheWxpc3RzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gQXBpU3luYy5nZXRQbGF5bGlzdHMoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnNvbmdzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gIEFwaVN5bmMuZ2V0U29uZ3MoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLm5ld1BsYXlsaXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUubW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdmlld3MvYWRkcGxheWxpc3QuaHRtbCcsXG4gICAgICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcidcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZigkc2NvcGUudGV4dCkge1xuXG4gICAgICAgJGh0dHAoe1xuICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICB1cmw6ICBkZXZBcGlVcmwgKyd1c2Vycy8nICsgJHNjb3BlLnVzZXJTaWduZWRJbi5pZCArICcvcGxheWxpc3RzJyxcbiAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgdGl0bGU6ICRzY29wZS50ZXh0XG4gICAgICAgICB9XG4gICAgICAgfSkudGhlbihmdW5jdGlvbihyZXN1bHRzKXtcblxuICAgICAgICAgQXBpU3luYy5zZXRQbGF5bGlzdHMocmVzdWx0cy5kYXRhKTtcbiAgICAgICAgICRzY29wZS5zZXRQbGF5bGlzdChyZXN1bHRzLmRhdGFbcmVzdWx0cy5kYXRhLmxlbmd0aCAtIDFdKTtcbiAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgJGxvZyhlcnJvcik7XG4gICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLnRleHQgPSAnJztcbiAgICAgICAgJHNjb3BlLm1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLmRpc21pc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5tb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xuICAgIH07XG5cbiAgICAkcm9vdFNjb3BlLnNldFBsYXlsaXN0ID0gZnVuY3Rpb24ocGxheWxpc3QpIHtcblxuICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnZGl2LnBsYXlsaXN0LWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnb3ZlcmZsb3cnKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2N1cnJlbnRQbGF5bGlzdCcsIHBsYXlsaXN0KTtcbiAgICAgICAgJHNjb3BlLmN1cnJlbnRQbGF5bGlzdCA9ICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnY3VycmVudFBsYXlsaXN0Jyk7XG5cbiAgICAgICAgaWYoJHNjb3BlLmN1cnJlbnRQbGF5bGlzdCkge1xuXG4gICAgICAgICAgU29uZy5xdWVyeSh7c29uZ0lkOiAnJ30se3BsYXlsaXN0SWQ6ICRzY29wZS5jdXJyZW50UGxheWxpc3QuaWR9KS50aGVuKGZ1bmN0aW9uKHNvbmdzKXtcblxuICAgICAgICAgICAgIEFwaVN5bmMuc2V0U29uZ3Moc29uZ3MpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0VmlkZW9Tb25nID0gZnVuY3Rpb24ocGxheWxpc3QsIHZpZGVvKSB7XG5cbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgndWwjJyt2aWRlby5pZC52aWRlb0lkKS50b2dnbGUoXCJzbG93XCIpO1xuXG4gICAgIHZhciBnZXRWaWRlb0luZm9VcmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My92aWRlb3M/JytcbiAgICAgICAgICAgICAgICAgICAnaWQ9JytcbiAgICAgICAgICAgICAgICAgICB2aWRlby5pZC52aWRlb0lkK1xuICAgICAgICAgICAgICAgICAgICcma2V5PScrXG4gICAgICAgICAgICAgICAgICAgWW91VHViZUFwaUtleVNlcnZpY2UuYXBpS2V5KCkrXG4gICAgICAgICAgICAgICAgICAgJyZwYXJ0PXNuaXBwZXQsY29udGVudERldGFpbHMnO1xuICAgICAgICAgJGh0dHAoe1xuXG4gICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgIHVybDogZ2V0VmlkZW9JbmZvVXJsXG5cbiAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0cyl7XG5cbiAgICAgICAgICAgYWRkVmlkZW9Ub1BsYXlsaXN0KHBsYXlsaXN0LHJlc3VsdHMuZGF0YS5pdGVtc1swXSk7XG5cbiAgICAgICAgIH0sZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAkbG9nKGVycm9yKTtcbiAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuY29udmVydER1cmF0aW9uID0gZnVuY3Rpb24oc3RyaW5nKSB7XG5cbiAgICAgICAgdmFyIGFycmF5ID0gc3RyaW5nLm1hdGNoKC8oXFxkKykoPz1bTUhTXSkvaWcpfHxbXTtcbiAgICAgICAgdmFyIGZvcm1hdHRlZCA9IGFycmF5Lm1hcChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICBpZihpdGVtLmxlbmd0aDwyKSByZXR1cm4gJzAnK2l0ZW07XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSkuam9pbignOicpO1xuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWQ7XG5cbiAgICB9O1xuXG4gICBmdW5jdGlvbiBhZGRWaWRlb1RvUGxheWxpc3QocGxheWxpc3QsIHZpZGVvKSB7XG5cbiAgICAgICAkaHR0cCh7XG4gICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgIHVybDogZGV2QXBpVXJsICsgJ3BsYXlsaXN0cy8nICsgcGxheWxpc3QuaWQgKycvc29uZ3MnLFxuICAgICAgICAgZGF0YToge1xuICAgICAgICAgICB0aXRsZTogdmlkZW8uc25pcHBldC50aXRsZSxcbiAgICAgICAgICAgYXJ0aXN0OiB2aWRlby5zbmlwcGV0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICB1cmw6IHZpZGVvLmlkLFxuICAgICAgICAgICBkdXJhdGlvbjogdmlkZW8uY29udGVudERldGFpbHMuZHVyYXRpb25cbiAgICAgICAgIH1cbiAgICAgICB9KS50aGVuKFxuICAgICAgICAgZnVuY3Rpb24ocmVzdWx0cyl7XG4gICAgICAgICAgIEFwaVN5bmMuc2V0U29uZ3MocmVzdWx0cy5kYXRhKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVsZXRlU29uZyA9IGZ1bmN0aW9uKHNvbmcpIHtcblxuICAgICAgICRodHRwKHtcbiAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICB1cmw6IGRldkFwaVVybCArICdwbGF5bGlzdHMvJyArICRzY29wZS5jdXJyZW50UGxheWxpc3QuaWQgKycvc29uZ3MvJysgc29uZy5pZFxuICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuXG4gICAgICAgICAkc2NvcGUuc2V0UGxheWxpc3QocmVzcG9uc2UuZGF0YS5jdXJyZW50X3BsYXlsaXN0KTtcbiAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAkbG9nKGVycm9yKTtcbiAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmRlbGV0ZVBsYXlsaXN0ID0gZnVuY3Rpb24ocGxheWxpc3Qpe1xuICAgICAgXG4gICAgICAkaHR0cCh7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIHVybDogZGV2QXBpVXJsICsgJy91c2Vycy8nICsgcGxheWxpc3QudXNlcl9pZCArJy9wbGF5bGlzdHMvJyArIHBsYXlsaXN0LmlkXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgIEFwaVN5bmMuc2V0UGxheWxpc3RzKHJlc3BvbnNlLmRhdGEudXNlcl9wbGF5bGlzdHMpO1xuICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAkbG9nKGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgc2V0U2VhcmNoUmVzdWx0cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgJHNjb3BlLnZpZGVvcyA9IG9iajtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldFZpZGVvcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgaWYoJHNjb3BlLnRleHQpIHtcblxuICAgICAgICAgJHNjb3BlLnNldFBsYXlsaXN0KG51bGwpO1xuICAgICAgICAgdmFyIHNlYXJjaFRleHQgPSBlbmNvZGVVUklDb21wb25lbnQoJHNjb3BlLnRleHQpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xuICAgICAgICAgdmFyIG15VXJsID0gICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzLycrXG4gICAgICAgICAgICAgICAgICAgICAgJ3NlYXJjaD9wYXJ0PXNuaXBwZXQnK1xuICAgICAgICAgICAgICAgICAgICAgICcmdHlwZT12aWRlbycrXG4gICAgICAgICAgICAgICAgICAgICAgJyZxPScrXG4gICAgICAgICAgICAgICAgICAgICAgc2VhcmNoVGV4dCtcbiAgICAgICAgICAgICAgICAgICAgICAnJmtleT0nK1xuICAgICAgICAgICAgICAgICAgICAgIFlvdVR1YmVBcGlLZXlTZXJ2aWNlLmFwaUtleSgpO1xuICAgICAgICAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG15VXJsXG5cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cbiAgICAgICAgICBzZXRTZWFyY2hSZXN1bHRzKHJlc3BvbnNlLmRhdGEuaXRlbXMpO1xuXG4gICAgICAgIH0sZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0VXJsID0gZnVuY3Rpb24odmlkZW8pIHtcbiAgICAgIHJldHVybiBcIi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL1wiK3ZpZGVvLmlkLnZpZGVvSWQrXCI/ZW5hYmxlanNhcGk9MVwiO1xuICAgIH07XG5cbiAgICAkc2NvcGUudHJ1c3RTcmMgPSBmdW5jdGlvbihzcmMpIHtcbiAgICAgIHJldHVybiAkc2NlLnRydXN0QXNSZXNvdXJjZVVybChzcmMpO1xuICAgIH07XG5cbiAgICAkc2NvcGUudG9nZ2xlTWVudSA9IGZ1bmN0aW9uKHZpZGVvSWQpIHtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgndWwjJyt2aWRlb0lkKS50b2dnbGUoXCJzbG93XCIpO1xuICAgIH07XG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVBsYXllcigpIHtcblxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgJHNjb3BlLnZpZGVvcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgdmFyIGlkID0gJ3ZpZC0nKyhpKzEpO1xuICAgICAgICAgIHZhciB2aWRQbGF5ZXJPYmogPSBuZXcgWVQuUGxheWVyKGlkLCB7XG4gICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAnb25TdGF0ZUNoYW5nZSc6ICRzY29wZS5vblBsYXllclN0YXRlQ2hhbmdlXG4gICAgICAgICAgICAgfVxuICAgICAgICAgICB9KTtcbiAgICAgICAgICAgdmlkQXJyYXkucHVzaCh2aWRQbGF5ZXJPYmopO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgJHNjb3BlLiRvbignbmdSZXBlYXRGaW5pc2hlZCcsIGZ1bmN0aW9uKG5nUmVwZWF0RmluaXNoZWRFdmVudCkge1xuXG4gICAgICAgY3JlYXRlUGxheWVyKCk7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUub25QbGF5ZXJSZWFkeSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgIGV2ZW50LnRhcmdldC5wbGF5VmlkZW8oKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLm9uUGxheWVyU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIGlmKGV2ZW50LmRhdGEgPT0gWVQuUGxheWVyU3RhdGUuUExBWUlORykge1xuICAgICAgICAgIHNlYXJjaFZpZExvZ2ljKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZWFyY2hWaWRMb2dpYyh2aWRlbykge1xuXG4gICAgICBpZigkc2NvcGUuY3VycmVudFNvbmcgJiYgJHNjb3BlLmlzUGxheWluZykge1xuICAgICAgICAkc2NvcGUucGF1c2UoKTtcbiAgICAgIH1cblxuICAgICAgaWYoc2VhcmNoQ3VycmVudFNvbmcgJiYgKHNlYXJjaEN1cnJlbnRTb25nICE9PSB2aWRlbykpIHtcbiAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcucGF1c2VWaWRlbygpO1xuICAgICAgICBzZWFyY2hDdXJyZW50U29uZyA9IHZpZGVvO1xuICAgICAgfSBlbHNlIGlmKHNlYXJjaEN1cnJlbnRTb25nICYmIChzZWFyY2hDdXJyZW50U29uZyA9PSB2aWRlbykpIHtcbiAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcucGxheVZpZGVvKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2hDdXJyZW50U29uZyA9IHZpZGVvO1xuICAgICAgICBzZWFyY2hDdXJyZW50U29uZy5wbGF5VmlkZW8oKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3BWaWRlbygpIHtcblxuICAgICAgcGxheWVyLnN0b3BWaWRlbygpO1xuICAgIH1cblxuICAgICRzY29wZS5wbGF5ID0gZnVuY3Rpb24oc29uZykge1xuXG4gICAgICAgIHZhciB2aWRIZWlnaHQgPSBhbmd1bGFyLmVsZW1lbnQoJ2Rpdi52aWRlbycpLmhlaWdodCgpO1xuICAgICAgICB2YXIgdmlkV2lkdGggPSBhbmd1bGFyLmVsZW1lbnQoJ2Rpdi52aWRlbycpLndpZHRoKCk7XG4gICAgICAgIHZhciBpbml0aWFsU29uZyA9ICRzY29wZS5jdXJyZW50U29uZyB8fCAkc2NvcGUuc29uZ3MoKVswXTtcbiAgICAgICAgdmFyIHZpZFBsYXkgPSBzb25nIHx8IGluaXRpYWxTb25nO1xuXG5cbiAgICAgICAgLy8gc3RvcHMgcGxheWVyIHBsYXlpbmcgaW4gc2VhcmNoIHJlc3VsdHMgd2hlbiBwbGF5aW5nIGFub3RoZXIgc29uZyBpbiBwbGF5bGlzdFxuXG4gICAgICAgIGlmKHNlYXJjaEN1cnJlbnRTb25nKSB7XG4gICAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcuc3RvcFZpZGVvKCk7XG4gICAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgLy8gaWYgdGhlcmUncyBubyBjdXJyZW50U29uZyBjcmVhdGUgeW91dHViZSBwbGF5ZXJcbiAgICAgICAgaWYoISRzY29wZS5jdXJyZW50U29uZykge1xuXG4gICAgICAgICBwbGF5ZXIgPSBuZXcgWVQuUGxheWVyKCdpZnJhbWUtdXR1YmUtcGxheWVyJywge1xuICAgICAgICAgICBoZWlnaHQ6IHZpZEhlaWdodCxcbiAgICAgICAgICAgd2lkdGg6ICB2aWRXaWR0aCxcbiAgICAgICAgICAgdmlkZW9JZDogdmlkUGxheS51cmwsXG4gICAgICAgICAgIHBsYXllclZhcnM6IHsnY29udHJvbHMnOiAwLCAncmVsJzogMH0sXG4gICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICdvblJlYWR5JzogJHNjb3BlLm9uUGxheWVyUmVhZHlcbiAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgICAgfSBlbHNlIGlmKHNvbmcgPT0gJHNjb3BlLmN1cnJlbnRTb25nIHx8ICgkc2NvcGUuY3VycmVudFNvbmcgJiYgIXNvbmcpKSB7XG4gICAgICAgICAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHBsYXllci5sb2FkVmlkZW9CeUlkKHtcbiAgICAgICAgICAgICd2aWRlb0lkJzogdmlkUGxheS51cmxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRzY29wZS5jdXJyZW50U29uZy5wbGF5aW5nID0gbnVsbDtcbiAgICAgICB9XG5cbiAgICAgICAkc2NvcGUuY3VycmVudFNvbmcgPSB2aWRQbGF5O1xuICAgICAgICRzY29wZS5pc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgICRzY29wZS5jdXJyZW50U29uZy5wbGF5aW5nID0gdHJ1ZTtcblxuICAgICAgIGlmKHNvbmcpIHtcbiAgICAgICAgIHNvbmcucGxheWluZyA9IHRydWU7XG4gICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUucGF1c2UgPSBmdW5jdGlvbihzb25nKSB7XG5cbiAgICAgICAkc2NvcGUuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgcGxheWVyLnBhdXNlVmlkZW8oKTtcbiAgICAgICBpZihzb25nKXtcbiAgICAgICAgIHNvbmcucGxheWluZyA9IG51bGw7XG4gICAgICAgfSBlbHNlIHtcbiAgICAgICAgICRzY29wZS5jdXJyZW50U29uZy5wbGF5aW5nID0gbnVsbDtcbiAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFNvbmdJbmRleChzb25nKSB7XG4gICAgICByZXR1cm4gc29uZ3MoKS5pbmRleE9mKHNvbmcpO1xuICAgIH1cblxuICAgICRzY29wZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBzb25nc0FycmF5ID0gJHNjb3BlLnNvbmdzKCk7XG4gICAgICB2YXIgbGFzdEluZGV4ID0gc29uZ3NBcnJheS5sZW5ndGggLSAxO1xuICAgICAgdmFyIGluZGV4T2ZDdXJyZW50U29uZyA9IHNvbmdzQXJyYXkuaW5kZXhPZigkc2NvcGUuY3VycmVudFNvbmcpO1xuICAgICAgdmFyIHNvbmdUb1BsYXkgPSBudWxsO1xuXG4gICAgICBpZigkc2NvcGUuY3VycmVudFNvbmcpIHtcbiAgICAgICAgaWYoaW5kZXhPZkN1cnJlbnRTb25nIDwgbGFzdEluZGV4ICkge1xuXG4gICAgICAgICAgc29uZ1RvUGxheSAgPSBzb25nc0FycmF5W2luZGV4T2ZDdXJyZW50U29uZyArIDFdO1xuXG4gICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgIGluZGV4T2ZDdXJyZW50U29uZyA9IDA7XG4gICAgICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtpbmRleE9mQ3VycmVudFNvbmddO1xuICAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc29uZ1RvUGxheSAgPSBzb25nc0FycmF5WzBdO1xuICAgICAgfVxuXG4gICAgICAkc2NvcGUucGxheShzb25nVG9QbGF5KTtcbiAgIH07XG5cbiAgICRzY29wZS5wcmV2aW91cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgIHZhciBzb25nc0FycmF5ID0gJHNjb3BlLnNvbmdzKCk7XG4gICAgIHZhciBsYXN0SW5kZXggPSBzb25nc0FycmF5Lmxlbmd0aCAtIDE7XG4gICAgIHZhciBpbmRleE9mQ3VycmVudFNvbmcgPSBzb25nc0FycmF5LmluZGV4T2YoJHNjb3BlLmN1cnJlbnRTb25nKTtcbiAgICAgdmFyIHNvbmdUb1BsYXkgPSBudWxsO1xuXG4gICAgIGlmKCRzY29wZS5jdXJyZW50U29uZykge1xuICAgICAgIGlmKGluZGV4T2ZDdXJyZW50U29uZyA+IDAgKSB7XG5cbiAgICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtpbmRleE9mQ3VycmVudFNvbmcgLSAxXTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgaW5kZXhPZkN1cnJlbnRTb25nID0gbGFzdEluZGV4O1xuICAgICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtpbmRleE9mQ3VycmVudFNvbmddO1xuICAgICAgICB9XG4gICAgIH0gZWxzZSB7XG4gICAgICAgc29uZ1RvUGxheSAgPSBzb25nc0FycmF5W2xhc3RJbmRleF07XG4gICAgIH1cblxuICAgICAkc2NvcGUucGxheShzb25nVG9QbGF5KTtcbiAgICB9O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvaG9tZS5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIE5hdkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRyb290U2NvcGUsICRhdXRoLCAkbG9jYXRpb24sIGxvY2FsU3RvcmFnZVNlcnZpY2UsICRodHRwLCBBcGlTeW5jLCBTb25nKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICBmdW5jdGlvbiBjaGFuZ2VOYXZDb2xvcigpe1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnY29sb3InLCdibGFjaycpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ3doaXRlJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ25hdi5uYXYtYmFyIHVsJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywnd2hpdGUnKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgndWwubmF2LW1lbnUgYScpLmNzcygnY29sb3InLCdibGFjaycpO1xuICAgIH1cblxuICAgICRzY29wZS5pc19vcGVuID0gZmFsc2U7XG5cbiAgICAkc2NvcGUucGxheWxpc3RzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gQXBpU3luYy5nZXRQbGF5bGlzdHMoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5wYWdlUmVkaXJlY3QgPSBmdW5jdGlvbigpIHtcblxuICAgICAgaWYoJHJvb3RTY29wZS51c2VyLmlkKSB7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvdXNlcnMvJysgJHJvb3RTY29wZS51c2VyLmlkKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLnNpZ25PdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICRhdXRoLnNpZ25PdXQoKTtcbiAgICB9O1xuXG4gICAgJHJvb3RTY29wZS4kb24oJ2F1dGg6bG9nb3V0LXN1Y2Nlc3MnLCBmdW5jdGlvbihldikge1xuICAgICAgJHNjb3BlLnVzZXJTaWduZWRJbiA9IG51bGw7XG4gICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZSgnY3VycmVudFVzZXInKTtcbiAgICAgIGNoYW5nZU5hdkNvbG9yKCk7XG4gICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLnRvZ2dsZU1lbnUgPSBmdW5jdGlvbihldmVudCwgeF9pZCkge1xuXG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJyNtb2JpbGUtaGFtLWJsYWNrJykudG9nZ2xlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI21vYmlsZS1oYW0td2hpdGUnKS50b2dnbGVDbGFzcygnaGlkZScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCcjbW9iaWxlLXgtYmxhY2snKS50b2dnbGVDbGFzcygnZGlzcGxheScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCcjbW9iaWxlLXgtd2hpdGUnKS50b2dnbGVDbGFzcygnZGlzcGxheScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCdkaXYjJysgeF9pZCkudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXknKTtcblxuICAgIH07XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9uYXYuY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBSZWdpc3RyYXRpb25zQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGF1dGgsICRyb290U2NvcGUsICRsb2NhdGlvbiwgbG9jYWxTdG9yYWdlU2VydmljZSl7XG4gICAgJ25nSW5qZWN0JztcbiAgICBcbiAgICB2YXIgc2V0VXNlciA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdjdXJyZW50VXNlcicsIG9iaik7XG4gICAgfTtcblxuICAgICRzY29wZS5zdWJtaXRSZWdpc3RyYXRpb24gPSBmdW5jdGlvbihyZWdpc3RyYXRpb25Gb3JtKSB7XG5cbiAgICAgICRhdXRoLnN1Ym1pdFJlZ2lzdHJhdGlvbihyZWdpc3RyYXRpb25Gb3JtKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcblxuICAgICAgICAgICRhdXRoLnN1Ym1pdExvZ2luKHtcbiAgICAgICAgICAgIGVtYWlsOiByZWdpc3RyYXRpb25Gb3JtLmVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHJlZ2lzdHJhdGlvbkZvcm0ucGFzc3dvcmRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgJHJvb3RTY29wZS4kb24oJ2F1dGg6bG9naW4tc3VjY2VzcycsIGZ1bmN0aW9uKGV2LCB1c2VyKSB7XG5cbiAgICAgIHNldFVzZXIodXNlcik7XG4gICAgICAkbG9jYXRpb24ucGF0aCgnL3VzZXJzLycrIHVzZXIuaWQpO1xuXG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9yZWdpc3RyYXRpb25zLmNvbnRyb2xsZXIuanMiLCJleHBvcnQgY2xhc3MgU2Vzc2lvbnNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkYXV0aCwgJHJvb3RTY29wZSwgJGxvY2F0aW9uLCBVc2VyLCBQbGF5bGlzdCwgbG9jYWxTdG9yYWdlU2VydmljZSl7XG4gICAgJ25nSW5qZWN0JztcbiAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuXG4gICAgdmFyIHNldFVzZXIgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnY3VycmVudFVzZXInLCBvYmopO1xuICAgIH07XG5cblxuICAgJHNjb3BlLnN1Ym1pdExvZ2luID0gZnVuY3Rpb24obG9naW5Gb3JtKSB7XG4gICAgICRhdXRoLnN1Ym1pdExvZ2luKGxvZ2luRm9ybSkudGhlbihmdW5jdGlvbih1c2VyKSB7XG5cbiAgICAgICAgICAgICBzZXRVc2VyKHVzZXIpO1xuICAgICB9KTtcbiAgIH07XG5cbiAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ2luLXN1Y2Nlc3MnLCBmdW5jdGlvbihldiwgdXNlcikge1xuXG4gICAgICRsb2NhdGlvbi5wYXRoKCcvdXNlcnMvJysgdXNlci5pZCk7XG5cbiAgIH0pO1xuICAgJHJvb3RTY29wZS4kb24oJ2F1dGg6bG9naW4tZXJyb3InLCBmdW5jdGlvbihldiwgcmVhc29uKSB7XG4gICAgICRzY29wZS5lcnJvciA9IHJlYXNvbi5lcnJvcnNbMF07XG4gICB9KTtcblxuICAgVXNlci5xdWVyeSh7cGxheWxpc3RJZDogJyd9LHt1c2VySWQ6IDF9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpe1xuICAgICAkc2NvcGUudXNlcnMgPSByZXN1bHRzO1xuICAgfSk7XG5cblxuICAgJHNjb3BlLnNpZ25PdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgJGF1dGguc2lnbk91dCgpO1xuICAgfTtcblxuICAgJHJvb3RTY29wZS4kb24oJ2F1dGg6bG9nb3V0LXN1Y2Nlc3MnLCBmdW5jdGlvbihldikge1xuICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9zZXNzaW9ucy5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIEJ1YmJsZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkcm9vdFNjb3BlLCRzY29wZSwkd2luZG93LCAkZG9jdW1lbnQpIHtcbiAgJ25nSW5qZWN0JztcbiAgdmFyIGxhdmEwO1xuICB2YXIgZ2UxZG9vdCA9IHtcbiAgICBzY3JlZW46IHtcbiAgICAgIGVsZW06ICAgICBudWxsLFxuICAgICAgY2FsbGJhY2s6IG51bGwsXG4gICAgICBjdHg6ICAgICAgbnVsbCxcbiAgICAgIHdpZHRoOiAgICAwLFxuICAgICAgaGVpZ2h0OiAgIDAsXG4gICAgICBsZWZ0OiAgICAgMCxcbiAgICAgIHRvcDogICAgICAwLFxuICAgICAgaW5pdDogZnVuY3Rpb24gKGlkLCBjYWxsYmFjaywgaW5pdFJlcykge1xuICAgICAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBudWxsO1xuICAgICAgICBpZiAodGhpcy5lbGVtLnRhZ05hbWUgPT0gXCJDQU5WQVNcIikgdGhpcy5jdHggPSB0aGlzLmVsZW0uZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB0aGlzLmVsZW0ub25zZWxlY3RzdGFydCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIHRoaXMuZWxlbS5vbmRyYWcgICAgICAgID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgaW5pdFJlcyAmJiB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICByZXNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG8gPSB0aGlzLmVsZW07XG4gICAgICAgIHRoaXMud2lkdGggID0gby5vZmZzZXRXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBvLm9mZnNldEhlaWdodDtcbiAgICAgICAgZm9yICh0aGlzLmxlZnQgPSAwLCB0aGlzLnRvcCA9IDA7IG8gIT0gbnVsbDsgbyA9IG8ub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgdGhpcy5sZWZ0ICs9IG8ub2Zmc2V0TGVmdDtcbiAgICAgICAgICB0aGlzLnRvcCAgKz0gby5vZmZzZXRUb3A7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3R4KSB7XG4gICAgICAgICAgdGhpcy5lbGVtLndpZHRoICA9IHRoaXMud2lkdGg7XG4gICAgICAgICAgdGhpcy5lbGVtLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgJiYgdGhpcy5jYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBQb2ludCBjb25zdHJ1Y3RvclxuICB2YXIgUG9pbnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMubWFnbml0dWRlID0geCAqIHggKyB5ICogeTtcbiAgICB0aGlzLmNvbXB1dGVkID0gMDtcbiAgICB0aGlzLmZvcmNlID0gMDtcbiAgfTtcbiAgUG9pbnQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCArIHAueCwgdGhpcy55ICsgcC55KTtcbiAgfTtcblxuICAvLyBCYWxsIGNvbnN0cnVjdG9yXG4gIHZhciBCYWxsID0gZnVuY3Rpb24ocGFyZW50KSB7XG4gICAgdmFyIG1pbiA9IC4xO1xuICAgIHZhciBtYXggPSAxLjU7XG4gICAgdGhpcy52ZWwgPSBuZXcgUG9pbnQoXG4gICAgICAoTWF0aC5yYW5kb20oKSA+IDAuNSA/IDEgOiAtMSkgKiAoMC4yICsgTWF0aC5yYW5kb20oKSAqIDAuMDI1KSwgKE1hdGgucmFuZG9tKCkgPiAwLjUgPyAxIDogLTEpICogKDAuMiArIE1hdGgucmFuZG9tKCkpXG4gICAgKTtcbiAgICB0aGlzLnBvcyA9IG5ldyBQb2ludChcbiAgICAgIHBhcmVudC53aWR0aCAqIDAuMiArIE1hdGgucmFuZG9tKCkgKiBwYXJlbnQud2lkdGggKiAwLjYsXG4gICAgICBwYXJlbnQuaGVpZ2h0ICogMC4yICsgTWF0aC5yYW5kb20oKSAqIHBhcmVudC5oZWlnaHQgKiAwLjZcbiAgICApO1xuICAgIHRoaXMuc2l6ZSA9IChwYXJlbnQud2ggLyAxNSkgKyAoIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbiApICogKHBhcmVudC53aCAvIDE1KTtcbiAgICB0aGlzLndpZHRoID0gcGFyZW50LndpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gcGFyZW50LmhlaWdodDtcbiAgfTtcblxuICAvLyBtb3ZlIGJhbGxzXG4gIEJhbGwucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIGJvdW5jZSBib3JkZXJzXG4gICAgaWYgKHRoaXMucG9zLnggPj0gdGhpcy53aWR0aCAtIHRoaXMuc2l6ZSkge1xuICAgICAgaWYgKHRoaXMudmVsLnggPiAwKSB0aGlzLnZlbC54ID0gLXRoaXMudmVsLng7XG4gICAgICB0aGlzLnBvcy54ID0gdGhpcy53aWR0aCAtIHRoaXMuc2l6ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9zLnggPD0gdGhpcy5zaXplKSB7XG4gICAgICBpZiAodGhpcy52ZWwueCA8IDApIHRoaXMudmVsLnggPSAtdGhpcy52ZWwueDtcbiAgICAgIHRoaXMucG9zLnggPSB0aGlzLnNpemU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9zLnkgPj0gdGhpcy5oZWlnaHQgLSB0aGlzLnNpemUpIHtcbiAgICAgIGlmICh0aGlzLnZlbC55ID4gMCkgdGhpcy52ZWwueSA9IC10aGlzLnZlbC55O1xuICAgICAgdGhpcy5wb3MueSA9IHRoaXMuaGVpZ2h0IC0gdGhpcy5zaXplO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wb3MueSA8PSB0aGlzLnNpemUpIHtcbiAgICAgIGlmICh0aGlzLnZlbC55IDwgMCkgdGhpcy52ZWwueSA9IC10aGlzLnZlbC55O1xuICAgICAgdGhpcy5wb3MueSA9IHRoaXMuc2l6ZTtcbiAgICB9XG5cbiAgICAvLyB2ZWxvY2l0eVxuICAgIHRoaXMucG9zID0gdGhpcy5wb3MuYWRkKHRoaXMudmVsKTtcblxuICB9O1xuXG4gIC8vIGxhdmFsYW1wIGNvbnN0cnVjdG9yXG4gIHZhciBMYXZhTGFtcCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIG51bUJhbGxzLCBjMCwgYzEpIHtcbiAgICB0aGlzLnN0ZXAgPSA1O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLndoID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5zeCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIHRoaXMuc3RlcCk7XG4gICAgdGhpcy5zeSA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQgLyB0aGlzLnN0ZXApO1xuICAgIHRoaXMucGFpbnQgPSBmYWxzZTtcbiAgICB0aGlzLm1ldGFGaWxsID0gY3JlYXRlUmFkaWFsR3JhZGllbnQod2lkdGgsIGhlaWdodCwgd2lkdGgsIGMwLCBjMSk7XG4gICAgdGhpcy5wbHggPSBbMCwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMF07XG4gICAgdGhpcy5wbHkgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMV07XG4gICAgdGhpcy5tc2Nhc2VzID0gWzAsIDMsIDAsIDMsIDEsIDMsIDAsIDMsIDIsIDIsIDAsIDIsIDEsIDEsIDBdO1xuICAgIHRoaXMuaXggPSBbMSwgMCwgLTEsIDAsIDAsIDEsIDAsIC0xLCAtMSwgMCwgMSwgMCwgMCwgMSwgMSwgMCwgMCwgMCwgMSwgMV07XG4gICAgdGhpcy5ncmlkID0gW107XG4gICAgdGhpcy5iYWxscyA9IFtdO1xuICAgIHRoaXMuaXRlciA9IDA7XG4gICAgdGhpcy5zaWduID0gMTtcblxuICAgIC8vIGluaXQgZ3JpZFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgKHRoaXMuc3ggKyAyKSAqICh0aGlzLnN5ICsgMik7IGkrKykge1xuICAgICAgdGhpcy5ncmlkW2ldID0gbmV3IFBvaW50KFxuICAgICAgICAoaSAlICh0aGlzLnN4ICsgMikpICogdGhpcy5zdGVwLCAoTWF0aC5mbG9vcihpIC8gKHRoaXMuc3ggKyAyKSkpICogdGhpcy5zdGVwXG4gICAgICApXG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG1ldGFiYWxsc1xuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgMTA7IGsrKykge1xuICAgICAgdGhpcy5iYWxsc1trXSA9IG5ldyBCYWxsKHRoaXMpO1xuICAgIH1cbiAgfTtcblxuICAvLyBjb21wdXRlIGNlbGwgZm9yY2VcbiAgTGF2YUxhbXAucHJvdG90eXBlLmNvbXB1dGVGb3JjZSA9IGZ1bmN0aW9uKHgsIHksIGlkeCkge1xuXG4gICAgdmFyIGZvcmNlO1xuICAgIHZhciBpZCA9IGlkeCB8fCB4ICsgeSAqICh0aGlzLnN4ICsgMik7XG5cbiAgICBpZiAoeCA9PT0gMCB8fCB5ID09PSAwIHx8IHggPT09IHRoaXMuc3ggfHwgeSA9PT0gdGhpcy5zeSkge1xuICAgICAgZm9yY2UgPSAwLjA2ICogdGhpcy5zaWduO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JjZSA9IDA7XG4gICAgICB2YXIgY2VsbCA9IHRoaXMuZ3JpZFtpZF07XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB2YXIgYmFsbDtcbiAgICAgIHdoaWxlIChiYWxsID0gdGhpcy5iYWxsc1tpKytdKSB7XG4gICAgICAgIGZvcmNlICs9IGJhbGwuc2l6ZSAqIGJhbGwuc2l6ZSAvICgtMiAqIGNlbGwueCAqIGJhbGwucG9zLnggLSAyICogY2VsbC55ICogYmFsbC5wb3MueSArIGJhbGwucG9zLm1hZ25pdHVkZSArIGNlbGwubWFnbml0dWRlKTtcbiAgICAgIH1cbiAgICAgIGZvcmNlICo9IHRoaXMuc2lnblxuICAgIH1cbiAgICB0aGlzLmdyaWRbaWRdLmZvcmNlID0gZm9yY2U7XG4gICAgcmV0dXJuIGZvcmNlO1xuICB9O1xuXG4gIC8vIGNvbXB1dGUgY2VsbFxuICBMYXZhTGFtcC5wcm90b3R5cGUubWFyY2hpbmdTcXVhcmVzID0gZnVuY3Rpb24obmV4dCkge1xuICAgIHZhciB4ID0gbmV4dFswXTtcbiAgICB2YXIgeSA9IG5leHRbMV07XG4gICAgdmFyIHBkaXIgPSBuZXh0WzJdO1xuICAgIHZhciBpZCA9IHggKyB5ICogKHRoaXMuc3ggKyAyKTtcbiAgICBpZiAodGhpcy5ncmlkW2lkXS5jb21wdXRlZCA9PT0gdGhpcy5pdGVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBkaXIsIG1zY2FzZSA9IDA7XG5cbiAgICAvLyBuZWlnaGJvcnMgZm9yY2VcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgdmFyIGlkbiA9ICh4ICsgdGhpcy5peFtpICsgMTJdKSArICh5ICsgdGhpcy5peFtpICsgMTZdKSAqICh0aGlzLnN4ICsgMik7XG4gICAgICB2YXIgZm9yY2UgPSB0aGlzLmdyaWRbaWRuXS5mb3JjZTtcbiAgICAgIGlmICgoZm9yY2UgPiAwICYmIHRoaXMuc2lnbiA8IDApIHx8IChmb3JjZSA8IDAgJiYgdGhpcy5zaWduID4gMCkgfHwgIWZvcmNlKSB7XG4gICAgICAgIC8vIGNvbXB1dGUgZm9yY2UgaWYgbm90IGluIGJ1ZmZlclxuICAgICAgICBmb3JjZSA9IHRoaXMuY29tcHV0ZUZvcmNlKFxuICAgICAgICAgIHggKyB0aGlzLml4W2kgKyAxMl0sXG4gICAgICAgICAgeSArIHRoaXMuaXhbaSArIDE2XSxcbiAgICAgICAgICBpZG5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChNYXRoLmFicyhmb3JjZSkgPiAxKSBtc2Nhc2UgKz0gTWF0aC5wb3coMiwgaSk7XG4gICAgfVxuICAgIGlmIChtc2Nhc2UgPT09IDE1KSB7XG4gICAgICAvLyBpbnNpZGVcbiAgICAgIHJldHVybiBbeCwgeSAtIDEsIGZhbHNlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYW1iaWd1b3VzIGNhc2VzXG4gICAgICBpZiAobXNjYXNlID09PSA1KSBkaXIgPSAocGRpciA9PT0gMikgPyAzIDogMTtcbiAgICAgIGVsc2UgaWYgKG1zY2FzZSA9PT0gMTApIGRpciA9IChwZGlyID09PSAzKSA/IDAgOiAyO1xuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIGxvb2t1cFxuICAgICAgICBkaXIgPSB0aGlzLm1zY2FzZXNbbXNjYXNlXTtcbiAgICAgICAgdGhpcy5ncmlkW2lkXS5jb21wdXRlZCA9IHRoaXMuaXRlcjtcbiAgICAgIH1cbiAgICAgIC8vIGRyYXcgbGluZVxuICAgICAgdmFyIGl4ID0gdGhpcy5zdGVwIC8gKFxuICAgICAgICAgIE1hdGguYWJzKE1hdGguYWJzKHRoaXMuZ3JpZFsoeCArIHRoaXMucGx4WzQgKiBkaXIgKyAyXSkgKyAoeSArIHRoaXMucGx5WzQgKiBkaXIgKyAyXSkgKiAodGhpcy5zeCArIDIpXS5mb3JjZSkgLSAxKSAvXG4gICAgICAgICAgTWF0aC5hYnMoTWF0aC5hYnModGhpcy5ncmlkWyh4ICsgdGhpcy5wbHhbNCAqIGRpciArIDNdKSArICh5ICsgdGhpcy5wbHlbNCAqIGRpciArIDNdKSAqICh0aGlzLnN4ICsgMildLmZvcmNlKSAtIDEpICsgMVxuICAgICAgICApO1xuICAgICAgY3R4LmxpbmVUbyhcbiAgICAgICAgdGhpcy5ncmlkWyh4ICsgdGhpcy5wbHhbNCAqIGRpcl0pICsgKHkgKyB0aGlzLnBseVs0ICogZGlyXSkgKiAodGhpcy5zeCArIDIpXS54ICsgdGhpcy5peFtkaXJdICogaXgsXG4gICAgICAgIHRoaXMuZ3JpZFsoeCArIHRoaXMucGx4WzQgKiBkaXIgKyAxXSkgKyAoeSArIHRoaXMucGx5WzQgKiBkaXIgKyAxXSkgKiAodGhpcy5zeCArIDIpXS55ICsgdGhpcy5peFtkaXIgKyA0XSAqIGl4XG4gICAgICApO1xuICAgICAgdGhpcy5wYWludCA9IHRydWU7XG4gICAgICAvLyBuZXh0XG4gICAgICByZXR1cm4gW1xuICAgICAgICB4ICsgdGhpcy5peFtkaXIgKyA0XSxcbiAgICAgICAgeSArIHRoaXMuaXhbZGlyICsgOF0sXG4gICAgICAgIGRpclxuICAgICAgXTtcbiAgICB9XG4gIH07XG5cbiAgTGF2YUxhbXAucHJvdG90eXBlLnJlbmRlck1ldGFiYWxscyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpID0gMCwgYmFsbDtcbiAgICB3aGlsZSAoYmFsbCA9IHRoaXMuYmFsbHNbaSsrXSkgYmFsbC5tb3ZlKCk7XG4gICAgLy8gcmVzZXQgZ3JpZFxuICAgIHRoaXMuaXRlcisrO1xuICAgIHRoaXMuc2lnbiA9IC10aGlzLnNpZ247XG4gICAgdGhpcy5wYWludCA9IGZhbHNlO1xuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLm1ldGFGaWxsO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAvLyBjb21wdXRlIG1ldGFiYWxsc1xuICAgIGkgPSAwO1xuICAgIC8vY3R4LnNoYWRvd0JsdXIgPSA1MDtcbiAgICAvL2N0eC5zaGFkb3dDb2xvciA9IFwiZ3JlZW5cIjtcbiAgICB3aGlsZSAoYmFsbCA9IHRoaXMuYmFsbHNbaSsrXSkge1xuICAgICAgLy8gZmlyc3QgY2VsbFxuICAgICAgdmFyIG5leHQgPSBbXG4gICAgICAgIE1hdGgucm91bmQoYmFsbC5wb3MueCAvIHRoaXMuc3RlcCksXG4gICAgICAgIE1hdGgucm91bmQoYmFsbC5wb3MueSAvIHRoaXMuc3RlcCksIGZhbHNlXG4gICAgICBdO1xuICAgICAgLy8gbWFyY2hpbmcgc3F1YXJlc1xuICAgICAgZG8ge1xuICAgICAgICBuZXh0ID0gdGhpcy5tYXJjaGluZ1NxdWFyZXMobmV4dCk7XG4gICAgICB9IHdoaWxlIChuZXh0KTtcbiAgICAgIC8vIGZpbGwgYW5kIGNsb3NlIHBhdGhcbiAgICAgIGlmICh0aGlzLnBhaW50KSB7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLnBhaW50ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIGdyYWRpZW50c1xuICB2YXIgY3JlYXRlUmFkaWFsR3JhZGllbnQgPSBmdW5jdGlvbih3LCBoLCByLCBjMCwgYzEpIHtcbiAgICB2YXIgZ3JhZGllbnQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoXG4gICAgICB3IC8gMSwgaCAvIDEsIDAsXG4gICAgICB3IC8gMSwgaCAvIDEsIHJcbiAgICApO1xuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBjMCk7XG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsIGMxKTtcbiAgICByZXR1cm4gZ3JhZGllbnQ7XG4gIH07XG5cbiAgLy8gbWFpbiBsb29wXG4gIHZhciBydW4gPSBmdW5jdGlvbihzdGF0ZSkge1xuXG4gICAgaWYoc3RhdGUpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShydW4pO1xuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBzY3JlZW4ud2lkdGgsIHNjcmVlbi5oZWlnaHQpO1xuICAgICAgbGF2YTAucmVuZGVyTWV0YWJhbGxzKCk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGNhbnZhc1xuICB2YXIgc2NyZWVuID0gZ2UxZG9vdC5zY3JlZW4uaW5pdChcImJ1YmJsZVwiLCBudWxsLCB0cnVlKSxcbiAgICAgIGN0eCA9IHNjcmVlbi5jdHg7XG4gICAgICBzY3JlZW4ucmVzaXplKCk7XG4gIC8vIGNyZWF0ZSBMYXZhTGFtcHNcbiAgbGF2YTAgPSBuZXcgTGF2YUxhbXAoc2NyZWVuLndpZHRoLCBzY3JlZW4uaGVpZ2h0LCAxMDAsIFwiI2Y1MTJiNVwiLCBcIiM1ZjI1YjhcIik7XG5cbiAgICBydW4oYW5ndWxhci5lbGVtZW50KCcjYnViYmxlJykuaXMoJzp2aXNpYmxlJykpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGlmKGFuZ3VsYXIuZWxlbWVudCgnI2J1YmJsZScpLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgIGxhdmEwID0gbmV3IExhdmFMYW1wKHNjcmVlbi53aWR0aCwgc2NyZWVuLmhlaWdodCwgMTAwLCBcIiNmNTEyYjVcIiwgXCIjNWYyNWI4XCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvYnViYmxlLmNvbnRyb2xsZXIuanMiLCJleHBvcnQgY2xhc3MgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IgKCRsb2csICRodHRwKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgIHRoaXMuYXBpSG9zdCA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL1N3aWlwL2dlbmVyYXRvci1ndWxwLWFuZ3VsYXInO1xuICB9XG5cbiAgZ2V0Q29udHJpYnV0b3JzKGxpbWl0PTMwKSB7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KHRoaXMuYXBpSG9zdCArICcvY29udHJpYnV0b3JzP3Blcl9wYWdlPScgKyBsaW1pdClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuJGxvZy5lcnJvcignWEhSIEZhaWxlZCBmb3IgZ2V0Q29udHJpYnV0b3JzLlxcbicgKyBhbmd1bGFyLnRvSnNvbihlcnJvci5kYXRhLCB0cnVlKSk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL2dpdGh1YkNvbnRyaWJ1dG9yL2dpdGh1YkNvbnRyaWJ1dG9yLnNlcnZpY2UuanMiLCJleHBvcnQgY2xhc3MgV2ViRGV2VGVjU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy5kYXRhID0gW1xuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQW5ndWxhckpTJyxcbiAgICAgICAgJ3VybCc6ICdodHRwczovL2FuZ3VsYXJqcy5vcmcvJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0hUTUwgZW5oYW5jZWQgZm9yIHdlYiBhcHBzIScsXG4gICAgICAgICdsb2dvJzogJ2FuZ3VsYXIucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0Jyb3dzZXJTeW5jJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vYnJvd3NlcnN5bmMuaW8vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RpbWUtc2F2aW5nIHN5bmNocm9uaXNlZCBicm93c2VyIHRlc3RpbmcuJyxcbiAgICAgICAgJ2xvZ28nOiAnYnJvd3NlcnN5bmMucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0d1bHBKUycsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2d1bHBqcy5jb20vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBzdHJlYW1pbmcgYnVpbGQgc3lzdGVtLicsXG4gICAgICAgICdsb2dvJzogJ2d1bHAucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0phc21pbmUnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9qYXNtaW5lLmdpdGh1Yi5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQmVoYXZpb3ItRHJpdmVuIEphdmFTY3JpcHQuJyxcbiAgICAgICAgJ2xvZ28nOiAnamFzbWluZS5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnS2FybWEnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9rYXJtYS1ydW5uZXIuZ2l0aHViLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdTcGVjdGFjdWxhciBUZXN0IFJ1bm5lciBmb3IgSmF2YVNjcmlwdC4nLFxuICAgICAgICAnbG9nbyc6ICdrYXJtYS5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnUHJvdHJhY3RvcicsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvcHJvdHJhY3RvcicsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdFbmQgdG8gZW5kIHRlc3QgZnJhbWV3b3JrIGZvciBBbmd1bGFySlMgYXBwbGljYXRpb25zIGJ1aWx0IG9uIHRvcCBvZiBXZWJEcml2ZXJKUy4nLFxuICAgICAgICAnbG9nbyc6ICdwcm90cmFjdG9yLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdCb290c3RyYXAnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9nZXRib290c3RyYXAuY29tLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdCb290c3RyYXAgaXMgdGhlIG1vc3QgcG9wdWxhciBIVE1MLCBDU1MsIGFuZCBKUyBmcmFtZXdvcmsgZm9yIGRldmVsb3BpbmcgcmVzcG9uc2l2ZSwgbW9iaWxlIGZpcnN0IHByb2plY3RzIG9uIHRoZSB3ZWIuJyxcbiAgICAgICAgJ2xvZ28nOiAnYm9vdHN0cmFwLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdBbmd1bGFyIFVJIEJvb3RzdHJhcCcsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2FuZ3VsYXItdWkuZ2l0aHViLmlvL2Jvb3RzdHJhcC8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQm9vdHN0cmFwIGNvbXBvbmVudHMgd3JpdHRlbiBpbiBwdXJlIEFuZ3VsYXJKUyBieSB0aGUgQW5ndWxhclVJIFRlYW0uJyxcbiAgICAgICAgJ2xvZ28nOiAndWktYm9vdHN0cmFwLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdTYXNzIChOb2RlKScsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9naXRodWIuY29tL3Nhc3Mvbm9kZS1zYXNzJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ05vZGUuanMgYmluZGluZyB0byBsaWJzYXNzLCB0aGUgQyB2ZXJzaW9uIG9mIHRoZSBwb3B1bGFyIHN0eWxlc2hlZXQgcHJlcHJvY2Vzc29yLCBTYXNzLicsXG4gICAgICAgICdsb2dvJzogJ25vZGUtc2Fzcy5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnRVM2IChCYWJlbCBmb3JtZXJseSA2dG81KScsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9iYWJlbGpzLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUdXJucyBFUzYrIGNvZGUgaW50byB2YW5pbGxhIEVTNSwgc28geW91IGNhbiB1c2UgbmV4dCBnZW5lcmF0aW9uIGZlYXR1cmVzIHRvZGF5LicsXG4gICAgICAgICdsb2dvJzogJ2JhYmVsLnBuZydcbiAgICAgIH1cbiAgICBdO1xuICB9XG5cbiAgZ2V0VGVjKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCJleHBvcnQgY2xhc3MgWW91VHViZUFwaUtleVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy5hcGlLZXkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAnQUl6YVN5RGF3eVBMbHQ3TkIzZTdaU2cwVFVFa3IxQTNEU1lDbENFJztcbiAgICB9OyBcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL2FwaWtleXMveW91VHViZUFwaUtleS5zZXJ2aWNlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIE5hdmJhckRpcmVjdGl2ZSgpIHtcbiAgJ25nSW5qZWN0JztcblxuICBsZXQgZGlyZWN0aXZlID0ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmh0bWwnLFxuICAgIHNjb3BlOiB7XG4gICAgICAgIGNyZWF0aW9uRGF0ZTogJz0nXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBOYXZiYXJDb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn1cblxuY2xhc3MgTmF2YmFyQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yIChtb21lbnQpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgLy8gXCJ0aGlzLmNyZWF0aW9uRGF0ZVwiIGlzIGF2YWlsYWJsZSBieSBkaXJlY3RpdmUgb3B0aW9uIFwiYmluZFRvQ29udHJvbGxlcjogdHJ1ZVwiXG4gICAgdGhpcy5yZWxhdGl2ZURhdGUgPSBtb21lbnQodGhpcy5jcmVhdGlvbkRhdGUpLmZyb21Ob3coKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIE1hbGFya2V5RGlyZWN0aXZlKG1hbGFya2V5KSB7XG4gICduZ0luamVjdCc7XG5cbiAgbGV0IGRpcmVjdGl2ZSA9IHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICAgIGV4dHJhVmFsdWVzOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiAnJm5ic3A7JyxcbiAgICBsaW5rOiBsaW5rRnVuYyxcbiAgICBjb250cm9sbGVyOiBNYWxhcmtleUNvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiAndm0nXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICBmdW5jdGlvbiBsaW5rRnVuYyhzY29wZSwgZWwsIGF0dHIsIHZtKSB7XG4gICAgbGV0IHdhdGNoZXI7XG4gICAgbGV0IHR5cGlzdCA9IG1hbGFya2V5KGVsWzBdLCB7XG4gICAgICB0eXBlU3BlZWQ6IDQwLFxuICAgICAgZGVsZXRlU3BlZWQ6IDQwLFxuICAgICAgcGF1c2VEZWxheTogODAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIHBvc3RmaXg6ICcgJ1xuICAgIH0pO1xuXG4gICAgZWwuYWRkQ2xhc3MoJ2FjbWUtbWFsYXJrZXknKTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5leHRyYVZhbHVlcywgKHZhbHVlKSA9PiB7XG4gICAgICB0eXBpc3QudHlwZSh2YWx1ZSkucGF1c2UoKS5kZWxldGUoKTtcbiAgICB9KTtcblxuICAgIHdhdGNoZXIgPSBzY29wZS4kd2F0Y2goJ3ZtLmNvbnRyaWJ1dG9ycycsICgpID0+IHtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2bS5jb250cmlidXRvcnMsIChjb250cmlidXRvcikgPT4ge1xuICAgICAgICB0eXBpc3QudHlwZShjb250cmlidXRvci5sb2dpbikucGF1c2UoKS5kZWxldGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgIHdhdGNoZXIoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmNsYXNzIE1hbGFya2V5Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yICgkbG9nLCBnaXRodWJDb250cmlidXRvcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIHRoaXMuY29udHJpYnV0b3JzID0gW107XG5cbiAgICB0aGlzLmFjdGl2YXRlKGdpdGh1YkNvbnRyaWJ1dG9yKTtcbiAgfVxuXG4gIGFjdGl2YXRlKGdpdGh1YkNvbnRyaWJ1dG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29udHJpYnV0b3JzKGdpdGh1YkNvbnRyaWJ1dG9yKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuJGxvZy5pbmZvKCdBY3RpdmF0ZWQgQ29udHJpYnV0b3JzIFZpZXcnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvbnRyaWJ1dG9ycyhnaXRodWJDb250cmlidXRvcikge1xuICAgIHJldHVybiBnaXRodWJDb250cmlidXRvci5nZXRDb250cmlidXRvcnMoMTApLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuY29udHJpYnV0b3JzID0gZGF0YTtcblxuICAgICAgcmV0dXJuIHRoaXMuY29udHJpYnV0b3JzO1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==