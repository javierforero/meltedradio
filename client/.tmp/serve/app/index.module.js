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
	        height: '100%',
	        width: '100%',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTViMzBiY2I0MDI0MGM2NTAyOTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9ob21lLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL25hdi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9yZWdpc3RyYXRpb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL3Nlc3Npb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL2J1YmJsZS5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2FwaWtleXMveW91VHViZUFwaUtleS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbImRldkFwaVVybCIsInByb2RBcGlVcmwiLCJhbmd1bGFyIiwibW9kdWxlIiwiY29uc3RhbnQiLCJtYWxhcmtleSIsIm1vbWVudCIsImNvbmZpZyIsIiRhdXRoUHJvdmlkZXIiLCJjb25maWd1cmUiLCJhcGlVcmwiLCJsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIiLCJzZXRQcmVmaXgiLCJyYWlsc1NlcmlhbGl6ZXJQcm92aWRlciIsInVuZGVyc2NvcmUiLCJpZGVudGl0eSIsImNhbWVsaXplIiwicnVuIiwic2VydmljZSIsImNvbnRyb2xsZXIiLCJkaXJlY3RpdmUiLCIkdGltZW91dCIsInJlc3RyaWN0IiwibGluayIsInNjb3BlIiwiZWxlbWVudCIsImF0dHIiLCIkbGFzdCIsIiRlbWl0Iiwib25GaW5pc2hSZW5kZXIiLCJmYWN0b3J5IiwiQXBpU3luYyIsInNldFBsYXlsaXN0cyIsIm9iaiIsInBsYXlsaXN0cyIsInNldFNvbmdzIiwic29uZ3MiLCJnZXRQbGF5bGlzdHMiLCJnZXRTb25ncyIsInJhaWxzUmVzb3VyY2VGYWN0b3J5IiwidXJsIiwibmFtZSIsIiRsb2dQcm92aWRlciIsInRvYXN0ckNvbmZpZyIsImRlYnVnRW5hYmxlZCIsImFsbG93SHRtbCIsInRpbWVPdXQiLCJwb3NpdGlvbkNsYXNzIiwicHJldmVudER1cGxpY2F0ZXMiLCJwcm9ncmVzc0JhciIsInJvdXRlckNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwic3RhdGUiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXJBcyIsInJlc29sdmUiLCJhdXRoIiwiJGF1dGgiLCJ2YWxpZGF0ZVVzZXIiLCJvdGhlcndpc2UiLCJydW5CbG9jayIsIiRsb2ciLCJkZWJ1ZyIsIndlYkRldlRlYyIsInRvYXN0ciIsImF3ZXNvbWVUaGluZ3MiLCJjbGFzc0FuaW1hdGlvbiIsImNyZWF0aW9uRGF0ZSIsImFjdGl2YXRlIiwiZ2V0V2ViRGV2VGVjIiwiZ2V0VGVjIiwiZm9yRWFjaCIsImF3ZXNvbWVUaGluZyIsInJhbmsiLCJNYXRoIiwicmFuZG9tIiwiaW5mbyIsIkhvbWVDb250cm9sbGVyIiwiJHNjb3BlIiwiJHJvb3RTY29wZSIsIiRsb2NhdGlvbiIsIlVzZXIiLCJQbGF5bGlzdCIsImxvY2FsU3RvcmFnZVNlcnZpY2UiLCIkdWliTW9kYWwiLCJTb25nIiwiJGh0dHAiLCIkc2NlIiwiJHdpbmRvdyIsIllvdVR1YmVBcGlLZXlTZXJ2aWNlIiwidXNlclNpZ25lZEluIiwiZ2V0IiwiY3VycmVudFBsYXlsaXN0IiwiY3VycmVudFNvbmciLCJwcmV2aW91c1NvbmciLCJpc1BsYXlpbmciLCJwbGF5ZXIiLCJ2aWRBcnJheSIsInNlYXJjaEN1cnJlbnRTb25nIiwiY2hhbmdlTmF2Q29sb3IiLCJjc3MiLCJxdWVyeSIsInBsYXlsaXN0SWQiLCJ1c2VySWQiLCJpZCIsInRoZW4iLCJyZXN1bHRzIiwiZ2V0Q3VycmVudFBsYXlsaXN0IiwibmV3UGxheWxpc3QiLCJtb2RhbEluc3RhbmNlIiwib3BlbiIsInN1Ym1pdCIsInRleHQiLCJtZXRob2QiLCJkYXRhIiwidGl0bGUiLCJzZXRQbGF5bGlzdCIsImxlbmd0aCIsImVycm9yIiwiY2xvc2UiLCJkaXNtaXNzIiwicGxheWxpc3QiLCJyZW1vdmVDbGFzcyIsInNldCIsInNvbmdJZCIsImdldFZpZGVvU29uZyIsInZpZGVvIiwidmlkZW9JZCIsInRvZ2dsZSIsImdldFZpZGVvSW5mb1VybCIsImFwaUtleSIsImFkZFZpZGVvVG9QbGF5bGlzdCIsIml0ZW1zIiwiY29udmVydER1cmF0aW9uIiwic3RyaW5nIiwiYXJyYXkiLCJtYXRjaCIsImZvcm1hdHRlZCIsIm1hcCIsIml0ZW0iLCJqb2luIiwic25pcHBldCIsImFydGlzdCIsImRlc2NyaXB0aW9uIiwiZHVyYXRpb24iLCJjb250ZW50RGV0YWlscyIsImRlbGV0ZVNvbmciLCJzb25nIiwicmVzcG9uc2UiLCJjdXJyZW50X3BsYXlsaXN0IiwiZGVsZXRlUGxheWxpc3QiLCJ1c2VyX2lkIiwidXNlcl9wbGF5bGlzdHMiLCJzZXRTZWFyY2hSZXN1bHRzIiwidmlkZW9zIiwiZ2V0VmlkZW9zIiwic2VhcmNoVGV4dCIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlcGxhY2UiLCJteVVybCIsImNvbnNvbGUiLCJsb2ciLCJnZXRVcmwiLCJ0cnVzdFNyYyIsInNyYyIsInRydXN0QXNSZXNvdXJjZVVybCIsInRvZ2dsZU1lbnUiLCJjcmVhdGVQbGF5ZXIiLCJpIiwidmlkUGxheWVyT2JqIiwiWVQiLCJQbGF5ZXIiLCJldmVudHMiLCJvblBsYXllclN0YXRlQ2hhbmdlIiwicHVzaCIsIiRvbiIsIm5nUmVwZWF0RmluaXNoZWRFdmVudCIsIm9uUGxheWVyUmVhZHkiLCJldmVudCIsInRhcmdldCIsInBsYXlWaWRlbyIsIlBsYXllclN0YXRlIiwiUExBWUlORyIsInNlYXJjaFZpZExvZ2ljIiwicGF1c2UiLCJwYXVzZVZpZGVvIiwic3RvcFZpZGVvIiwicGxheSIsInZpZEhlaWdodCIsImhlaWdodCIsInZpZFdpZHRoIiwid2lkdGgiLCJpbml0aWFsU29uZyIsInZpZFBsYXkiLCJwbGF5ZXJWYXJzIiwibG9hZFZpZGVvQnlJZCIsInBsYXlpbmciLCJnZXRTb25nSW5kZXgiLCJpbmRleE9mIiwibmV4dCIsInNvbmdzQXJyYXkiLCJsYXN0SW5kZXgiLCJpbmRleE9mQ3VycmVudFNvbmciLCJzb25nVG9QbGF5IiwicHJldmlvdXMiLCJOYXZDb250cm9sbGVyIiwiaXNfb3BlbiIsInBhZ2VSZWRpcmVjdCIsInVzZXIiLCJwYXRoIiwic2lnbk91dCIsImV2IiwicmVtb3ZlIiwieF9pZCIsInRvZ2dsZUNsYXNzIiwiUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXIiLCJzZXRVc2VyIiwic3VibWl0UmVnaXN0cmF0aW9uIiwicmVnaXN0cmF0aW9uRm9ybSIsInN1Ym1pdExvZ2luIiwiZW1haWwiLCJwYXNzd29yZCIsIlNlc3Npb25zQ29udHJvbGxlciIsImxvZ2luRm9ybSIsInJlYXNvbiIsImVycm9ycyIsInVzZXJzIiwiQnViYmxlQ29udHJvbGxlciIsIiRkb2N1bWVudCIsImxhdmEwIiwiZ2UxZG9vdCIsInNjcmVlbiIsImVsZW0iLCJjYWxsYmFjayIsImN0eCIsImxlZnQiLCJ0b3AiLCJpbml0IiwiaW5pdFJlcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0YWdOYW1lIiwiZ2V0Q29udGV4dCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiLCJiaW5kIiwib25zZWxlY3RzdGFydCIsIm9uZHJhZyIsIm8iLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsIm9mZnNldFBhcmVudCIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJQb2ludCIsIngiLCJ5IiwibWFnbml0dWRlIiwiY29tcHV0ZWQiLCJmb3JjZSIsInByb3RvdHlwZSIsImFkZCIsInAiLCJCYWxsIiwicGFyZW50IiwibWluIiwibWF4IiwidmVsIiwicG9zIiwic2l6ZSIsIndoIiwibW92ZSIsIkxhdmFMYW1wIiwibnVtQmFsbHMiLCJjMCIsImMxIiwic3RlcCIsInN4IiwiZmxvb3IiLCJzeSIsInBhaW50IiwibWV0YUZpbGwiLCJjcmVhdGVSYWRpYWxHcmFkaWVudCIsInBseCIsInBseSIsIm1zY2FzZXMiLCJpeCIsImdyaWQiLCJiYWxscyIsIml0ZXIiLCJzaWduIiwiayIsImNvbXB1dGVGb3JjZSIsImlkeCIsImNlbGwiLCJiYWxsIiwibWFyY2hpbmdTcXVhcmVzIiwicGRpciIsImRpciIsIm1zY2FzZSIsImlkbiIsImFicyIsInBvdyIsImxpbmVUbyIsInJlbmRlck1ldGFiYWxscyIsImZpbGxTdHlsZSIsImJlZ2luUGF0aCIsInJvdW5kIiwiZmlsbCIsImNsb3NlUGF0aCIsInciLCJoIiwiciIsImdyYWRpZW50IiwiYWRkQ29sb3JTdG9wIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2xlYXJSZWN0IiwiaXMiLCJhcGlIb3N0IiwibGltaXQiLCJjYXRjaCIsInRvSnNvbiIsIldlYkRldlRlY1NlcnZpY2UiLCJOYXZiYXJEaXJlY3RpdmUiLCJOYXZiYXJDb250cm9sbGVyIiwiYmluZFRvQ29udHJvbGxlciIsInJlbGF0aXZlRGF0ZSIsImZyb21Ob3ciLCJNYWxhcmtleURpcmVjdGl2ZSIsImV4dHJhVmFsdWVzIiwidGVtcGxhdGUiLCJsaW5rRnVuYyIsIk1hbGFya2V5Q29udHJvbGxlciIsImVsIiwidm0iLCJ3YXRjaGVyIiwidHlwaXN0IiwidHlwZVNwZWVkIiwiZGVsZXRlU3BlZWQiLCJwYXVzZURlbGF5IiwibG9vcCIsInBvc3RmaXgiLCJhZGRDbGFzcyIsInZhbHVlIiwidHlwZSIsImRlbGV0ZSIsIiR3YXRjaCIsImNvbnRyaWJ1dG9ycyIsImNvbnRyaWJ1dG9yIiwibG9naW4iLCJnaXRodWJDb250cmlidXRvciIsImdldENvbnRyaWJ1dG9ycyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxLQUFJQSxZQUFZO0FBQ2hCLEtBQUlDLGFBQWE7O0FBRWpCQyxTQUFRQyxPQUFPLGVBQWUsQ0FBQyxhQUFhLGFBQWEsV0FBVyxjQUFjLGNBQWMsVUFBVSxjQUFjLGFBQWEsZ0JBQWdCLFVBQVUsaUJBQWlCLFNBQVMsdUJBQ3RMQyxTQUFTLFlBQVlDLFVBQ3JCRCxTQUFTLFVBQVVFLFFBQ25CQyxPQUhILGVBSUdBLE9BSkgsc0JBS0dBLHlCQUFPLFVBQVNDLGVBQWU7R0FDN0JBLGNBQWNDLFVBQVU7S0FDcEJDLFFBQVFWOztLQUdiTyx1Q0FBTyxVQUFTSSw2QkFBNEI7R0FDM0NBLDRCQUE0QkMsVUFBVTtLQUV2Q0wsbUNBQU8sVUFBU00seUJBQXdCO0dBQ3ZDQSx3QkFBd0JDLFdBQVdaLFFBQVFhLFVBQVVDLFNBQVNkLFFBQVFhO0tBRXhFRSxJQWhCSCxrQkFpQkdDLFFBQVEscUJBakJYLDZDQWtCR0EsUUFBUSxhQWxCWCw2QkFtQkdBLFFBQVEsd0JBbkJYLHFDQW9CR0MsV0FBVyxrQkFwQmQsc0JBcUJHQSxXQUFXLGtCQXJCZCxzQkFzQkdBLFdBQVcsaUJBdEJkLG9CQXVCR0EsV0FBVywyQkF2QmQsd0NBd0JHQSxXQUFXLHNCQXhCZCw4QkF5QkdBLFdBQVcsb0JBekJkLDBCQTBCR0MsVUFBVSxjQTFCYix5QkEyQkdBLFVBQVUsZ0JBM0JiLDZCQTRCR0EsVUFBVSwrQkFBa0IsVUFBU0MsVUFBUztHQUM3QyxPQUFPO0tBQ0xDLFVBQVU7S0FDVkMsTUFBTSxjQUFVQyxPQUFPQyxTQUFTQyxNQUFNO09BQ3BDLElBQUlGLE1BQU1HLFVBQVUsTUFBTTtTQUN4Qk4sU0FBUyxZQUFZO1dBQ25CRyxNQUFNSSxNQUFNRixLQUFLRzs7Ozs7S0FPMUJDLFFBQVEsV0FBVyxZQUFVO0dBQzVCLElBQUlDLFVBQVU7O0dBRWRBLFFBQVFDLGVBQWUsVUFBU0MsS0FBSztLQUNoQ0YsUUFBUUcsWUFBWUQ7OztHQUd6QkYsUUFBUUksV0FBVyxVQUFTRixLQUFLO0tBQzdCRixRQUFRSyxRQUFRSDs7O0dBR3BCRixRQUFRTSxlQUFlLFlBQVc7S0FDaEMsT0FBT04sUUFBUUc7OztHQUdqQkgsUUFBUU8sV0FBVyxZQUFXO0tBQzVCLE9BQU9QLFFBQVFLOzs7R0FHakIsT0FBT0w7SUFFUkQsUUFBUSxxQ0FBWSxVQUFTUyxzQkFBc0I7R0FDbEQsT0FBT0EscUJBQXFCO0tBQzFCQyxLQUFLeEMsWUFBVTtLQUNmeUMsTUFBTTs7S0FHVFgsUUFBUSxpQ0FBTyxVQUFTUyxzQkFBcUI7R0FDNUMsT0FBT0EscUJBQXFCO0tBQzFCQyxLQUFLeEMsWUFBVztLQUNoQnlDLE1BQU07O0tBR1RYLFFBQVEsaUNBQVEsVUFBU1Msc0JBQXFCO0dBQzdDLE9BQU9BLHFCQUFxQjtLQUMxQkMsS0FBS3hDLFlBQVk7S0FDakJ5QyxNQUFNOzs7Ozs7OztBQ2pHWjs7O0FBRUEsUUFBTyxlQUFlLFNBQVMsY0FBYztHQUMzQyxPQUFPOztBQUVULFNBTGdCbEM7QUFBVCxVQUFTQSxPQUFRbUMsY0FBY0MsY0FBYztHQUNsRDs7O0dBRUFELGFBQWFFLGFBQWE7OztHQUcxQkQsYUFBYUUsWUFBWTtHQUN6QkYsYUFBYUcsVUFBVTtHQUN2QkgsYUFBYUksZ0JBQWdCO0dBQzdCSixhQUFhSyxvQkFBb0I7R0FDakNMLGFBQWFNLGNBQWM7Ozs7Ozs7QUNWN0I7OztBQUVBLFFBQU8sZUFBZSxTQUFTLGNBQWM7R0FDM0MsT0FBTzs7QUFFVCxTQUxnQkM7QUFBVCxVQUFTQSxhQUFjQyxnQkFBZ0JDLG9CQUFvQjtHQUNoRTs7R0FDQUQsZUFDR0UsTUFBTSxRQUFRO0tBQ2JiLEtBQUs7S0FDTGMsYUFBYTtLQUNibkMsWUFBWTtLQUNab0MsY0FBYztNQUVmRixNQUFNLFdBQVc7S0FDaEJiLEtBQUs7S0FDTGMsYUFBYTtLQUNibkMsWUFBWTtNQUVia0MsTUFBTSxXQUFXO0tBQ2hCYixLQUFLO0tBQ0xjLGFBQWE7S0FDYm5DLFlBQVk7TUFFYmtDLE1BQVEsUUFBUTtLQUNmYixLQUFLO0tBQ0xjLGFBQWE7S0FDYm5DLFlBQVk7S0FDWnFDLFNBQVM7T0FDTkMsZ0JBQU0sY0FBU0MsT0FBTztTQUNwQixPQUFPQSxNQUFNQzs7Ozs7R0FLdEJQLG1CQUFtQlEsVUFBVTs7Ozs7OztBQzlCL0I7OztBQUVBLFFBQU8sZUFBZSxTQUFTLGNBQWM7R0FDM0MsT0FBTzs7QUFFVCxTQUxnQkM7QUFBVCxVQUFTQSxTQUFVQyxNQUFNO0dBQzlCOztHQUNBQSxLQUFLQyxNQUFNOzs7Ozs7O0FDRmI7O0FBRUEsUUFBTyxlQUFlLFNBQVMsY0FBYztHQUMzQyxPQUFPOzs7QUFHVCxLQUFJLGVBQWUsWUFBWSxFQUFFLFNBQVMsaUJBQWlCLFFBQVEsT0FBTyxFQUFFLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSyxFQUFFLElBQUksYUFBYSxNQUFNLElBQUksV0FBVyxhQUFhLFdBQVcsY0FBYyxPQUFPLFdBQVcsZUFBZSxNQUFNLElBQUksV0FBVyxZQUFZLFdBQVcsV0FBVyxNQUFNLE9BQU8sZUFBZSxRQUFRLFdBQVcsS0FBSyxpQkFBaUIsT0FBTyxVQUFVLGFBQWEsWUFBWSxhQUFhLEVBQUUsSUFBSSxZQUFZLGlCQUFpQixZQUFZLFdBQVcsYUFBYSxJQUFJLGFBQWEsaUJBQWlCLGFBQWEsY0FBYyxPQUFPOztBQUVoaUIsVUFBUyxnQkFBZ0IsVUFBVSxhQUFhLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixjQUFjLEVBQUUsTUFBTSxJQUFJLFVBQVU7OztnRUFFdEQ7R0FUeEQsd0JBQWExQyxVQUFVMkMsV0FBV0MsUUFBUTtLQUN4Qzs7S0FEd0M7O0tBR3hDLEtBQUtDLGdCQUFnQjtLQUNyQixLQUFLQyxpQkFBaUI7S0FDdEIsS0FBS0MsZUFBZTtLQUNwQixLQUFLSCxTQUFTQTs7S0FHZCxLQUFLSSxTQUFTaEQsVUFBVTJDOzs7R0FjMUIsYUFBYSxnQkFBZ0IsQ0FBQztLQUM1QixLQUFLO0tBQ0wsT0FBTyxTQUFTLFNBYlQzQyxVQUFVMkMsV0FBVztPQUFBOztPQUM1QixLQUFLTSxhQUFhTjtPQUNsQjNDLFNBQVMsWUFBTTtTQUNiLE1BQUs4QyxpQkFBaUI7VUFDckI7O01BaUJGO0tBQ0QsS0FBSztLQUNMLE9BQU8sU0FBUyxhQWhCTEgsV0FBVztPQUN0QixLQUFLRSxnQkFBZ0JGLFVBQVVPOztPQUUvQnJFLFFBQVFzRSxRQUFRLEtBQUtOLGVBQWUsVUFBQ08sY0FBaUI7U0FDcERBLGFBQWFDLE9BQU9DLEtBQUtDOzs7TUFtQjFCO0tBQ0QsS0FBSztLQUNMLE9BQU8sU0FBUyxhQWpCTDtPQUNYLEtBQUtYLE9BQU9ZLEtBQUs7T0FDakIsS0FBS1YsaUJBQWlCOzs7O0dBcUJ4QixPQUFPOzs7Ozs7O0FDbkRUOztBQUVBLFFBQU8sZUFBZSxTQUFTLGNBQWM7R0FDM0MsT0FBTzs7O0FBR1QsVUFBUyxnQkFBZ0IsVUFBVSxhQUFhLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixjQUFjLEVBQUUsTUFBTSxJQUFJLFVBQVU7O0FBRWhILEtBUmFXLGlCQVFRLFFBUlJBLHVNQUNYLHdCQUFhQyxRQUFRQyxZQUFZdEIsT0FBT3VCLFdBQVdDLE1BQU1DLFVBQVNDLHFCQUFxQkMsV0FBV0MsTUFBTXZELFNBQVN3RCxPQUFNQyxNQUFNQyxTQUFTM0IsTUFBTTRCLHNCQUFzQjtHQUNoSzs7R0FEZ0s7O0dBRWhLWCxPQUFPWSxlQUFlUCxvQkFBb0JRLElBQUk7R0FDOUNaLFdBQVdhLGtCQUFrQjtHQUM3QmQsT0FBTzNDLFFBQVE7R0FDZjJDLE9BQU9lLGNBQWM7R0FDckJmLE9BQU9nQixlQUFlO0dBQ3RCaEIsT0FBT2lCLFlBQVk7R0FDbkIsSUFBSUM7R0FDSixJQUFJQyxXQUFXO0dBQ2YsSUFBSUMsb0JBQW9CO0dBQ3hCLElBQUlsRyxhQUFhO0dBQ2pCLElBQUlELFlBQVk7O0dBRWhCLENBQUMsU0FBU29HLGlCQUFnQjtLQUN4QmxHLFFBQVF1QixRQUFRLGVBQWU0RSxJQUFJLFNBQVE7S0FDM0NuRyxRQUFRdUIsUUFBUSxlQUFlNEUsSUFBSSxvQkFBbUI7S0FDdERuRyxRQUFRdUIsUUFBUSx1QkFBdUI0RSxJQUFJLG9CQUFtQjtLQUM5RG5HLFFBQVF1QixRQUFRLDRCQUE0QjRFLElBQUksb0JBQW1CO0tBQ25FbkcsUUFBUXVCLFFBQVEsaUJBQWlCNEUsSUFBSSxTQUFROzs7R0FHL0MsSUFBR3RCLE9BQU9ZLGNBQWM7O0tBRXRCVCxLQUFLb0IsTUFBTSxFQUFDQyxZQUFZLE1BQUksRUFBQ0MsUUFBUXpCLE9BQU9ZLGFBQWFjLE1BQUtDLEtBQUssVUFBU0MsU0FBUTtPQUNsRjVFLFFBQVFDLGFBQWEyRTs7OztHQUl6QjVCLE9BQU82QixxQkFBcUIsWUFBVztLQUNyQyxPQUFPNUIsV0FBV2E7OztHQUdwQmQsT0FBTzdDLFlBQVksWUFBVztLQUM1QixPQUFPSCxRQUFRTTs7O0dBR2pCMEMsT0FBTzNDLFFBQVEsWUFBVztLQUN4QixPQUFRTCxRQUFRTzs7O0dBR2xCeUMsT0FBTzhCLGNBQWMsWUFBVztLQUM5QjlCLE9BQU8rQixnQkFBZ0J6QixVQUFVMEIsS0FBSztPQUNwQ3pELGFBQWE7T0FDYjlCLE9BQU91RDtPQUNQNUQsWUFBWTs7OztHQUloQjRELE9BQU9pQyxTQUFTLFlBQVc7S0FDekIsSUFBR2pDLE9BQU9rQyxNQUFNOztPQUVmMUIsTUFBTTtTQUNKMkIsUUFBUTtTQUNSMUUsS0FBTXhDLFlBQVcsV0FBVytFLE9BQU9ZLGFBQWFjLEtBQUs7U0FDckRVLE1BQU07V0FDSkMsT0FBT3JDLE9BQU9rQzs7VUFFZlAsS0FBSyxVQUFTQyxTQUFROztTQUV2QjVFLFFBQVFDLGFBQWEyRSxRQUFRUTtTQUM3QnBDLE9BQU9zQyxZQUFZVixRQUFRUSxLQUFLUixRQUFRUSxLQUFLRyxTQUFTO1VBQ3JELFVBQVNDLE9BQU87U0FDakJ6RCxLQUFLeUQ7OztPQUdOeEMsT0FBT2tDLE9BQU87T0FDZGxDLE9BQU8rQixjQUFjVTs7OztHQUl6QnpDLE9BQU8wQyxVQUFVLFlBQVc7S0FDMUIxQyxPQUFPK0IsY0FBY1csUUFBUTs7O0dBRy9CMUMsT0FBT3NDLGNBQWMsVUFBU0ssVUFBVTs7S0FFckN4SCxRQUFRdUIsUUFBUSx3QkFBd0JrRyxZQUFZO0tBQ25EdkMsb0JBQW9Cd0MsSUFBSSxtQkFBbUJGO0tBQzNDMUMsV0FBV2Esa0JBQW1CVCxvQkFBb0JRLElBQUk7O0tBRXRELElBQUdaLFdBQVdhLGlCQUFpQjs7T0FFN0JQLEtBQUtnQixNQUFNLEVBQUN1QixRQUFRLE1BQUksRUFBQ3RCLFlBQVl2QixXQUFXYSxnQkFBZ0JZLE1BQUtDLEtBQUssVUFBU3RFLE9BQU07O1NBRXRGTCxRQUFRSSxTQUFTQzs7Ozs7R0FLMUIyQyxPQUFPK0MsZUFBZSxVQUFTSixVQUFVSyxPQUFPOztLQUU5QzdILFFBQVF1QixRQUFRLFFBQU1zRyxNQUFNdEIsR0FBR3VCLFNBQVNDLE9BQU87O0tBRWhELElBQUlDLGtCQUFrQixrREFDUixRQUNBSCxNQUFNdEIsR0FBR3VCLFVBQ1QsVUFDQXRDLHFCQUFxQnlDLFdBQ3JCO0tBQ1Y1QyxNQUFNOztPQUVKMkIsUUFBUTtPQUNSMUUsS0FBSzBGOztRQUVKeEIsS0FBSyxVQUFTQyxTQUFROztPQUV2QnlCLG1CQUFtQlYsVUFBU2YsUUFBUVEsS0FBS2tCLE1BQU07UUFFL0MsVUFBU2QsT0FBTTtPQUNmekQsS0FBS3lEOzs7O0dBSVp4QyxPQUFPdUQsa0JBQWtCLFVBQVNDLFFBQVE7O0tBRXRDLElBQUlDLFFBQVFELE9BQU9FLE1BQU0sdUJBQXFCO0tBQzlDLElBQUlDLFlBQVlGLE1BQU1HLElBQUksVUFBU0MsTUFBSztPQUN0QyxJQUFHQSxLQUFLdEIsU0FBTyxHQUFHLE9BQU8sTUFBSXNCO09BQzNCLE9BQU9BO1FBQ1JDLEtBQUs7O0tBRVIsT0FBT0g7OztHQUlaLFNBQVNOLG1CQUFtQlYsVUFBVUssT0FBTzs7S0FFekN4QyxNQUFNO09BQ0oyQixRQUFRO09BQ1IxRSxLQUFLeEMsWUFBWSxlQUFlMEgsU0FBU2pCLEtBQUk7T0FDN0NVLE1BQU07U0FDSkMsT0FBT1csTUFBTWUsUUFBUTFCO1NBQ3JCMkIsUUFBUWhCLE1BQU1lLFFBQVFFO1NBQ3RCeEcsS0FBS3VGLE1BQU10QjtTQUNYd0MsVUFBVWxCLE1BQU1tQixlQUFlRDs7UUFFaEN2QyxLQUNELFVBQVNDLFNBQVE7T0FDZjVFLFFBQVFJLFNBQVN3RSxRQUFRUTtRQUUxQixVQUFTSSxPQUFNO09BQ2J6RCxLQUFLeUQ7Ozs7R0FJYnhDLE9BQU9vRSxhQUFhLFVBQVNDLE1BQU07O0tBRWhDN0QsTUFBTTtPQUNKMkIsUUFBUTtPQUNSMUUsS0FBS3hDLFlBQVksZUFBZWdGLFdBQVdhLGdCQUFnQlksS0FBSSxZQUFXMkMsS0FBSzNDO1FBQzlFQyxLQUFLLFVBQVMyQyxVQUFTOztPQUV4QnRFLE9BQU9zQyxZQUFZZ0MsU0FBU2xDLEtBQUttQztRQUNoQyxVQUFTL0IsT0FBTTtPQUNiekQsS0FBS3lEOzs7O0dBSWJ4QyxPQUFPd0UsaUJBQWlCLFVBQVM3QixVQUFTOztLQUV4Q25DLE1BQU07T0FDSjJCLFFBQVE7T0FDUjFFLEtBQUt4QyxZQUFZLFlBQVkwSCxTQUFTOEIsVUFBUyxnQkFBZ0I5QixTQUFTakI7UUFDdkVDLEtBQUssVUFBUzJDLFVBQVM7T0FDdkJ0SCxRQUFRQyxhQUFhcUgsU0FBU2xDLEtBQUtzQztRQUNuQyxVQUFTbEMsT0FBTTtPQUNiekQsS0FBS3lEOzs7O0dBSVosSUFBSW1DLG1CQUFtQixTQUFuQkEsaUJBQTRCekgsS0FBSztLQUNuQzhDLE9BQU80RSxTQUFTMUg7OztHQUdsQjhDLE9BQU82RSxZQUFZLFlBQVk7O0tBRTdCLElBQUc3RSxPQUFPa0MsTUFBTTs7T0FFYmxDLE9BQU9zQyxZQUFZO09BQ25CLElBQUl3QyxhQUFhQyxtQkFBbUIvRSxPQUFPa0MsTUFBTThDLFFBQVEsUUFBUTtPQUNqRSxJQUFJQyxRQUFTLDJDQUNBLHdCQUNBLGdCQUNBLFFBQ0FILGFBQ0EsVUFDQW5FLHFCQUFxQnlDO09BQ25DNUMsTUFBTTtTQUNKMkIsUUFBUTtTQUNSMUUsS0FBS3dIOztVQUVKdEQsS0FBSyxVQUFTMkMsVUFBUzs7U0FFeEJLLGlCQUFpQkwsU0FBU2xDLEtBQUtrQjtVQUUvQixVQUFTZCxPQUFNO1NBQ2YwQyxRQUFRQyxJQUFJM0M7Ozs7O0dBS2xCeEMsT0FBT29GLFNBQVMsVUFBU3BDLE9BQU87S0FDOUIsT0FBTyw2QkFBMkJBLE1BQU10QixHQUFHdUIsVUFBUTs7O0dBR3JEakQsT0FBT3FGLFdBQVcsVUFBU0MsS0FBSztLQUM5QixPQUFPN0UsS0FBSzhFLG1CQUFtQkQ7OztHQUdqQ3RGLE9BQU93RixhQUFhLFVBQVN2QyxTQUFTO0tBQ3BDOUgsUUFBUXVCLFFBQVEsUUFBTXVHLFNBQVNDLE9BQU87OztHQUl4QyxTQUFTdUMsZUFBZTs7S0FFcEIsS0FBSSxJQUFJQyxJQUFJLEdBQUdBLElBQUkxRixPQUFPNEUsT0FBT3JDLFFBQVFtRCxLQUFLOztPQUU1QyxJQUFJaEUsS0FBSyxVQUFRZ0UsSUFBRTtPQUNuQixJQUFJQyxlQUFlLElBQUlDLEdBQUdDLE9BQU9uRSxJQUFJO1NBQ2xDb0UsUUFBUTtXQUNOLGlCQUFpQjlGLE9BQU8rRjs7O09BRzVCNUUsU0FBUzZFLEtBQUtMOzs7R0FJckIzRixPQUFPaUcsSUFBSSxvQkFBb0IsVUFBU0MsdUJBQXVCOztLQUU1RFQ7OztHQUdIekYsT0FBT21HLGdCQUFnQixVQUFTQyxPQUFPOztLQUVyQ0EsTUFBTUMsT0FBT0M7OztHQUdmdEcsT0FBTytGLHNCQUFzQixVQUFTSyxPQUFPOztLQUV6QyxJQUFHQSxNQUFNaEUsUUFBUXdELEdBQUdXLFlBQVlDLFNBQVM7T0FDdkNDLGVBQWVMLE1BQU1DOzs7O0dBSzNCLFNBQVNJLGVBQWV6RCxPQUFPOztLQUU3QixJQUFHaEQsT0FBT2UsZUFBZWYsT0FBT2lCLFdBQVc7T0FDekNqQixPQUFPMEc7OztLQUdULElBQUd0RixxQkFBc0JBLHNCQUFzQjRCLE9BQVE7T0FDckQ1QixrQkFBa0J1RjtPQUNsQnZGLG9CQUFvQjRCO1lBQ2YsSUFBRzVCLHFCQUFzQkEscUJBQXFCNEIsT0FBUTtPQUMzRDVCLGtCQUFrQmtGO1lBQ2I7T0FDTGxGLG9CQUFvQjRCO09BQ3BCNUIsa0JBQWtCa0Y7Ozs7R0FLdEIsU0FBU00sWUFBWTs7S0FFbkIxRixPQUFPMEY7OztHQUdUNUcsT0FBTzZHLE9BQU8sVUFBU3hDLE1BQU07O0tBRXpCLElBQUl5QyxZQUFZM0wsUUFBUXVCLFFBQVEsYUFBYXFLO0tBQzdDLElBQUlDLFdBQVc3TCxRQUFRdUIsUUFBUSxhQUFhdUs7S0FDNUMsSUFBSUMsY0FBY2xILE9BQU9lLGVBQWVmLE9BQU8zQyxRQUFRO0tBQ3ZELElBQUk4SixVQUFVOUMsUUFBUTZDOzs7O0tBS3RCLElBQUc5RixtQkFBbUI7T0FDcEJBLGtCQUFrQndGO09BQ2xCeEYsb0JBQW9COzs7S0FHdEIsSUFBRyxDQUFDcEIsT0FBT2UsYUFBYTs7T0FFdkJHLFNBQVMsSUFBSTBFLEdBQUdDLE9BQU8sdUJBQXVCO1NBQzVDa0IsUUFBUTtTQUNSRSxPQUFRO1NBQ1JoRSxTQUFTa0UsUUFBUTFKO1NBQ2pCMkosWUFBWSxFQUFDLFlBQVksR0FBRyxPQUFPO1NBQ25DdEIsUUFBUTtXQUNOLFdBQVc5RixPQUFPbUc7OztZQUdqQixJQUFHOUIsUUFBUXJFLE9BQU9lLGVBQWdCZixPQUFPZSxlQUFlLENBQUNzRCxNQUFPO09BQ2xFbkQsT0FBT29GO1lBQ0w7O09BRUpwRixPQUFPbUcsY0FBYztTQUNuQixXQUFXRixRQUFRMUo7OztPQUdyQnVDLE9BQU9lLFlBQVl1RyxVQUFVOzs7S0FHaEN0SCxPQUFPZSxjQUFjb0c7S0FDckJuSCxPQUFPaUIsWUFBWTtLQUNuQmpCLE9BQU9lLFlBQVl1RyxVQUFVOztLQUU3QixJQUFHakQsTUFBTTtPQUNQQSxLQUFLaUQsVUFBVTs7OztHQUlwQnRILE9BQU8wRyxRQUFRLFVBQVNyQyxNQUFNOztLQUUzQnJFLE9BQU9pQixZQUFZO0tBQ25CQyxPQUFPeUY7S0FDUCxJQUFHdEMsTUFBSztPQUNOQSxLQUFLaUQsVUFBVTtZQUNWO09BQ0x0SCxPQUFPZSxZQUFZdUcsVUFBVTs7OztHQUlsQyxTQUFTQyxhQUFhbEQsTUFBTTtLQUMxQixPQUFPaEgsUUFBUW1LLFFBQVFuRDs7O0dBR3pCckUsT0FBT3lILE9BQU8sWUFBVzs7S0FFdkIsSUFBSUMsYUFBYTFILE9BQU8zQztLQUN4QixJQUFJc0ssWUFBWUQsV0FBV25GLFNBQVM7S0FDcEMsSUFBSXFGLHFCQUFxQkYsV0FBV0YsUUFBUXhILE9BQU9lO0tBQ25ELElBQUk4RyxhQUFhOztLQUVqQixJQUFHN0gsT0FBT2UsYUFBYTtPQUNyQixJQUFHNkcscUJBQXFCRCxXQUFZOztTQUVsQ0UsYUFBY0gsV0FBV0UscUJBQXFCO2NBRXhDOztTQUVMQSxxQkFBcUI7U0FDckJDLGFBQWNILFdBQVdFOztZQUV2QjtPQUNMQyxhQUFjSCxXQUFXOzs7S0FHM0IxSCxPQUFPNkcsS0FBS2dCOzs7R0FHZjdILE9BQU84SCxXQUFXLFlBQVc7O0tBRTNCLElBQUlKLGFBQWExSCxPQUFPM0M7S0FDeEIsSUFBSXNLLFlBQVlELFdBQVduRixTQUFTO0tBQ3BDLElBQUlxRixxQkFBcUJGLFdBQVdGLFFBQVF4SCxPQUFPZTtLQUNuRCxJQUFJOEcsYUFBYTs7S0FFakIsSUFBRzdILE9BQU9lLGFBQWE7T0FDckIsSUFBRzZHLHFCQUFxQixHQUFJOztTQUUxQkMsYUFBY0gsV0FBV0UscUJBQXFCO2NBRXhDOztTQUVMQSxxQkFBcUJEO1NBQ3JCRSxhQUFjSCxXQUFXRTs7WUFFdkI7T0FDTEMsYUFBY0gsV0FBV0M7OztLQUczQjNILE9BQU82RyxLQUFLZ0I7Ozs7Ozs7O0FDelhqQjs7QUFFQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0dBQzNDLE9BQU87OztBQUdULFVBQVMsZ0JBQWdCLFVBQVUsYUFBYSxFQUFFLElBQUksRUFBRSxvQkFBb0IsY0FBYyxFQUFFLE1BQU0sSUFBSSxVQUFVOztBQUVoSCxLQVJhRSxnQkFRTyxRQVJQQSxrSEFDWCx1QkFBWS9ILFFBQVFDLFlBQVl0QixPQUFPdUIsV0FBV0cscUJBQXFCRyxPQUFPeEQsU0FBU3VELE1BQU07R0FDM0Y7O0dBRDJGOztHQUUzRixTQUFTYyxpQkFBZ0I7S0FDdkJsRyxRQUFRdUIsUUFBUSxlQUFlNEUsSUFBSSxTQUFRO0tBQzNDbkcsUUFBUXVCLFFBQVEsZUFBZTRFLElBQUksb0JBQW1CO0tBQ3REbkcsUUFBUXVCLFFBQVEsa0JBQWtCNEUsSUFBSSxvQkFBbUI7S0FDekRuRyxRQUFRdUIsUUFBUSxpQkFBaUI0RSxJQUFJLFNBQVE7OztHQUcvQ3RCLE9BQU9nSSxVQUFVOztHQUVqQmhJLE9BQU83QyxZQUFZLFlBQVc7S0FDNUIsT0FBT0gsUUFBUU07OztHQUdqQjBDLE9BQU9zQyxjQUFjLFVBQVNLLFVBQVU7O0tBRXJDeEgsUUFBUXVCLFFBQVEsd0JBQXdCa0csWUFBWTtLQUNuRHZDLG9CQUFvQndDLElBQUksbUJBQW1CRjtLQUMzQzFDLFdBQVdhLGtCQUFtQlQsb0JBQW9CUSxJQUFJOztLQUV0RCxJQUFHWixXQUFXYSxpQkFBaUI7O09BRTdCUCxLQUFLZ0IsTUFBTSxFQUFDdUIsUUFBUSxNQUFJLEVBQUN0QixZQUFZdkIsV0FBV2EsZ0JBQWdCWSxNQUFLQyxLQUFLLFVBQVN0RSxPQUFNOztTQUV0RkwsUUFBUUksU0FBU0M7Ozs7O0dBSzFCLEtBQUs0SyxlQUFlLFlBQVc7O0tBRTdCLElBQUdoSSxXQUFXaUksS0FBS3hHLElBQUk7T0FDckJ4QixVQUFVaUksS0FBSyxZQUFXbEksV0FBV2lJLEtBQUt4RztZQUVyQztPQUNMeEIsVUFBVWlJLEtBQUs7Ozs7R0FJbkJuSSxPQUFPb0ksVUFBVSxZQUFXO0tBQzFCekosTUFBTXlKOzs7R0FHUm5JLFdBQVdnRyxJQUFJLHVCQUF1QixVQUFTb0MsSUFBSTtLQUNqRHJJLE9BQU9ZLGVBQWU7S0FDdEJQLG9CQUFvQmlJLE9BQU87S0FDM0JqSDtLQUNBbkIsVUFBVWlJLEtBQUs7OztHQUdqQm5JLE9BQU93RixhQUFhLFVBQVNZLE9BQU9tQyxNQUFNOztLQUV4Q3BOLFFBQVF1QixRQUFRLHFCQUFxQjhMLFlBQVk7S0FDakRyTixRQUFRdUIsUUFBUSxxQkFBcUI4TCxZQUFZO0tBQ2pEck4sUUFBUXVCLFFBQVEsbUJBQW1COEwsWUFBWTtLQUMvQ3JOLFFBQVF1QixRQUFRLG1CQUFtQjhMLFlBQVk7S0FDL0NyTixRQUFRdUIsUUFBUSxTQUFRNkwsTUFBTUMsWUFBWTs7Ozs7Ozs7QUMxRGhEOztBQUVBLFFBQU8sZUFBZSxTQUFTLGNBQWM7R0FDM0MsT0FBTzs7O0FBR1QsVUFBUyxnQkFBZ0IsVUFBVSxhQUFhLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixjQUFjLEVBQUUsTUFBTSxJQUFJLFVBQVU7O0FBRWhILEtBUmFDLDBCQVFpQixRQVJqQkEsZ0dBQ1gsaUNBQVl6SSxRQUFRckIsT0FBT3NCLFlBQVlDLFdBQVdHLHFCQUFvQjtHQUNwRTs7R0FEb0U7O0dBR3BFLElBQUlxSSxVQUFVLFNBQVZBLFFBQW1CeEwsS0FBSztLQUN6Qm1ELG9CQUFvQndDLElBQUksZUFBZTNGOzs7R0FHMUM4QyxPQUFPMkkscUJBQXFCLFVBQVNDLGtCQUFrQjs7S0FFckRqSyxNQUFNZ0ssbUJBQW1CQyxrQkFDdEJqSCxLQUFLLFlBQVc7O09BRWZoRCxNQUFNa0ssWUFBWTtTQUNoQkMsT0FBT0YsaUJBQWlCRTtTQUN4QkMsVUFBVUgsaUJBQWlCRzs7Ozs7R0FNbkM5SSxXQUFXZ0csSUFBSSxzQkFBc0IsVUFBU29DLElBQUlILE1BQU07O0tBRXREUSxRQUFRUjtLQUNSaEksVUFBVWlJLEtBQUssWUFBV0QsS0FBS3hHOzs7Ozs7OztBQ3hCckM7O0FBRUEsUUFBTyxlQUFlLFNBQVMsY0FBYztHQUMzQyxPQUFPOzs7QUFHVCxVQUFTLGdCQUFnQixVQUFVLGFBQWEsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLGNBQWMsRUFBRSxNQUFNLElBQUksVUFBVTs7QUFFaEgsS0FSYXNILHFCQVFZLFFBUlpBLCtHQUNYLDRCQUFZaEosUUFBUXJCLE9BQU9zQixZQUFZQyxXQUFXQyxNQUFNQyxVQUFVQyxxQkFBb0I7R0FDcEY7O0dBRG9GOztHQUVwRkwsT0FBT3dDLFFBQVE7O0dBRWYsSUFBSWtHLFVBQVUsU0FBVkEsUUFBbUJ4TCxLQUFLO0tBQ3pCbUQsb0JBQW9Cd0MsSUFBSSxlQUFlM0Y7OztHQUkzQzhDLE9BQU82SSxjQUFjLFVBQVNJLFdBQVc7S0FDdkN0SyxNQUFNa0ssWUFBWUksV0FBV3RILEtBQUssVUFBU3VHLE1BQU07O09BRXpDUSxRQUFRUjs7OztHQUlsQmpJLFdBQVdnRyxJQUFJLHNCQUFzQixVQUFTb0MsSUFBSUgsTUFBTTs7S0FFdERoSSxVQUFVaUksS0FBSyxZQUFXRCxLQUFLeEc7O0dBR2pDekIsV0FBV2dHLElBQUksb0JBQW9CLFVBQVNvQyxJQUFJYSxRQUFRO0tBQ3REbEosT0FBT3dDLFFBQVEwRyxPQUFPQyxPQUFPOzs7R0FHL0JoSixLQUFLb0IsTUFBTSxFQUFDQyxZQUFZLE1BQUksRUFBQ0MsUUFBUSxLQUFJRSxLQUFLLFVBQVNDLFNBQVE7S0FDN0Q1QixPQUFPb0osUUFBUXhIOzs7R0FJakI1QixPQUFPb0ksVUFBVSxZQUFXO0tBQzFCekosTUFBTXlKOzs7R0FHUm5JLFdBQVdnRyxJQUFJLHVCQUF1QixVQUFTb0MsSUFBSTtLQUNqRG5JLFVBQVVpSSxLQUFLOzs7Ozs7OztBQ3BDcEI7O0FBRUEsUUFBTyxlQUFlLFNBQVMsY0FBYztHQUMzQyxPQUFPOzs7QUFHVCxVQUFTLGdCQUFnQixVQUFVLGFBQWEsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLGNBQWMsRUFBRSxNQUFNLElBQUksVUFBVTs7QUFFaEgsS0FSYWtCLG1CQVFVLFFBUlZBLG9FQUNYLDBCQUFZcEosWUFBV0QsUUFBT1UsU0FBUzRJLFdBQVc7R0FDbEQ7O0dBRGtEOztHQUVsRCxJQUFJQztHQUNKLElBQUlDLFVBQVU7S0FDWkMsUUFBUTtPQUNOQyxNQUFVO09BQ1ZDLFVBQVU7T0FDVkMsS0FBVTtPQUNWM0MsT0FBVTtPQUNWRixRQUFVO09BQ1Y4QyxNQUFVO09BQ1ZDLEtBQVU7T0FDVkMsTUFBTSxjQUFVckksSUFBSWlJLFVBQVVLLFNBQVM7U0FDckMsS0FBS04sT0FBT08sU0FBU0MsZUFBZXhJO1NBQ3BDLEtBQUtpSSxXQUFXQSxZQUFZO1NBQzVCLElBQUksS0FBS0QsS0FBS1MsV0FBVyxVQUFVLEtBQUtQLE1BQU0sS0FBS0YsS0FBS1UsV0FBVztTQUNuRUMsT0FBT0MsaUJBQWlCLFVBQVUsWUFBWTtXQUM1QyxLQUFLQztXQUNMQyxLQUFLLE9BQU87U0FDZCxLQUFLZCxLQUFLZSxnQkFBZ0IsWUFBWTtXQUFFLE9BQU87O1NBQy9DLEtBQUtmLEtBQUtnQixTQUFnQixZQUFZO1dBQUUsT0FBTzs7U0FDL0NWLFdBQVcsS0FBS087U0FDaEIsT0FBTzs7T0FFVEEsUUFBUSxrQkFBWTtTQUNsQixJQUFJSSxJQUFJLEtBQUtqQjtTQUNiLEtBQUt6QyxRQUFTMEQsRUFBRUM7U0FDaEIsS0FBSzdELFNBQVM0RCxFQUFFRTtTQUNoQixLQUFLLEtBQUtoQixPQUFPLEdBQUcsS0FBS0MsTUFBTSxHQUFHYSxLQUFLLE1BQU1BLElBQUlBLEVBQUVHLGNBQWM7V0FDL0QsS0FBS2pCLFFBQVFjLEVBQUVJO1dBQ2YsS0FBS2pCLE9BQVFhLEVBQUVLOztTQUVqQixJQUFJLEtBQUtwQixLQUFLO1dBQ1osS0FBS0YsS0FBS3pDLFFBQVMsS0FBS0E7V0FDeEIsS0FBS3lDLEtBQUszQyxTQUFTLEtBQUtBOztTQUUxQixLQUFLNEMsWUFBWSxLQUFLQTs7Ozs7O0dBTTVCLElBQUlzQixRQUFRLFNBQVJBLE1BQWlCQyxHQUFHQyxHQUFHO0tBQ3pCLEtBQUtELElBQUlBO0tBQ1QsS0FBS0MsSUFBSUE7S0FDVCxLQUFLQyxZQUFZRixJQUFJQSxJQUFJQyxJQUFJQTtLQUM3QixLQUFLRSxXQUFXO0tBQ2hCLEtBQUtDLFFBQVE7O0dBRWZMLE1BQU1NLFVBQVVDLE1BQU0sVUFBU0MsR0FBRztLQUNoQyxPQUFPLElBQUlSLE1BQU0sS0FBS0MsSUFBSU8sRUFBRVAsR0FBRyxLQUFLQyxJQUFJTSxFQUFFTjs7OztHQUk1QyxJQUFJTyxPQUFPLFNBQVBBLEtBQWdCQyxRQUFRO0tBQzFCLElBQUlDLE1BQU07S0FDVixJQUFJQyxNQUFNO0tBQ1YsS0FBS0MsTUFBTSxJQUFJYixNQUNiLENBQUNyTCxLQUFLQyxXQUFXLE1BQU0sSUFBSSxDQUFDLE1BQU0sTUFBTUQsS0FBS0MsV0FBVyxRQUFRLENBQUNELEtBQUtDLFdBQVcsTUFBTSxJQUFJLENBQUMsTUFBTSxNQUFNRCxLQUFLQztLQUUvRyxLQUFLa00sTUFBTSxJQUFJZCxNQUNiVSxPQUFPMUUsUUFBUSxNQUFNckgsS0FBS0MsV0FBVzhMLE9BQU8xRSxRQUFRLEtBQ3BEMEUsT0FBTzVFLFNBQVMsTUFBTW5ILEtBQUtDLFdBQVc4TCxPQUFPNUUsU0FBUztLQUV4RCxLQUFLaUYsT0FBUUwsT0FBT00sS0FBSyxLQUFNLENBQUVyTSxLQUFLQyxZQUFZZ00sTUFBTUQsT0FBT0EsUUFBU0QsT0FBT00sS0FBSztLQUNwRixLQUFLaEYsUUFBUTBFLE9BQU8xRTtLQUNwQixLQUFLRixTQUFTNEUsT0FBTzVFOzs7O0dBSXZCMkUsS0FBS0gsVUFBVVcsT0FBTyxZQUFXOzs7S0FHL0IsSUFBSSxLQUFLSCxJQUFJYixLQUFLLEtBQUtqRSxRQUFRLEtBQUsrRSxNQUFNO09BQ3hDLElBQUksS0FBS0YsSUFBSVosSUFBSSxHQUFHLEtBQUtZLElBQUlaLElBQUksQ0FBQyxLQUFLWSxJQUFJWjtPQUMzQyxLQUFLYSxJQUFJYixJQUFJLEtBQUtqRSxRQUFRLEtBQUsrRTtZQUMxQixJQUFJLEtBQUtELElBQUliLEtBQUssS0FBS2MsTUFBTTtPQUNsQyxJQUFJLEtBQUtGLElBQUlaLElBQUksR0FBRyxLQUFLWSxJQUFJWixJQUFJLENBQUMsS0FBS1ksSUFBSVo7T0FDM0MsS0FBS2EsSUFBSWIsSUFBSSxLQUFLYzs7O0tBR3BCLElBQUksS0FBS0QsSUFBSVosS0FBSyxLQUFLcEUsU0FBUyxLQUFLaUYsTUFBTTtPQUN6QyxJQUFJLEtBQUtGLElBQUlYLElBQUksR0FBRyxLQUFLVyxJQUFJWCxJQUFJLENBQUMsS0FBS1csSUFBSVg7T0FDM0MsS0FBS1ksSUFBSVosSUFBSSxLQUFLcEUsU0FBUyxLQUFLaUY7WUFDM0IsSUFBSSxLQUFLRCxJQUFJWixLQUFLLEtBQUthLE1BQU07T0FDbEMsSUFBSSxLQUFLRixJQUFJWCxJQUFJLEdBQUcsS0FBS1csSUFBSVgsSUFBSSxDQUFDLEtBQUtXLElBQUlYO09BQzNDLEtBQUtZLElBQUlaLElBQUksS0FBS2E7Ozs7S0FJcEIsS0FBS0QsTUFBTSxLQUFLQSxJQUFJUCxJQUFJLEtBQUtNOzs7O0dBSy9CLElBQUlLLFdBQVcsU0FBWEEsU0FBb0JsRixPQUFPRixRQUFRcUYsVUFBVUMsSUFBSUMsSUFBSTtLQUN2RCxLQUFLQyxPQUFPO0tBQ1osS0FBS3RGLFFBQVFBO0tBQ2IsS0FBS0YsU0FBU0E7S0FDZCxLQUFLa0YsS0FBS3JNLEtBQUtnTSxJQUFJM0UsT0FBT0Y7S0FDMUIsS0FBS3lGLEtBQUs1TSxLQUFLNk0sTUFBTSxLQUFLeEYsUUFBUSxLQUFLc0Y7S0FDdkMsS0FBS0csS0FBSzlNLEtBQUs2TSxNQUFNLEtBQUsxRixTQUFTLEtBQUt3RjtLQUN4QyxLQUFLSSxRQUFRO0tBQ2IsS0FBS0MsV0FBV0MscUJBQXFCNUYsT0FBT0YsUUFBUUUsT0FBT29GLElBQUlDO0tBQy9ELEtBQUtRLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztLQUN6RCxLQUFLQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7S0FDekQsS0FBS0MsVUFBVSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztLQUMxRCxLQUFLQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztLQUN2RSxLQUFLQyxPQUFPO0tBQ1osS0FBS0MsUUFBUTtLQUNiLEtBQUtDLE9BQU87S0FDWixLQUFLQyxPQUFPOzs7S0FHWixLQUFLLElBQUkzSCxJQUFJLEdBQUdBLElBQUksQ0FBQyxLQUFLOEcsS0FBSyxNQUFNLEtBQUtFLEtBQUssSUFBSWhILEtBQUs7T0FDdEQsS0FBS3dILEtBQUt4SCxLQUFLLElBQUl1RixNQUNoQnZGLEtBQUssS0FBSzhHLEtBQUssS0FBTSxLQUFLRCxNQUFPM00sS0FBSzZNLE1BQU0vRyxLQUFLLEtBQUs4RyxLQUFLLE1BQU8sS0FBS0Q7Ozs7S0FLNUUsS0FBSyxJQUFJZSxJQUFJLEdBQUdBLElBQUksSUFBSUEsS0FBSztPQUMzQixLQUFLSCxNQUFNRyxLQUFLLElBQUk1QixLQUFLOzs7OztHQUs3QlMsU0FBU1osVUFBVWdDLGVBQWUsVUFBU3JDLEdBQUdDLEdBQUdxQyxLQUFLOztLQUVwRCxJQUFJbEM7S0FDSixJQUFJNUosS0FBSzhMLE9BQU90QyxJQUFJQyxLQUFLLEtBQUtxQixLQUFLOztLQUVuQyxJQUFJdEIsTUFBTSxLQUFLQyxNQUFNLEtBQUtELE1BQU0sS0FBS3NCLE1BQU1yQixNQUFNLEtBQUt1QixJQUFJO09BQ3hEcEIsUUFBUSxPQUFPLEtBQUsrQjtZQUNmO09BQ0wvQixRQUFRO09BQ1IsSUFBSW1DLE9BQU8sS0FBS1AsS0FBS3hMO09BQ3JCLElBQUlnRSxJQUFJO09BQ1IsSUFBSWdJO09BQ0osT0FBT0EsT0FBTyxLQUFLUCxNQUFNekgsTUFBTTtTQUM3QjRGLFNBQVNvQyxLQUFLMUIsT0FBTzBCLEtBQUsxQixRQUFRLENBQUMsSUFBSXlCLEtBQUt2QyxJQUFJd0MsS0FBSzNCLElBQUliLElBQUksSUFBSXVDLEtBQUt0QyxJQUFJdUMsS0FBSzNCLElBQUlaLElBQUl1QyxLQUFLM0IsSUFBSVgsWUFBWXFDLEtBQUtyQzs7T0FFbkhFLFNBQVMsS0FBSytCOztLQUVoQixLQUFLSCxLQUFLeEwsSUFBSTRKLFFBQVFBO0tBQ3RCLE9BQU9BOzs7O0dBSVRhLFNBQVNaLFVBQVVvQyxrQkFBa0IsVUFBU2xHLE1BQU07S0FDbEQsSUFBSXlELElBQUl6RCxLQUFLO0tBQ2IsSUFBSTBELElBQUkxRCxLQUFLO0tBQ2IsSUFBSW1HLE9BQU9uRyxLQUFLO0tBQ2hCLElBQUkvRixLQUFLd0osSUFBSUMsS0FBSyxLQUFLcUIsS0FBSztLQUM1QixJQUFJLEtBQUtVLEtBQUt4TCxJQUFJMkosYUFBYSxLQUFLK0IsTUFBTTtPQUN4QyxPQUFPOztLQUVULElBQUlTO1NBQUtDLFNBQVM7OztLQUdsQixLQUFLLElBQUlwSSxJQUFJLEdBQUdBLElBQUksR0FBR0EsS0FBSztPQUMxQixJQUFJcUksTUFBTzdDLElBQUksS0FBSytCLEdBQUd2SCxJQUFJLE1BQU8sQ0FBQ3lGLElBQUksS0FBSzhCLEdBQUd2SCxJQUFJLFFBQVEsS0FBSzhHLEtBQUs7T0FDckUsSUFBSWxCLFFBQVEsS0FBSzRCLEtBQUthLEtBQUt6QztPQUMzQixJQUFLQSxRQUFRLEtBQUssS0FBSytCLE9BQU8sS0FBTy9CLFFBQVEsS0FBSyxLQUFLK0IsT0FBTyxLQUFNLENBQUMvQixPQUFPOztTQUUxRUEsUUFBUSxLQUFLaUMsYUFDWHJDLElBQUksS0FBSytCLEdBQUd2SCxJQUFJLEtBQ2hCeUYsSUFBSSxLQUFLOEIsR0FBR3ZILElBQUksS0FDaEJxSTs7T0FHSixJQUFJbk8sS0FBS29PLElBQUkxQyxTQUFTLEdBQUd3QyxVQUFVbE8sS0FBS3FPLElBQUksR0FBR3ZJOztLQUVqRCxJQUFJb0ksV0FBVyxJQUFJOztPQUVqQixPQUFPLENBQUM1QyxHQUFHQyxJQUFJLEdBQUc7WUFDYjs7T0FFTCxJQUFJMkMsV0FBVyxHQUFHRCxNQUFPRCxTQUFTLElBQUssSUFBSSxPQUN0QyxJQUFJRSxXQUFXLElBQUlELE1BQU9ELFNBQVMsSUFBSyxJQUFJLE9BQzVDOztTQUVIQyxNQUFNLEtBQUtiLFFBQVFjO1NBQ25CLEtBQUtaLEtBQUt4TCxJQUFJMkosV0FBVyxLQUFLK0I7OztPQUdoQyxJQUFJSCxLQUFLLEtBQUtWLFFBQ1YzTSxLQUFLb08sSUFBSXBPLEtBQUtvTyxJQUFJLEtBQUtkLEtBQU1oQyxJQUFJLEtBQUs0QixJQUFJLElBQUllLE1BQU0sS0FBTSxDQUFDMUMsSUFBSSxLQUFLNEIsSUFBSSxJQUFJYyxNQUFNLE9BQU8sS0FBS3JCLEtBQUssSUFBSWxCLFNBQVMsS0FDaEgxTCxLQUFLb08sSUFBSXBPLEtBQUtvTyxJQUFJLEtBQUtkLEtBQU1oQyxJQUFJLEtBQUs0QixJQUFJLElBQUllLE1BQU0sS0FBTSxDQUFDMUMsSUFBSSxLQUFLNEIsSUFBSSxJQUFJYyxNQUFNLE9BQU8sS0FBS3JCLEtBQUssSUFBSWxCLFNBQVMsS0FBSztPQUV6SDFCLElBQUlzRSxPQUNGLEtBQUtoQixLQUFNaEMsSUFBSSxLQUFLNEIsSUFBSSxJQUFJZSxPQUFRLENBQUMxQyxJQUFJLEtBQUs0QixJQUFJLElBQUljLFNBQVMsS0FBS3JCLEtBQUssSUFBSXRCLElBQUksS0FBSytCLEdBQUdZLE9BQU9aLElBQ2hHLEtBQUtDLEtBQU1oQyxJQUFJLEtBQUs0QixJQUFJLElBQUllLE1BQU0sS0FBTSxDQUFDMUMsSUFBSSxLQUFLNEIsSUFBSSxJQUFJYyxNQUFNLE9BQU8sS0FBS3JCLEtBQUssSUFBSXJCLElBQUksS0FBSzhCLEdBQUdZLE1BQU0sS0FBS1o7T0FFOUcsS0FBS04sUUFBUTs7T0FFYixPQUFPLENBQ0x6QixJQUFJLEtBQUsrQixHQUFHWSxNQUFNLElBQ2xCMUMsSUFBSSxLQUFLOEIsR0FBR1ksTUFBTSxJQUNsQkE7Ozs7R0FLTjFCLFNBQVNaLFVBQVU0QyxrQkFBa0IsWUFBVztLQUM5QyxJQUFJekksSUFBSTtTQUFHZ0k7S0FDWCxPQUFPQSxPQUFPLEtBQUtQLE1BQU16SCxNQUF6QjtPQUErQmdJLEtBQUt4Qjs7S0FFcEMsS0FBS2tCO0tBQ0wsS0FBS0MsT0FBTyxDQUFDLEtBQUtBO0tBQ2xCLEtBQUtWLFFBQVE7S0FDYi9DLElBQUl3RSxZQUFZLEtBQUt4QjtLQUNyQmhELElBQUl5RTs7S0FFSjNJLElBQUk7OztLQUdKLE9BQU9nSSxPQUFPLEtBQUtQLE1BQU16SCxNQUFNOztPQUU3QixJQUFJK0IsT0FBTyxDQUNUN0gsS0FBSzBPLE1BQU1aLEtBQUszQixJQUFJYixJQUFJLEtBQUtxQixPQUM3QjNNLEtBQUswTyxNQUFNWixLQUFLM0IsSUFBSVosSUFBSSxLQUFLb0IsT0FBTzs7T0FHdEMsR0FBRztTQUNEOUUsT0FBTyxLQUFLa0csZ0JBQWdCbEc7Z0JBQ3JCQTs7T0FFVCxJQUFJLEtBQUtrRixPQUFPO1NBQ2QvQyxJQUFJMkU7U0FDSjNFLElBQUk0RTtTQUNKNUUsSUFBSXlFO1NBQ0osS0FBSzFCLFFBQVE7Ozs7OztHQU1uQixJQUFJRSx1QkFBdUIsU0FBdkJBLHFCQUFnQzRCLEdBQUdDLEdBQUdDLEdBQUd0QyxJQUFJQyxJQUFJO0tBQ25ELElBQUlzQyxXQUFXaEYsSUFBSWlELHFCQUNqQjRCLElBQUksR0FBR0MsSUFBSSxHQUFHLEdBQ2RELElBQUksR0FBR0MsSUFBSSxHQUFHQztLQUVoQkMsU0FBU0MsYUFBYSxHQUFHeEM7S0FDekJ1QyxTQUFTQyxhQUFhLEdBQUd2QztLQUN6QixPQUFPc0M7Ozs7R0FJVCxJQUFJMVMsTUFBTSxTQUFOQSxJQUFlb0MsT0FBTzs7S0FFeEIsSUFBR0EsT0FBTztPQUNSd1Esc0JBQXNCNVM7T0FDdEIwTixJQUFJbUYsVUFBVSxHQUFHLEdBQUd0RixPQUFPeEMsT0FBT3dDLE9BQU8xQztPQUN6Q3dDLE1BQU00RTs7Ozs7R0FLVixJQUFJMUUsU0FBU0QsUUFBUUMsT0FBT00sS0FBSyxVQUFVLE1BQU07T0FDN0NILE1BQU1ILE9BQU9HO0dBQ2JILE9BQU9jOztHQUVYaEIsUUFBUSxJQUFJNEMsU0FBUzFDLE9BQU94QyxPQUFPd0MsT0FBTzFDLFFBQVEsS0FBSyxXQUFXOztHQUVoRTdLLElBQUlmLFFBQVF1QixRQUFRLFdBQVdzUyxHQUFHOztHQUVsQzNFLE9BQU9DLGlCQUFpQixVQUFVLFlBQVU7S0FDMUMsSUFBR25QLFFBQVF1QixRQUFRLFdBQVdzUyxHQUFHLGFBQWE7T0FDNUN6RixRQUFRLElBQUk0QyxTQUFTMUMsT0FBT3hDLE9BQU93QyxPQUFPMUMsUUFBUSxLQUFLLFdBQVc7Ozs7Ozs7OztBQzlRMUU7O0FBRUEsUUFBTyxlQUFlLFNBQVMsY0FBYztHQUMzQyxPQUFPOzs7QUFHVCxLQUFJLGVBQWUsWUFBWSxFQUFFLFNBQVMsaUJBQWlCLFFBQVEsT0FBTyxFQUFFLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSyxFQUFFLElBQUksYUFBYSxNQUFNLElBQUksV0FBVyxhQUFhLFdBQVcsY0FBYyxPQUFPLFdBQVcsZUFBZSxNQUFNLElBQUksV0FBVyxZQUFZLFdBQVcsV0FBVyxNQUFNLE9BQU8sZUFBZSxRQUFRLFdBQVcsS0FBSyxpQkFBaUIsT0FBTyxVQUFVLGFBQWEsWUFBWSxhQUFhLEVBQUUsSUFBSSxZQUFZLGlCQUFpQixZQUFZLFdBQVcsYUFBYSxJQUFJLGFBQWEsaUJBQWlCLGFBQWEsY0FBYyxPQUFPOztBQUVoaUIsVUFBUyxnQkFBZ0IsVUFBVSxhQUFhLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixjQUFjLEVBQUUsTUFBTSxJQUFJLFVBQVU7Ozt3REFFbEM7R0FUNUUsa0NBQWFoSSxNQUFNeUIsT0FBTztLQUN4Qjs7S0FEd0I7O0tBR3hCLEtBQUt6QixPQUFPQTtLQUNaLEtBQUt5QixRQUFRQTtLQUNiLEtBQUt5TyxVQUFVOzs7R0FlakIsYUFBYSwwQkFBMEIsQ0FBQztLQUN0QyxLQUFLO0tBQ0wsT0FBTyxTQUFTLGtCQWRRO09BQUE7O09BQUEsSUFBVkMsUUFBVSxvRUFBSjs7T0FDcEIsT0FBTyxLQUFLMU8sTUFBTUssSUFBSSxLQUFLb08sVUFBVSw0QkFBNEJDLE9BQzlEdk4sS0FBSyxVQUFDMkMsVUFBYTtTQUNsQixPQUFPQSxTQUFTbEM7VUFFakIrTSxNQUFNLFVBQUMzTSxPQUFVO1NBQ2hCLE1BQUt6RCxLQUFLeUQsTUFBTSxzQ0FBc0NySCxRQUFRaVUsT0FBTzVNLE1BQU1KLE1BQU07Ozs7O0dBcUJ2RixPQUFPOzs7Ozs7O0FDcENUOztBQUVBLFFBQU8sZUFBZSxTQUFTLGNBQWM7R0FDM0MsT0FBTzs7O0FBR1QsS0FBSSxlQUFlLFlBQVksRUFBRSxTQUFTLGlCQUFpQixRQUFRLE9BQU8sRUFBRSxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUssRUFBRSxJQUFJLGFBQWEsTUFBTSxJQUFJLFdBQVcsYUFBYSxXQUFXLGNBQWMsT0FBTyxXQUFXLGVBQWUsTUFBTSxJQUFJLFdBQVcsWUFBWSxXQUFXLFdBQVcsTUFBTSxPQUFPLGVBQWUsUUFBUSxXQUFXLEtBQUssaUJBQWlCLE9BQU8sVUFBVSxhQUFhLFlBQVksYUFBYSxFQUFFLElBQUksWUFBWSxpQkFBaUIsWUFBWSxXQUFXLGFBQWEsSUFBSSxhQUFhLGlCQUFpQixhQUFhLGNBQWMsT0FBTzs7QUFFaGlCLFVBQVMsZ0JBQWdCLFVBQVUsYUFBYSxFQUFFLElBQUksRUFBRSxvQkFBb0IsY0FBYyxFQUFFLE1BQU0sSUFBSSxVQUFVOztBQUVoSCxLQVZhaU4sbUJBVVUsUUFWVkEsbUJBVXFDLFlBQVk7R0FUNUQsNEJBQWU7S0FDYjs7S0FEYTs7S0FHYixLQUFLak4sT0FBTyxDQUNWO09BQ0UsU0FBUztPQUNULE9BQU87T0FDUCxlQUFlO09BQ2YsUUFBUTtRQUVWO09BQ0UsU0FBUztPQUNULE9BQU87T0FDUCxlQUFlO09BQ2YsUUFBUTtRQUVWO09BQ0UsU0FBUztPQUNULE9BQU87T0FDUCxlQUFlO09BQ2YsUUFBUTtRQUVWO09BQ0UsU0FBUztPQUNULE9BQU87T0FDUCxlQUFlO09BQ2YsUUFBUTtRQUVWO09BQ0UsU0FBUztPQUNULE9BQU87T0FDUCxlQUFlO09BQ2YsUUFBUTtRQUVWO09BQ0UsU0FBUztPQUNULE9BQU87T0FDUCxlQUFlO09BQ2YsUUFBUTtRQUVWO09BQ0UsU0FBUztPQUNULE9BQU87T0FDUCxlQUFlO09BQ2YsUUFBUTtRQUVWO09BQ0UsU0FBUztPQUNULE9BQU87T0FDUCxlQUFlO09BQ2YsUUFBUTtRQUVWO09BQ0UsU0FBUztPQUNULE9BQU87T0FDUCxlQUFlO09BQ2YsUUFBUTtRQUVWO09BQ0UsU0FBUztPQUNULE9BQU87T0FDUCxlQUFlO09BQ2YsUUFBUTs7OztHQU1kLGFBQWEsa0JBQWtCLENBQUM7S0FDOUIsS0FBSztLQUNMLE9BQU8sU0FBUyxTQUhUO09BQ1AsT0FBTyxLQUFLQTs7OztHQU9kLE9BQU87Ozs7Ozs7QUM1RVQ7O0FBRUEsUUFBTyxlQUFlLFNBQVMsY0FBYztHQUMzQyxPQUFPOzs7QUFHVCxVQUFTLGdCQUFnQixVQUFVLGFBQWEsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLGNBQWMsRUFBRSxNQUFNLElBQUksVUFBVTs7QUFFaEgsS0FSYXpCLHVCQVFjLFFBUmRBLHVCQUNYLGdDQUFjO0dBQ1o7O0dBRFk7O0dBR1osS0FBS3lDLFNBQVMsWUFBVztLQUN2QixPQUFPOzs7Ozs7OztBQ0xiOztBQUVBLFFBQU8sZUFBZSxTQUFTLGNBQWM7R0FDM0MsT0FBTzs7QUFFVCxTQUxnQmtNOztBQU9oQixVQUFTLGdCQUFnQixVQUFVLGFBQWEsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLGNBQWMsRUFBRSxNQUFNLElBQUksVUFBVTs7QUFQekcsVUFBU0Esa0JBQWtCO0dBQ2hDOztHQUVBLElBQUlqVCxZQUFZO0tBQ2RFLFVBQVU7S0FDVmdDLGFBQWE7S0FDYjlCLE9BQU87T0FDSDRDLGNBQWM7O0tBRWxCakQsWUFBWW1UO0tBQ1ovUSxjQUFjO0tBQ2RnUixrQkFBa0I7OztHQUdwQixPQUFPblQ7OztBQVlULEtBVE1rVCxtQkFDSiwwQkFBYWhVLFFBQVE7R0FDbkI7Ozs7R0FEbUI7O0dBSW5CLEtBQUtrVSxlQUFlbFUsT0FBTyxLQUFLOEQsY0FBY3FROzs7Ozs7OztBQ3RCbEQ7OztBQUVBLFFBQU8sZUFBZSxTQUFTLGNBQWM7R0FDM0MsT0FBTzs7O0FBR1QsS0FBSSxlQUFlLFlBQVksRUFBRSxTQUFTLGlCQUFpQixRQUFRLE9BQU8sRUFBRSxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUssRUFBRSxJQUFJLGFBQWEsTUFBTSxJQUFJLFdBQVcsYUFBYSxXQUFXLGNBQWMsT0FBTyxXQUFXLGVBQWUsTUFBTSxJQUFJLFdBQVcsWUFBWSxXQUFXLFdBQVcsTUFBTSxPQUFPLGVBQWUsUUFBUSxXQUFXLEtBQUssaUJBQWlCLE9BQU8sVUFBVSxhQUFhLFlBQVksYUFBYSxFQUFFLElBQUksWUFBWSxpQkFBaUIsWUFBWSxXQUFXLGFBQWEsSUFBSSxhQUFhLGlCQUFpQixhQUFhLGNBQWMsT0FBTzs7QUFFaGlCLFNBUmdCQzs7QUFVaEIsVUFBUyxnQkFBZ0IsVUFBVSxhQUFhLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixjQUFjLEVBQUUsTUFBTSxJQUFJLFVBQVU7O0FBVnpHLFVBQVNBLGtCQUFrQnJVLFVBQVU7R0FDMUM7O0dBRUEsSUFBSWUsWUFBWTtLQUNkRSxVQUFVO0tBQ1ZFLE9BQU87T0FDSG1ULGFBQWE7O0tBRWpCQyxVQUFVO0tBQ1ZyVCxNQUFNc1Q7S0FDTjFULFlBQVkyVDtLQUNadlIsY0FBYzs7O0dBR2hCLE9BQU9uQzs7R0FFUCxTQUFTeVQsU0FBU3JULE9BQU91VCxJQUFJclQsTUFBTXNULElBQUk7S0FDckMsSUFBSUM7S0FDSixJQUFJQyxTQUFTN1UsU0FBUzBVLEdBQUcsSUFBSTtPQUMzQkksV0FBVztPQUNYQyxhQUFhO09BQ2JDLFlBQVk7T0FDWkMsTUFBTTtPQUNOQyxTQUFTOzs7S0FHWFIsR0FBR1MsU0FBUzs7S0FFWnRWLFFBQVFzRSxRQUFRaEQsTUFBTW1ULGFBQWEsVUFBQ2MsT0FBVTtPQUM1Q1AsT0FBT1EsS0FBS0QsT0FBT2hLLFFBQVFrSzs7O0tBRzdCVixVQUFVelQsTUFBTW9VLE9BQU8sbUJBQW1CLFlBQU07T0FDOUMxVixRQUFRc0UsUUFBUXdRLEdBQUdhLGNBQWMsVUFBQ0MsYUFBZ0I7U0FDaERaLE9BQU9RLEtBQUtJLFlBQVlDLE9BQU90SyxRQUFRa0s7Ozs7S0FJM0NuVSxNQUFNd0osSUFBSSxZQUFZLFlBQU07T0FDMUJpSzs7Ozs7OzhEQWlCK0I7R0FWbkMsNEJBQWFuUixNQUFNa1MsbUJBQW1CO0tBQ3BDOztLQURvQzs7S0FHcEMsS0FBS2xTLE9BQU9BO0tBQ1osS0FBSytSLGVBQWU7O0tBRXBCLEtBQUt4UixTQUFTMlI7OztHQWdCaEIsYUFBYSxvQkFBb0IsQ0FBQztLQUNoQyxLQUFLO0tBQ0wsT0FBTyxTQUFTLFNBZlRBLG1CQUFtQjtPQUFBOztPQUMxQixPQUFPLEtBQUtDLGdCQUFnQkQsbUJBQW1CdFAsS0FBSyxZQUFNO1NBQ3hELE1BQUs1QyxLQUFLZSxLQUFLOzs7TUFvQmhCO0tBQ0QsS0FBSztLQUNMLE9BQU8sU0FBUyxnQkFsQkZtUixtQkFBbUI7T0FBQTs7T0FDakMsT0FBT0Esa0JBQWtCQyxnQkFBZ0IsSUFBSXZQLEtBQUssVUFBQ1MsTUFBUztTQUMxRCxPQUFLME8sZUFBZTFPOztTQUVwQixPQUFPLE9BQUswTzs7Ozs7R0F5QmhCLE9BQU8iLCJmaWxlIjoiaW5kZXgubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTViMzBiY2I0MDI0MGM2NTAyOTkiLCIvKiBnbG9iYWwgbWFsYXJrZXk6ZmFsc2UsIG1vbWVudDpmYWxzZSAqL1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2luZGV4LmNvbmZpZyc7XG5pbXBvcnQgeyByb3V0ZXJDb25maWcgfSBmcm9tICcuL2luZGV4LnJvdXRlJztcbmltcG9ydCB7IHJ1bkJsb2NrIH0gZnJvbSAnLi9pbmRleC5ydW4nO1xuaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIgfSBmcm9tICcuL21haW4vbWFpbi5jb250cm9sbGVyJztcbmltcG9ydCB7IEhvbWVDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL2hvbWUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL25hdi5jb250cm9sbGVyJztcbmltcG9ydCB7IFJlZ2lzdHJhdGlvbnNDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL3JlZ2lzdHJhdGlvbnMuY29udHJvbGxlcic7XG5pbXBvcnQgeyBTZXNzaW9uc0NvbnRyb2xsZXIgfSBmcm9tICcuL3NjcmlwdHMvY29udHJvbGxlcnMvc2Vzc2lvbnMuY29udHJvbGxlcic7XG5pbXBvcnQgeyBCdWJibGVDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL2J1YmJsZS5jb250cm9sbGVyJztcbmltcG9ydCB7IEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL2dpdGh1YkNvbnRyaWJ1dG9yL2dpdGh1YkNvbnRyaWJ1dG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2ViRGV2VGVjU2VydmljZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL3dlYkRldlRlYy93ZWJEZXZUZWMuc2VydmljZSc7XG5pbXBvcnQgeyBZb3VUdWJlQXBpS2V5U2VydmljZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL2FwaWtleXMveW91VHViZUFwaUtleS5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdmJhckRpcmVjdGl2ZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hbGFya2V5RGlyZWN0aXZlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlJztcblxudmFyIGRldkFwaVVybCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnIDtcbnZhciBwcm9kQXBpVXJsID0gJ2h0dHBzOi8vbWVsdGVkcmFkaW8uaGVyb2t1YXBwLmNvbSc7XG5cbmFuZ3VsYXIubW9kdWxlKCdtZWx0ZWRSYWRpbycsIFsnbmdBbmltYXRlJywgJ25nQ29va2llcycsICduZ1RvdWNoJywgJ25nU2FuaXRpemUnLCAnbmdNZXNzYWdlcycsICduZ0FyaWEnLCAnbmdSZXNvdXJjZScsICd1aS5yb3V0ZXInLCAndWkuYm9vdHN0cmFwJywgJ3RvYXN0cicsICduZy10b2tlbi1hdXRoJywgJ3JhaWxzJywgJ0xvY2FsU3RvcmFnZU1vZHVsZSddKVxuICAuY29uc3RhbnQoJ21hbGFya2V5JywgbWFsYXJrZXkpXG4gIC5jb25zdGFudCgnbW9tZW50JywgbW9tZW50KVxuICAuY29uZmlnKGNvbmZpZylcbiAgLmNvbmZpZyhyb3V0ZXJDb25maWcpXG4gIC5jb25maWcoZnVuY3Rpb24oJGF1dGhQcm92aWRlcikge1xuICAgICAkYXV0aFByb3ZpZGVyLmNvbmZpZ3VyZSh7XG4gICAgICAgICBhcGlVcmw6IGRldkFwaVVybFxuICAgICB9KTtcbiAgIH0pXG4gICAuY29uZmlnKGZ1bmN0aW9uKGxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlcil7XG4gICAgIGxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlci5zZXRQcmVmaXgoJ21lbHRlZFJhZGlvJyk7XG4gICB9KVxuICAgLmNvbmZpZyhmdW5jdGlvbihyYWlsc1NlcmlhbGl6ZXJQcm92aWRlcil7XG4gICAgIHJhaWxzU2VyaWFsaXplclByb3ZpZGVyLnVuZGVyc2NvcmUoYW5ndWxhci5pZGVudGl0eSkuY2FtZWxpemUoYW5ndWxhci5pZGVudGl0eSk7XG4gICB9KVxuICAucnVuKHJ1bkJsb2NrKVxuICAuc2VydmljZSgnZ2l0aHViQ29udHJpYnV0b3InLCBHaXRodWJDb250cmlidXRvclNlcnZpY2UpXG4gIC5zZXJ2aWNlKCd3ZWJEZXZUZWMnLCBXZWJEZXZUZWNTZXJ2aWNlKVxuICAuc2VydmljZSgnWW91VHViZUFwaUtleVNlcnZpY2UnLCBZb3VUdWJlQXBpS2V5U2VydmljZSlcbiAgLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIEhvbWVDb250cm9sbGVyKVxuICAuY29udHJvbGxlcignTmF2Q29udHJvbGxlcicsIE5hdkNvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdSZWdpc3RyYXRpb25zQ29udHJvbGxlcicsIFJlZ2lzdHJhdGlvbnNDb250cm9sbGVyKVxuICAuY29udHJvbGxlcignU2Vzc2lvbnNDb250cm9sbGVyJywgU2Vzc2lvbnNDb250cm9sbGVyKVxuICAuY29udHJvbGxlcignQnViYmxlQ29udHJvbGxlcicsIEJ1YmJsZUNvbnRyb2xsZXIpXG4gIC5kaXJlY3RpdmUoJ2FjbWVOYXZiYXInLCBOYXZiYXJEaXJlY3RpdmUpXG4gIC5kaXJlY3RpdmUoJ2FjbWVNYWxhcmtleScsIE1hbGFya2V5RGlyZWN0aXZlKVxuICAuZGlyZWN0aXZlKCdvbkZpbmlzaFJlbmRlcicsIGZ1bmN0aW9uKCR0aW1lb3V0KXtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cikge1xuICAgICAgICBpZiAoc2NvcGUuJGxhc3QgPT09IHRydWUpIHtcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS4kZW1pdChhdHRyLm9uRmluaXNoUmVuZGVyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgfTtcblxuICB9KVxuICAuZmFjdG9yeSgnQXBpU3luYycsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIEFwaVN5bmMgPSB7fTtcblxuICAgIEFwaVN5bmMuc2V0UGxheWxpc3RzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICBBcGlTeW5jLnBsYXlsaXN0cyA9IG9iajtcbiAgICB9O1xuXG4gICAgQXBpU3luYy5zZXRTb25ncyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBBcGlTeW5jLnNvbmdzID0gb2JqO1xuICAgIH07XG5cbiAgICBBcGlTeW5jLmdldFBsYXlsaXN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEFwaVN5bmMucGxheWxpc3RzO1xuICAgIH07XG5cbiAgICBBcGlTeW5jLmdldFNvbmdzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gQXBpU3luYy5zb25ncztcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFwaVN5bmM7XG4gIH0pXG4gIC5mYWN0b3J5KCdQbGF5bGlzdCcsIGZ1bmN0aW9uKHJhaWxzUmVzb3VyY2VGYWN0b3J5KSB7XG4gICAgcmV0dXJuIHJhaWxzUmVzb3VyY2VGYWN0b3J5KHtcbiAgICAgIHVybDogZGV2QXBpVXJsKycvcGxheWxpc3RzJyxcbiAgICAgIG5hbWU6ICdwbGF5bGlzdCdcbiAgICB9KTtcbiAgfSlcbiAgLmZhY3RvcnkoJ1VzZXInLGZ1bmN0aW9uKHJhaWxzUmVzb3VyY2VGYWN0b3J5KXtcbiAgICByZXR1cm4gcmFpbHNSZXNvdXJjZUZhY3Rvcnkoe1xuICAgICAgdXJsOiBkZXZBcGlVcmwgKycvdXNlcnMve3t1c2VySWR9fS9wbGF5bGlzdHMnLFxuICAgICAgbmFtZTogJ3VzZXInXG4gICAgfSk7XG4gIH0pXG4gIC5mYWN0b3J5KCdTb25nJywgZnVuY3Rpb24ocmFpbHNSZXNvdXJjZUZhY3Rvcnkpe1xuICAgIHJldHVybiByYWlsc1Jlc291cmNlRmFjdG9yeSh7XG4gICAgICB1cmw6IGRldkFwaVVybCArICcvcGxheWxpc3RzL3t7cGxheWxpc3RJZH19L3NvbmdzJyxcbiAgICAgIG5hbWU6ICdzb25nJ1xuICAgIH0pO1xuICB9KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXgubW9kdWxlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZyAoJGxvZ1Byb3ZpZGVyLCB0b2FzdHJDb25maWcpIHtcbiAgJ25nSW5qZWN0JztcbiAgLy8gRW5hYmxlIGxvZ1xuICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xuXG4gIC8vIFNldCBvcHRpb25zIHRoaXJkLXBhcnR5IGxpYlxuICB0b2FzdHJDb25maWcuYWxsb3dIdG1sID0gdHJ1ZTtcbiAgdG9hc3RyQ29uZmlnLnRpbWVPdXQgPSAzMDAwO1xuICB0b2FzdHJDb25maWcucG9zaXRpb25DbGFzcyA9ICd0b2FzdC10b3AtcmlnaHQnO1xuICB0b2FzdHJDb25maWcucHJldmVudER1cGxpY2F0ZXMgPSB0cnVlO1xuICB0b2FzdHJDb25maWcucHJvZ3Jlc3NCYXIgPSB0cnVlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJleHBvcnQgZnVuY3Rpb24gcm91dGVyQ29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICduZ0luamVjdCc7XG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdtYWluJywge1xuICAgICAgdXJsOiAnLycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9tYWluL21haW4uaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInLFxuICAgICAgY29udHJvbGxlckFzOiAnbWFpbidcbiAgICB9KVxuICAgIC5zdGF0ZSgnc2lnbl9pbicsIHtcbiAgICAgIHVybDogJy9zaWduX2luJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL3VzZXJfc2Vzc2lvbnMvbmV3Lmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1Nlc3Npb25zQ29udHJvbGxlciBhcyBzaWduaW4nXG4gICAgfSlcbiAgICAuc3RhdGUoJ3NpZ25fdXAnLCB7XG4gICAgICB1cmw6ICcvc2lnbl91cCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC92aWV3cy91c2VyX3JlZ2lzdHJhdGlvbnMvbmV3Lmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdHJhdGlvbnNDb250cm9sbGVyIGFzIHNpZ251cCdcbiAgICB9KVxuICAgIC5zdGF0ZSAgKCdob21lJywge1xuICAgICAgdXJsOiAnL3VzZXJzLzppZCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC92aWV3cy9ob21lLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyIGFzIGhvbWUnLFxuICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgYXV0aDogZnVuY3Rpb24oJGF1dGgpIHtcbiAgICAgICAgICAgcmV0dXJuICRhdXRoLnZhbGlkYXRlVXNlcigpO1xuICAgICAgICAgfVxuICAgICAgIH1cbiAgICB9KTtcblxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4LnJvdXRlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIHJ1bkJsb2NrICgkbG9nKSB7XG4gICduZ0luamVjdCc7XG4gICRsb2cuZGVidWcoJ3J1bkJsb2NrIGVuZCcpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5ydW4uanMiLCJleHBvcnQgY2xhc3MgTWFpbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAoJHRpbWVvdXQsIHdlYkRldlRlYywgdG9hc3RyKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuYXdlc29tZVRoaW5ncyA9IFtdO1xuICAgIHRoaXMuY2xhc3NBbmltYXRpb24gPSAnJztcbiAgICB0aGlzLmNyZWF0aW9uRGF0ZSA9IDE0ODE2Mzk3MDQxMDc7XG4gICAgdGhpcy50b2FzdHIgPSB0b2FzdHI7XG5cblxuICAgIHRoaXMuYWN0aXZhdGUoJHRpbWVvdXQsIHdlYkRldlRlYyk7XG4gIH1cblxuICBhY3RpdmF0ZSgkdGltZW91dCwgd2ViRGV2VGVjKSB7XG4gICAgdGhpcy5nZXRXZWJEZXZUZWMod2ViRGV2VGVjKTtcbiAgICAkdGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNsYXNzQW5pbWF0aW9uID0gJ3J1YmJlckJhbmQnO1xuICAgIH0sIDQwMDApO1xuICB9XG5cbiAgZ2V0V2ViRGV2VGVjKHdlYkRldlRlYykge1xuICAgIHRoaXMuYXdlc29tZVRoaW5ncyA9IHdlYkRldlRlYy5nZXRUZWMoKTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLmF3ZXNvbWVUaGluZ3MsIChhd2Vzb21lVGhpbmcpID0+IHtcbiAgICAgIGF3ZXNvbWVUaGluZy5yYW5rID0gTWF0aC5yYW5kb20oKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dUb2FzdHIoKSB7XG4gICAgdGhpcy50b2FzdHIuaW5mbygnRm9yayA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL1N3aWlwL2dlbmVyYXRvci1ndWxwLWFuZ3VsYXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj48Yj5nZW5lcmF0b3ItZ3VscC1hbmd1bGFyPC9iPjwvYT4nKTtcbiAgICB0aGlzLmNsYXNzQW5pbWF0aW9uID0gJyc7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvbWFpbi9tYWluLmNvbnRyb2xsZXIuanMiLCJleHBvcnQgY2xhc3MgSG9tZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAoJHNjb3BlLCAkcm9vdFNjb3BlLCAkYXV0aCwgJGxvY2F0aW9uLCBVc2VyLCBQbGF5bGlzdCxsb2NhbFN0b3JhZ2VTZXJ2aWNlLCAkdWliTW9kYWwsIFNvbmcsIEFwaVN5bmMsICRodHRwLCRzY2UsICR3aW5kb3csICRsb2csIFlvdVR1YmVBcGlLZXlTZXJ2aWNlKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICAkc2NvcGUudXNlclNpZ25lZEluID0gbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2N1cnJlbnRVc2VyJyk7XG4gICAgJHJvb3RTY29wZS5jdXJyZW50UGxheWxpc3QgPSBudWxsO1xuICAgICRzY29wZS5zb25ncyA9IG51bGw7XG4gICAgJHNjb3BlLmN1cnJlbnRTb25nID0gbnVsbDtcbiAgICAkc2NvcGUucHJldmlvdXNTb25nID0gbnVsbDtcbiAgICAkc2NvcGUuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgdmFyIHBsYXllcjtcbiAgICB2YXIgdmlkQXJyYXkgPSBbXTtcbiAgICB2YXIgc2VhcmNoQ3VycmVudFNvbmcgPSBudWxsO1xuICAgIHZhciBwcm9kQXBpVXJsID0gJ2h0dHBzOi8vbWVsdGVkcmFkaW8uaGVyb2t1YXBwLmNvbS8nO1xuICAgIHZhciBkZXZBcGlVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwLyc7XG5cbiAgICAoZnVuY3Rpb24gY2hhbmdlTmF2Q29sb3IoKXtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnbmF2Lm5hdi1iYXInKS5jc3MoJ2NvbG9yJywnd2hpdGUnKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnbmF2Lm5hdi1iYXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCdibGFjaycpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCd1bCNkZXNrdG9wLW5hdi1tZW51JykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywnYmxhY2snKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgndWwjbW9iaWxlLW5hdi1tZW51LWJsYWNrJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywnYmxhY2snKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgndWwubmF2LW1lbnUgYScpLmNzcygnY29sb3InLCd3aGl0ZScpO1xuICAgIH0pKCk7XG5cbiAgICBpZigkc2NvcGUudXNlclNpZ25lZEluKSB7XG5cbiAgICAgIFVzZXIucXVlcnkoe3BsYXlsaXN0SWQ6ICcnfSx7dXNlcklkOiAkc2NvcGUudXNlclNpZ25lZEluLmlkfSkudGhlbihmdW5jdGlvbihyZXN1bHRzKXtcbiAgICAgICAgQXBpU3luYy5zZXRQbGF5bGlzdHMocmVzdWx0cyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkc2NvcGUuZ2V0Q3VycmVudFBsYXlsaXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJHJvb3RTY29wZS5jdXJyZW50UGxheWxpc3Q7XG4gICAgfTtcblxuICAgICRzY29wZS5wbGF5bGlzdHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBBcGlTeW5jLmdldFBsYXlsaXN0cygpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc29uZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAgQXBpU3luYy5nZXRTb25ncygpO1xuICAgIH07XG5cbiAgICAkc2NvcGUubmV3UGxheWxpc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5tb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC92aWV3cy9hZGRwbGF5bGlzdC5odG1sJyxcbiAgICAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmKCRzY29wZS50ZXh0KSB7XG5cbiAgICAgICAkaHR0cCh7XG4gICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgIHVybDogIGRldkFwaVVybCArJ3VzZXJzLycgKyAkc2NvcGUudXNlclNpZ25lZEluLmlkICsgJy9wbGF5bGlzdHMnLFxuICAgICAgICAgZGF0YToge1xuICAgICAgICAgICB0aXRsZTogJHNjb3BlLnRleHRcbiAgICAgICAgIH1cbiAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpe1xuXG4gICAgICAgICBBcGlTeW5jLnNldFBsYXlsaXN0cyhyZXN1bHRzLmRhdGEpO1xuICAgICAgICAgJHNjb3BlLnNldFBsYXlsaXN0KHJlc3VsdHMuZGF0YVtyZXN1bHRzLmRhdGEubGVuZ3RoIC0gMV0pO1xuICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAkbG9nKGVycm9yKTtcbiAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUudGV4dCA9ICcnO1xuICAgICAgICAkc2NvcGUubW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuZGlzbWlzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLm1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgfTtcblxuICAgICRzY29wZS5zZXRQbGF5bGlzdCA9IGZ1bmN0aW9uKHBsYXlsaXN0KSB7XG5cbiAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ2Rpdi5wbGF5bGlzdC1jb250ZW50JykucmVtb3ZlQ2xhc3MoJ292ZXJmbG93Jyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdjdXJyZW50UGxheWxpc3QnLCBwbGF5bGlzdCk7XG4gICAgICAgICRyb290U2NvcGUuY3VycmVudFBsYXlsaXN0ID0gIGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdjdXJyZW50UGxheWxpc3QnKTtcblxuICAgICAgICBpZigkcm9vdFNjb3BlLmN1cnJlbnRQbGF5bGlzdCkge1xuXG4gICAgICAgICAgU29uZy5xdWVyeSh7c29uZ0lkOiAnJ30se3BsYXlsaXN0SWQ6ICRyb290U2NvcGUuY3VycmVudFBsYXlsaXN0LmlkfSkudGhlbihmdW5jdGlvbihzb25ncyl7XG5cbiAgICAgICAgICAgICBBcGlTeW5jLnNldFNvbmdzKHNvbmdzKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldFZpZGVvU29uZyA9IGZ1bmN0aW9uKHBsYXlsaXN0LCB2aWRlbykge1xuXG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsIycrdmlkZW8uaWQudmlkZW9JZCkudG9nZ2xlKFwic2xvd1wiKTtcblxuICAgICB2YXIgZ2V0VmlkZW9JbmZvVXJsID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvdmlkZW9zPycrXG4gICAgICAgICAgICAgICAgICAgJ2lkPScrXG4gICAgICAgICAgICAgICAgICAgdmlkZW8uaWQudmlkZW9JZCtcbiAgICAgICAgICAgICAgICAgICAnJmtleT0nK1xuICAgICAgICAgICAgICAgICAgIFlvdVR1YmVBcGlLZXlTZXJ2aWNlLmFwaUtleSgpK1xuICAgICAgICAgICAgICAgICAgICcmcGFydD1zbmlwcGV0LGNvbnRlbnREZXRhaWxzJztcbiAgICAgICAgICRodHRwKHtcblxuICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICB1cmw6IGdldFZpZGVvSW5mb1VybFxuXG4gICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpe1xuXG4gICAgICAgICAgIGFkZFZpZGVvVG9QbGF5bGlzdChwbGF5bGlzdCxyZXN1bHRzLmRhdGEuaXRlbXNbMF0pO1xuXG4gICAgICAgICB9LGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgJGxvZyhlcnJvcik7XG4gICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNvbnZlcnREdXJhdGlvbiA9IGZ1bmN0aW9uKHN0cmluZykge1xuXG4gICAgICAgIHZhciBhcnJheSA9IHN0cmluZy5tYXRjaCgvKFxcZCspKD89W01IU10pL2lnKXx8W107XG4gICAgICAgIHZhciBmb3JtYXR0ZWQgPSBhcnJheS5tYXAoZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgaWYoaXRlbS5sZW5ndGg8MikgcmV0dXJuICcwJytpdGVtO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pLmpvaW4oJzonKTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkO1xuXG4gICAgfTtcblxuICAgZnVuY3Rpb24gYWRkVmlkZW9Ub1BsYXlsaXN0KHBsYXlsaXN0LCB2aWRlbykge1xuXG4gICAgICAgJGh0dHAoe1xuICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICB1cmw6IGRldkFwaVVybCArICdwbGF5bGlzdHMvJyArIHBsYXlsaXN0LmlkICsnL3NvbmdzJyxcbiAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgdGl0bGU6IHZpZGVvLnNuaXBwZXQudGl0bGUsXG4gICAgICAgICAgIGFydGlzdDogdmlkZW8uc25pcHBldC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgdXJsOiB2aWRlby5pZCxcbiAgICAgICAgICAgZHVyYXRpb246IHZpZGVvLmNvbnRlbnREZXRhaWxzLmR1cmF0aW9uXG4gICAgICAgICB9XG4gICAgICAgfSkudGhlbihcbiAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdHMpe1xuICAgICAgICAgICBBcGlTeW5jLnNldFNvbmdzKHJlc3VsdHMuZGF0YSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAkbG9nKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmRlbGV0ZVNvbmcgPSBmdW5jdGlvbihzb25nKSB7XG5cbiAgICAgICAkaHR0cCh7XG4gICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgdXJsOiBkZXZBcGlVcmwgKyAncGxheWxpc3RzLycgKyAkcm9vdFNjb3BlLmN1cnJlbnRQbGF5bGlzdC5pZCArJy9zb25ncy8nKyBzb25nLmlkXG4gICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cbiAgICAgICAgICRzY29wZS5zZXRQbGF5bGlzdChyZXNwb25zZS5kYXRhLmN1cnJlbnRfcGxheWxpc3QpO1xuICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZGVsZXRlUGxheWxpc3QgPSBmdW5jdGlvbihwbGF5bGlzdCl7XG5cbiAgICAgICRodHRwKHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgdXJsOiBkZXZBcGlVcmwgKyAnL3VzZXJzLycgKyBwbGF5bGlzdC51c2VyX2lkICsnL3BsYXlsaXN0cy8nICsgcGxheWxpc3QuaWRcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgQXBpU3luYy5zZXRQbGF5bGlzdHMocmVzcG9uc2UuZGF0YS51c2VyX3BsYXlsaXN0cyk7XG4gICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBzZXRTZWFyY2hSZXN1bHRzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAkc2NvcGUudmlkZW9zID0gb2JqO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0VmlkZW9zID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICBpZigkc2NvcGUudGV4dCkge1xuXG4gICAgICAgICAkc2NvcGUuc2V0UGxheWxpc3QobnVsbCk7XG4gICAgICAgICB2YXIgc2VhcmNoVGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudCgkc2NvcGUudGV4dCkucmVwbGFjZSgvJTIwL2csICcrJyk7XG4gICAgICAgICB2YXIgbXlVcmwgPSAgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvJytcbiAgICAgICAgICAgICAgICAgICAgICAnc2VhcmNoP3BhcnQ9c25pcHBldCcrXG4gICAgICAgICAgICAgICAgICAgICAgJyZ0eXBlPXZpZGVvJytcbiAgICAgICAgICAgICAgICAgICAgICAnJnE9JytcbiAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hUZXh0K1xuICAgICAgICAgICAgICAgICAgICAgICcma2V5PScrXG4gICAgICAgICAgICAgICAgICAgICAgWW91VHViZUFwaUtleVNlcnZpY2UuYXBpS2V5KCk7XG4gICAgICAgICRodHRwKHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogbXlVcmxcblxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcblxuICAgICAgICAgIHNldFNlYXJjaFJlc3VsdHMocmVzcG9uc2UuZGF0YS5pdGVtcyk7XG5cbiAgICAgICAgfSxmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5nZXRVcmwgPSBmdW5jdGlvbih2aWRlbykge1xuICAgICAgcmV0dXJuIFwiLy93d3cueW91dHViZS5jb20vZW1iZWQvXCIrdmlkZW8uaWQudmlkZW9JZCtcIj9lbmFibGVqc2FwaT0xXCI7XG4gICAgfTtcblxuICAgICRzY29wZS50cnVzdFNyYyA9IGZ1bmN0aW9uKHNyYykge1xuICAgICAgcmV0dXJuICRzY2UudHJ1c3RBc1Jlc291cmNlVXJsKHNyYyk7XG4gICAgfTtcblxuICAgICRzY29wZS50b2dnbGVNZW51ID0gZnVuY3Rpb24odmlkZW9JZCkge1xuICAgICAgYW5ndWxhci5lbGVtZW50KCd1bCMnK3ZpZGVvSWQpLnRvZ2dsZShcInNsb3dcIik7XG4gICAgfTtcblxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xuXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAkc2NvcGUudmlkZW9zLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICB2YXIgaWQgPSAndmlkLScrKGkrMSk7XG4gICAgICAgICAgdmFyIHZpZFBsYXllck9iaiA9IG5ldyBZVC5QbGF5ZXIoaWQsIHtcbiAgICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICdvblN0YXRlQ2hhbmdlJzogJHNjb3BlLm9uUGxheWVyU3RhdGVDaGFuZ2VcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH0pO1xuICAgICAgICAgICB2aWRBcnJheS5wdXNoKHZpZFBsYXllck9iaik7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAkc2NvcGUuJG9uKCduZ1JlcGVhdEZpbmlzaGVkJywgZnVuY3Rpb24obmdSZXBlYXRGaW5pc2hlZEV2ZW50KSB7XG5cbiAgICAgICBjcmVhdGVQbGF5ZXIoKTtcbiAgICB9KTtcblxuICAgICRzY29wZS5vblBsYXllclJlYWR5ID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgZXZlbnQudGFyZ2V0LnBsYXlWaWRlbygpO1xuICAgIH07XG5cbiAgICAkc2NvcGUub25QbGF5ZXJTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgaWYoZXZlbnQuZGF0YSA9PSBZVC5QbGF5ZXJTdGF0ZS5QTEFZSU5HKSB7XG4gICAgICAgICAgc2VhcmNoVmlkTG9naWMoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNlYXJjaFZpZExvZ2ljKHZpZGVvKSB7XG5cbiAgICAgIGlmKCRzY29wZS5jdXJyZW50U29uZyAmJiAkc2NvcGUuaXNQbGF5aW5nKSB7XG4gICAgICAgICRzY29wZS5wYXVzZSgpO1xuICAgICAgfVxuXG4gICAgICBpZihzZWFyY2hDdXJyZW50U29uZyAmJiAoc2VhcmNoQ3VycmVudFNvbmcgIT09IHZpZGVvKSkge1xuICAgICAgICBzZWFyY2hDdXJyZW50U29uZy5wYXVzZVZpZGVvKCk7XG4gICAgICAgIHNlYXJjaEN1cnJlbnRTb25nID0gdmlkZW87XG4gICAgICB9IGVsc2UgaWYoc2VhcmNoQ3VycmVudFNvbmcgJiYgKHNlYXJjaEN1cnJlbnRTb25nID09IHZpZGVvKSkge1xuICAgICAgICBzZWFyY2hDdXJyZW50U29uZy5wbGF5VmlkZW8oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlYXJjaEN1cnJlbnRTb25nID0gdmlkZW87XG4gICAgICAgIHNlYXJjaEN1cnJlbnRTb25nLnBsYXlWaWRlbygpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcFZpZGVvKCkge1xuXG4gICAgICBwbGF5ZXIuc3RvcFZpZGVvKCk7XG4gICAgfVxuXG4gICAgJHNjb3BlLnBsYXkgPSBmdW5jdGlvbihzb25nKSB7XG5cbiAgICAgICAgdmFyIHZpZEhlaWdodCA9IGFuZ3VsYXIuZWxlbWVudCgnZGl2LnZpZGVvJykuaGVpZ2h0KCk7XG4gICAgICAgIHZhciB2aWRXaWR0aCA9IGFuZ3VsYXIuZWxlbWVudCgnZGl2LnZpZGVvJykud2lkdGgoKTtcbiAgICAgICAgdmFyIGluaXRpYWxTb25nID0gJHNjb3BlLmN1cnJlbnRTb25nIHx8ICRzY29wZS5zb25ncygpWzBdO1xuICAgICAgICB2YXIgdmlkUGxheSA9IHNvbmcgfHwgaW5pdGlhbFNvbmc7XG5cblxuICAgICAgICAvLyBzdG9wcyBwbGF5ZXIgcGxheWluZyBpbiBzZWFyY2ggcmVzdWx0cyB3aGVuIHBsYXlpbmcgYW5vdGhlciBzb25nIGluIHBsYXlsaXN0XG5cbiAgICAgICAgaWYoc2VhcmNoQ3VycmVudFNvbmcpIHtcbiAgICAgICAgICBzZWFyY2hDdXJyZW50U29uZy5zdG9wVmlkZW8oKTtcbiAgICAgICAgICBzZWFyY2hDdXJyZW50U29uZyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAvLyBpZiB0aGVyZSdzIG5vIGN1cnJlbnRTb25nIGNyZWF0ZSB5b3V0dWJlIHBsYXllclxuICAgICAgICBpZighJHNjb3BlLmN1cnJlbnRTb25nKSB7XG5cbiAgICAgICAgIHBsYXllciA9IG5ldyBZVC5QbGF5ZXIoJ2lmcmFtZS11dHViZS1wbGF5ZXInLCB7XG4gICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICB3aWR0aDogICcxMDAlJyxcbiAgICAgICAgICAgdmlkZW9JZDogdmlkUGxheS51cmwsXG4gICAgICAgICAgIHBsYXllclZhcnM6IHsnY29udHJvbHMnOiAwLCAncmVsJzogMH0sXG4gICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICdvblJlYWR5JzogJHNjb3BlLm9uUGxheWVyUmVhZHlcbiAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgICAgfSBlbHNlIGlmKHNvbmcgPT0gJHNjb3BlLmN1cnJlbnRTb25nIHx8ICgkc2NvcGUuY3VycmVudFNvbmcgJiYgIXNvbmcpKSB7XG4gICAgICAgICAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHBsYXllci5sb2FkVmlkZW9CeUlkKHtcbiAgICAgICAgICAgICd2aWRlb0lkJzogdmlkUGxheS51cmxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRzY29wZS5jdXJyZW50U29uZy5wbGF5aW5nID0gbnVsbDtcbiAgICAgICB9XG5cbiAgICAgICAkc2NvcGUuY3VycmVudFNvbmcgPSB2aWRQbGF5O1xuICAgICAgICRzY29wZS5pc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgICRzY29wZS5jdXJyZW50U29uZy5wbGF5aW5nID0gdHJ1ZTtcblxuICAgICAgIGlmKHNvbmcpIHtcbiAgICAgICAgIHNvbmcucGxheWluZyA9IHRydWU7XG4gICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUucGF1c2UgPSBmdW5jdGlvbihzb25nKSB7XG5cbiAgICAgICAkc2NvcGUuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgcGxheWVyLnBhdXNlVmlkZW8oKTtcbiAgICAgICBpZihzb25nKXtcbiAgICAgICAgIHNvbmcucGxheWluZyA9IG51bGw7XG4gICAgICAgfSBlbHNlIHtcbiAgICAgICAgICRzY29wZS5jdXJyZW50U29uZy5wbGF5aW5nID0gbnVsbDtcbiAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFNvbmdJbmRleChzb25nKSB7XG4gICAgICByZXR1cm4gc29uZ3MoKS5pbmRleE9mKHNvbmcpO1xuICAgIH1cblxuICAgICRzY29wZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBzb25nc0FycmF5ID0gJHNjb3BlLnNvbmdzKCk7XG4gICAgICB2YXIgbGFzdEluZGV4ID0gc29uZ3NBcnJheS5sZW5ndGggLSAxO1xuICAgICAgdmFyIGluZGV4T2ZDdXJyZW50U29uZyA9IHNvbmdzQXJyYXkuaW5kZXhPZigkc2NvcGUuY3VycmVudFNvbmcpO1xuICAgICAgdmFyIHNvbmdUb1BsYXkgPSBudWxsO1xuXG4gICAgICBpZigkc2NvcGUuY3VycmVudFNvbmcpIHtcbiAgICAgICAgaWYoaW5kZXhPZkN1cnJlbnRTb25nIDwgbGFzdEluZGV4ICkge1xuXG4gICAgICAgICAgc29uZ1RvUGxheSAgPSBzb25nc0FycmF5W2luZGV4T2ZDdXJyZW50U29uZyArIDFdO1xuXG4gICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgIGluZGV4T2ZDdXJyZW50U29uZyA9IDA7XG4gICAgICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtpbmRleE9mQ3VycmVudFNvbmddO1xuICAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc29uZ1RvUGxheSAgPSBzb25nc0FycmF5WzBdO1xuICAgICAgfVxuXG4gICAgICAkc2NvcGUucGxheShzb25nVG9QbGF5KTtcbiAgIH07XG5cbiAgICRzY29wZS5wcmV2aW91cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgIHZhciBzb25nc0FycmF5ID0gJHNjb3BlLnNvbmdzKCk7XG4gICAgIHZhciBsYXN0SW5kZXggPSBzb25nc0FycmF5Lmxlbmd0aCAtIDE7XG4gICAgIHZhciBpbmRleE9mQ3VycmVudFNvbmcgPSBzb25nc0FycmF5LmluZGV4T2YoJHNjb3BlLmN1cnJlbnRTb25nKTtcbiAgICAgdmFyIHNvbmdUb1BsYXkgPSBudWxsO1xuXG4gICAgIGlmKCRzY29wZS5jdXJyZW50U29uZykge1xuICAgICAgIGlmKGluZGV4T2ZDdXJyZW50U29uZyA+IDAgKSB7XG5cbiAgICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtpbmRleE9mQ3VycmVudFNvbmcgLSAxXTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgaW5kZXhPZkN1cnJlbnRTb25nID0gbGFzdEluZGV4O1xuICAgICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtpbmRleE9mQ3VycmVudFNvbmddO1xuICAgICAgICB9XG4gICAgIH0gZWxzZSB7XG4gICAgICAgc29uZ1RvUGxheSAgPSBzb25nc0FycmF5W2xhc3RJbmRleF07XG4gICAgIH1cblxuICAgICAkc2NvcGUucGxheShzb25nVG9QbGF5KTtcbiAgICB9O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvaG9tZS5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIE5hdkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRyb290U2NvcGUsICRhdXRoLCAkbG9jYXRpb24sIGxvY2FsU3RvcmFnZVNlcnZpY2UsICRodHRwLCBBcGlTeW5jLCBTb25nKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICBmdW5jdGlvbiBjaGFuZ2VOYXZDb2xvcigpe1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnY29sb3InLCdibGFjaycpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ3doaXRlJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ25hdi5uYXYtYmFyIHVsJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywnd2hpdGUnKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgndWwubmF2LW1lbnUgYScpLmNzcygnY29sb3InLCdibGFjaycpO1xuICAgIH1cblxuICAgICRzY29wZS5pc19vcGVuID0gZmFsc2U7XG5cbiAgICAkc2NvcGUucGxheWxpc3RzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gQXBpU3luYy5nZXRQbGF5bGlzdHMoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnNldFBsYXlsaXN0ID0gZnVuY3Rpb24ocGxheWxpc3QpIHtcblxuICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnZGl2LnBsYXlsaXN0LWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnb3ZlcmZsb3cnKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2N1cnJlbnRQbGF5bGlzdCcsIHBsYXlsaXN0KTtcbiAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50UGxheWxpc3QgPSAgbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2N1cnJlbnRQbGF5bGlzdCcpO1xuXG4gICAgICAgIGlmKCRyb290U2NvcGUuY3VycmVudFBsYXlsaXN0KSB7XG5cbiAgICAgICAgICBTb25nLnF1ZXJ5KHtzb25nSWQ6ICcnfSx7cGxheWxpc3RJZDogJHJvb3RTY29wZS5jdXJyZW50UGxheWxpc3QuaWR9KS50aGVuKGZ1bmN0aW9uKHNvbmdzKXtcblxuICAgICAgICAgICAgIEFwaVN5bmMuc2V0U29uZ3Moc29uZ3MpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnBhZ2VSZWRpcmVjdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICBpZigkcm9vdFNjb3BlLnVzZXIuaWQpIHtcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy91c2Vycy8nKyAkcm9vdFNjb3BlLnVzZXIuaWQpO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuc2lnbk91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgJGF1dGguc2lnbk91dCgpO1xuICAgIH07XG5cbiAgICAkcm9vdFNjb3BlLiRvbignYXV0aDpsb2dvdXQtc3VjY2VzcycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAkc2NvcGUudXNlclNpZ25lZEluID0gbnVsbDtcbiAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2UucmVtb3ZlKCdjdXJyZW50VXNlcicpO1xuICAgICAgY2hhbmdlTmF2Q29sb3IoKTtcbiAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUudG9nZ2xlTWVudSA9IGZ1bmN0aW9uKGV2ZW50LCB4X2lkKSB7XG5cbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI21vYmlsZS1oYW0tYmxhY2snKS50b2dnbGVDbGFzcygnaGlkZScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCcjbW9iaWxlLWhhbS13aGl0ZScpLnRvZ2dsZUNsYXNzKCdoaWRlJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJyNtb2JpbGUteC1ibGFjaycpLnRvZ2dsZUNsYXNzKCdkaXNwbGF5Jyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJyNtb2JpbGUteC13aGl0ZScpLnRvZ2dsZUNsYXNzKCdkaXNwbGF5Jyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ2RpdiMnKyB4X2lkKS50b2dnbGVDbGFzcygnZGlzcGxheScpO1xuXG4gICAgfTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL25hdi5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIFJlZ2lzdHJhdGlvbnNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkYXV0aCwgJHJvb3RTY29wZSwgJGxvY2F0aW9uLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlKXtcbiAgICAnbmdJbmplY3QnO1xuICAgIFxuICAgIHZhciBzZXRVc2VyID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2N1cnJlbnRVc2VyJywgb2JqKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnN1Ym1pdFJlZ2lzdHJhdGlvbiA9IGZ1bmN0aW9uKHJlZ2lzdHJhdGlvbkZvcm0pIHtcblxuICAgICAgJGF1dGguc3VibWl0UmVnaXN0cmF0aW9uKHJlZ2lzdHJhdGlvbkZvcm0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgJGF1dGguc3VibWl0TG9naW4oe1xuICAgICAgICAgICAgZW1haWw6IHJlZ2lzdHJhdGlvbkZvcm0uZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogcmVnaXN0cmF0aW9uRm9ybS5wYXNzd29yZFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAkcm9vdFNjb3BlLiRvbignYXV0aDpsb2dpbi1zdWNjZXNzJywgZnVuY3Rpb24oZXYsIHVzZXIpIHtcblxuICAgICAgc2V0VXNlcih1c2VyKTtcbiAgICAgICRsb2NhdGlvbi5wYXRoKCcvdXNlcnMvJysgdXNlci5pZCk7XG5cbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL3JlZ2lzdHJhdGlvbnMuY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBTZXNzaW9uc0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRhdXRoLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sIFVzZXIsIFBsYXlsaXN0LCBsb2NhbFN0b3JhZ2VTZXJ2aWNlKXtcbiAgICAnbmdJbmplY3QnO1xuICAgICRzY29wZS5lcnJvciA9IG51bGw7XG5cbiAgICB2YXIgc2V0VXNlciA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdjdXJyZW50VXNlcicsIG9iaik7XG4gICAgfTtcblxuXG4gICAkc2NvcGUuc3VibWl0TG9naW4gPSBmdW5jdGlvbihsb2dpbkZvcm0pIHtcbiAgICAgJGF1dGguc3VibWl0TG9naW4obG9naW5Gb3JtKS50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcblxuICAgICAgICAgICAgIHNldFVzZXIodXNlcik7XG4gICAgIH0pO1xuICAgfTtcblxuICAgJHJvb3RTY29wZS4kb24oJ2F1dGg6bG9naW4tc3VjY2VzcycsIGZ1bmN0aW9uKGV2LCB1c2VyKSB7XG5cbiAgICAgJGxvY2F0aW9uLnBhdGgoJy91c2Vycy8nKyB1c2VyLmlkKTtcblxuICAgfSk7XG4gICAkcm9vdFNjb3BlLiRvbignYXV0aDpsb2dpbi1lcnJvcicsIGZ1bmN0aW9uKGV2LCByZWFzb24pIHtcbiAgICAgJHNjb3BlLmVycm9yID0gcmVhc29uLmVycm9yc1swXTtcbiAgIH0pO1xuXG4gICBVc2VyLnF1ZXJ5KHtwbGF5bGlzdElkOiAnJ30se3VzZXJJZDogMX0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0cyl7XG4gICAgICRzY29wZS51c2VycyA9IHJlc3VsdHM7XG4gICB9KTtcblxuXG4gICAkc2NvcGUuc2lnbk91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAkYXV0aC5zaWduT3V0KCk7XG4gICB9O1xuXG4gICAkcm9vdFNjb3BlLiRvbignYXV0aDpsb2dvdXQtc3VjY2VzcycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL3Nlc3Npb25zLmNvbnRyb2xsZXIuanMiLCJleHBvcnQgY2xhc3MgQnViYmxlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRyb290U2NvcGUsJHNjb3BlLCR3aW5kb3csICRkb2N1bWVudCkge1xuICAnbmdJbmplY3QnO1xuICB2YXIgbGF2YTA7XG4gIHZhciBnZTFkb290ID0ge1xuICAgIHNjcmVlbjoge1xuICAgICAgZWxlbTogICAgIG51bGwsXG4gICAgICBjYWxsYmFjazogbnVsbCxcbiAgICAgIGN0eDogICAgICBudWxsLFxuICAgICAgd2lkdGg6ICAgIDAsXG4gICAgICBoZWlnaHQ6ICAgMCxcbiAgICAgIGxlZnQ6ICAgICAwLFxuICAgICAgdG9wOiAgICAgIDAsXG4gICAgICBpbml0OiBmdW5jdGlvbiAoaWQsIGNhbGxiYWNrLCBpbml0UmVzKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrIHx8IG51bGw7XG4gICAgICAgIGlmICh0aGlzLmVsZW0udGFnTmFtZSA9PSBcIkNBTlZBU1wiKSB0aGlzLmN0eCA9IHRoaXMuZWxlbS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZWxlbS5vbnNlbGVjdHN0YXJ0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgdGhpcy5lbGVtLm9uZHJhZyAgICAgICAgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICBpbml0UmVzICYmIHRoaXMucmVzaXplKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIHJlc2l6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbyA9IHRoaXMuZWxlbTtcbiAgICAgICAgdGhpcy53aWR0aCAgPSBvLm9mZnNldFdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IG8ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBmb3IgKHRoaXMubGVmdCA9IDAsIHRoaXMudG9wID0gMDsgbyAhPSBudWxsOyBvID0gby5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICB0aGlzLmxlZnQgKz0gby5vZmZzZXRMZWZ0O1xuICAgICAgICAgIHRoaXMudG9wICArPSBvLm9mZnNldFRvcDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jdHgpIHtcbiAgICAgICAgICB0aGlzLmVsZW0ud2lkdGggID0gdGhpcy53aWR0aDtcbiAgICAgICAgICB0aGlzLmVsZW0uaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxsYmFjayAmJiB0aGlzLmNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIFBvaW50IGNvbnN0cnVjdG9yXG4gIHZhciBQb2ludCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5tYWduaXR1ZGUgPSB4ICogeCArIHkgKiB5O1xuICAgIHRoaXMuY29tcHV0ZWQgPSAwO1xuICAgIHRoaXMuZm9yY2UgPSAwO1xuICB9O1xuICBQb2ludC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54ICsgcC54LCB0aGlzLnkgKyBwLnkpO1xuICB9O1xuXG4gIC8vIEJhbGwgY29uc3RydWN0b3JcbiAgdmFyIEJhbGwgPSBmdW5jdGlvbihwYXJlbnQpIHtcbiAgICB2YXIgbWluID0gLjE7XG4gICAgdmFyIG1heCA9IDEuNTtcbiAgICB0aGlzLnZlbCA9IG5ldyBQb2ludChcbiAgICAgIChNYXRoLnJhbmRvbSgpID4gMC41ID8gMSA6IC0xKSAqICgwLjIgKyBNYXRoLnJhbmRvbSgpICogMC4wMjUpLCAoTWF0aC5yYW5kb20oKSA+IDAuNSA/IDEgOiAtMSkgKiAoMC4yICsgTWF0aC5yYW5kb20oKSlcbiAgICApO1xuICAgIHRoaXMucG9zID0gbmV3IFBvaW50KFxuICAgICAgcGFyZW50LndpZHRoICogMC4yICsgTWF0aC5yYW5kb20oKSAqIHBhcmVudC53aWR0aCAqIDAuNixcbiAgICAgIHBhcmVudC5oZWlnaHQgKiAwLjIgKyBNYXRoLnJhbmRvbSgpICogcGFyZW50LmhlaWdodCAqIDAuNlxuICAgICk7XG4gICAgdGhpcy5zaXplID0gKHBhcmVudC53aCAvIDE1KSArICggTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluICkgKiAocGFyZW50LndoIC8gMTUpO1xuICAgIHRoaXMud2lkdGggPSBwYXJlbnQud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBwYXJlbnQuaGVpZ2h0O1xuICB9O1xuXG4gIC8vIG1vdmUgYmFsbHNcbiAgQmFsbC5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gYm91bmNlIGJvcmRlcnNcbiAgICBpZiAodGhpcy5wb3MueCA+PSB0aGlzLndpZHRoIC0gdGhpcy5zaXplKSB7XG4gICAgICBpZiAodGhpcy52ZWwueCA+IDApIHRoaXMudmVsLnggPSAtdGhpcy52ZWwueDtcbiAgICAgIHRoaXMucG9zLnggPSB0aGlzLndpZHRoIC0gdGhpcy5zaXplO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wb3MueCA8PSB0aGlzLnNpemUpIHtcbiAgICAgIGlmICh0aGlzLnZlbC54IDwgMCkgdGhpcy52ZWwueCA9IC10aGlzLnZlbC54O1xuICAgICAgdGhpcy5wb3MueCA9IHRoaXMuc2l6ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wb3MueSA+PSB0aGlzLmhlaWdodCAtIHRoaXMuc2l6ZSkge1xuICAgICAgaWYgKHRoaXMudmVsLnkgPiAwKSB0aGlzLnZlbC55ID0gLXRoaXMudmVsLnk7XG4gICAgICB0aGlzLnBvcy55ID0gdGhpcy5oZWlnaHQgLSB0aGlzLnNpemU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBvcy55IDw9IHRoaXMuc2l6ZSkge1xuICAgICAgaWYgKHRoaXMudmVsLnkgPCAwKSB0aGlzLnZlbC55ID0gLXRoaXMudmVsLnk7XG4gICAgICB0aGlzLnBvcy55ID0gdGhpcy5zaXplO1xuICAgIH1cblxuICAgIC8vIHZlbG9jaXR5XG4gICAgdGhpcy5wb3MgPSB0aGlzLnBvcy5hZGQodGhpcy52ZWwpO1xuXG4gIH07XG5cbiAgLy8gbGF2YWxhbXAgY29uc3RydWN0b3JcbiAgdmFyIExhdmFMYW1wID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgbnVtQmFsbHMsIGMwLCBjMSkge1xuICAgIHRoaXMuc3RlcCA9IDU7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMud2ggPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KTtcbiAgICB0aGlzLnN4ID0gTWF0aC5mbG9vcih0aGlzLndpZHRoIC8gdGhpcy5zdGVwKTtcbiAgICB0aGlzLnN5ID0gTWF0aC5mbG9vcih0aGlzLmhlaWdodCAvIHRoaXMuc3RlcCk7XG4gICAgdGhpcy5wYWludCA9IGZhbHNlO1xuICAgIHRoaXMubWV0YUZpbGwgPSBjcmVhdGVSYWRpYWxHcmFkaWVudCh3aWR0aCwgaGVpZ2h0LCB3aWR0aCwgYzAsIGMxKTtcbiAgICB0aGlzLnBseCA9IFswLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAwLCAwLCAwXTtcbiAgICB0aGlzLnBseSA9IFswLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAxXTtcbiAgICB0aGlzLm1zY2FzZXMgPSBbMCwgMywgMCwgMywgMSwgMywgMCwgMywgMiwgMiwgMCwgMiwgMSwgMSwgMF07XG4gICAgdGhpcy5peCA9IFsxLCAwLCAtMSwgMCwgMCwgMSwgMCwgLTEsIC0xLCAwLCAxLCAwLCAwLCAxLCAxLCAwLCAwLCAwLCAxLCAxXTtcbiAgICB0aGlzLmdyaWQgPSBbXTtcbiAgICB0aGlzLmJhbGxzID0gW107XG4gICAgdGhpcy5pdGVyID0gMDtcbiAgICB0aGlzLnNpZ24gPSAxO1xuXG4gICAgLy8gaW5pdCBncmlkXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAodGhpcy5zeCArIDIpICogKHRoaXMuc3kgKyAyKTsgaSsrKSB7XG4gICAgICB0aGlzLmdyaWRbaV0gPSBuZXcgUG9pbnQoXG4gICAgICAgIChpICUgKHRoaXMuc3ggKyAyKSkgKiB0aGlzLnN0ZXAsIChNYXRoLmZsb29yKGkgLyAodGhpcy5zeCArIDIpKSkgKiB0aGlzLnN0ZXBcbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgbWV0YWJhbGxzXG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCAxMDsgaysrKSB7XG4gICAgICB0aGlzLmJhbGxzW2tdID0gbmV3IEJhbGwodGhpcyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGNvbXB1dGUgY2VsbCBmb3JjZVxuICBMYXZhTGFtcC5wcm90b3R5cGUuY29tcHV0ZUZvcmNlID0gZnVuY3Rpb24oeCwgeSwgaWR4KSB7XG5cbiAgICB2YXIgZm9yY2U7XG4gICAgdmFyIGlkID0gaWR4IHx8IHggKyB5ICogKHRoaXMuc3ggKyAyKTtcblxuICAgIGlmICh4ID09PSAwIHx8IHkgPT09IDAgfHwgeCA9PT0gdGhpcy5zeCB8fCB5ID09PSB0aGlzLnN5KSB7XG4gICAgICBmb3JjZSA9IDAuMDYgKiB0aGlzLnNpZ247XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcmNlID0gMDtcbiAgICAgIHZhciBjZWxsID0gdGhpcy5ncmlkW2lkXTtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHZhciBiYWxsO1xuICAgICAgd2hpbGUgKGJhbGwgPSB0aGlzLmJhbGxzW2krK10pIHtcbiAgICAgICAgZm9yY2UgKz0gYmFsbC5zaXplICogYmFsbC5zaXplIC8gKC0yICogY2VsbC54ICogYmFsbC5wb3MueCAtIDIgKiBjZWxsLnkgKiBiYWxsLnBvcy55ICsgYmFsbC5wb3MubWFnbml0dWRlICsgY2VsbC5tYWduaXR1ZGUpO1xuICAgICAgfVxuICAgICAgZm9yY2UgKj0gdGhpcy5zaWduXG4gICAgfVxuICAgIHRoaXMuZ3JpZFtpZF0uZm9yY2UgPSBmb3JjZTtcbiAgICByZXR1cm4gZm9yY2U7XG4gIH07XG5cbiAgLy8gY29tcHV0ZSBjZWxsXG4gIExhdmFMYW1wLnByb3RvdHlwZS5tYXJjaGluZ1NxdWFyZXMgPSBmdW5jdGlvbihuZXh0KSB7XG4gICAgdmFyIHggPSBuZXh0WzBdO1xuICAgIHZhciB5ID0gbmV4dFsxXTtcbiAgICB2YXIgcGRpciA9IG5leHRbMl07XG4gICAgdmFyIGlkID0geCArIHkgKiAodGhpcy5zeCArIDIpO1xuICAgIGlmICh0aGlzLmdyaWRbaWRdLmNvbXB1dGVkID09PSB0aGlzLml0ZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGRpciwgbXNjYXNlID0gMDtcblxuICAgIC8vIG5laWdoYm9ycyBmb3JjZVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICB2YXIgaWRuID0gKHggKyB0aGlzLml4W2kgKyAxMl0pICsgKHkgKyB0aGlzLml4W2kgKyAxNl0pICogKHRoaXMuc3ggKyAyKTtcbiAgICAgIHZhciBmb3JjZSA9IHRoaXMuZ3JpZFtpZG5dLmZvcmNlO1xuICAgICAgaWYgKChmb3JjZSA+IDAgJiYgdGhpcy5zaWduIDwgMCkgfHwgKGZvcmNlIDwgMCAmJiB0aGlzLnNpZ24gPiAwKSB8fCAhZm9yY2UpIHtcbiAgICAgICAgLy8gY29tcHV0ZSBmb3JjZSBpZiBub3QgaW4gYnVmZmVyXG4gICAgICAgIGZvcmNlID0gdGhpcy5jb21wdXRlRm9yY2UoXG4gICAgICAgICAgeCArIHRoaXMuaXhbaSArIDEyXSxcbiAgICAgICAgICB5ICsgdGhpcy5peFtpICsgMTZdLFxuICAgICAgICAgIGlkblxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKE1hdGguYWJzKGZvcmNlKSA+IDEpIG1zY2FzZSArPSBNYXRoLnBvdygyLCBpKTtcbiAgICB9XG4gICAgaWYgKG1zY2FzZSA9PT0gMTUpIHtcbiAgICAgIC8vIGluc2lkZVxuICAgICAgcmV0dXJuIFt4LCB5IC0gMSwgZmFsc2VdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhbWJpZ3VvdXMgY2FzZXNcbiAgICAgIGlmIChtc2Nhc2UgPT09IDUpIGRpciA9IChwZGlyID09PSAyKSA/IDMgOiAxO1xuICAgICAgZWxzZSBpZiAobXNjYXNlID09PSAxMCkgZGlyID0gKHBkaXIgPT09IDMpID8gMCA6IDI7XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gbG9va3VwXG4gICAgICAgIGRpciA9IHRoaXMubXNjYXNlc1ttc2Nhc2VdO1xuICAgICAgICB0aGlzLmdyaWRbaWRdLmNvbXB1dGVkID0gdGhpcy5pdGVyO1xuICAgICAgfVxuICAgICAgLy8gZHJhdyBsaW5lXG4gICAgICB2YXIgaXggPSB0aGlzLnN0ZXAgLyAoXG4gICAgICAgICAgTWF0aC5hYnMoTWF0aC5hYnModGhpcy5ncmlkWyh4ICsgdGhpcy5wbHhbNCAqIGRpciArIDJdKSArICh5ICsgdGhpcy5wbHlbNCAqIGRpciArIDJdKSAqICh0aGlzLnN4ICsgMildLmZvcmNlKSAtIDEpIC9cbiAgICAgICAgICBNYXRoLmFicyhNYXRoLmFicyh0aGlzLmdyaWRbKHggKyB0aGlzLnBseFs0ICogZGlyICsgM10pICsgKHkgKyB0aGlzLnBseVs0ICogZGlyICsgM10pICogKHRoaXMuc3ggKyAyKV0uZm9yY2UpIC0gMSkgKyAxXG4gICAgICAgICk7XG4gICAgICBjdHgubGluZVRvKFxuICAgICAgICB0aGlzLmdyaWRbKHggKyB0aGlzLnBseFs0ICogZGlyXSkgKyAoeSArIHRoaXMucGx5WzQgKiBkaXJdKSAqICh0aGlzLnN4ICsgMildLnggKyB0aGlzLml4W2Rpcl0gKiBpeCxcbiAgICAgICAgdGhpcy5ncmlkWyh4ICsgdGhpcy5wbHhbNCAqIGRpciArIDFdKSArICh5ICsgdGhpcy5wbHlbNCAqIGRpciArIDFdKSAqICh0aGlzLnN4ICsgMildLnkgKyB0aGlzLml4W2RpciArIDRdICogaXhcbiAgICAgICk7XG4gICAgICB0aGlzLnBhaW50ID0gdHJ1ZTtcbiAgICAgIC8vIG5leHRcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHggKyB0aGlzLml4W2RpciArIDRdLFxuICAgICAgICB5ICsgdGhpcy5peFtkaXIgKyA4XSxcbiAgICAgICAgZGlyXG4gICAgICBdO1xuICAgIH1cbiAgfTtcblxuICBMYXZhTGFtcC5wcm90b3R5cGUucmVuZGVyTWV0YWJhbGxzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGkgPSAwLCBiYWxsO1xuICAgIHdoaWxlIChiYWxsID0gdGhpcy5iYWxsc1tpKytdKSBiYWxsLm1vdmUoKTtcbiAgICAvLyByZXNldCBncmlkXG4gICAgdGhpcy5pdGVyKys7XG4gICAgdGhpcy5zaWduID0gLXRoaXMuc2lnbjtcbiAgICB0aGlzLnBhaW50ID0gZmFsc2U7XG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMubWV0YUZpbGw7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIC8vIGNvbXB1dGUgbWV0YWJhbGxzXG4gICAgaSA9IDA7XG4gICAgLy9jdHguc2hhZG93Qmx1ciA9IDUwO1xuICAgIC8vY3R4LnNoYWRvd0NvbG9yID0gXCJncmVlblwiO1xuICAgIHdoaWxlIChiYWxsID0gdGhpcy5iYWxsc1tpKytdKSB7XG4gICAgICAvLyBmaXJzdCBjZWxsXG4gICAgICB2YXIgbmV4dCA9IFtcbiAgICAgICAgTWF0aC5yb3VuZChiYWxsLnBvcy54IC8gdGhpcy5zdGVwKSxcbiAgICAgICAgTWF0aC5yb3VuZChiYWxsLnBvcy55IC8gdGhpcy5zdGVwKSwgZmFsc2VcbiAgICAgIF07XG4gICAgICAvLyBtYXJjaGluZyBzcXVhcmVzXG4gICAgICBkbyB7XG4gICAgICAgIG5leHQgPSB0aGlzLm1hcmNoaW5nU3F1YXJlcyhuZXh0KTtcbiAgICAgIH0gd2hpbGUgKG5leHQpO1xuICAgICAgLy8gZmlsbCBhbmQgY2xvc2UgcGF0aFxuICAgICAgaWYgKHRoaXMucGFpbnQpIHtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMucGFpbnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gZ3JhZGllbnRzXG4gIHZhciBjcmVhdGVSYWRpYWxHcmFkaWVudCA9IGZ1bmN0aW9uKHcsIGgsIHIsIGMwLCBjMSkge1xuICAgIHZhciBncmFkaWVudCA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudChcbiAgICAgIHcgLyAxLCBoIC8gMSwgMCxcbiAgICAgIHcgLyAxLCBoIC8gMSwgclxuICAgICk7XG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIGMwKTtcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgYzEpO1xuICAgIHJldHVybiBncmFkaWVudDtcbiAgfTtcblxuICAvLyBtYWluIGxvb3BcbiAgdmFyIHJ1biA9IGZ1bmN0aW9uKHN0YXRlKSB7XG5cbiAgICBpZihzdGF0ZSkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJ1bik7XG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHNjcmVlbi53aWR0aCwgc2NyZWVuLmhlaWdodCk7XG4gICAgICBsYXZhMC5yZW5kZXJNZXRhYmFsbHMoKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gY2FudmFzXG4gIHZhciBzY3JlZW4gPSBnZTFkb290LnNjcmVlbi5pbml0KFwiYnViYmxlXCIsIG51bGwsIHRydWUpLFxuICAgICAgY3R4ID0gc2NyZWVuLmN0eDtcbiAgICAgIHNjcmVlbi5yZXNpemUoKTtcbiAgLy8gY3JlYXRlIExhdmFMYW1wc1xuICBsYXZhMCA9IG5ldyBMYXZhTGFtcChzY3JlZW4ud2lkdGgsIHNjcmVlbi5oZWlnaHQsIDEwMCwgXCIjZjUxMmI1XCIsIFwiIzVmMjViOFwiKTtcblxuICAgIHJ1bihhbmd1bGFyLmVsZW1lbnQoJyNidWJibGUnKS5pcygnOnZpc2libGUnKSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbigpe1xuICAgICAgaWYoYW5ndWxhci5lbGVtZW50KCcjYnViYmxlJykuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgbGF2YTAgPSBuZXcgTGF2YUxhbXAoc2NyZWVuLndpZHRoLCBzY3JlZW4uaGVpZ2h0LCAxMDAsIFwiI2Y1MTJiNVwiLCBcIiM1ZjI1YjhcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9idWJibGUuY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBHaXRodWJDb250cmlidXRvclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciAoJGxvZywgJGh0dHApIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgdGhpcy5hcGlIb3N0ID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvU3dpaXAvZ2VuZXJhdG9yLWd1bHAtYW5ndWxhcic7XG4gIH1cblxuICBnZXRDb250cmlidXRvcnMobGltaXQ9MzApIHtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQodGhpcy5hcGlIb3N0ICsgJy9jb250cmlidXRvcnM/cGVyX3BhZ2U9JyArIGxpbWl0KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy4kbG9nLmVycm9yKCdYSFIgRmFpbGVkIGZvciBnZXRDb250cmlidXRvcnMuXFxuJyArIGFuZ3VsYXIudG9Kc29uKGVycm9yLmRhdGEsIHRydWUpKTtcbiAgICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvZ2l0aHViQ29udHJpYnV0b3IvZ2l0aHViQ29udHJpYnV0b3Iuc2VydmljZS5qcyIsImV4cG9ydCBjbGFzcyBXZWJEZXZUZWNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLmRhdGEgPSBbXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdBbmd1bGFySlMnLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vYW5ndWxhcmpzLm9yZy8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnSFRNTCBlbmhhbmNlZCBmb3Igd2ViIGFwcHMhJyxcbiAgICAgICAgJ2xvZ28nOiAnYW5ndWxhci5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQnJvd3NlclN5bmMnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9icm93c2Vyc3luYy5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGltZS1zYXZpbmcgc3luY2hyb25pc2VkIGJyb3dzZXIgdGVzdGluZy4nLFxuICAgICAgICAnbG9nbyc6ICdicm93c2Vyc3luYy5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnR3VscEpTJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vZ3VscGpzLmNvbS8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHN0cmVhbWluZyBidWlsZCBzeXN0ZW0uJyxcbiAgICAgICAgJ2xvZ28nOiAnZ3VscC5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnSmFzbWluZScsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2phc21pbmUuZ2l0aHViLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdCZWhhdmlvci1Ecml2ZW4gSmF2YVNjcmlwdC4nLFxuICAgICAgICAnbG9nbyc6ICdqYXNtaW5lLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdLYXJtYScsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2thcm1hLXJ1bm5lci5naXRodWIuaW8vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1NwZWN0YWN1bGFyIFRlc3QgUnVubmVyIGZvciBKYXZhU2NyaXB0LicsXG4gICAgICAgICdsb2dvJzogJ2thcm1hLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdQcm90cmFjdG9yJyxcbiAgICAgICAgJ3VybCc6ICdodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9wcm90cmFjdG9yJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0VuZCB0byBlbmQgdGVzdCBmcmFtZXdvcmsgZm9yIEFuZ3VsYXJKUyBhcHBsaWNhdGlvbnMgYnVpbHQgb24gdG9wIG9mIFdlYkRyaXZlckpTLicsXG4gICAgICAgICdsb2dvJzogJ3Byb3RyYWN0b3IucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0Jvb3RzdHJhcCcsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2dldGJvb3RzdHJhcC5jb20vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0Jvb3RzdHJhcCBpcyB0aGUgbW9zdCBwb3B1bGFyIEhUTUwsIENTUywgYW5kIEpTIGZyYW1ld29yayBmb3IgZGV2ZWxvcGluZyByZXNwb25zaXZlLCBtb2JpbGUgZmlyc3QgcHJvamVjdHMgb24gdGhlIHdlYi4nLFxuICAgICAgICAnbG9nbyc6ICdib290c3RyYXAucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0FuZ3VsYXIgVUkgQm9vdHN0cmFwJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vYW5ndWxhci11aS5naXRodWIuaW8vYm9vdHN0cmFwLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdCb290c3RyYXAgY29tcG9uZW50cyB3cml0dGVuIGluIHB1cmUgQW5ndWxhckpTIGJ5IHRoZSBBbmd1bGFyVUkgVGVhbS4nLFxuICAgICAgICAnbG9nbyc6ICd1aS1ib290c3RyYXAucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ1Nhc3MgKE5vZGUpJyxcbiAgICAgICAgJ3VybCc6ICdodHRwczovL2dpdGh1Yi5jb20vc2Fzcy9ub2RlLXNhc3MnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnTm9kZS5qcyBiaW5kaW5nIHRvIGxpYnNhc3MsIHRoZSBDIHZlcnNpb24gb2YgdGhlIHBvcHVsYXIgc3R5bGVzaGVldCBwcmVwcm9jZXNzb3IsIFNhc3MuJyxcbiAgICAgICAgJ2xvZ28nOiAnbm9kZS1zYXNzLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdFUzYgKEJhYmVsIGZvcm1lcmx5IDZ0bzUpJyxcbiAgICAgICAgJ3VybCc6ICdodHRwczovL2JhYmVsanMuaW8vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1R1cm5zIEVTNisgY29kZSBpbnRvIHZhbmlsbGEgRVM1LCBzbyB5b3UgY2FuIHVzZSBuZXh0IGdlbmVyYXRpb24gZmVhdHVyZXMgdG9kYXkuJyxcbiAgICAgICAgJ2xvZ28nOiAnYmFiZWwucG5nJ1xuICAgICAgfVxuICAgIF07XG4gIH1cblxuICBnZXRUZWMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL3dlYkRldlRlYy93ZWJEZXZUZWMuc2VydmljZS5qcyIsImV4cG9ydCBjbGFzcyBZb3VUdWJlQXBpS2V5U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLmFwaUtleSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICdBSXphU3lEYXd5UExsdDdOQjNlN1pTZzBUVUVrcjFBM0RTWUNsQ0UnO1xuICAgIH07IFxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvYXBpa2V5cy95b3VUdWJlQXBpS2V5LnNlcnZpY2UuanMiLCJleHBvcnQgZnVuY3Rpb24gTmF2YmFyRGlyZWN0aXZlKCkge1xuICAnbmdJbmplY3QnO1xuXG4gIGxldCBkaXJlY3RpdmUgPSB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuaHRtbCcsXG4gICAgc2NvcGU6IHtcbiAgICAgICAgY3JlYXRpb25EYXRlOiAnPSdcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IE5hdmJhckNvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufVxuXG5jbGFzcyBOYXZiYXJDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKG1vbWVudCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICAvLyBcInRoaXMuY3JlYXRpb25EYXRlXCIgaXMgYXZhaWxhYmxlIGJ5IGRpcmVjdGl2ZSBvcHRpb24gXCJiaW5kVG9Db250cm9sbGVyOiB0cnVlXCJcbiAgICB0aGlzLnJlbGF0aXZlRGF0ZSA9IG1vbWVudCh0aGlzLmNyZWF0aW9uRGF0ZSkuZnJvbU5vdygpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5kaXJlY3RpdmUuanMiLCJleHBvcnQgZnVuY3Rpb24gTWFsYXJrZXlEaXJlY3RpdmUobWFsYXJrZXkpIHtcbiAgJ25nSW5qZWN0JztcblxuICBsZXQgZGlyZWN0aXZlID0ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgICAgZXh0cmFWYWx1ZXM6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6ICcmbmJzcDsnLFxuICAgIGxpbms6IGxpbmtGdW5jLFxuICAgIGNvbnRyb2xsZXI6IE1hbGFya2V5Q29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xuXG4gIGZ1bmN0aW9uIGxpbmtGdW5jKHNjb3BlLCBlbCwgYXR0ciwgdm0pIHtcbiAgICBsZXQgd2F0Y2hlcjtcbiAgICBsZXQgdHlwaXN0ID0gbWFsYXJrZXkoZWxbMF0sIHtcbiAgICAgIHR5cGVTcGVlZDogNDAsXG4gICAgICBkZWxldGVTcGVlZDogNDAsXG4gICAgICBwYXVzZURlbGF5OiA4MDAsXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAgcG9zdGZpeDogJyAnXG4gICAgfSk7XG5cbiAgICBlbC5hZGRDbGFzcygnYWNtZS1tYWxhcmtleScpO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLmV4dHJhVmFsdWVzLCAodmFsdWUpID0+IHtcbiAgICAgIHR5cGlzdC50eXBlKHZhbHVlKS5wYXVzZSgpLmRlbGV0ZSgpO1xuICAgIH0pO1xuXG4gICAgd2F0Y2hlciA9IHNjb3BlLiR3YXRjaCgndm0uY29udHJpYnV0b3JzJywgKCkgPT4ge1xuICAgICAgYW5ndWxhci5mb3JFYWNoKHZtLmNvbnRyaWJ1dG9ycywgKGNvbnRyaWJ1dG9yKSA9PiB7XG4gICAgICAgIHR5cGlzdC50eXBlKGNvbnRyaWJ1dG9yLmxvZ2luKS5wYXVzZSgpLmRlbGV0ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgd2F0Y2hlcigpO1xuICAgIH0pO1xuICB9XG5cbn1cblxuY2xhc3MgTWFsYXJrZXlDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKCRsb2csIGdpdGh1YkNvbnRyaWJ1dG9yKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgdGhpcy5jb250cmlidXRvcnMgPSBbXTtcblxuICAgIHRoaXMuYWN0aXZhdGUoZ2l0aHViQ29udHJpYnV0b3IpO1xuICB9XG5cbiAgYWN0aXZhdGUoZ2l0aHViQ29udHJpYnV0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb250cmlidXRvcnMoZ2l0aHViQ29udHJpYnV0b3IpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy4kbG9nLmluZm8oJ0FjdGl2YXRlZCBDb250cmlidXRvcnMgVmlldycpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udHJpYnV0b3JzKGdpdGh1YkNvbnRyaWJ1dG9yKSB7XG4gICAgcmV0dXJuIGdpdGh1YkNvbnRyaWJ1dG9yLmdldENvbnRyaWJ1dG9ycygxMCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5jb250cmlidXRvcnMgPSBkYXRhO1xuXG4gICAgICByZXR1cm4gdGhpcy5jb250cmlidXRvcnM7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9tYWxhcmtleS9tYWxhcmtleS5kaXJlY3RpdmUuanMiXSwic291cmNlUm9vdCI6IiJ9