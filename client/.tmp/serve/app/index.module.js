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
	
	  $scope.setPlaylist = function (playlist) {
	
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
	
	  var setSearchResults = function setSearchResults(obj) {
	    $scope.videos = obj;
	  };
	
	  $scope.getVideos = function () {
	
	    if ($scope.text) {
	
	      $scope.setPlaylist(null);
	      var searchText = encodeURIComponent($scope.text).replace(/%20/g, '+');
	      var myUrl = 'https://www.googleapis.com/youtube/v3/' + 'search?part=snippet' + '&type=video' + '&q=' + searchText + '&key=' + YouTubeApiKeyService.apiKey();
	      console.log(myUrl);
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
	        events: {
	          'onReady': $scope.onPlayerReady,
	          'onStateChange': $scope.onPlaylistPlayerChange
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
	
	  // on playlist player change
	
	  $scope.onPlaylistPlayerChange = function (event) {};
	
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
	
	var NavController = exports.NavController = ["$scope", "$rootScope", "$auth", "$location", "localStorageService", "$http", "ApiSync", function NavController($scope, $rootScope, $auth, $location, localStorageService, $http, ApiSync) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjQxODcxYzFlMjc3MjhmOGI2MDAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9ob21lLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL25hdi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9yZWdpc3RyYXRpb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL3Nlc3Npb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL2J1YmJsZS5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2FwaWtleXMveW91VHViZUFwaUtleS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbImRldkFwaVVybCIsInByb2RBcGlVcmwiLCJhbmd1bGFyIiwibW9kdWxlIiwiY29uc3RhbnQiLCJtYWxhcmtleSIsIm1vbWVudCIsImNvbmZpZyIsIiRhdXRoUHJvdmlkZXIiLCJjb25maWd1cmUiLCJhcGlVcmwiLCJsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIiLCJzZXRQcmVmaXgiLCJyYWlsc1NlcmlhbGl6ZXJQcm92aWRlciIsInVuZGVyc2NvcmUiLCJpZGVudGl0eSIsImNhbWVsaXplIiwicnVuIiwic2VydmljZSIsImNvbnRyb2xsZXIiLCJkaXJlY3RpdmUiLCIkdGltZW91dCIsInJlc3RyaWN0IiwibGluayIsInNjb3BlIiwiZWxlbWVudCIsImF0dHIiLCIkbGFzdCIsIiRlbWl0Iiwib25GaW5pc2hSZW5kZXIiLCJmYWN0b3J5IiwiQXBpU3luYyIsInNldFBsYXlsaXN0cyIsIm9iaiIsInBsYXlsaXN0cyIsInNldFNvbmdzIiwic29uZ3MiLCJnZXRQbGF5bGlzdHMiLCJnZXRTb25ncyIsInJhaWxzUmVzb3VyY2VGYWN0b3J5IiwidXJsIiwibmFtZSIsIiRsb2dQcm92aWRlciIsInRvYXN0ckNvbmZpZyIsImRlYnVnRW5hYmxlZCIsImFsbG93SHRtbCIsInRpbWVPdXQiLCJwb3NpdGlvbkNsYXNzIiwicHJldmVudER1cGxpY2F0ZXMiLCJwcm9ncmVzc0JhciIsInJvdXRlckNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwic3RhdGUiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXJBcyIsInJlc29sdmUiLCJhdXRoIiwiJGF1dGgiLCJ2YWxpZGF0ZVVzZXIiLCJvdGhlcndpc2UiLCJydW5CbG9jayIsIiRsb2ciLCJkZWJ1ZyIsIndlYkRldlRlYyIsInRvYXN0ciIsImF3ZXNvbWVUaGluZ3MiLCJjbGFzc0FuaW1hdGlvbiIsImNyZWF0aW9uRGF0ZSIsImFjdGl2YXRlIiwiZ2V0V2ViRGV2VGVjIiwiZ2V0VGVjIiwiZm9yRWFjaCIsImF3ZXNvbWVUaGluZyIsInJhbmsiLCJNYXRoIiwicmFuZG9tIiwiaW5mbyIsIkhvbWVDb250cm9sbGVyIiwiJHNjb3BlIiwiJHJvb3RTY29wZSIsIiRsb2NhdGlvbiIsIlVzZXIiLCJQbGF5bGlzdCIsImxvY2FsU3RvcmFnZVNlcnZpY2UiLCIkdWliTW9kYWwiLCJTb25nIiwiJGh0dHAiLCIkc2NlIiwiJHdpbmRvdyIsIllvdVR1YmVBcGlLZXlTZXJ2aWNlIiwidXNlclNpZ25lZEluIiwiZ2V0IiwiY3VycmVudFBsYXlsaXN0IiwiY3VycmVudFNvbmciLCJwcmV2aW91c1NvbmciLCJpc1BsYXlpbmciLCJwbGF5ZXIiLCJ2aWRBcnJheSIsInNlYXJjaEN1cnJlbnRTb25nIiwiY2hhbmdlTmF2Q29sb3IiLCJjc3MiLCJxdWVyeSIsInBsYXlsaXN0SWQiLCJ1c2VySWQiLCJpZCIsInRoZW4iLCJyZXN1bHRzIiwiZ2V0Q3VycmVudFBsYXlsaXN0IiwibmV3UGxheWxpc3QiLCJtb2RhbEluc3RhbmNlIiwib3BlbiIsInN1Ym1pdCIsInRleHQiLCJtZXRob2QiLCJkYXRhIiwidGl0bGUiLCJzZXRQbGF5bGlzdCIsImxlbmd0aCIsImVycm9yIiwiY2xvc2UiLCJkaXNtaXNzIiwicGxheWxpc3QiLCJyZW1vdmVDbGFzcyIsInNldCIsInNvbmdJZCIsImdldFZpZGVvU29uZyIsInZpZGVvIiwidmlkZW9JZCIsInRvZ2dsZSIsImdldFZpZGVvSW5mb1VybCIsImFwaUtleSIsImFkZFZpZGVvVG9QbGF5bGlzdCIsIml0ZW1zIiwiY29udmVydER1cmF0aW9uIiwic3RyaW5nIiwiYXJyYXkiLCJtYXRjaCIsImZvcm1hdHRlZCIsIm1hcCIsIml0ZW0iLCJqb2luIiwic25pcHBldCIsImFydGlzdCIsImRlc2NyaXB0aW9uIiwiZHVyYXRpb24iLCJjb250ZW50RGV0YWlscyIsImRlbGV0ZVNvbmciLCJzb25nIiwicmVzcG9uc2UiLCJjdXJyZW50X3BsYXlsaXN0Iiwic2V0U2VhcmNoUmVzdWx0cyIsInZpZGVvcyIsImdldFZpZGVvcyIsInNlYXJjaFRleHQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJyZXBsYWNlIiwibXlVcmwiLCJjb25zb2xlIiwibG9nIiwiZ2V0VXJsIiwidHJ1c3RTcmMiLCJzcmMiLCJ0cnVzdEFzUmVzb3VyY2VVcmwiLCJ0b2dnbGVNZW51IiwiY3JlYXRlUGxheWVyIiwiaSIsInZpZFBsYXllck9iaiIsIllUIiwiUGxheWVyIiwiZXZlbnRzIiwib25QbGF5ZXJTdGF0ZUNoYW5nZSIsInB1c2giLCIkb24iLCJuZ1JlcGVhdEZpbmlzaGVkRXZlbnQiLCJvblBsYXllclJlYWR5IiwiZXZlbnQiLCJ0YXJnZXQiLCJwbGF5VmlkZW8iLCJQbGF5ZXJTdGF0ZSIsIlBMQVlJTkciLCJzZWFyY2hWaWRMb2dpYyIsInBhdXNlIiwicGF1c2VWaWRlbyIsInN0b3BWaWRlbyIsInBsYXkiLCJ2aWRIZWlnaHQiLCJoZWlnaHQiLCJ2aWRXaWR0aCIsIndpZHRoIiwiaW5pdGlhbFNvbmciLCJ2aWRQbGF5Iiwib25QbGF5bGlzdFBsYXllckNoYW5nZSIsImxvYWRWaWRlb0J5SWQiLCJwbGF5aW5nIiwiZ2V0U29uZ0luZGV4IiwiaW5kZXhPZiIsIm5leHQiLCJzb25nc0FycmF5IiwibGFzdEluZGV4IiwiaW5kZXhPZkN1cnJlbnRTb25nIiwic29uZ1RvUGxheSIsInByZXZpb3VzIiwiTmF2Q29udHJvbGxlciIsImlzX29wZW4iLCJwYWdlUmVkaXJlY3QiLCJ1c2VyIiwicGF0aCIsInNpZ25PdXQiLCJldiIsInJlbW92ZSIsInhfaWQiLCJ0b2dnbGVDbGFzcyIsIlJlZ2lzdHJhdGlvbnNDb250cm9sbGVyIiwic2V0VXNlciIsInN1Ym1pdFJlZ2lzdHJhdGlvbiIsInJlZ2lzdHJhdGlvbkZvcm0iLCJzdWJtaXRMb2dpbiIsImVtYWlsIiwicGFzc3dvcmQiLCJTZXNzaW9uc0NvbnRyb2xsZXIiLCJsb2dpbkZvcm0iLCJyZWFzb24iLCJlcnJvcnMiLCJ1c2VycyIsIkJ1YmJsZUNvbnRyb2xsZXIiLCIkZG9jdW1lbnQiLCJsYXZhMCIsImdlMWRvb3QiLCJzY3JlZW4iLCJlbGVtIiwiY2FsbGJhY2siLCJjdHgiLCJsZWZ0IiwidG9wIiwiaW5pdCIsImluaXRSZXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidGFnTmFtZSIsImdldENvbnRleHQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIiwiYmluZCIsIm9uc2VsZWN0c3RhcnQiLCJvbmRyYWciLCJvIiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXRQYXJlbnQiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0VG9wIiwiUG9pbnQiLCJ4IiwieSIsIm1hZ25pdHVkZSIsImNvbXB1dGVkIiwiZm9yY2UiLCJwcm90b3R5cGUiLCJhZGQiLCJwIiwiQmFsbCIsInBhcmVudCIsIm1pbiIsIm1heCIsInZlbCIsInBvcyIsInNpemUiLCJ3aCIsIm1vdmUiLCJMYXZhTGFtcCIsIm51bUJhbGxzIiwiYzAiLCJjMSIsInN0ZXAiLCJzeCIsImZsb29yIiwic3kiLCJwYWludCIsIm1ldGFGaWxsIiwiY3JlYXRlUmFkaWFsR3JhZGllbnQiLCJwbHgiLCJwbHkiLCJtc2Nhc2VzIiwiaXgiLCJncmlkIiwiYmFsbHMiLCJpdGVyIiwic2lnbiIsImsiLCJjb21wdXRlRm9yY2UiLCJpZHgiLCJjZWxsIiwiYmFsbCIsIm1hcmNoaW5nU3F1YXJlcyIsInBkaXIiLCJkaXIiLCJtc2Nhc2UiLCJpZG4iLCJhYnMiLCJwb3ciLCJsaW5lVG8iLCJyZW5kZXJNZXRhYmFsbHMiLCJmaWxsU3R5bGUiLCJiZWdpblBhdGgiLCJyb3VuZCIsImZpbGwiLCJjbG9zZVBhdGgiLCJ3IiwiaCIsInIiLCJncmFkaWVudCIsImFkZENvbG9yU3RvcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNsZWFyUmVjdCIsImlzIiwiYXBpSG9zdCIsImxpbWl0IiwiY2F0Y2giLCJ0b0pzb24iLCJXZWJEZXZUZWNTZXJ2aWNlIiwiTmF2YmFyRGlyZWN0aXZlIiwiTmF2YmFyQ29udHJvbGxlciIsImJpbmRUb0NvbnRyb2xsZXIiLCJyZWxhdGl2ZURhdGUiLCJmcm9tTm93IiwiTWFsYXJrZXlEaXJlY3RpdmUiLCJleHRyYVZhbHVlcyIsInRlbXBsYXRlIiwibGlua0Z1bmMiLCJNYWxhcmtleUNvbnRyb2xsZXIiLCJlbCIsInZtIiwid2F0Y2hlciIsInR5cGlzdCIsInR5cGVTcGVlZCIsImRlbGV0ZVNwZWVkIiwicGF1c2VEZWxheSIsImxvb3AiLCJwb3N0Zml4IiwiYWRkQ2xhc3MiLCJ2YWx1ZSIsInR5cGUiLCJkZWxldGUiLCIkd2F0Y2giLCJjb250cmlidXRvcnMiLCJjb250cmlidXRvciIsImxvZ2luIiwiZ2l0aHViQ29udHJpYnV0b3IiLCJnZXRDb250cmlidXRvcnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsS0FBSUEsWUFBWTtBQUNoQixLQUFJQyxhQUFhOztBQUVqQkMsU0FBUUMsT0FBTyxlQUFlLENBQUMsYUFBYSxhQUFhLFdBQVcsY0FBYyxjQUFjLFVBQVUsY0FBYyxhQUFhLGdCQUFnQixVQUFVLGlCQUFpQixTQUFTLHVCQUN0TEMsU0FBUyxZQUFZQyxVQUNyQkQsU0FBUyxVQUFVRSxRQUNuQkMsT0FISCxlQUlHQSxPQUpILHNCQUtHQSx5QkFBTyxVQUFTQyxlQUFlO0dBQzdCQSxjQUFjQyxVQUFVO0tBQ3BCQyxRQUFRVjs7S0FHYk8sdUNBQU8sVUFBU0ksNkJBQTRCO0dBQzNDQSw0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QUs0UixlQUFlOztLQUVwQixLQUFLclIsU0FBU3dSOzs7R0FnQmhCLGFBQWEsb0JBQW9CLENBQUM7S0FDaEMsS0FBSztLQUNMLE9BQU8sU0FBUyxTQWZUQSxtQkFBbUI7T0FBQTs7T0FDMUIsT0FBTyxLQUFLQyxnQkFBZ0JELG1CQUFtQm5QLEtBQUssWUFBTTtTQUN4RCxNQUFLNUMsS0FBS2UsS0FBSzs7O01Bb0JoQjtLQUNELEtBQUs7S0FDTCxPQUFPLFNBQVMsZ0JBbEJGZ1IsbUJBQW1CO09BQUE7O09BQ2pDLE9BQU9BLGtCQUFrQkMsZ0JBQWdCLElBQUlwUCxLQUFLLFVBQUNTLE1BQVM7U0FDMUQsT0FBS3VPLGVBQWV2Tzs7U0FFcEIsT0FBTyxPQUFLdU87Ozs7O0dBeUJoQixPQUFPIiwiZmlsZSI6ImluZGV4Lm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI0MTg3MWMxZTI3NzI4ZjhiNjAwIiwiLyogZ2xvYmFsIG1hbGFya2V5OmZhbHNlLCBtb21lbnQ6ZmFsc2UgKi9cblxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9pbmRleC5jb25maWcnO1xuaW1wb3J0IHsgcm91dGVyQ29uZmlnIH0gZnJvbSAnLi9pbmRleC5yb3V0ZSc7XG5pbXBvcnQgeyBydW5CbG9jayB9IGZyb20gJy4vaW5kZXgucnVuJztcbmltcG9ydCB7IE1haW5Db250cm9sbGVyIH0gZnJvbSAnLi9tYWluL21haW4uY29udHJvbGxlcic7XG5pbXBvcnQgeyBIb21lQ29udHJvbGxlciB9IGZyb20gJy4vc2NyaXB0cy9jb250cm9sbGVycy9ob21lLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgTmF2Q29udHJvbGxlciB9IGZyb20gJy4vc2NyaXB0cy9jb250cm9sbGVycy9uYXYuY29udHJvbGxlcic7XG5pbXBvcnQgeyBSZWdpc3RyYXRpb25zQ29udHJvbGxlciB9IGZyb20gJy4vc2NyaXB0cy9jb250cm9sbGVycy9yZWdpc3RyYXRpb25zLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgU2Vzc2lvbnNDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL3Nlc3Npb25zLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgQnViYmxlQ29udHJvbGxlciB9IGZyb20gJy4vc2NyaXB0cy9jb250cm9sbGVycy9idWJibGUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBHaXRodWJDb250cmlidXRvclNlcnZpY2UgfSBmcm9tICcuLi9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYkRldlRlY1NlcnZpY2UgfSBmcm9tICcuLi9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UnO1xuaW1wb3J0IHsgWW91VHViZUFwaUtleVNlcnZpY2UgfSBmcm9tICcuLi9hcHAvY29tcG9uZW50cy9hcGlrZXlzL3lvdVR1YmVBcGlLZXkuc2VydmljZSc7XG5pbXBvcnQgeyBOYXZiYXJEaXJlY3RpdmUgfSBmcm9tICcuLi9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYWxhcmtleURpcmVjdGl2ZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL21hbGFya2V5L21hbGFya2V5LmRpcmVjdGl2ZSc7XG5cbnZhciBkZXZBcGlVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyA7XG52YXIgcHJvZEFwaVVybCA9ICdodHRwczovL21lbHRlZHJhZGlvLmhlcm9rdWFwcC5jb20nO1xuXG5hbmd1bGFyLm1vZHVsZSgnbWVsdGVkUmFkaW8nLCBbJ25nQW5pbWF0ZScsICduZ0Nvb2tpZXMnLCAnbmdUb3VjaCcsICduZ1Nhbml0aXplJywgJ25nTWVzc2FnZXMnLCAnbmdBcmlhJywgJ25nUmVzb3VyY2UnLCAndWkucm91dGVyJywgJ3VpLmJvb3RzdHJhcCcsICd0b2FzdHInLCAnbmctdG9rZW4tYXV0aCcsICdyYWlscycsICdMb2NhbFN0b3JhZ2VNb2R1bGUnXSlcbiAgLmNvbnN0YW50KCdtYWxhcmtleScsIG1hbGFya2V5KVxuICAuY29uc3RhbnQoJ21vbWVudCcsIG1vbWVudClcbiAgLmNvbmZpZyhjb25maWcpXG4gIC5jb25maWcocm91dGVyQ29uZmlnKVxuICAuY29uZmlnKGZ1bmN0aW9uKCRhdXRoUHJvdmlkZXIpIHtcbiAgICAgJGF1dGhQcm92aWRlci5jb25maWd1cmUoe1xuICAgICAgICAgYXBpVXJsOiBkZXZBcGlVcmxcbiAgICAgfSk7XG4gICB9KVxuICAgLmNvbmZpZyhmdW5jdGlvbihsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIpe1xuICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIuc2V0UHJlZml4KCdtZWx0ZWRSYWRpbycpO1xuICAgfSlcbiAgIC5jb25maWcoZnVuY3Rpb24ocmFpbHNTZXJpYWxpemVyUHJvdmlkZXIpe1xuICAgICByYWlsc1NlcmlhbGl6ZXJQcm92aWRlci51bmRlcnNjb3JlKGFuZ3VsYXIuaWRlbnRpdHkpLmNhbWVsaXplKGFuZ3VsYXIuaWRlbnRpdHkpO1xuICAgfSlcbiAgLnJ1bihydW5CbG9jaylcbiAgLnNlcnZpY2UoJ2dpdGh1YkNvbnRyaWJ1dG9yJywgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlKVxuICAuc2VydmljZSgnd2ViRGV2VGVjJywgV2ViRGV2VGVjU2VydmljZSlcbiAgLnNlcnZpY2UoJ1lvdVR1YmVBcGlLZXlTZXJ2aWNlJywgWW91VHViZUFwaUtleVNlcnZpY2UpXG4gIC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKVxuICAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBIb21lQ29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ05hdkNvbnRyb2xsZXInLCBOYXZDb250cm9sbGVyKVxuICAuY29udHJvbGxlcignUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXInLCBSZWdpc3RyYXRpb25zQ29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ1Nlc3Npb25zQ29udHJvbGxlcicsIFNlc3Npb25zQ29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ0J1YmJsZUNvbnRyb2xsZXInLCBCdWJibGVDb250cm9sbGVyKVxuICAuZGlyZWN0aXZlKCdhY21lTmF2YmFyJywgTmF2YmFyRGlyZWN0aXZlKVxuICAuZGlyZWN0aXZlKCdhY21lTWFsYXJrZXknLCBNYWxhcmtleURpcmVjdGl2ZSlcbiAgLmRpcmVjdGl2ZSgnb25GaW5pc2hSZW5kZXInLCBmdW5jdGlvbigkdGltZW91dCl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHIpIHtcbiAgICAgICAgaWYgKHNjb3BlLiRsYXN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuJGVtaXQoYXR0ci5vbkZpbmlzaFJlbmRlcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgIH07XG5cbiAgfSlcbiAgLmZhY3RvcnkoJ0FwaVN5bmMnLCBmdW5jdGlvbigpe1xuICAgIHZhciBBcGlTeW5jID0ge307XG5cbiAgICBBcGlTeW5jLnNldFBsYXlsaXN0cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgQXBpU3luYy5wbGF5bGlzdHMgPSBvYmo7XG4gICAgfTtcblxuICAgIEFwaVN5bmMuc2V0U29uZ3MgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgQXBpU3luYy5zb25ncyA9IG9iajtcbiAgICB9O1xuXG4gICAgQXBpU3luYy5nZXRQbGF5bGlzdHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBBcGlTeW5jLnBsYXlsaXN0cztcbiAgICB9O1xuXG4gICAgQXBpU3luYy5nZXRTb25ncyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEFwaVN5bmMuc29uZ3M7XG4gICAgfTtcblxuICAgIHJldHVybiBBcGlTeW5jO1xuICB9KVxuICAuZmFjdG9yeSgnUGxheWxpc3QnLCBmdW5jdGlvbihyYWlsc1Jlc291cmNlRmFjdG9yeSkge1xuICAgIHJldHVybiByYWlsc1Jlc291cmNlRmFjdG9yeSh7XG4gICAgICB1cmw6IGRldkFwaVVybCsnL3BsYXlsaXN0cycsXG4gICAgICBuYW1lOiAncGxheWxpc3QnXG4gICAgfSk7XG4gIH0pXG4gIC5mYWN0b3J5KCdVc2VyJyxmdW5jdGlvbihyYWlsc1Jlc291cmNlRmFjdG9yeSl7XG4gICAgcmV0dXJuIHJhaWxzUmVzb3VyY2VGYWN0b3J5KHtcbiAgICAgIHVybDogZGV2QXBpVXJsICsnL3VzZXJzL3t7dXNlcklkfX0vcGxheWxpc3RzJyxcbiAgICAgIG5hbWU6ICd1c2VyJ1xuICAgIH0pO1xuICB9KVxuICAuZmFjdG9yeSgnU29uZycsIGZ1bmN0aW9uKHJhaWxzUmVzb3VyY2VGYWN0b3J5KXtcbiAgICByZXR1cm4gcmFpbHNSZXNvdXJjZUZhY3Rvcnkoe1xuICAgICAgdXJsOiBkZXZBcGlVcmwgKyAnL3BsYXlsaXN0cy97e3BsYXlsaXN0SWR9fS9zb25ncycsXG4gICAgICBuYW1lOiAnc29uZydcbiAgICB9KTtcbiAgfSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4Lm1vZHVsZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBjb25maWcgKCRsb2dQcm92aWRlciwgdG9hc3RyQ29uZmlnKSB7XG4gICduZ0luamVjdCc7XG4gIC8vIEVuYWJsZSBsb2dcbiAgJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCh0cnVlKTtcblxuICAvLyBTZXQgb3B0aW9ucyB0aGlyZC1wYXJ0eSBsaWJcbiAgdG9hc3RyQ29uZmlnLmFsbG93SHRtbCA9IHRydWU7XG4gIHRvYXN0ckNvbmZpZy50aW1lT3V0ID0gMzAwMDtcbiAgdG9hc3RyQ29uZmlnLnBvc2l0aW9uQ2xhc3MgPSAndG9hc3QtdG9wLXJpZ2h0JztcbiAgdG9hc3RyQ29uZmlnLnByZXZlbnREdXBsaWNhdGVzID0gdHJ1ZTtcbiAgdG9hc3RyQ29uZmlnLnByb2dyZXNzQmFyID0gdHJ1ZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXguY29uZmlnLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIHJvdXRlckNvbmZpZyAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAnbmdJbmplY3QnO1xuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnbWFpbicsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvbWFpbi9tYWluLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJyxcbiAgICAgIGNvbnRyb2xsZXJBczogJ21haW4nXG4gICAgfSlcbiAgICAuc3RhdGUoJ3NpZ25faW4nLCB7XG4gICAgICB1cmw6ICcvc2lnbl9pbicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC92aWV3cy91c2VyX3Nlc3Npb25zL25ldy5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdTZXNzaW9uc0NvbnRyb2xsZXIgYXMgc2lnbmluJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdzaWduX3VwJywge1xuICAgICAgdXJsOiAnL3NpZ25fdXAnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdmlld3MvdXNlcl9yZWdpc3RyYXRpb25zL25ldy5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RyYXRpb25zQ29udHJvbGxlciBhcyBzaWdudXAnXG4gICAgfSlcbiAgICAuc3RhdGUgICgnaG9tZScsIHtcbiAgICAgIHVybDogJy91c2Vycy86aWQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdmlld3MvaG9tZS5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlciBhcyBob21lJyxcbiAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgIGF1dGg6IGZ1bmN0aW9uKCRhdXRoKSB7XG4gICAgICAgICAgIHJldHVybiAkYXV0aC52YWxpZGF0ZVVzZXIoKTtcbiAgICAgICAgIH1cbiAgICAgICB9XG4gICAgfSk7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBydW5CbG9jayAoJGxvZykge1xuICAnbmdJbmplY3QnO1xuICAkbG9nLmRlYnVnKCdydW5CbG9jayBlbmQnKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXgucnVuLmpzIiwiZXhwb3J0IGNsYXNzIE1haW5Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKCR0aW1lb3V0LCB3ZWJEZXZUZWMsIHRvYXN0cikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLmF3ZXNvbWVUaGluZ3MgPSBbXTtcbiAgICB0aGlzLmNsYXNzQW5pbWF0aW9uID0gJyc7XG4gICAgdGhpcy5jcmVhdGlvbkRhdGUgPSAxNDgxNjM5NzA0MTA3O1xuICAgIHRoaXMudG9hc3RyID0gdG9hc3RyO1xuXG5cbiAgICB0aGlzLmFjdGl2YXRlKCR0aW1lb3V0LCB3ZWJEZXZUZWMpO1xuICB9XG5cbiAgYWN0aXZhdGUoJHRpbWVvdXQsIHdlYkRldlRlYykge1xuICAgIHRoaXMuZ2V0V2ViRGV2VGVjKHdlYkRldlRlYyk7XG4gICAgJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbGFzc0FuaW1hdGlvbiA9ICdydWJiZXJCYW5kJztcbiAgICB9LCA0MDAwKTtcbiAgfVxuXG4gIGdldFdlYkRldlRlYyh3ZWJEZXZUZWMpIHtcbiAgICB0aGlzLmF3ZXNvbWVUaGluZ3MgPSB3ZWJEZXZUZWMuZ2V0VGVjKCk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2godGhpcy5hd2Vzb21lVGhpbmdzLCAoYXdlc29tZVRoaW5nKSA9PiB7XG4gICAgICBhd2Vzb21lVGhpbmcucmFuayA9IE1hdGgucmFuZG9tKCk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93VG9hc3RyKCkge1xuICAgIHRoaXMudG9hc3RyLmluZm8oJ0ZvcmsgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9Td2lpcC9nZW5lcmF0b3ItZ3VscC1hbmd1bGFyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGI+Z2VuZXJhdG9yLWd1bHAtYW5ndWxhcjwvYj48L2E+Jyk7XG4gICAgdGhpcy5jbGFzc0FuaW1hdGlvbiA9ICcnO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIEhvbWVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKCRzY29wZSwgJHJvb3RTY29wZSwgJGF1dGgsICRsb2NhdGlvbiwgVXNlciwgUGxheWxpc3QsbG9jYWxTdG9yYWdlU2VydmljZSwgJHVpYk1vZGFsLCBTb25nLCBBcGlTeW5jLCAkaHR0cCwkc2NlLCAkd2luZG93LCAkbG9nLCBZb3VUdWJlQXBpS2V5U2VydmljZSkge1xuICAgICduZ0luamVjdCc7XG4gICAgJHNjb3BlLnVzZXJTaWduZWRJbiA9IGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdjdXJyZW50VXNlcicpO1xuICAgICRzY29wZS5jdXJyZW50UGxheWxpc3QgPSBudWxsO1xuICAgICRzY29wZS5zb25ncyA9IG51bGw7XG4gICAgJHNjb3BlLmN1cnJlbnRTb25nID0gbnVsbDtcbiAgICAkc2NvcGUucHJldmlvdXNTb25nID0gbnVsbDtcbiAgICAkc2NvcGUuaXNQbGF5aW5nID0gIGZhbHNlO1xuICAgIHZhciBwbGF5ZXI7XG4gICAgdmFyIHZpZEFycmF5ID0gW107XG4gICAgdmFyIHNlYXJjaEN1cnJlbnRTb25nID0gbnVsbDtcbiAgICB2YXIgcHJvZEFwaVVybCA9ICdodHRwczovL21lbHRlZHJhZGlvLmhlcm9rdWFwcC5jb20vJztcbiAgICB2YXIgZGV2QXBpVXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8nO1xuXG4gICAgKGZ1bmN0aW9uIGNoYW5nZU5hdkNvbG9yKCl7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ25hdi5uYXYtYmFyJykuY3NzKCdjb2xvcicsJ3doaXRlJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ25hdi5uYXYtYmFyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywnYmxhY2snKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgndWwjZGVza3RvcC1uYXYtbWVudScpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ2JsYWNrJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsI21vYmlsZS1uYXYtbWVudS1ibGFjaycpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ2JsYWNrJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsLm5hdi1tZW51IGEnKS5jc3MoJ2NvbG9yJywnd2hpdGUnKTtcbiAgICB9KSgpO1xuXG4gICAgaWYoJHNjb3BlLnVzZXJTaWduZWRJbikge1xuXG4gICAgICBVc2VyLnF1ZXJ5KHtwbGF5bGlzdElkOiAnJ30se3VzZXJJZDogJHNjb3BlLnVzZXJTaWduZWRJbi5pZH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0cyl7XG4gICAgICAgIEFwaVN5bmMuc2V0UGxheWxpc3RzKHJlc3VsdHMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmdldEN1cnJlbnRQbGF5bGlzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICRzY29wZS5jdXJyZW50UGxheWxpc3Q7XG4gICAgfVxuXG4gICAgJHNjb3BlLnBsYXlsaXN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEFwaVN5bmMuZ2V0UGxheWxpc3RzKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5zb25ncyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICBBcGlTeW5jLmdldFNvbmdzKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5uZXdQbGF5bGlzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLm1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL2FkZHBsYXlsaXN0Lmh0bWwnLFxuICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYoJHNjb3BlLnRleHQpIHtcblxuICAgICAgICRodHRwKHtcbiAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgdXJsOiAgZGV2QXBpVXJsICsndXNlcnMvJyArICRzY29wZS51c2VyU2lnbmVkSW4uaWQgKyAnL3BsYXlsaXN0cycsXG4gICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgIHRpdGxlOiAkc2NvcGUudGV4dFxuICAgICAgICAgfVxuICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0cyl7XG5cbiAgICAgICAgIEFwaVN5bmMuc2V0UGxheWxpc3RzKHJlc3VsdHMuZGF0YSk7XG4gICAgICAgICAkc2NvcGUuc2V0UGxheWxpc3QocmVzdWx0cy5kYXRhW3Jlc3VsdHMuZGF0YS5sZW5ndGggLSAxXSk7XG4gICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS50ZXh0ID0gJyc7XG4gICAgICAgICRzY29wZS5tb2RhbEluc3RhbmNlLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5kaXNtaXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUubW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnNldFBsYXlsaXN0ID0gZnVuY3Rpb24ocGxheWxpc3QpIHtcblxuICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnZGl2LnBsYXlsaXN0LWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnb3ZlcmZsb3cnKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2N1cnJlbnRQbGF5bGlzdCcsIHBsYXlsaXN0KTtcbiAgICAgICAgJHNjb3BlLmN1cnJlbnRQbGF5bGlzdCA9ICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnY3VycmVudFBsYXlsaXN0Jyk7XG5cbiAgICAgICAgaWYoJHNjb3BlLmN1cnJlbnRQbGF5bGlzdCkge1xuXG4gICAgICAgICAgU29uZy5xdWVyeSh7c29uZ0lkOiAnJ30se3BsYXlsaXN0SWQ6ICRzY29wZS5jdXJyZW50UGxheWxpc3QuaWR9KS50aGVuKGZ1bmN0aW9uKHNvbmdzKXtcblxuICAgICAgICAgICAgIEFwaVN5bmMuc2V0U29uZ3Moc29uZ3MpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0VmlkZW9Tb25nID0gZnVuY3Rpb24ocGxheWxpc3QsIHZpZGVvKSB7XG5cbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgndWwjJyt2aWRlby5pZC52aWRlb0lkKS50b2dnbGUoXCJzbG93XCIpO1xuXG4gICAgIHZhciBnZXRWaWRlb0luZm9VcmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My92aWRlb3M/JytcbiAgICAgICAgICAgICAgICAgICAnaWQ9JytcbiAgICAgICAgICAgICAgICAgICB2aWRlby5pZC52aWRlb0lkK1xuICAgICAgICAgICAgICAgICAgICcma2V5PScrXG4gICAgICAgICAgICAgICAgICAgWW91VHViZUFwaUtleVNlcnZpY2UuYXBpS2V5KCkrXG4gICAgICAgICAgICAgICAgICAgJyZwYXJ0PXNuaXBwZXQsY29udGVudERldGFpbHMnO1xuICAgICAgICAgJGh0dHAoe1xuXG4gICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgIHVybDogZ2V0VmlkZW9JbmZvVXJsXG5cbiAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0cyl7XG5cbiAgICAgICAgICAgYWRkVmlkZW9Ub1BsYXlsaXN0KHBsYXlsaXN0LHJlc3VsdHMuZGF0YS5pdGVtc1swXSk7XG5cbiAgICAgICAgIH0sZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAkbG9nKGVycm9yKTtcbiAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuY29udmVydER1cmF0aW9uID0gZnVuY3Rpb24oc3RyaW5nKSB7XG5cbiAgICAgICAgdmFyIGFycmF5ID0gc3RyaW5nLm1hdGNoKC8oXFxkKykoPz1bTUhTXSkvaWcpfHxbXTtcbiAgICAgICAgdmFyIGZvcm1hdHRlZCA9IGFycmF5Lm1hcChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICBpZihpdGVtLmxlbmd0aDwyKSByZXR1cm4gJzAnK2l0ZW07XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSkuam9pbignOicpO1xuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWQ7XG5cbiAgICB9O1xuXG4gICBmdW5jdGlvbiBhZGRWaWRlb1RvUGxheWxpc3QocGxheWxpc3QsIHZpZGVvKSB7XG5cbiAgICAgICAkaHR0cCh7XG4gICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgIHVybDogZGV2QXBpVXJsICsgJ3BsYXlsaXN0cy8nICsgcGxheWxpc3QuaWQgKycvc29uZ3MnLFxuICAgICAgICAgZGF0YToge1xuICAgICAgICAgICB0aXRsZTogdmlkZW8uc25pcHBldC50aXRsZSxcbiAgICAgICAgICAgYXJ0aXN0OiB2aWRlby5zbmlwcGV0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICB1cmw6IHZpZGVvLmlkLFxuICAgICAgICAgICBkdXJhdGlvbjogdmlkZW8uY29udGVudERldGFpbHMuZHVyYXRpb25cbiAgICAgICAgIH1cbiAgICAgICB9KS50aGVuKFxuICAgICAgICAgZnVuY3Rpb24ocmVzdWx0cyl7XG4gICAgICAgICAgIEFwaVN5bmMuc2V0U29uZ3MocmVzdWx0cy5kYXRhKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVsZXRlU29uZyA9IGZ1bmN0aW9uKHNvbmcpIHtcblxuICAgICAgICRodHRwKHtcbiAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICB1cmw6IGRldkFwaVVybCArICdwbGF5bGlzdHMvJyArICRzY29wZS5jdXJyZW50UGxheWxpc3QuaWQgKycvc29uZ3MvJysgc29uZy5pZFxuICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuXG4gICAgICAgICAkc2NvcGUuc2V0UGxheWxpc3QocmVzcG9uc2UuZGF0YS5jdXJyZW50X3BsYXlsaXN0KTtcbiAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAkbG9nKGVycm9yKTtcbiAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHNldFNlYXJjaFJlc3VsdHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICRzY29wZS52aWRlb3MgPSBvYmo7XG4gICAgfTtcblxuICAgICRzY29wZS5nZXRWaWRlb3MgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIGlmKCRzY29wZS50ZXh0KSB7XG5cbiAgICAgICAgICRzY29wZS5zZXRQbGF5bGlzdChudWxsKTtcbiAgICAgICAgIHZhciBzZWFyY2hUZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KCRzY29wZS50ZXh0KS5yZXBsYWNlKC8lMjAvZywgJysnKTtcbiAgICAgICAgIHZhciBteVVybCA9ICAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My8nK1xuICAgICAgICAgICAgICAgICAgICAgICdzZWFyY2g/cGFydD1zbmlwcGV0JytcbiAgICAgICAgICAgICAgICAgICAgICAnJnR5cGU9dmlkZW8nK1xuICAgICAgICAgICAgICAgICAgICAgICcmcT0nK1xuICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFRleHQrXG4gICAgICAgICAgICAgICAgICAgICAgJyZrZXk9JytcbiAgICAgICAgICAgICAgICAgICAgICBZb3VUdWJlQXBpS2V5U2VydmljZS5hcGlLZXkoKTtcbiAgICAgICAgY29uc29sZS5sb2cobXlVcmwpO1xuICAgICAgICAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG15VXJsXG5cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cbiAgICAgICAgICBzZXRTZWFyY2hSZXN1bHRzKHJlc3BvbnNlLmRhdGEuaXRlbXMpO1xuXG4gICAgICAgIH0sZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0VXJsID0gZnVuY3Rpb24odmlkZW8pIHtcbiAgICAgIHJldHVybiBcIi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL1wiK3ZpZGVvLmlkLnZpZGVvSWQrXCI/ZW5hYmxlanNhcGk9MVwiO1xuICAgIH07XG5cbiAgICAkc2NvcGUudHJ1c3RTcmMgPSBmdW5jdGlvbihzcmMpIHtcbiAgICAgIHJldHVybiAkc2NlLnRydXN0QXNSZXNvdXJjZVVybChzcmMpO1xuICAgIH07XG5cbiAgICAkc2NvcGUudG9nZ2xlTWVudSA9IGZ1bmN0aW9uKHZpZGVvSWQpIHtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgndWwjJyt2aWRlb0lkKS50b2dnbGUoXCJzbG93XCIpO1xuICAgIH07XG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVBsYXllcigpIHtcblxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgJHNjb3BlLnZpZGVvcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgdmFyIGlkID0gJ3ZpZC0nKyhpKzEpO1xuICAgICAgICAgIHZhciB2aWRQbGF5ZXJPYmogPSBuZXcgWVQuUGxheWVyKGlkLCB7XG4gICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAnb25TdGF0ZUNoYW5nZSc6ICRzY29wZS5vblBsYXllclN0YXRlQ2hhbmdlXG4gICAgICAgICAgICAgfVxuICAgICAgICAgICB9KTtcbiAgICAgICAgICAgdmlkQXJyYXkucHVzaCh2aWRQbGF5ZXJPYmopO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgJHNjb3BlLiRvbignbmdSZXBlYXRGaW5pc2hlZCcsIGZ1bmN0aW9uKG5nUmVwZWF0RmluaXNoZWRFdmVudCkge1xuXG4gICAgICAgY3JlYXRlUGxheWVyKCk7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUub25QbGF5ZXJSZWFkeSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgIGV2ZW50LnRhcmdldC5wbGF5VmlkZW8oKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLm9uUGxheWVyU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIGlmKGV2ZW50LmRhdGEgPT0gWVQuUGxheWVyU3RhdGUuUExBWUlORykge1xuICAgICAgICAgIHNlYXJjaFZpZExvZ2ljKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZWFyY2hWaWRMb2dpYyh2aWRlbykge1xuXG4gICAgICBpZigkc2NvcGUuY3VycmVudFNvbmcgJiYgJHNjb3BlLmlzUGxheWluZykge1xuICAgICAgICAkc2NvcGUucGF1c2UoKTtcbiAgICAgIH1cblxuICAgICAgaWYoc2VhcmNoQ3VycmVudFNvbmcgJiYgKHNlYXJjaEN1cnJlbnRTb25nICE9PSB2aWRlbykpIHtcbiAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcucGF1c2VWaWRlbygpO1xuICAgICAgICBzZWFyY2hDdXJyZW50U29uZyA9IHZpZGVvO1xuICAgICAgfSBlbHNlIGlmKHNlYXJjaEN1cnJlbnRTb25nICYmIChzZWFyY2hDdXJyZW50U29uZyA9PSB2aWRlbykpIHtcbiAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcucGxheVZpZGVvKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2hDdXJyZW50U29uZyA9IHZpZGVvO1xuICAgICAgICBzZWFyY2hDdXJyZW50U29uZy5wbGF5VmlkZW8oKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3BWaWRlbygpIHtcblxuICAgICAgcGxheWVyLnN0b3BWaWRlbygpO1xuICAgIH1cblxuICAgICRzY29wZS5wbGF5ID0gZnVuY3Rpb24oc29uZykge1xuXG4gICAgICAgIHZhciB2aWRIZWlnaHQgPSBhbmd1bGFyLmVsZW1lbnQoJ2Rpdi52aWRlbycpLmhlaWdodCgpO1xuICAgICAgICB2YXIgdmlkV2lkdGggPSBhbmd1bGFyLmVsZW1lbnQoJ2Rpdi52aWRlbycpLndpZHRoKCk7XG4gICAgICAgIHZhciBpbml0aWFsU29uZyA9ICRzY29wZS5jdXJyZW50U29uZyB8fCAkc2NvcGUuc29uZ3MoKVswXTtcbiAgICAgICAgdmFyIHZpZFBsYXkgPSBzb25nIHx8IGluaXRpYWxTb25nO1xuXG5cbiAgICAgICAgLy8gc3RvcHMgcGxheWVyIHBsYXlpbmcgaW4gc2VhcmNoIHJlc3VsdHMgd2hlbiBwbGF5aW5nIGFub3RoZXIgc29uZyBpbiBwbGF5bGlzdFxuXG4gICAgICAgIGlmKHNlYXJjaEN1cnJlbnRTb25nKSB7XG4gICAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcuc3RvcFZpZGVvKCk7XG4gICAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgLy8gaWYgdGhlcmUncyBubyBjdXJyZW50U29uZyBjcmVhdGUgeW91dHViZSBwbGF5ZXJcbiAgICAgICAgaWYoISRzY29wZS5jdXJyZW50U29uZykge1xuXG4gICAgICAgICBwbGF5ZXIgPSBuZXcgWVQuUGxheWVyKCdpZnJhbWUtdXR1YmUtcGxheWVyJywge1xuICAgICAgICAgICBoZWlnaHQ6IHZpZEhlaWdodCxcbiAgICAgICAgICAgd2lkdGg6ICB2aWRXaWR0aCxcbiAgICAgICAgICAgdmlkZW9JZDogdmlkUGxheS51cmwsXG4gICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICdvblJlYWR5JzogJHNjb3BlLm9uUGxheWVyUmVhZHksXG4gICAgICAgICAgICAgJ29uU3RhdGVDaGFuZ2UnOiAkc2NvcGUub25QbGF5bGlzdFBsYXllckNoYW5nZVxuICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgICB9IGVsc2UgaWYoc29uZyA9PSAkc2NvcGUuY3VycmVudFNvbmcgfHwgKCRzY29wZS5jdXJyZW50U29uZyAmJiAhc29uZykpIHtcbiAgICAgICAgICAgIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgcGxheWVyLmxvYWRWaWRlb0J5SWQoe1xuICAgICAgICAgICAgJ3ZpZGVvSWQnOiB2aWRQbGF5LnVybFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJHNjb3BlLmN1cnJlbnRTb25nLnBsYXlpbmcgPSBudWxsO1xuICAgICAgIH1cblxuICAgICAgICRzY29wZS5jdXJyZW50U29uZyA9IHZpZFBsYXk7XG4gICAgICAgJHNjb3BlLmlzUGxheWluZyA9IHRydWU7XG4gICAgICAgJHNjb3BlLmN1cnJlbnRTb25nLnBsYXlpbmcgPSB0cnVlO1xuXG4gICAgICAgaWYoc29uZykge1xuICAgICAgICAgc29uZy5wbGF5aW5nID0gdHJ1ZTtcbiAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIG9uIHBsYXlsaXN0IHBsYXllciBjaGFuZ2VcblxuICAgICRzY29wZS5vblBsYXlsaXN0UGxheWVyQ2hhbmdlID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuXG5cbiAgICB9O1xuXG4gICAgJHNjb3BlLnBhdXNlID0gZnVuY3Rpb24oc29uZykge1xuXG4gICAgICAgJHNjb3BlLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICAgaWYoc29uZyl7XG4gICAgICAgICBzb25nLnBsYXlpbmcgPSBudWxsO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAkc2NvcGUuY3VycmVudFNvbmcucGxheWluZyA9IG51bGw7XG4gICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRTb25nSW5kZXgoc29uZykge1xuICAgICAgcmV0dXJuIHNvbmdzKCkuaW5kZXhPZihzb25nKTtcbiAgICB9XG5cbiAgICAkc2NvcGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgc29uZ3NBcnJheSA9ICRzY29wZS5zb25ncygpO1xuICAgICAgdmFyIGxhc3RJbmRleCA9IHNvbmdzQXJyYXkubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBpbmRleE9mQ3VycmVudFNvbmcgPSBzb25nc0FycmF5LmluZGV4T2YoJHNjb3BlLmN1cnJlbnRTb25nKTtcbiAgICAgIHZhciBzb25nVG9QbGF5ID0gbnVsbDtcblxuICAgICAgaWYoJHNjb3BlLmN1cnJlbnRTb25nKSB7XG4gICAgICAgIGlmKGluZGV4T2ZDdXJyZW50U29uZyA8IGxhc3RJbmRleCApIHtcblxuICAgICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtpbmRleE9mQ3VycmVudFNvbmcgKyAxXTtcblxuICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICBpbmRleE9mQ3VycmVudFNvbmcgPSAwO1xuICAgICAgICAgICBzb25nVG9QbGF5ICA9IHNvbmdzQXJyYXlbaW5kZXhPZkN1cnJlbnRTb25nXTtcbiAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVswXTtcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLnBsYXkoc29uZ1RvUGxheSk7XG4gICB9O1xuXG4gICAkc2NvcGUucHJldmlvdXMgPSBmdW5jdGlvbigpIHtcblxuICAgICB2YXIgc29uZ3NBcnJheSA9ICRzY29wZS5zb25ncygpO1xuICAgICB2YXIgbGFzdEluZGV4ID0gc29uZ3NBcnJheS5sZW5ndGggLSAxO1xuICAgICB2YXIgaW5kZXhPZkN1cnJlbnRTb25nID0gc29uZ3NBcnJheS5pbmRleE9mKCRzY29wZS5jdXJyZW50U29uZyk7XG4gICAgIHZhciBzb25nVG9QbGF5ID0gbnVsbDtcblxuICAgICBpZigkc2NvcGUuY3VycmVudFNvbmcpIHtcbiAgICAgICBpZihpbmRleE9mQ3VycmVudFNvbmcgPiAwICkge1xuXG4gICAgICAgICBzb25nVG9QbGF5ICA9IHNvbmdzQXJyYXlbaW5kZXhPZkN1cnJlbnRTb25nIC0gMV07XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIGluZGV4T2ZDdXJyZW50U29uZyA9IGxhc3RJbmRleDtcbiAgICAgICAgICBzb25nVG9QbGF5ICA9IHNvbmdzQXJyYXlbaW5kZXhPZkN1cnJlbnRTb25nXTtcbiAgICAgICAgfVxuICAgICB9IGVsc2Uge1xuICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtsYXN0SW5kZXhdO1xuICAgICB9XG5cbiAgICAgJHNjb3BlLnBsYXkoc29uZ1RvUGxheSk7XG4gICAgfTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL2hvbWUuY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBOYXZDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkcm9vdFNjb3BlLCAkYXV0aCwgJGxvY2F0aW9uLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlLCAkaHR0cCwgQXBpU3luYykge1xuICAgICduZ0luamVjdCc7XG4gICAgZnVuY3Rpb24gY2hhbmdlTmF2Q29sb3IoKXtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnbmF2Lm5hdi1iYXInKS5jc3MoJ2NvbG9yJywnYmxhY2snKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnbmF2Lm5hdi1iYXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCd3aGl0ZScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhciB1bCcpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ3doaXRlJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsLm5hdi1tZW51IGEnKS5jc3MoJ2NvbG9yJywnYmxhY2snKTtcbiAgICB9XG5cbiAgICAkc2NvcGUuaXNfb3BlbiA9IGZhbHNlO1xuXG4gICAgJHNjb3BlLnBsYXlsaXN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEFwaVN5bmMuZ2V0UGxheWxpc3RzKCk7XG4gICAgfTtcblxuICAgIHRoaXMucGFnZVJlZGlyZWN0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIGlmKCRyb290U2NvcGUudXNlci5pZCkge1xuICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3VzZXJzLycrICRyb290U2NvcGUudXNlci5pZCk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5zaWduT3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAkYXV0aC5zaWduT3V0KCk7XG4gICAgfTtcblxuICAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ291dC1zdWNjZXNzJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICRzY29wZS51c2VyU2lnbmVkSW4gPSBudWxsO1xuICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5yZW1vdmUoJ2N1cnJlbnRVc2VyJyk7XG4gICAgICBjaGFuZ2VOYXZDb2xvcigpO1xuICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICB9KTtcblxuICAgICRzY29wZS50b2dnbGVNZW51ID0gZnVuY3Rpb24oZXZlbnQsIHhfaWQpIHtcblxuICAgICAgYW5ndWxhci5lbGVtZW50KCcjbW9iaWxlLWhhbS1ibGFjaycpLnRvZ2dsZUNsYXNzKCdoaWRlJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJyNtb2JpbGUtaGFtLXdoaXRlJykudG9nZ2xlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI21vYmlsZS14LWJsYWNrJykudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXknKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI21vYmlsZS14LXdoaXRlJykudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXknKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnZGl2IycrIHhfaWQpLnRvZ2dsZUNsYXNzKCdkaXNwbGF5Jyk7XG5cbiAgICB9O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvbmF2LmNvbnRyb2xsZXIuanMiLCJleHBvcnQgY2xhc3MgUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRhdXRoLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sIGxvY2FsU3RvcmFnZVNlcnZpY2Upe1xuICAgICduZ0luamVjdCc7XG4gICAgXG4gICAgdmFyIHNldFVzZXIgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnY3VycmVudFVzZXInLCBvYmopO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc3VibWl0UmVnaXN0cmF0aW9uID0gZnVuY3Rpb24ocmVnaXN0cmF0aW9uRm9ybSkge1xuXG4gICAgICAkYXV0aC5zdWJtaXRSZWdpc3RyYXRpb24ocmVnaXN0cmF0aW9uRm9ybSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAkYXV0aC5zdWJtaXRMb2dpbih7XG4gICAgICAgICAgICBlbWFpbDogcmVnaXN0cmF0aW9uRm9ybS5lbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkOiByZWdpc3RyYXRpb25Gb3JtLnBhc3N3b3JkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ2luLXN1Y2Nlc3MnLCBmdW5jdGlvbihldiwgdXNlcikge1xuXG4gICAgICBzZXRVc2VyKHVzZXIpO1xuICAgICAgJGxvY2F0aW9uLnBhdGgoJy91c2Vycy8nKyB1c2VyLmlkKTtcblxuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvcmVnaXN0cmF0aW9ucy5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIFNlc3Npb25zQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGF1dGgsICRyb290U2NvcGUsICRsb2NhdGlvbiwgVXNlciwgUGxheWxpc3QsIGxvY2FsU3RvcmFnZVNlcnZpY2Upe1xuICAgICduZ0luamVjdCc7XG4gICAgJHNjb3BlLmVycm9yID0gbnVsbDtcblxuICAgIHZhciBzZXRVc2VyID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2N1cnJlbnRVc2VyJywgb2JqKTtcbiAgICB9O1xuXG5cbiAgICRzY29wZS5zdWJtaXRMb2dpbiA9IGZ1bmN0aW9uKGxvZ2luRm9ybSkge1xuICAgICAkYXV0aC5zdWJtaXRMb2dpbihsb2dpbkZvcm0pLnRoZW4oZnVuY3Rpb24odXNlcikge1xuXG4gICAgICAgICAgICAgc2V0VXNlcih1c2VyKTtcbiAgICAgfSk7XG4gICB9O1xuXG4gICAkcm9vdFNjb3BlLiRvbignYXV0aDpsb2dpbi1zdWNjZXNzJywgZnVuY3Rpb24oZXYsIHVzZXIpIHtcblxuICAgICAkbG9jYXRpb24ucGF0aCgnL3VzZXJzLycrIHVzZXIuaWQpO1xuXG4gICB9KTtcbiAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ2luLWVycm9yJywgZnVuY3Rpb24oZXYsIHJlYXNvbikge1xuICAgICAkc2NvcGUuZXJyb3IgPSByZWFzb24uZXJyb3JzWzBdO1xuICAgfSk7XG5cbiAgIFVzZXIucXVlcnkoe3BsYXlsaXN0SWQ6ICcnfSx7dXNlcklkOiAxfSkudGhlbihmdW5jdGlvbihyZXN1bHRzKXtcbiAgICAgJHNjb3BlLnVzZXJzID0gcmVzdWx0cztcbiAgIH0pO1xuXG5cbiAgICRzY29wZS5zaWduT3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICRhdXRoLnNpZ25PdXQoKTtcbiAgIH07XG5cbiAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ291dC1zdWNjZXNzJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvc2Vzc2lvbnMuY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBCdWJibGVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHJvb3RTY29wZSwkc2NvcGUsJHdpbmRvdywgJGRvY3VtZW50KSB7XG4gICduZ0luamVjdCc7XG4gIHZhciBsYXZhMDtcbiAgdmFyIGdlMWRvb3QgPSB7XG4gICAgc2NyZWVuOiB7XG4gICAgICBlbGVtOiAgICAgbnVsbCxcbiAgICAgIGNhbGxiYWNrOiBudWxsLFxuICAgICAgY3R4OiAgICAgIG51bGwsXG4gICAgICB3aWR0aDogICAgMCxcbiAgICAgIGhlaWdodDogICAwLFxuICAgICAgbGVmdDogICAgIDAsXG4gICAgICB0b3A6ICAgICAgMCxcbiAgICAgIGluaXQ6IGZ1bmN0aW9uIChpZCwgY2FsbGJhY2ssIGluaXRSZXMpIHtcbiAgICAgICAgdGhpcy5lbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2sgfHwgbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuZWxlbS50YWdOYW1lID09IFwiQ0FOVkFTXCIpIHRoaXMuY3R4ID0gdGhpcy5lbGVtLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICB9LmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5lbGVtLm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICB0aGlzLmVsZW0ub25kcmFnICAgICAgICA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIGluaXRSZXMgJiYgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuICAgICAgcmVzaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvID0gdGhpcy5lbGVtO1xuICAgICAgICB0aGlzLndpZHRoICA9IG8ub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gby5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGZvciAodGhpcy5sZWZ0ID0gMCwgdGhpcy50b3AgPSAwOyBvICE9IG51bGw7IG8gPSBvLm9mZnNldFBhcmVudCkge1xuICAgICAgICAgIHRoaXMubGVmdCArPSBvLm9mZnNldExlZnQ7XG4gICAgICAgICAgdGhpcy50b3AgICs9IG8ub2Zmc2V0VG9wO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN0eCkge1xuICAgICAgICAgIHRoaXMuZWxlbS53aWR0aCAgPSB0aGlzLndpZHRoO1xuICAgICAgICAgIHRoaXMuZWxlbS5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gUG9pbnQgY29uc3RydWN0b3JcbiAgdmFyIFBvaW50ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLm1hZ25pdHVkZSA9IHggKiB4ICsgeSAqIHk7XG4gICAgdGhpcy5jb21wdXRlZCA9IDA7XG4gICAgdGhpcy5mb3JjZSA9IDA7XG4gIH07XG4gIFBvaW50LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggKyBwLngsIHRoaXMueSArIHAueSk7XG4gIH07XG5cbiAgLy8gQmFsbCBjb25zdHJ1Y3RvclxuICB2YXIgQmFsbCA9IGZ1bmN0aW9uKHBhcmVudCkge1xuICAgIHZhciBtaW4gPSAuMTtcbiAgICB2YXIgbWF4ID0gMS41O1xuICAgIHRoaXMudmVsID0gbmV3IFBvaW50KFxuICAgICAgKE1hdGgucmFuZG9tKCkgPiAwLjUgPyAxIDogLTEpICogKDAuMiArIE1hdGgucmFuZG9tKCkgKiAwLjAyNSksIChNYXRoLnJhbmRvbSgpID4gMC41ID8gMSA6IC0xKSAqICgwLjIgKyBNYXRoLnJhbmRvbSgpKVxuICAgICk7XG4gICAgdGhpcy5wb3MgPSBuZXcgUG9pbnQoXG4gICAgICBwYXJlbnQud2lkdGggKiAwLjIgKyBNYXRoLnJhbmRvbSgpICogcGFyZW50LndpZHRoICogMC42LFxuICAgICAgcGFyZW50LmhlaWdodCAqIDAuMiArIE1hdGgucmFuZG9tKCkgKiBwYXJlbnQuaGVpZ2h0ICogMC42XG4gICAgKTtcbiAgICB0aGlzLnNpemUgPSAocGFyZW50LndoIC8gMTUpICsgKCBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4gKSAqIChwYXJlbnQud2ggLyAxNSk7XG4gICAgdGhpcy53aWR0aCA9IHBhcmVudC53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IHBhcmVudC5oZWlnaHQ7XG4gIH07XG5cbiAgLy8gbW92ZSBiYWxsc1xuICBCYWxsLnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBib3VuY2UgYm9yZGVyc1xuICAgIGlmICh0aGlzLnBvcy54ID49IHRoaXMud2lkdGggLSB0aGlzLnNpemUpIHtcbiAgICAgIGlmICh0aGlzLnZlbC54ID4gMCkgdGhpcy52ZWwueCA9IC10aGlzLnZlbC54O1xuICAgICAgdGhpcy5wb3MueCA9IHRoaXMud2lkdGggLSB0aGlzLnNpemU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBvcy54IDw9IHRoaXMuc2l6ZSkge1xuICAgICAgaWYgKHRoaXMudmVsLnggPCAwKSB0aGlzLnZlbC54ID0gLXRoaXMudmVsLng7XG4gICAgICB0aGlzLnBvcy54ID0gdGhpcy5zaXplO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBvcy55ID49IHRoaXMuaGVpZ2h0IC0gdGhpcy5zaXplKSB7XG4gICAgICBpZiAodGhpcy52ZWwueSA+IDApIHRoaXMudmVsLnkgPSAtdGhpcy52ZWwueTtcbiAgICAgIHRoaXMucG9zLnkgPSB0aGlzLmhlaWdodCAtIHRoaXMuc2l6ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9zLnkgPD0gdGhpcy5zaXplKSB7XG4gICAgICBpZiAodGhpcy52ZWwueSA8IDApIHRoaXMudmVsLnkgPSAtdGhpcy52ZWwueTtcbiAgICAgIHRoaXMucG9zLnkgPSB0aGlzLnNpemU7XG4gICAgfVxuXG4gICAgLy8gdmVsb2NpdHlcbiAgICB0aGlzLnBvcyA9IHRoaXMucG9zLmFkZCh0aGlzLnZlbCk7XG5cbiAgfTtcblxuICAvLyBsYXZhbGFtcCBjb25zdHJ1Y3RvclxuICB2YXIgTGF2YUxhbXAgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBudW1CYWxscywgYzAsIGMxKSB7XG4gICAgdGhpcy5zdGVwID0gNTtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy53aCA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuc3ggPSBNYXRoLmZsb29yKHRoaXMud2lkdGggLyB0aGlzLnN0ZXApO1xuICAgIHRoaXMuc3kgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0IC8gdGhpcy5zdGVwKTtcbiAgICB0aGlzLnBhaW50ID0gZmFsc2U7XG4gICAgdGhpcy5tZXRhRmlsbCA9IGNyZWF0ZVJhZGlhbEdyYWRpZW50KHdpZHRoLCBoZWlnaHQsIHdpZHRoLCBjMCwgYzEpO1xuICAgIHRoaXMucGx4ID0gWzAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDBdO1xuICAgIHRoaXMucGx5ID0gWzAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDEsIDEsIDAsIDEsIDAsIDFdO1xuICAgIHRoaXMubXNjYXNlcyA9IFswLCAzLCAwLCAzLCAxLCAzLCAwLCAzLCAyLCAyLCAwLCAyLCAxLCAxLCAwXTtcbiAgICB0aGlzLml4ID0gWzEsIDAsIC0xLCAwLCAwLCAxLCAwLCAtMSwgLTEsIDAsIDEsIDAsIDAsIDEsIDEsIDAsIDAsIDAsIDEsIDFdO1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgIHRoaXMuYmFsbHMgPSBbXTtcbiAgICB0aGlzLml0ZXIgPSAwO1xuICAgIHRoaXMuc2lnbiA9IDE7XG5cbiAgICAvLyBpbml0IGdyaWRcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8ICh0aGlzLnN4ICsgMikgKiAodGhpcy5zeSArIDIpOyBpKyspIHtcbiAgICAgIHRoaXMuZ3JpZFtpXSA9IG5ldyBQb2ludChcbiAgICAgICAgKGkgJSAodGhpcy5zeCArIDIpKSAqIHRoaXMuc3RlcCwgKE1hdGguZmxvb3IoaSAvICh0aGlzLnN4ICsgMikpKSAqIHRoaXMuc3RlcFxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBtZXRhYmFsbHNcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IDEwOyBrKyspIHtcbiAgICAgIHRoaXMuYmFsbHNba10gPSBuZXcgQmFsbCh0aGlzKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gY29tcHV0ZSBjZWxsIGZvcmNlXG4gIExhdmFMYW1wLnByb3RvdHlwZS5jb21wdXRlRm9yY2UgPSBmdW5jdGlvbih4LCB5LCBpZHgpIHtcblxuICAgIHZhciBmb3JjZTtcbiAgICB2YXIgaWQgPSBpZHggfHwgeCArIHkgKiAodGhpcy5zeCArIDIpO1xuXG4gICAgaWYgKHggPT09IDAgfHwgeSA9PT0gMCB8fCB4ID09PSB0aGlzLnN4IHx8IHkgPT09IHRoaXMuc3kpIHtcbiAgICAgIGZvcmNlID0gMC4wNiAqIHRoaXMuc2lnbjtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yY2UgPSAwO1xuICAgICAgdmFyIGNlbGwgPSB0aGlzLmdyaWRbaWRdO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIGJhbGw7XG4gICAgICB3aGlsZSAoYmFsbCA9IHRoaXMuYmFsbHNbaSsrXSkge1xuICAgICAgICBmb3JjZSArPSBiYWxsLnNpemUgKiBiYWxsLnNpemUgLyAoLTIgKiBjZWxsLnggKiBiYWxsLnBvcy54IC0gMiAqIGNlbGwueSAqIGJhbGwucG9zLnkgKyBiYWxsLnBvcy5tYWduaXR1ZGUgKyBjZWxsLm1hZ25pdHVkZSk7XG4gICAgICB9XG4gICAgICBmb3JjZSAqPSB0aGlzLnNpZ25cbiAgICB9XG4gICAgdGhpcy5ncmlkW2lkXS5mb3JjZSA9IGZvcmNlO1xuICAgIHJldHVybiBmb3JjZTtcbiAgfTtcblxuICAvLyBjb21wdXRlIGNlbGxcbiAgTGF2YUxhbXAucHJvdG90eXBlLm1hcmNoaW5nU3F1YXJlcyA9IGZ1bmN0aW9uKG5leHQpIHtcbiAgICB2YXIgeCA9IG5leHRbMF07XG4gICAgdmFyIHkgPSBuZXh0WzFdO1xuICAgIHZhciBwZGlyID0gbmV4dFsyXTtcbiAgICB2YXIgaWQgPSB4ICsgeSAqICh0aGlzLnN4ICsgMik7XG4gICAgaWYgKHRoaXMuZ3JpZFtpZF0uY29tcHV0ZWQgPT09IHRoaXMuaXRlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgZGlyLCBtc2Nhc2UgPSAwO1xuXG4gICAgLy8gbmVpZ2hib3JzIGZvcmNlXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIHZhciBpZG4gPSAoeCArIHRoaXMuaXhbaSArIDEyXSkgKyAoeSArIHRoaXMuaXhbaSArIDE2XSkgKiAodGhpcy5zeCArIDIpO1xuICAgICAgdmFyIGZvcmNlID0gdGhpcy5ncmlkW2lkbl0uZm9yY2U7XG4gICAgICBpZiAoKGZvcmNlID4gMCAmJiB0aGlzLnNpZ24gPCAwKSB8fCAoZm9yY2UgPCAwICYmIHRoaXMuc2lnbiA+IDApIHx8ICFmb3JjZSkge1xuICAgICAgICAvLyBjb21wdXRlIGZvcmNlIGlmIG5vdCBpbiBidWZmZXJcbiAgICAgICAgZm9yY2UgPSB0aGlzLmNvbXB1dGVGb3JjZShcbiAgICAgICAgICB4ICsgdGhpcy5peFtpICsgMTJdLFxuICAgICAgICAgIHkgKyB0aGlzLml4W2kgKyAxNl0sXG4gICAgICAgICAgaWRuXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoTWF0aC5hYnMoZm9yY2UpID4gMSkgbXNjYXNlICs9IE1hdGgucG93KDIsIGkpO1xuICAgIH1cbiAgICBpZiAobXNjYXNlID09PSAxNSkge1xuICAgICAgLy8gaW5zaWRlXG4gICAgICByZXR1cm4gW3gsIHkgLSAxLCBmYWxzZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFtYmlndW91cyBjYXNlc1xuICAgICAgaWYgKG1zY2FzZSA9PT0gNSkgZGlyID0gKHBkaXIgPT09IDIpID8gMyA6IDE7XG4gICAgICBlbHNlIGlmIChtc2Nhc2UgPT09IDEwKSBkaXIgPSAocGRpciA9PT0gMykgPyAwIDogMjtcbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBsb29rdXBcbiAgICAgICAgZGlyID0gdGhpcy5tc2Nhc2VzW21zY2FzZV07XG4gICAgICAgIHRoaXMuZ3JpZFtpZF0uY29tcHV0ZWQgPSB0aGlzLml0ZXI7XG4gICAgICB9XG4gICAgICAvLyBkcmF3IGxpbmVcbiAgICAgIHZhciBpeCA9IHRoaXMuc3RlcCAvIChcbiAgICAgICAgICBNYXRoLmFicyhNYXRoLmFicyh0aGlzLmdyaWRbKHggKyB0aGlzLnBseFs0ICogZGlyICsgMl0pICsgKHkgKyB0aGlzLnBseVs0ICogZGlyICsgMl0pICogKHRoaXMuc3ggKyAyKV0uZm9yY2UpIC0gMSkgL1xuICAgICAgICAgIE1hdGguYWJzKE1hdGguYWJzKHRoaXMuZ3JpZFsoeCArIHRoaXMucGx4WzQgKiBkaXIgKyAzXSkgKyAoeSArIHRoaXMucGx5WzQgKiBkaXIgKyAzXSkgKiAodGhpcy5zeCArIDIpXS5mb3JjZSkgLSAxKSArIDFcbiAgICAgICAgKTtcbiAgICAgIGN0eC5saW5lVG8oXG4gICAgICAgIHRoaXMuZ3JpZFsoeCArIHRoaXMucGx4WzQgKiBkaXJdKSArICh5ICsgdGhpcy5wbHlbNCAqIGRpcl0pICogKHRoaXMuc3ggKyAyKV0ueCArIHRoaXMuaXhbZGlyXSAqIGl4LFxuICAgICAgICB0aGlzLmdyaWRbKHggKyB0aGlzLnBseFs0ICogZGlyICsgMV0pICsgKHkgKyB0aGlzLnBseVs0ICogZGlyICsgMV0pICogKHRoaXMuc3ggKyAyKV0ueSArIHRoaXMuaXhbZGlyICsgNF0gKiBpeFxuICAgICAgKTtcbiAgICAgIHRoaXMucGFpbnQgPSB0cnVlO1xuICAgICAgLy8gbmV4dFxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgeCArIHRoaXMuaXhbZGlyICsgNF0sXG4gICAgICAgIHkgKyB0aGlzLml4W2RpciArIDhdLFxuICAgICAgICBkaXJcbiAgICAgIF07XG4gICAgfVxuICB9O1xuXG4gIExhdmFMYW1wLnByb3RvdHlwZS5yZW5kZXJNZXRhYmFsbHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaSA9IDAsIGJhbGw7XG4gICAgd2hpbGUgKGJhbGwgPSB0aGlzLmJhbGxzW2krK10pIGJhbGwubW92ZSgpO1xuICAgIC8vIHJlc2V0IGdyaWRcbiAgICB0aGlzLml0ZXIrKztcbiAgICB0aGlzLnNpZ24gPSAtdGhpcy5zaWduO1xuICAgIHRoaXMucGFpbnQgPSBmYWxzZTtcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5tZXRhRmlsbDtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgLy8gY29tcHV0ZSBtZXRhYmFsbHNcbiAgICBpID0gMDtcbiAgICAvL2N0eC5zaGFkb3dCbHVyID0gNTA7XG4gICAgLy9jdHguc2hhZG93Q29sb3IgPSBcImdyZWVuXCI7XG4gICAgd2hpbGUgKGJhbGwgPSB0aGlzLmJhbGxzW2krK10pIHtcbiAgICAgIC8vIGZpcnN0IGNlbGxcbiAgICAgIHZhciBuZXh0ID0gW1xuICAgICAgICBNYXRoLnJvdW5kKGJhbGwucG9zLnggLyB0aGlzLnN0ZXApLFxuICAgICAgICBNYXRoLnJvdW5kKGJhbGwucG9zLnkgLyB0aGlzLnN0ZXApLCBmYWxzZVxuICAgICAgXTtcbiAgICAgIC8vIG1hcmNoaW5nIHNxdWFyZXNcbiAgICAgIGRvIHtcbiAgICAgICAgbmV4dCA9IHRoaXMubWFyY2hpbmdTcXVhcmVzKG5leHQpO1xuICAgICAgfSB3aGlsZSAobmV4dCk7XG4gICAgICAvLyBmaWxsIGFuZCBjbG9zZSBwYXRoXG4gICAgICBpZiAodGhpcy5wYWludCkge1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5wYWludCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBncmFkaWVudHNcbiAgdmFyIGNyZWF0ZVJhZGlhbEdyYWRpZW50ID0gZnVuY3Rpb24odywgaCwgciwgYzAsIGMxKSB7XG4gICAgdmFyIGdyYWRpZW50ID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KFxuICAgICAgdyAvIDEsIGggLyAxLCAwLFxuICAgICAgdyAvIDEsIGggLyAxLCByXG4gICAgKTtcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgYzApO1xuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBjMSk7XG4gICAgcmV0dXJuIGdyYWRpZW50O1xuICB9O1xuXG4gIC8vIG1haW4gbG9vcFxuICB2YXIgcnVuID0gZnVuY3Rpb24oc3RhdGUpIHtcblxuICAgIGlmKHN0YXRlKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocnVuKTtcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgc2NyZWVuLndpZHRoLCBzY3JlZW4uaGVpZ2h0KTtcbiAgICAgIGxhdmEwLnJlbmRlck1ldGFiYWxscygpO1xuICAgIH1cbiAgfTtcblxuICAvLyBjYW52YXNcbiAgdmFyIHNjcmVlbiA9IGdlMWRvb3Quc2NyZWVuLmluaXQoXCJidWJibGVcIiwgbnVsbCwgdHJ1ZSksXG4gICAgICBjdHggPSBzY3JlZW4uY3R4O1xuICAgICAgc2NyZWVuLnJlc2l6ZSgpO1xuICAvLyBjcmVhdGUgTGF2YUxhbXBzXG4gIGxhdmEwID0gbmV3IExhdmFMYW1wKHNjcmVlbi53aWR0aCwgc2NyZWVuLmhlaWdodCwgMTAwLCBcIiNmNTEyYjVcIiwgXCIjNWYyNWI4XCIpO1xuXG4gICAgcnVuKGFuZ3VsYXIuZWxlbWVudCgnI2J1YmJsZScpLmlzKCc6dmlzaWJsZScpKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uKCl7XG4gICAgICBpZihhbmd1bGFyLmVsZW1lbnQoJyNidWJibGUnKS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICBsYXZhMCA9IG5ldyBMYXZhTGFtcChzY3JlZW4ud2lkdGgsIHNjcmVlbi5oZWlnaHQsIDEwMCwgXCIjZjUxMmI1XCIsIFwiIzVmMjViOFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL2J1YmJsZS5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICgkbG9nLCAkaHR0cCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICB0aGlzLmFwaUhvc3QgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9Td2lpcC9nZW5lcmF0b3ItZ3VscC1hbmd1bGFyJztcbiAgfVxuXG4gIGdldENvbnRyaWJ1dG9ycyhsaW1pdD0zMCkge1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCh0aGlzLmFwaUhvc3QgKyAnL2NvbnRyaWJ1dG9ycz9wZXJfcGFnZT0nICsgbGltaXQpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLiRsb2cuZXJyb3IoJ1hIUiBGYWlsZWQgZm9yIGdldENvbnRyaWJ1dG9ycy5cXG4nICsgYW5ndWxhci50b0pzb24oZXJyb3IuZGF0YSwgdHJ1ZSkpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwiZXhwb3J0IGNsYXNzIFdlYkRldlRlY1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuZGF0YSA9IFtcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0FuZ3VsYXJKUycsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9hbmd1bGFyanMub3JnLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdIVE1MIGVuaGFuY2VkIGZvciB3ZWIgYXBwcyEnLFxuICAgICAgICAnbG9nbyc6ICdhbmd1bGFyLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdCcm93c2VyU3luYycsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2Jyb3dzZXJzeW5jLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaW1lLXNhdmluZyBzeW5jaHJvbmlzZWQgYnJvd3NlciB0ZXN0aW5nLicsXG4gICAgICAgICdsb2dvJzogJ2Jyb3dzZXJzeW5jLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdHdWxwSlMnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9ndWxwanMuY29tLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc3RyZWFtaW5nIGJ1aWxkIHN5c3RlbS4nLFxuICAgICAgICAnbG9nbyc6ICdndWxwLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdKYXNtaW5lJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vamFzbWluZS5naXRodWIuaW8vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0JlaGF2aW9yLURyaXZlbiBKYXZhU2NyaXB0LicsXG4gICAgICAgICdsb2dvJzogJ2phc21pbmUucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0thcm1hJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8va2FybWEtcnVubmVyLmdpdGh1Yi5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnU3BlY3RhY3VsYXIgVGVzdCBSdW5uZXIgZm9yIEphdmFTY3JpcHQuJyxcbiAgICAgICAgJ2xvZ28nOiAna2FybWEucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ1Byb3RyYWN0b3InLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3Byb3RyYWN0b3InLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnRW5kIHRvIGVuZCB0ZXN0IGZyYW1ld29yayBmb3IgQW5ndWxhckpTIGFwcGxpY2F0aW9ucyBidWlsdCBvbiB0b3Agb2YgV2ViRHJpdmVySlMuJyxcbiAgICAgICAgJ2xvZ28nOiAncHJvdHJhY3Rvci5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQm9vdHN0cmFwJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQm9vdHN0cmFwIGlzIHRoZSBtb3N0IHBvcHVsYXIgSFRNTCwgQ1NTLCBhbmQgSlMgZnJhbWV3b3JrIGZvciBkZXZlbG9waW5nIHJlc3BvbnNpdmUsIG1vYmlsZSBmaXJzdCBwcm9qZWN0cyBvbiB0aGUgd2ViLicsXG4gICAgICAgICdsb2dvJzogJ2Jvb3RzdHJhcC5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQW5ndWxhciBVSSBCb290c3RyYXAnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9hbmd1bGFyLXVpLmdpdGh1Yi5pby9ib290c3RyYXAvJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0Jvb3RzdHJhcCBjb21wb25lbnRzIHdyaXR0ZW4gaW4gcHVyZSBBbmd1bGFySlMgYnkgdGhlIEFuZ3VsYXJVSSBUZWFtLicsXG4gICAgICAgICdsb2dvJzogJ3VpLWJvb3RzdHJhcC5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnU2FzcyAoTm9kZSknLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9zYXNzL25vZGUtc2FzcycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdOb2RlLmpzIGJpbmRpbmcgdG8gbGlic2FzcywgdGhlIEMgdmVyc2lvbiBvZiB0aGUgcG9wdWxhciBzdHlsZXNoZWV0IHByZXByb2Nlc3NvciwgU2Fzcy4nLFxuICAgICAgICAnbG9nbyc6ICdub2RlLXNhc3MucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0VTNiAoQmFiZWwgZm9ybWVybHkgNnRvNSknLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vYmFiZWxqcy5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVHVybnMgRVM2KyBjb2RlIGludG8gdmFuaWxsYSBFUzUsIHNvIHlvdSBjYW4gdXNlIG5leHQgZ2VuZXJhdGlvbiBmZWF0dXJlcyB0b2RheS4nLFxuICAgICAgICAnbG9nbyc6ICdiYWJlbC5wbmcnXG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIGdldFRlYygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvd2ViRGV2VGVjL3dlYkRldlRlYy5zZXJ2aWNlLmpzIiwiZXhwb3J0IGNsYXNzIFlvdVR1YmVBcGlLZXlTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuYXBpS2V5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJ0FJemFTeURhd3lQTGx0N05CM2U3WlNnMFRVRWtyMUEzRFNZQ2xDRSc7XG4gICAgfTsgXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9hcGlrZXlzL3lvdVR1YmVBcGlLZXkuc2VydmljZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBOYXZiYXJEaXJlY3RpdmUoKSB7XG4gICduZ0luamVjdCc7XG5cbiAgbGV0IGRpcmVjdGl2ZSA9IHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5odG1sJyxcbiAgICBzY29wZToge1xuICAgICAgICBjcmVhdGlvbkRhdGU6ICc9J1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogTmF2YmFyQ29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59XG5cbmNsYXNzIE5hdmJhckNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAobW9tZW50KSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIC8vIFwidGhpcy5jcmVhdGlvbkRhdGVcIiBpcyBhdmFpbGFibGUgYnkgZGlyZWN0aXZlIG9wdGlvbiBcImJpbmRUb0NvbnRyb2xsZXI6IHRydWVcIlxuICAgIHRoaXMucmVsYXRpdmVEYXRlID0gbW9tZW50KHRoaXMuY3JlYXRpb25EYXRlKS5mcm9tTm93KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBNYWxhcmtleURpcmVjdGl2ZShtYWxhcmtleSkge1xuICAnbmdJbmplY3QnO1xuXG4gIGxldCBkaXJlY3RpdmUgPSB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgICBleHRyYVZhbHVlczogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogJyZuYnNwOycsXG4gICAgbGluazogbGlua0Z1bmMsXG4gICAgY29udHJvbGxlcjogTWFsYXJrZXlDb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgZnVuY3Rpb24gbGlua0Z1bmMoc2NvcGUsIGVsLCBhdHRyLCB2bSkge1xuICAgIGxldCB3YXRjaGVyO1xuICAgIGxldCB0eXBpc3QgPSBtYWxhcmtleShlbFswXSwge1xuICAgICAgdHlwZVNwZWVkOiA0MCxcbiAgICAgIGRlbGV0ZVNwZWVkOiA0MCxcbiAgICAgIHBhdXNlRGVsYXk6IDgwMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBwb3N0Zml4OiAnICdcbiAgICB9KTtcblxuICAgIGVsLmFkZENsYXNzKCdhY21lLW1hbGFya2V5Jyk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuZXh0cmFWYWx1ZXMsICh2YWx1ZSkgPT4ge1xuICAgICAgdHlwaXN0LnR5cGUodmFsdWUpLnBhdXNlKCkuZGVsZXRlKCk7XG4gICAgfSk7XG5cbiAgICB3YXRjaGVyID0gc2NvcGUuJHdhdGNoKCd2bS5jb250cmlidXRvcnMnLCAoKSA9PiB7XG4gICAgICBhbmd1bGFyLmZvckVhY2godm0uY29udHJpYnV0b3JzLCAoY29udHJpYnV0b3IpID0+IHtcbiAgICAgICAgdHlwaXN0LnR5cGUoY29udHJpYnV0b3IubG9naW4pLnBhdXNlKCkuZGVsZXRlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICB3YXRjaGVyKCk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5jbGFzcyBNYWxhcmtleUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAoJGxvZywgZ2l0aHViQ29udHJpYnV0b3IpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB0aGlzLmNvbnRyaWJ1dG9ycyA9IFtdO1xuXG4gICAgdGhpcy5hY3RpdmF0ZShnaXRodWJDb250cmlidXRvcik7XG4gIH1cblxuICBhY3RpdmF0ZShnaXRodWJDb250cmlidXRvcikge1xuICAgIHJldHVybiB0aGlzLmdldENvbnRyaWJ1dG9ycyhnaXRodWJDb250cmlidXRvcikudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLiRsb2cuaW5mbygnQWN0aXZhdGVkIENvbnRyaWJ1dG9ycyBWaWV3Jyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDb250cmlidXRvcnMoZ2l0aHViQ29udHJpYnV0b3IpIHtcbiAgICByZXR1cm4gZ2l0aHViQ29udHJpYnV0b3IuZ2V0Q29udHJpYnV0b3JzKDEwKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLmNvbnRyaWJ1dG9ycyA9IGRhdGE7XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbnRyaWJ1dG9ycztcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL21hbGFya2V5L21hbGFya2V5LmRpcmVjdGl2ZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=