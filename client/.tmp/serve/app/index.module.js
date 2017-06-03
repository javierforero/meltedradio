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
	
	angular.module('meltedRadio', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'ng-token-auth', 'rails', 'LocalStorageModule']).constant('malarkey', malarkey).constant('moment', moment).config(_index.config).config(_index2.routerConfig).config(["$authProvider", function ($authProvider) {
	  $authProvider.configure({
	    apiUrl: 'http://localhost:3000'
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
	    url: 'http://localhost:3000/playlists',
	    name: 'playlist'
	  });
	}]).factory('User', ["railsResourceFactory", function (railsResourceFactory) {
	  return railsResourceFactory({
	    url: 'http://localhost:3000/users/{{userId}}/playlists',
	    name: 'user'
	  });
	}]).factory('Song', ["railsResourceFactory", function (railsResourceFactory) {
	  return railsResourceFactory({
	    url: 'http://localhost:3000/playlists/{{playlistId}}/songs',
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
	
	  (function changeNavColor() {
	    angular.element('nav.nav-bar').css('color', 'white');
	    angular.element('nav.nav-bar').css('background-color', 'black');
	    angular.element('ul#desktop-nav-menu').css('background-color', 'black');
	    angular.element('ul#mobile-nav-menu-black').css('background-color', 'black');
	    angular.element('ul.nav-menu a').css('color', 'white');
	  })();
	
	  User.query({ playlistId: '' }, { userId: $scope.userSignedIn.id }).then(function (results) {
	    ApiSync.setPlaylists(results);
	  });
	
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
	        url: 'http://localhost:3000/users/' + $scope.userSignedIn.id + '/playlists',
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
	      url: 'http://localhost:3000/playlists/' + playlist.id + '/songs',
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
	      url: 'http://localhost:3000/playlists/' + $scope.currentPlaylist.id + '/songs/' + song.id
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
	      $http({
	        method: 'GET',
	        url: myUrl
	
	      }).then(function (response) {
	
	        setSearchResults(response.data.items);
	      }, function (error) {
	        $log(error);
	      });
	    }
	  };
	
	  $scope.getUrl = function (video) {
	    return "http://www.youtube.com/embed/" + video.id.videoId + "?enablejsapi=1";
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
	    if (searchCurrentSong) {
	      searchCurrentSong.pauseVideo();
	      searchCurrentSong = video;
	    } else {
	      searchCurrentSong = video;
	    }
	  }
	
	  function stopVideo() {
	
	    player.stopVideo();
	  }
	
	  $scope.play = function (song) {
	
	    var vidHeight = angular.element('div.video').height();
	    var vidWidth = angular.element('div.video').width();
	    var vidPlay = song || $scope.songs()[0];
	
	    if (searchCurrentSong) {
	      searchCurrentSong.stopVideo();
	      searchCurrentSong = null;
	    }
	
	    if (!$scope.currentSong) {
	
	      player = new YT.Player('iframe-utube-player', {
	        height: vidHeight,
	        width: vidWidth,
	        videoId: vidPlay.url,
	        events: {
	          'onReady': $scope.onPlayerReady
	        }
	      });
	    } else if ($scope.currentSong && !song) {
	
	      player.playVideo();
	    } else {
	      player.loadVideoById({
	        'videoId': vidPlay.url
	      });
	
	      $scope.currentSong.playing = null;
	    }
	
	    $scope.currentSong = vidPlay;
	    $scope.isPlaying = true;
	    song.playing = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzJjZGI1YmM4NThmMmIwZTI4OWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9ob21lLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL25hdi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9yZWdpc3RyYXRpb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL3Nlc3Npb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL2J1YmJsZS5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2FwaWtleXMveW91VHViZUFwaUtleS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25zdGFudCIsIm1hbGFya2V5IiwibW9tZW50IiwiY29uZmlnIiwiJGF1dGhQcm92aWRlciIsImNvbmZpZ3VyZSIsImFwaVVybCIsImxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlciIsInNldFByZWZpeCIsInJhaWxzU2VyaWFsaXplclByb3ZpZGVyIiwidW5kZXJzY29yZSIsImlkZW50aXR5IiwiY2FtZWxpemUiLCJydW4iLCJzZXJ2aWNlIiwiY29udHJvbGxlciIsImRpcmVjdGl2ZSIsIiR0aW1lb3V0IiwicmVzdHJpY3QiLCJsaW5rIiwic2NvcGUiLCJlbGVtZW50IiwiYXR0ciIsIiRsYXN0IiwiJGVtaXQiLCJvbkZpbmlzaFJlbmRlciIsImZhY3RvcnkiLCJBcGlTeW5jIiwic2V0UGxheWxpc3RzIiwib2JqIiwicGxheWxpc3RzIiwic2V0U29uZ3MiLCJzb25ncyIsImdldFBsYXlsaXN0cyIsImdldFNvbmdzIiwicmFpbHNSZXNvdXJjZUZhY3RvcnkiLCJ1cmwiLCJuYW1lIiwiJGxvZ1Byb3ZpZGVyIiwidG9hc3RyQ29uZmlnIiwiZGVidWdFbmFibGVkIiwiYWxsb3dIdG1sIiwidGltZU91dCIsInBvc2l0aW9uQ2xhc3MiLCJwcmV2ZW50RHVwbGljYXRlcyIsInByb2dyZXNzQmFyIiwicm91dGVyQ29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJzdGF0ZSIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlckFzIiwicmVzb2x2ZSIsImF1dGgiLCIkYXV0aCIsInZhbGlkYXRlVXNlciIsIm90aGVyd2lzZSIsInJ1bkJsb2NrIiwiJGxvZyIsImRlYnVnIiwid2ViRGV2VGVjIiwidG9hc3RyIiwiYXdlc29tZVRoaW5ncyIsImNsYXNzQW5pbWF0aW9uIiwiY3JlYXRpb25EYXRlIiwiYWN0aXZhdGUiLCJnZXRXZWJEZXZUZWMiLCJnZXRUZWMiLCJmb3JFYWNoIiwiYXdlc29tZVRoaW5nIiwicmFuayIsIk1hdGgiLCJyYW5kb20iLCJpbmZvIiwiSG9tZUNvbnRyb2xsZXIiLCIkc2NvcGUiLCIkcm9vdFNjb3BlIiwiJGxvY2F0aW9uIiwiVXNlciIsIlBsYXlsaXN0IiwibG9jYWxTdG9yYWdlU2VydmljZSIsIiR1aWJNb2RhbCIsIlNvbmciLCIkaHR0cCIsIiRzY2UiLCIkd2luZG93IiwiWW91VHViZUFwaUtleVNlcnZpY2UiLCJ1c2VyU2lnbmVkSW4iLCJnZXQiLCJjdXJyZW50UGxheWxpc3QiLCJjdXJyZW50U29uZyIsInByZXZpb3VzU29uZyIsImlzUGxheWluZyIsInBsYXllciIsInZpZEFycmF5Iiwic2VhcmNoQ3VycmVudFNvbmciLCJjaGFuZ2VOYXZDb2xvciIsImNzcyIsInF1ZXJ5IiwicGxheWxpc3RJZCIsInVzZXJJZCIsImlkIiwidGhlbiIsInJlc3VsdHMiLCJuZXdQbGF5bGlzdCIsIm1vZGFsSW5zdGFuY2UiLCJvcGVuIiwic3VibWl0IiwidGV4dCIsIm1ldGhvZCIsImRhdGEiLCJ0aXRsZSIsInNldFBsYXlsaXN0IiwibGVuZ3RoIiwiZXJyb3IiLCJjbG9zZSIsImRpc21pc3MiLCJwbGF5bGlzdCIsInJlbW92ZUNsYXNzIiwic2V0Iiwic29uZ0lkIiwiZ2V0VmlkZW9Tb25nIiwidmlkZW8iLCJ2aWRlb0lkIiwidG9nZ2xlIiwiZ2V0VmlkZW9JbmZvVXJsIiwiYXBpS2V5IiwiYWRkVmlkZW9Ub1BsYXlsaXN0IiwiaXRlbXMiLCJjb252ZXJ0RHVyYXRpb24iLCJzdHJpbmciLCJhcnJheSIsIm1hdGNoIiwiZm9ybWF0dGVkIiwibWFwIiwiaXRlbSIsImpvaW4iLCJzbmlwcGV0IiwiYXJ0aXN0IiwiZGVzY3JpcHRpb24iLCJkdXJhdGlvbiIsImNvbnRlbnREZXRhaWxzIiwiZGVsZXRlU29uZyIsInNvbmciLCJyZXNwb25zZSIsImN1cnJlbnRfcGxheWxpc3QiLCJzZXRTZWFyY2hSZXN1bHRzIiwidmlkZW9zIiwiZ2V0VmlkZW9zIiwic2VhcmNoVGV4dCIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlcGxhY2UiLCJteVVybCIsImdldFVybCIsInRydXN0U3JjIiwic3JjIiwidHJ1c3RBc1Jlc291cmNlVXJsIiwidG9nZ2xlTWVudSIsImNyZWF0ZVBsYXllciIsImkiLCJ2aWRQbGF5ZXJPYmoiLCJZVCIsIlBsYXllciIsImV2ZW50cyIsIm9uUGxheWVyU3RhdGVDaGFuZ2UiLCJwdXNoIiwiJG9uIiwibmdSZXBlYXRGaW5pc2hlZEV2ZW50Iiwib25QbGF5ZXJSZWFkeSIsImV2ZW50IiwidGFyZ2V0IiwicGxheVZpZGVvIiwiUGxheWVyU3RhdGUiLCJQTEFZSU5HIiwic2VhcmNoVmlkTG9naWMiLCJwYXVzZSIsInBhdXNlVmlkZW8iLCJzdG9wVmlkZW8iLCJwbGF5IiwidmlkSGVpZ2h0IiwiaGVpZ2h0IiwidmlkV2lkdGgiLCJ3aWR0aCIsInZpZFBsYXkiLCJsb2FkVmlkZW9CeUlkIiwicGxheWluZyIsImdldFNvbmdJbmRleCIsImluZGV4T2YiLCJuZXh0Iiwic29uZ3NBcnJheSIsImxhc3RJbmRleCIsImluZGV4T2ZDdXJyZW50U29uZyIsInNvbmdUb1BsYXkiLCJwcmV2aW91cyIsIk5hdkNvbnRyb2xsZXIiLCJpc19vcGVuIiwicGFnZVJlZGlyZWN0IiwidXNlciIsInBhdGgiLCJzaWduT3V0IiwiZXYiLCJyZW1vdmUiLCJ4X2lkIiwidG9nZ2xlQ2xhc3MiLCJSZWdpc3RyYXRpb25zQ29udHJvbGxlciIsInNldFVzZXIiLCJzdWJtaXRSZWdpc3RyYXRpb24iLCJyZWdpc3RyYXRpb25Gb3JtIiwic3VibWl0TG9naW4iLCJlbWFpbCIsInBhc3N3b3JkIiwiU2Vzc2lvbnNDb250cm9sbGVyIiwibG9naW5Gb3JtIiwicmVhc29uIiwiZXJyb3JzIiwidXNlcnMiLCJCdWJibGVDb250cm9sbGVyIiwiJGRvY3VtZW50IiwibGF2YTAiLCJnZTFkb290Iiwic2NyZWVuIiwiZWxlbSIsImNhbGxiYWNrIiwiY3R4IiwibGVmdCIsInRvcCIsImluaXQiLCJpbml0UmVzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRhZ05hbWUiLCJnZXRDb250ZXh0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc2l6ZSIsImJpbmQiLCJvbnNlbGVjdHN0YXJ0Iiwib25kcmFnIiwibyIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0UGFyZW50Iiwib2Zmc2V0TGVmdCIsIm9mZnNldFRvcCIsIlBvaW50IiwieCIsInkiLCJtYWduaXR1ZGUiLCJjb21wdXRlZCIsImZvcmNlIiwicHJvdG90eXBlIiwiYWRkIiwicCIsIkJhbGwiLCJwYXJlbnQiLCJtaW4iLCJtYXgiLCJ2ZWwiLCJwb3MiLCJzaXplIiwid2giLCJtb3ZlIiwiTGF2YUxhbXAiLCJudW1CYWxscyIsImMwIiwiYzEiLCJzdGVwIiwic3giLCJmbG9vciIsInN5IiwicGFpbnQiLCJtZXRhRmlsbCIsImNyZWF0ZVJhZGlhbEdyYWRpZW50IiwicGx4IiwicGx5IiwibXNjYXNlcyIsIml4IiwiZ3JpZCIsImJhbGxzIiwiaXRlciIsInNpZ24iLCJrIiwiY29tcHV0ZUZvcmNlIiwiaWR4IiwiY2VsbCIsImJhbGwiLCJtYXJjaGluZ1NxdWFyZXMiLCJwZGlyIiwiZGlyIiwibXNjYXNlIiwiaWRuIiwiYWJzIiwicG93IiwibGluZVRvIiwicmVuZGVyTWV0YWJhbGxzIiwiZmlsbFN0eWxlIiwiYmVnaW5QYXRoIiwicm91bmQiLCJmaWxsIiwiY2xvc2VQYXRoIiwidyIsImgiLCJyIiwiZ3JhZGllbnQiLCJhZGRDb2xvclN0b3AiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjbGVhclJlY3QiLCJpcyIsImFwaUhvc3QiLCJsaW1pdCIsImNhdGNoIiwidG9Kc29uIiwiV2ViRGV2VGVjU2VydmljZSIsIk5hdmJhckRpcmVjdGl2ZSIsIk5hdmJhckNvbnRyb2xsZXIiLCJiaW5kVG9Db250cm9sbGVyIiwicmVsYXRpdmVEYXRlIiwiZnJvbU5vdyIsIk1hbGFya2V5RGlyZWN0aXZlIiwiZXh0cmFWYWx1ZXMiLCJ0ZW1wbGF0ZSIsImxpbmtGdW5jIiwiTWFsYXJrZXlDb250cm9sbGVyIiwiZWwiLCJ2bSIsIndhdGNoZXIiLCJ0eXBpc3QiLCJ0eXBlU3BlZWQiLCJkZWxldGVTcGVlZCIsInBhdXNlRGVsYXkiLCJsb29wIiwicG9zdGZpeCIsImFkZENsYXNzIiwidmFsdWUiLCJ0eXBlIiwiZGVsZXRlIiwiJHdhdGNoIiwiY29udHJpYnV0b3JzIiwiY29udHJpYnV0b3IiLCJsb2dpbiIsImdpdGh1YkNvbnRyaWJ1dG9yIiwiZ2V0Q29udHJpYnV0b3JzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUlBQSxTQUFRQyxPQUFPLGVBQWUsQ0FBQyxhQUFhLGFBQWEsV0FBVyxjQUFjLGNBQWMsVUFBVSxjQUFjLGFBQWEsZ0JBQWdCLFVBQVUsaUJBQWlCLFNBQVMsdUJBQ3RMQyxTQUFTLFlBQVlDLFVBQ3JCRCxTQUFTLFVBQVVFLFFBQ25CQyxPQUhILGVBSUdBLE9BSkgsc0JBS0dBLHlCQUFPLFVBQVNDLGVBQWU7R0FDN0JBLGNBQWNDLFVBQVU7S0FDcEJDLFFBQVE7O0tBR2JILHVDQUFPLFVBQVNJLDZCQUE0QjtHQUMzQ0EsNEJBQTRCQyxVQUFVO0tBRXZDTCxtQ0FBTyxVQUFTTSx5QkFBd0I7R0FDdkNBLHdCQUF3QkMsV0FBV1osUUFBUWEsVUFBVUMsU0FBU2QsUUFBUWE7S0FFeEVFLElBaEJILGtCQWlCR0MsUUFBUSxxQkFqQlgsNkNBa0JHQSxRQUFRLGFBbEJYLDZC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OztLQUdYUixHQUFHUyxTQUFTOztLQUVaOVUsUUFBUXNFLFFBQVFoRCxNQUFNMlMsYUFBYSxVQUFDYyxPQUFVO09BQzVDUCxPQUFPUSxLQUFLRCxPQUFPOUosUUFBUWdLOzs7S0FHN0JWLFVBQVVqVCxNQUFNNFQsT0FBTyxtQkFBbUIsWUFBTTtPQUM5Q2xWLFFBQVFzRSxRQUFRZ1EsR0FBR2EsY0FBYyxVQUFDQyxhQUFnQjtTQUNoRFosT0FBT1EsS0FBS0ksWUFBWUMsT0FBT3BLLFFBQVFnSzs7OztLQUkzQzNULE1BQU1rSixJQUFJLFlBQVksWUFBTTtPQUMxQitKOzs7Ozs7OERBaUIrQjtHQVZuQyw0QkFBYTNRLE1BQU0wUixtQkFBbUI7S0FDcEM7O0tBRG9DOztLQUdwQyxLQUFLMVIsT0FBT0E7S0FDWixLQUFLdVIsZUFBZTs7S0FFcEIsS0FBS2hSLFNBQVNtUjs7O0dBZ0JoQixhQUFhLG9CQUFvQixDQUFDO0tBQ2hDLEtBQUs7S0FDTCxPQUFPLFNBQVMsU0FmVEEsbUJBQW1CO09BQUE7O09BQzFCLE9BQU8sS0FBS0MsZ0JBQWdCRCxtQkFBbUI5TyxLQUFLLFlBQU07U0FDeEQsTUFBSzVDLEtBQUtlLEtBQUs7OztNQW9CaEI7S0FDRCxLQUFLO0tBQ0wsT0FBTyxTQUFTLGdCQWxCRjJRLG1CQUFtQjtPQUFBOztPQUNqQyxPQUFPQSxrQkFBa0JDLGdCQUFnQixJQUFJL08sS0FBSyxVQUFDUSxNQUFTO1NBQzFELE9BQUttTyxlQUFlbk87O1NBRXBCLE9BQU8sT0FBS21POzs7OztHQXlCaEIsT0FBTyIsImZpbGUiOiJpbmRleC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3MmNkYjViYzg1OGYyYjBlMjg5YyIsIi8qIGdsb2JhbCBtYWxhcmtleTpmYWxzZSwgbW9tZW50OmZhbHNlICovXG5cbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vaW5kZXguY29uZmlnJztcbmltcG9ydCB7IHJvdXRlckNvbmZpZyB9IGZyb20gJy4vaW5kZXgucm91dGUnO1xuaW1wb3J0IHsgcnVuQmxvY2sgfSBmcm9tICcuL2luZGV4LnJ1bic7XG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciB9IGZyb20gJy4vbWFpbi9tYWluLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgSG9tZUNvbnRyb2xsZXIgfSBmcm9tICcuL3NjcmlwdHMvY29udHJvbGxlcnMvaG9tZS5jb250cm9sbGVyJztcbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICcuL3NjcmlwdHMvY29udHJvbGxlcnMvbmF2LmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXIgfSBmcm9tICcuL3NjcmlwdHMvY29udHJvbGxlcnMvcmVnaXN0cmF0aW9ucy5jb250cm9sbGVyJztcbmltcG9ydCB7IFNlc3Npb25zQ29udHJvbGxlciB9IGZyb20gJy4vc2NyaXB0cy9jb250cm9sbGVycy9zZXNzaW9ucy5jb250cm9sbGVyJztcbmltcG9ydCB7IEJ1YmJsZUNvbnRyb2xsZXIgfSBmcm9tICcuL3NjcmlwdHMvY29udHJvbGxlcnMvYnViYmxlLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvZ2l0aHViQ29udHJpYnV0b3IvZ2l0aHViQ29udHJpYnV0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBXZWJEZXZUZWNTZXJ2aWNlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvd2ViRGV2VGVjL3dlYkRldlRlYy5zZXJ2aWNlJztcbmltcG9ydCB7IFlvdVR1YmVBcGlLZXlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvYXBpa2V5cy95b3VUdWJlQXBpS2V5LnNlcnZpY2UnO1xuaW1wb3J0IHsgTmF2YmFyRGlyZWN0aXZlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWFsYXJrZXlEaXJlY3RpdmUgfSBmcm9tICcuLi9hcHAvY29tcG9uZW50cy9tYWxhcmtleS9tYWxhcmtleS5kaXJlY3RpdmUnO1xuXG5cblxuYW5ndWxhci5tb2R1bGUoJ21lbHRlZFJhZGlvJywgWyduZ0FuaW1hdGUnLCAnbmdDb29raWVzJywgJ25nVG91Y2gnLCAnbmdTYW5pdGl6ZScsICduZ01lc3NhZ2VzJywgJ25nQXJpYScsICduZ1Jlc291cmNlJywgJ3VpLnJvdXRlcicsICd1aS5ib290c3RyYXAnLCAndG9hc3RyJywgJ25nLXRva2VuLWF1dGgnLCAncmFpbHMnLCAnTG9jYWxTdG9yYWdlTW9kdWxlJ10pXG4gIC5jb25zdGFudCgnbWFsYXJrZXknLCBtYWxhcmtleSlcbiAgLmNvbnN0YW50KCdtb21lbnQnLCBtb21lbnQpXG4gIC5jb25maWcoY29uZmlnKVxuICAuY29uZmlnKHJvdXRlckNvbmZpZylcbiAgLmNvbmZpZyhmdW5jdGlvbigkYXV0aFByb3ZpZGVyKSB7XG4gICAgICRhdXRoUHJvdmlkZXIuY29uZmlndXJlKHtcbiAgICAgICAgIGFwaVVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCdcbiAgICAgfSk7XG4gICB9KVxuICAgLmNvbmZpZyhmdW5jdGlvbihsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIpe1xuICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIuc2V0UHJlZml4KCdtZWx0ZWRSYWRpbycpO1xuICAgfSlcbiAgIC5jb25maWcoZnVuY3Rpb24ocmFpbHNTZXJpYWxpemVyUHJvdmlkZXIpe1xuICAgICByYWlsc1NlcmlhbGl6ZXJQcm92aWRlci51bmRlcnNjb3JlKGFuZ3VsYXIuaWRlbnRpdHkpLmNhbWVsaXplKGFuZ3VsYXIuaWRlbnRpdHkpO1xuICAgfSlcbiAgLnJ1bihydW5CbG9jaylcbiAgLnNlcnZpY2UoJ2dpdGh1YkNvbnRyaWJ1dG9yJywgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlKVxuICAuc2VydmljZSgnd2ViRGV2VGVjJywgV2ViRGV2VGVjU2VydmljZSlcbiAgLnNlcnZpY2UoJ1lvdVR1YmVBcGlLZXlTZXJ2aWNlJywgWW91VHViZUFwaUtleVNlcnZpY2UpXG4gIC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKVxuICAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBIb21lQ29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ05hdkNvbnRyb2xsZXInLCBOYXZDb250cm9sbGVyKVxuICAuY29udHJvbGxlcignUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXInLCBSZWdpc3RyYXRpb25zQ29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ1Nlc3Npb25zQ29udHJvbGxlcicsIFNlc3Npb25zQ29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ0J1YmJsZUNvbnRyb2xsZXInLCBCdWJibGVDb250cm9sbGVyKVxuICAuZGlyZWN0aXZlKCdhY21lTmF2YmFyJywgTmF2YmFyRGlyZWN0aXZlKVxuICAuZGlyZWN0aXZlKCdhY21lTWFsYXJrZXknLCBNYWxhcmtleURpcmVjdGl2ZSlcbiAgLmRpcmVjdGl2ZSgnb25GaW5pc2hSZW5kZXInLCBmdW5jdGlvbigkdGltZW91dCl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHIpIHtcbiAgICAgICAgaWYgKHNjb3BlLiRsYXN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuJGVtaXQoYXR0ci5vbkZpbmlzaFJlbmRlcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgIH07XG5cbiAgfSlcbiAgLmZhY3RvcnkoJ0FwaVN5bmMnLCBmdW5jdGlvbigpe1xuICAgIHZhciBBcGlTeW5jID0ge307XG5cbiAgICBBcGlTeW5jLnNldFBsYXlsaXN0cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgQXBpU3luYy5wbGF5bGlzdHMgPSBvYmo7XG4gICAgfTtcblxuICAgIEFwaVN5bmMuc2V0U29uZ3MgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgQXBpU3luYy5zb25ncyA9IG9iajtcbiAgICB9O1xuXG4gICAgQXBpU3luYy5nZXRQbGF5bGlzdHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBBcGlTeW5jLnBsYXlsaXN0cztcbiAgICB9O1xuXG4gICAgQXBpU3luYy5nZXRTb25ncyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEFwaVN5bmMuc29uZ3M7XG4gICAgfTtcblxuICAgIHJldHVybiBBcGlTeW5jO1xuICB9KVxuICAuZmFjdG9yeSgnUGxheWxpc3QnLCBmdW5jdGlvbihyYWlsc1Jlc291cmNlRmFjdG9yeSkge1xuICAgIHJldHVybiByYWlsc1Jlc291cmNlRmFjdG9yeSh7XG4gICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvcGxheWxpc3RzJyxcbiAgICAgIG5hbWU6ICdwbGF5bGlzdCdcbiAgICB9KTtcbiAgfSlcbiAgLmZhY3RvcnkoJ1VzZXInLGZ1bmN0aW9uKHJhaWxzUmVzb3VyY2VGYWN0b3J5KXtcbiAgICByZXR1cm4gcmFpbHNSZXNvdXJjZUZhY3Rvcnkoe1xuICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3VzZXJzL3t7dXNlcklkfX0vcGxheWxpc3RzJyxcbiAgICAgIG5hbWU6ICd1c2VyJ1xuICAgIH0pO1xuICB9KVxuICAuZmFjdG9yeSgnU29uZycsIGZ1bmN0aW9uKHJhaWxzUmVzb3VyY2VGYWN0b3J5KXtcbiAgICByZXR1cm4gcmFpbHNSZXNvdXJjZUZhY3Rvcnkoe1xuICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3BsYXlsaXN0cy97e3BsYXlsaXN0SWR9fS9zb25ncycsXG4gICAgICBuYW1lOiAnc29uZydcbiAgICB9KTtcbiAgfSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4Lm1vZHVsZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBjb25maWcgKCRsb2dQcm92aWRlciwgdG9hc3RyQ29uZmlnKSB7XG4gICduZ0luamVjdCc7XG4gIC8vIEVuYWJsZSBsb2dcbiAgJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCh0cnVlKTtcblxuICAvLyBTZXQgb3B0aW9ucyB0aGlyZC1wYXJ0eSBsaWJcbiAgdG9hc3RyQ29uZmlnLmFsbG93SHRtbCA9IHRydWU7XG4gIHRvYXN0ckNvbmZpZy50aW1lT3V0ID0gMzAwMDtcbiAgdG9hc3RyQ29uZmlnLnBvc2l0aW9uQ2xhc3MgPSAndG9hc3QtdG9wLXJpZ2h0JztcbiAgdG9hc3RyQ29uZmlnLnByZXZlbnREdXBsaWNhdGVzID0gdHJ1ZTtcbiAgdG9hc3RyQ29uZmlnLnByb2dyZXNzQmFyID0gdHJ1ZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXguY29uZmlnLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIHJvdXRlckNvbmZpZyAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAnbmdJbmplY3QnO1xuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnbWFpbicsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvbWFpbi9tYWluLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJyxcbiAgICAgIGNvbnRyb2xsZXJBczogJ21haW4nXG4gICAgfSlcbiAgICAuc3RhdGUoJ3NpZ25faW4nLCB7XG4gICAgICB1cmw6ICcvc2lnbl9pbicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC92aWV3cy91c2VyX3Nlc3Npb25zL25ldy5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdTZXNzaW9uc0NvbnRyb2xsZXIgYXMgc2lnbmluJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdzaWduX3VwJywge1xuICAgICAgdXJsOiAnL3NpZ25fdXAnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdmlld3MvdXNlcl9yZWdpc3RyYXRpb25zL25ldy5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RyYXRpb25zQ29udHJvbGxlciBhcyBzaWdudXAnXG4gICAgfSlcbiAgICAuc3RhdGUgICgnaG9tZScsIHtcbiAgICAgIHVybDogJy91c2Vycy86aWQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdmlld3MvaG9tZS5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlciBhcyBob21lJyxcbiAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgIGF1dGg6IGZ1bmN0aW9uKCRhdXRoKSB7XG4gICAgICAgICAgIHJldHVybiAkYXV0aC52YWxpZGF0ZVVzZXIoKTtcbiAgICAgICAgIH1cbiAgICAgICB9XG4gICAgfSk7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBydW5CbG9jayAoJGxvZykge1xuICAnbmdJbmplY3QnO1xuICAkbG9nLmRlYnVnKCdydW5CbG9jayBlbmQnKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXgucnVuLmpzIiwiZXhwb3J0IGNsYXNzIE1haW5Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKCR0aW1lb3V0LCB3ZWJEZXZUZWMsIHRvYXN0cikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLmF3ZXNvbWVUaGluZ3MgPSBbXTtcbiAgICB0aGlzLmNsYXNzQW5pbWF0aW9uID0gJyc7XG4gICAgdGhpcy5jcmVhdGlvbkRhdGUgPSAxNDgxNjM5NzA0MTA3O1xuICAgIHRoaXMudG9hc3RyID0gdG9hc3RyO1xuXG5cbiAgICB0aGlzLmFjdGl2YXRlKCR0aW1lb3V0LCB3ZWJEZXZUZWMpO1xuICB9XG5cbiAgYWN0aXZhdGUoJHRpbWVvdXQsIHdlYkRldlRlYykge1xuICAgIHRoaXMuZ2V0V2ViRGV2VGVjKHdlYkRldlRlYyk7XG4gICAgJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbGFzc0FuaW1hdGlvbiA9ICdydWJiZXJCYW5kJztcbiAgICB9LCA0MDAwKTtcbiAgfVxuXG4gIGdldFdlYkRldlRlYyh3ZWJEZXZUZWMpIHtcbiAgICB0aGlzLmF3ZXNvbWVUaGluZ3MgPSB3ZWJEZXZUZWMuZ2V0VGVjKCk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2godGhpcy5hd2Vzb21lVGhpbmdzLCAoYXdlc29tZVRoaW5nKSA9PiB7XG4gICAgICBhd2Vzb21lVGhpbmcucmFuayA9IE1hdGgucmFuZG9tKCk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93VG9hc3RyKCkge1xuICAgIHRoaXMudG9hc3RyLmluZm8oJ0ZvcmsgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9Td2lpcC9nZW5lcmF0b3ItZ3VscC1hbmd1bGFyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGI+Z2VuZXJhdG9yLWd1bHAtYW5ndWxhcjwvYj48L2E+Jyk7XG4gICAgdGhpcy5jbGFzc0FuaW1hdGlvbiA9ICcnO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIEhvbWVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKCRzY29wZSwgJHJvb3RTY29wZSwgJGF1dGgsICRsb2NhdGlvbiwgVXNlciwgUGxheWxpc3QsbG9jYWxTdG9yYWdlU2VydmljZSwgJHVpYk1vZGFsLCBTb25nLCBBcGlTeW5jLCAkaHR0cCwkc2NlLCAkd2luZG93LCAkbG9nLCBZb3VUdWJlQXBpS2V5U2VydmljZSkge1xuICAgICduZ0luamVjdCc7XG4gICAgJHNjb3BlLnVzZXJTaWduZWRJbiA9IGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdjdXJyZW50VXNlcicpO1xuICAgICRzY29wZS5jdXJyZW50UGxheWxpc3QgPSBudWxsO1xuICAgICRzY29wZS5zb25ncyA9IG51bGw7XG4gICAgJHNjb3BlLmN1cnJlbnRTb25nID0gbnVsbDtcbiAgICAkc2NvcGUucHJldmlvdXNTb25nID0gbnVsbDtcbiAgICAkc2NvcGUuaXNQbGF5aW5nID0gIGZhbHNlO1xuICAgIHZhciBwbGF5ZXI7XG4gICAgdmFyIHZpZEFycmF5ID0gW107XG4gICAgdmFyIHNlYXJjaEN1cnJlbnRTb25nID0gbnVsbDtcblxuICAgIChmdW5jdGlvbiBjaGFuZ2VOYXZDb2xvcigpe1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnY29sb3InLCd3aGl0ZScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ2JsYWNrJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsI2Rlc2t0b3AtbmF2LW1lbnUnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCdibGFjaycpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCd1bCNtb2JpbGUtbmF2LW1lbnUtYmxhY2snKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCdibGFjaycpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCd1bC5uYXYtbWVudSBhJykuY3NzKCdjb2xvcicsJ3doaXRlJyk7XG4gICAgfSkoKTtcblxuXG4gICAgVXNlci5xdWVyeSh7cGxheWxpc3RJZDogJyd9LHt1c2VySWQ6ICRzY29wZS51c2VyU2lnbmVkSW4uaWR9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpe1xuICAgICAgQXBpU3luYy5zZXRQbGF5bGlzdHMocmVzdWx0cyk7XG4gICAgfSk7XG5cblxuICAgICRzY29wZS5wbGF5bGlzdHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBBcGlTeW5jLmdldFBsYXlsaXN0cygpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc29uZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAgQXBpU3luYy5nZXRTb25ncygpO1xuICAgIH07XG5cbiAgICAkc2NvcGUubmV3UGxheWxpc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5tb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC92aWV3cy9hZGRwbGF5bGlzdC5odG1sJyxcbiAgICAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmKCRzY29wZS50ZXh0KSB7XG5cbiAgICAgICAkaHR0cCh7XG4gICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC91c2Vycy8nICsgJHNjb3BlLnVzZXJTaWduZWRJbi5pZCArICcvcGxheWxpc3RzJyxcbiAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgdGl0bGU6ICRzY29wZS50ZXh0XG4gICAgICAgICB9XG4gICAgICAgfSkudGhlbihmdW5jdGlvbihyZXN1bHRzKXtcblxuICAgICAgICAgQXBpU3luYy5zZXRQbGF5bGlzdHMocmVzdWx0cy5kYXRhKTtcbiAgICAgICAgICRzY29wZS5zZXRQbGF5bGlzdChyZXN1bHRzLmRhdGFbcmVzdWx0cy5kYXRhLmxlbmd0aCAtIDFdKTtcblxuICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAkbG9nKGVycm9yKTtcbiAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUudGV4dCA9ICcnO1xuICAgICAgICAkc2NvcGUubW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuZGlzbWlzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLm1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgfTtcblxuICAgICRyb290U2NvcGUuc2V0UGxheWxpc3QgPSBmdW5jdGlvbihwbGF5bGlzdCkge1xuXG4gICAgICAgYW5ndWxhci5lbGVtZW50KCdkaXYucGxheWxpc3QtY29udGVudCcpLnJlbW92ZUNsYXNzKCdvdmVyZmxvdycpO1xuICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnY3VycmVudFBsYXlsaXN0JywgcGxheWxpc3QpO1xuICAgICAgICAkc2NvcGUuY3VycmVudFBsYXlsaXN0ID0gIGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdjdXJyZW50UGxheWxpc3QnKTtcblxuICAgICAgICBpZigkc2NvcGUuY3VycmVudFBsYXlsaXN0KSB7XG5cbiAgICAgICAgICBTb25nLnF1ZXJ5KHtzb25nSWQ6ICcnfSx7cGxheWxpc3RJZDogJHNjb3BlLmN1cnJlbnRQbGF5bGlzdC5pZH0pLnRoZW4oZnVuY3Rpb24oc29uZ3Mpe1xuXG4gICAgICAgICAgICAgQXBpU3luYy5zZXRTb25ncyhzb25ncyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5nZXRWaWRlb1NvbmcgPSBmdW5jdGlvbihwbGF5bGlzdCwgdmlkZW8pIHtcblxuICAgICAgYW5ndWxhci5lbGVtZW50KCd1bCMnK3ZpZGVvLmlkLnZpZGVvSWQpLnRvZ2dsZShcInNsb3dcIik7XG5cbiAgICAgdmFyIGdldFZpZGVvSW5mb1VybCA9ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3ZpZGVvcz8nK1xuICAgICAgICAgICAgICAgICAgICdpZD0nK1xuICAgICAgICAgICAgICAgICAgIHZpZGVvLmlkLnZpZGVvSWQrXG4gICAgICAgICAgICAgICAgICAgJyZrZXk9JytcbiAgICAgICAgICAgICAgICAgICBZb3VUdWJlQXBpS2V5U2VydmljZS5hcGlLZXkoKStcbiAgICAgICAgICAgICAgICAgICAnJnBhcnQ9c25pcHBldCxjb250ZW50RGV0YWlscyc7XG4gICAgICAgICAkaHR0cCh7XG5cbiAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgdXJsOiBnZXRWaWRlb0luZm9VcmxcblxuICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXN1bHRzKXtcblxuICAgICAgICAgICBhZGRWaWRlb1RvUGxheWxpc3QocGxheWxpc3QscmVzdWx0cy5kYXRhLml0ZW1zWzBdKTtcblxuICAgICAgICAgfSxmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5jb252ZXJ0RHVyYXRpb24gPSBmdW5jdGlvbihzdHJpbmcpIHtcblxuICAgICAgICB2YXIgYXJyYXkgPSBzdHJpbmcubWF0Y2goLyhcXGQrKSg/PVtNSFNdKS9pZyl8fFtdO1xuICAgICAgICB2YXIgZm9ybWF0dGVkID0gYXJyYXkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgIGlmKGl0ZW0ubGVuZ3RoPDIpIHJldHVybiAnMCcraXRlbTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9KS5qb2luKCc6Jyk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZDtcblxuICAgIH07XG5cbiAgIGZ1bmN0aW9uIGFkZFZpZGVvVG9QbGF5bGlzdChwbGF5bGlzdCwgdmlkZW8pIHtcbiAgICAgICAkaHR0cCh7XG4gICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9wbGF5bGlzdHMvJyArIHBsYXlsaXN0LmlkICsnL3NvbmdzJyxcbiAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgdGl0bGU6IHZpZGVvLnNuaXBwZXQudGl0bGUsXG4gICAgICAgICAgIGFydGlzdDogdmlkZW8uc25pcHBldC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgdXJsOiB2aWRlby5pZCxcbiAgICAgICAgICAgZHVyYXRpb246IHZpZGVvLmNvbnRlbnREZXRhaWxzLmR1cmF0aW9uXG4gICAgICAgICB9XG4gICAgICAgfSkudGhlbihcbiAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdHMpe1xuICAgICAgICAgICBBcGlTeW5jLnNldFNvbmdzKHJlc3VsdHMuZGF0YSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAkbG9nKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmRlbGV0ZVNvbmcgPSBmdW5jdGlvbihzb25nKSB7XG5cbiAgICAgICAkaHR0cCh7XG4gICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3BsYXlsaXN0cy8nICsgJHNjb3BlLmN1cnJlbnRQbGF5bGlzdC5pZCArJy9zb25ncy8nKyBzb25nLmlkXG4gICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cbiAgICAgICAgICRzY29wZS5zZXRQbGF5bGlzdChyZXNwb25zZS5kYXRhLmN1cnJlbnRfcGxheWxpc3QpO1xuICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgc2V0U2VhcmNoUmVzdWx0cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgJHNjb3BlLnZpZGVvcyA9IG9iajtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldFZpZGVvcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgaWYoJHNjb3BlLnRleHQpIHtcblxuICAgICAgICAgJHNjb3BlLnNldFBsYXlsaXN0KG51bGwpO1xuICAgICAgICAgdmFyIHNlYXJjaFRleHQgPSBlbmNvZGVVUklDb21wb25lbnQoJHNjb3BlLnRleHQpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xuICAgICAgICAgdmFyIG15VXJsID0gICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzLycrXG4gICAgICAgICAgICAgICAgICAgICAgJ3NlYXJjaD9wYXJ0PXNuaXBwZXQnK1xuICAgICAgICAgICAgICAgICAgICAgICcmdHlwZT12aWRlbycrXG4gICAgICAgICAgICAgICAgICAgICAgJyZxPScrXG4gICAgICAgICAgICAgICAgICAgICAgc2VhcmNoVGV4dCtcbiAgICAgICAgICAgICAgICAgICAgICAnJmtleT0nK1xuICAgICAgICAgICAgICAgICAgICAgIFlvdVR1YmVBcGlLZXlTZXJ2aWNlLmFwaUtleSgpO1xuICAgICAgICAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG15VXJsXG5cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cbiAgICAgICAgICBzZXRTZWFyY2hSZXN1bHRzKHJlc3BvbnNlLmRhdGEuaXRlbXMpO1xuXG4gICAgICAgIH0sZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5nZXRVcmwgPSBmdW5jdGlvbih2aWRlbykge1xuICAgICAgcmV0dXJuIFwiaHR0cDovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9cIit2aWRlby5pZC52aWRlb0lkK1wiP2VuYWJsZWpzYXBpPTFcIjtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnRydXN0U3JjID0gZnVuY3Rpb24oc3JjKSB7XG4gICAgICByZXR1cm4gJHNjZS50cnVzdEFzUmVzb3VyY2VVcmwoc3JjKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnRvZ2dsZU1lbnUgPSBmdW5jdGlvbih2aWRlb0lkKSB7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsIycrdmlkZW9JZCkudG9nZ2xlKFwic2xvd1wiKTtcbiAgICB9O1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoKSB7XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8ICRzY29wZS52aWRlb3MubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgIHZhciBpZCA9ICd2aWQtJysoaSsxKTtcbiAgICAgICAgICB2YXIgdmlkUGxheWVyT2JqID0gbmV3IFlULlBsYXllcihpZCwge1xuICAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgJ29uU3RhdGVDaGFuZ2UnOiAkc2NvcGUub25QbGF5ZXJTdGF0ZUNoYW5nZVxuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSk7XG4gICAgICAgICAgIHZpZEFycmF5LnB1c2godmlkUGxheWVyT2JqKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICRzY29wZS4kb24oJ25nUmVwZWF0RmluaXNoZWQnLCBmdW5jdGlvbihuZ1JlcGVhdEZpbmlzaGVkRXZlbnQpIHtcblxuICAgICAgIGNyZWF0ZVBsYXllcigpO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLm9uUGxheWVyUmVhZHkgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICBldmVudC50YXJnZXQucGxheVZpZGVvKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5vblBsYXllclN0YXRlQ2hhbmdlID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICBpZihldmVudC5kYXRhID09IFlULlBsYXllclN0YXRlLlBMQVlJTkcpIHtcbiAgICAgICAgICBzZWFyY2hWaWRMb2dpYyhldmVudC50YXJnZXQpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2VhcmNoVmlkTG9naWModmlkZW8pIHtcbiAgICAgIGlmKCRzY29wZS5jdXJyZW50U29uZyAmJiAkc2NvcGUuaXNQbGF5aW5nKSB7XG4gICAgICAgICRzY29wZS5wYXVzZSgpO1xuICAgICAgfVxuICAgICAgaWYoc2VhcmNoQ3VycmVudFNvbmcpIHtcbiAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcucGF1c2VWaWRlbygpO1xuICAgICAgICBzZWFyY2hDdXJyZW50U29uZyA9IHZpZGVvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcgID0gdmlkZW87XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wVmlkZW8oKSB7XG5cbiAgICAgIHBsYXllci5zdG9wVmlkZW8oKTtcbiAgICB9XG5cbiAgICAkc2NvcGUucGxheSA9IGZ1bmN0aW9uKHNvbmcpIHtcblxuICAgICAgICB2YXIgdmlkSGVpZ2h0ID0gYW5ndWxhci5lbGVtZW50KCdkaXYudmlkZW8nKS5oZWlnaHQoKTtcbiAgICAgICAgdmFyIHZpZFdpZHRoID0gYW5ndWxhci5lbGVtZW50KCdkaXYudmlkZW8nKS53aWR0aCgpO1xuICAgICAgICB2YXIgdmlkUGxheSA9IHNvbmcgfHwgJHNjb3BlLnNvbmdzKClbMF1cblxuICAgICAgICBpZihzZWFyY2hDdXJyZW50U29uZykge1xuICAgICAgICAgIHNlYXJjaEN1cnJlbnRTb25nLnN0b3BWaWRlbygpO1xuICAgICAgICAgIHNlYXJjaEN1cnJlbnRTb25nID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCEkc2NvcGUuY3VycmVudFNvbmcpIHtcblxuICAgICAgICAgcGxheWVyID0gbmV3IFlULlBsYXllcignaWZyYW1lLXV0dWJlLXBsYXllcicsIHtcbiAgICAgICAgICAgaGVpZ2h0OiB2aWRIZWlnaHQsXG4gICAgICAgICAgIHdpZHRoOiAgdmlkV2lkdGgsXG4gICAgICAgICAgIHZpZGVvSWQ6IHZpZFBsYXkudXJsLFxuICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAnb25SZWFkeSc6ICRzY29wZS5vblBsYXllclJlYWR5XG4gICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgICAgIH0gZWxzZSBpZigkc2NvcGUuY3VycmVudFNvbmcgJiYgIXNvbmcpIHtcblxuICAgICAgICAgICAgcGxheWVyLnBsYXlWaWRlbygpO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGxheWVyLmxvYWRWaWRlb0J5SWQoe1xuICAgICAgICAgICAgJ3ZpZGVvSWQnOiB2aWRQbGF5LnVybFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJHNjb3BlLmN1cnJlbnRTb25nLnBsYXlpbmcgPSBudWxsO1xuICAgICAgIH1cblxuICAgICAgICRzY29wZS5jdXJyZW50U29uZyA9IHZpZFBsYXk7XG4gICAgICAgJHNjb3BlLmlzUGxheWluZyA9IHRydWU7XG4gICAgICAgc29uZy5wbGF5aW5nID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnBhdXNlID0gZnVuY3Rpb24oc29uZykge1xuXG4gICAgICAgJHNjb3BlLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICAgaWYoc29uZyl7XG4gICAgICAgICBzb25nLnBsYXlpbmcgPSBudWxsO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAkc2NvcGUuY3VycmVudFNvbmcucGxheWluZyA9IG51bGw7XG4gICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRTb25nSW5kZXgoc29uZykge1xuICAgICAgcmV0dXJuIHNvbmdzKCkuaW5kZXhPZihzb25nKTtcbiAgICB9XG5cbiAgICAkc2NvcGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgc29uZ3NBcnJheSA9ICRzY29wZS5zb25ncygpO1xuICAgICAgdmFyIGxhc3RJbmRleCA9IHNvbmdzQXJyYXkubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBpbmRleE9mQ3VycmVudFNvbmcgPSBzb25nc0FycmF5LmluZGV4T2YoJHNjb3BlLmN1cnJlbnRTb25nKTtcbiAgICAgIHZhciBzb25nVG9QbGF5ID0gbnVsbDtcblxuICAgICAgaWYoJHNjb3BlLmN1cnJlbnRTb25nKSB7XG4gICAgICAgIGlmKGluZGV4T2ZDdXJyZW50U29uZyA8IGxhc3RJbmRleCApIHtcblxuICAgICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtpbmRleE9mQ3VycmVudFNvbmcgKyAxXTtcblxuICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICBpbmRleE9mQ3VycmVudFNvbmcgPSAwO1xuICAgICAgICAgICBzb25nVG9QbGF5ICA9IHNvbmdzQXJyYXlbaW5kZXhPZkN1cnJlbnRTb25nXTtcbiAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVswXTtcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLnBsYXkoc29uZ1RvUGxheSk7XG4gICB9O1xuXG4gICAkc2NvcGUucHJldmlvdXMgPSBmdW5jdGlvbigpIHtcblxuICAgICB2YXIgc29uZ3NBcnJheSA9ICRzY29wZS5zb25ncygpO1xuICAgICB2YXIgbGFzdEluZGV4ID0gc29uZ3NBcnJheS5sZW5ndGggLSAxO1xuICAgICB2YXIgaW5kZXhPZkN1cnJlbnRTb25nID0gc29uZ3NBcnJheS5pbmRleE9mKCRzY29wZS5jdXJyZW50U29uZyk7XG4gICAgIHZhciBzb25nVG9QbGF5ID0gbnVsbDtcblxuICAgICBpZigkc2NvcGUuY3VycmVudFNvbmcpIHtcbiAgICAgICBpZihpbmRleE9mQ3VycmVudFNvbmcgPiAwICkge1xuXG4gICAgICAgICBzb25nVG9QbGF5ICA9IHNvbmdzQXJyYXlbaW5kZXhPZkN1cnJlbnRTb25nIC0gMV07XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIGluZGV4T2ZDdXJyZW50U29uZyA9IGxhc3RJbmRleDtcbiAgICAgICAgICBzb25nVG9QbGF5ICA9IHNvbmdzQXJyYXlbaW5kZXhPZkN1cnJlbnRTb25nXTtcbiAgICAgICAgfVxuICAgICB9IGVsc2Uge1xuICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtsYXN0SW5kZXhdO1xuICAgICB9XG5cbiAgICAgJHNjb3BlLnBsYXkoc29uZ1RvUGxheSk7XG4gICAgfTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL2hvbWUuY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBOYXZDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkcm9vdFNjb3BlLCAkYXV0aCwgJGxvY2F0aW9uLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlLCAkaHR0cCwgQXBpU3luYykge1xuICAgICduZ0luamVjdCc7XG4gICAgZnVuY3Rpb24gY2hhbmdlTmF2Q29sb3IoKXtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnbmF2Lm5hdi1iYXInKS5jc3MoJ2NvbG9yJywnYmxhY2snKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnbmF2Lm5hdi1iYXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCd3aGl0ZScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhciB1bCcpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ3doaXRlJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsLm5hdi1tZW51IGEnKS5jc3MoJ2NvbG9yJywnYmxhY2snKTtcbiAgICB9XG5cbiAgICAkc2NvcGUuaXNfb3BlbiA9IGZhbHNlO1xuXG4gICAgJHNjb3BlLnBsYXlsaXN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEFwaVN5bmMuZ2V0UGxheWxpc3RzKCk7XG4gICAgfTtcblxuICAgIHRoaXMucGFnZVJlZGlyZWN0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIGlmKCRyb290U2NvcGUudXNlci5pZCkge1xuICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3VzZXJzLycrICRyb290U2NvcGUudXNlci5pZCk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5zaWduT3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAkYXV0aC5zaWduT3V0KCk7XG4gICAgfTtcblxuICAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ291dC1zdWNjZXNzJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICRzY29wZS51c2VyU2lnbmVkSW4gPSBudWxsO1xuICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5yZW1vdmUoJ2N1cnJlbnRVc2VyJyk7XG4gICAgICBjaGFuZ2VOYXZDb2xvcigpO1xuICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICB9KTtcblxuICAgICRzY29wZS50b2dnbGVNZW51ID0gZnVuY3Rpb24oZXZlbnQsIHhfaWQpIHtcblxuICAgICAgYW5ndWxhci5lbGVtZW50KCcjbW9iaWxlLWhhbS1ibGFjaycpLnRvZ2dsZUNsYXNzKCdoaWRlJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJyNtb2JpbGUtaGFtLXdoaXRlJykudG9nZ2xlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI21vYmlsZS14LWJsYWNrJykudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXknKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI21vYmlsZS14LXdoaXRlJykudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXknKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnZGl2IycrIHhfaWQpLnRvZ2dsZUNsYXNzKCdkaXNwbGF5Jyk7XG5cbiAgICB9O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvbmF2LmNvbnRyb2xsZXIuanMiLCJleHBvcnQgY2xhc3MgUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRhdXRoLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sIGxvY2FsU3RvcmFnZVNlcnZpY2Upe1xuICAgICduZ0luamVjdCc7XG4gICAgXG4gICAgdmFyIHNldFVzZXIgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnY3VycmVudFVzZXInLCBvYmopO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc3VibWl0UmVnaXN0cmF0aW9uID0gZnVuY3Rpb24ocmVnaXN0cmF0aW9uRm9ybSkge1xuXG4gICAgICAkYXV0aC5zdWJtaXRSZWdpc3RyYXRpb24ocmVnaXN0cmF0aW9uRm9ybSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAkYXV0aC5zdWJtaXRMb2dpbih7XG4gICAgICAgICAgICBlbWFpbDogcmVnaXN0cmF0aW9uRm9ybS5lbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkOiByZWdpc3RyYXRpb25Gb3JtLnBhc3N3b3JkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ2luLXN1Y2Nlc3MnLCBmdW5jdGlvbihldiwgdXNlcikge1xuXG4gICAgICBzZXRVc2VyKHVzZXIpO1xuICAgICAgJGxvY2F0aW9uLnBhdGgoJy91c2Vycy8nKyB1c2VyLmlkKTtcblxuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvcmVnaXN0cmF0aW9ucy5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIFNlc3Npb25zQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGF1dGgsICRyb290U2NvcGUsICRsb2NhdGlvbiwgVXNlciwgUGxheWxpc3QsIGxvY2FsU3RvcmFnZVNlcnZpY2Upe1xuICAgICduZ0luamVjdCc7XG4gICAgJHNjb3BlLmVycm9yID0gbnVsbDtcblxuICAgIHZhciBzZXRVc2VyID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2N1cnJlbnRVc2VyJywgb2JqKTtcbiAgICB9O1xuXG5cbiAgICRzY29wZS5zdWJtaXRMb2dpbiA9IGZ1bmN0aW9uKGxvZ2luRm9ybSkge1xuICAgICAkYXV0aC5zdWJtaXRMb2dpbihsb2dpbkZvcm0pLnRoZW4oZnVuY3Rpb24odXNlcikge1xuXG4gICAgICAgICAgICAgc2V0VXNlcih1c2VyKTtcbiAgICAgfSk7XG4gICB9O1xuXG4gICAkcm9vdFNjb3BlLiRvbignYXV0aDpsb2dpbi1zdWNjZXNzJywgZnVuY3Rpb24oZXYsIHVzZXIpIHtcblxuICAgICAkbG9jYXRpb24ucGF0aCgnL3VzZXJzLycrIHVzZXIuaWQpO1xuXG4gICB9KTtcbiAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ2luLWVycm9yJywgZnVuY3Rpb24oZXYsIHJlYXNvbikge1xuICAgICAkc2NvcGUuZXJyb3IgPSByZWFzb24uZXJyb3JzWzBdO1xuICAgfSk7XG5cbiAgIFVzZXIucXVlcnkoe3BsYXlsaXN0SWQ6ICcnfSx7dXNlcklkOiAxfSkudGhlbihmdW5jdGlvbihyZXN1bHRzKXtcbiAgICAgJHNjb3BlLnVzZXJzID0gcmVzdWx0cztcbiAgIH0pO1xuXG5cbiAgICRzY29wZS5zaWduT3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICRhdXRoLnNpZ25PdXQoKTtcbiAgIH07XG5cbiAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ291dC1zdWNjZXNzJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvc2Vzc2lvbnMuY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBCdWJibGVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHJvb3RTY29wZSwkc2NvcGUsJHdpbmRvdywgJGRvY3VtZW50KSB7XG4gICduZ0luamVjdCc7XG4gIHZhciBsYXZhMDtcbiAgdmFyIGdlMWRvb3QgPSB7XG4gICAgc2NyZWVuOiB7XG4gICAgICBlbGVtOiAgICAgbnVsbCxcbiAgICAgIGNhbGxiYWNrOiBudWxsLFxuICAgICAgY3R4OiAgICAgIG51bGwsXG4gICAgICB3aWR0aDogICAgMCxcbiAgICAgIGhlaWdodDogICAwLFxuICAgICAgbGVmdDogICAgIDAsXG4gICAgICB0b3A6ICAgICAgMCxcbiAgICAgIGluaXQ6IGZ1bmN0aW9uIChpZCwgY2FsbGJhY2ssIGluaXRSZXMpIHtcbiAgICAgICAgdGhpcy5lbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2sgfHwgbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuZWxlbS50YWdOYW1lID09IFwiQ0FOVkFTXCIpIHRoaXMuY3R4ID0gdGhpcy5lbGVtLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICB9LmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5lbGVtLm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICB0aGlzLmVsZW0ub25kcmFnICAgICAgICA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIGluaXRSZXMgJiYgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuICAgICAgcmVzaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvID0gdGhpcy5lbGVtO1xuICAgICAgICB0aGlzLndpZHRoICA9IG8ub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gby5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGZvciAodGhpcy5sZWZ0ID0gMCwgdGhpcy50b3AgPSAwOyBvICE9IG51bGw7IG8gPSBvLm9mZnNldFBhcmVudCkge1xuICAgICAgICAgIHRoaXMubGVmdCArPSBvLm9mZnNldExlZnQ7XG4gICAgICAgICAgdGhpcy50b3AgICs9IG8ub2Zmc2V0VG9wO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN0eCkge1xuICAgICAgICAgIHRoaXMuZWxlbS53aWR0aCAgPSB0aGlzLndpZHRoO1xuICAgICAgICAgIHRoaXMuZWxlbS5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gUG9pbnQgY29uc3RydWN0b3JcbiAgdmFyIFBvaW50ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLm1hZ25pdHVkZSA9IHggKiB4ICsgeSAqIHk7XG4gICAgdGhpcy5jb21wdXRlZCA9IDA7XG4gICAgdGhpcy5mb3JjZSA9IDA7XG4gIH07XG4gIFBvaW50LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggKyBwLngsIHRoaXMueSArIHAueSk7XG4gIH07XG5cbiAgLy8gQmFsbCBjb25zdHJ1Y3RvclxuICB2YXIgQmFsbCA9IGZ1bmN0aW9uKHBhcmVudCkge1xuICAgIHZhciBtaW4gPSAuMTtcbiAgICB2YXIgbWF4ID0gMS41O1xuICAgIHRoaXMudmVsID0gbmV3IFBvaW50KFxuICAgICAgKE1hdGgucmFuZG9tKCkgPiAwLjUgPyAxIDogLTEpICogKDAuMiArIE1hdGgucmFuZG9tKCkgKiAwLjAyNSksIChNYXRoLnJhbmRvbSgpID4gMC41ID8gMSA6IC0xKSAqICgwLjIgKyBNYXRoLnJhbmRvbSgpKVxuICAgICk7XG4gICAgdGhpcy5wb3MgPSBuZXcgUG9pbnQoXG4gICAgICBwYXJlbnQud2lkdGggKiAwLjIgKyBNYXRoLnJhbmRvbSgpICogcGFyZW50LndpZHRoICogMC42LFxuICAgICAgcGFyZW50LmhlaWdodCAqIDAuMiArIE1hdGgucmFuZG9tKCkgKiBwYXJlbnQuaGVpZ2h0ICogMC42XG4gICAgKTtcbiAgICB0aGlzLnNpemUgPSAocGFyZW50LndoIC8gMTUpICsgKCBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4gKSAqIChwYXJlbnQud2ggLyAxNSk7XG4gICAgdGhpcy53aWR0aCA9IHBhcmVudC53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IHBhcmVudC5oZWlnaHQ7XG4gIH07XG5cbiAgLy8gbW92ZSBiYWxsc1xuICBCYWxsLnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBib3VuY2UgYm9yZGVyc1xuICAgIGlmICh0aGlzLnBvcy54ID49IHRoaXMud2lkdGggLSB0aGlzLnNpemUpIHtcbiAgICAgIGlmICh0aGlzLnZlbC54ID4gMCkgdGhpcy52ZWwueCA9IC10aGlzLnZlbC54O1xuICAgICAgdGhpcy5wb3MueCA9IHRoaXMud2lkdGggLSB0aGlzLnNpemU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBvcy54IDw9IHRoaXMuc2l6ZSkge1xuICAgICAgaWYgKHRoaXMudmVsLnggPCAwKSB0aGlzLnZlbC54ID0gLXRoaXMudmVsLng7XG4gICAgICB0aGlzLnBvcy54ID0gdGhpcy5zaXplO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBvcy55ID49IHRoaXMuaGVpZ2h0IC0gdGhpcy5zaXplKSB7XG4gICAgICBpZiAodGhpcy52ZWwueSA+IDApIHRoaXMudmVsLnkgPSAtdGhpcy52ZWwueTtcbiAgICAgIHRoaXMucG9zLnkgPSB0aGlzLmhlaWdodCAtIHRoaXMuc2l6ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9zLnkgPD0gdGhpcy5zaXplKSB7XG4gICAgICBpZiAodGhpcy52ZWwueSA8IDApIHRoaXMudmVsLnkgPSAtdGhpcy52ZWwueTtcbiAgICAgIHRoaXMucG9zLnkgPSB0aGlzLnNpemU7XG4gICAgfVxuXG4gICAgLy8gdmVsb2NpdHlcbiAgICB0aGlzLnBvcyA9IHRoaXMucG9zLmFkZCh0aGlzLnZlbCk7XG5cbiAgfTtcblxuICAvLyBsYXZhbGFtcCBjb25zdHJ1Y3RvclxuICB2YXIgTGF2YUxhbXAgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBudW1CYWxscywgYzAsIGMxKSB7XG4gICAgdGhpcy5zdGVwID0gNTtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy53aCA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuc3ggPSBNYXRoLmZsb29yKHRoaXMud2lkdGggLyB0aGlzLnN0ZXApO1xuICAgIHRoaXMuc3kgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0IC8gdGhpcy5zdGVwKTtcbiAgICB0aGlzLnBhaW50ID0gZmFsc2U7XG4gICAgdGhpcy5tZXRhRmlsbCA9IGNyZWF0ZVJhZGlhbEdyYWRpZW50KHdpZHRoLCBoZWlnaHQsIHdpZHRoLCBjMCwgYzEpO1xuICAgIHRoaXMucGx4ID0gWzAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDBdO1xuICAgIHRoaXMucGx5ID0gWzAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDEsIDEsIDAsIDEsIDAsIDFdO1xuICAgIHRoaXMubXNjYXNlcyA9IFswLCAzLCAwLCAzLCAxLCAzLCAwLCAzLCAyLCAyLCAwLCAyLCAxLCAxLCAwXTtcbiAgICB0aGlzLml4ID0gWzEsIDAsIC0xLCAwLCAwLCAxLCAwLCAtMSwgLTEsIDAsIDEsIDAsIDAsIDEsIDEsIDAsIDAsIDAsIDEsIDFdO1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgIHRoaXMuYmFsbHMgPSBbXTtcbiAgICB0aGlzLml0ZXIgPSAwO1xuICAgIHRoaXMuc2lnbiA9IDE7XG5cbiAgICAvLyBpbml0IGdyaWRcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8ICh0aGlzLnN4ICsgMikgKiAodGhpcy5zeSArIDIpOyBpKyspIHtcbiAgICAgIHRoaXMuZ3JpZFtpXSA9IG5ldyBQb2ludChcbiAgICAgICAgKGkgJSAodGhpcy5zeCArIDIpKSAqIHRoaXMuc3RlcCwgKE1hdGguZmxvb3IoaSAvICh0aGlzLnN4ICsgMikpKSAqIHRoaXMuc3RlcFxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBtZXRhYmFsbHNcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IDEwOyBrKyspIHtcbiAgICAgIHRoaXMuYmFsbHNba10gPSBuZXcgQmFsbCh0aGlzKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gY29tcHV0ZSBjZWxsIGZvcmNlXG4gIExhdmFMYW1wLnByb3RvdHlwZS5jb21wdXRlRm9yY2UgPSBmdW5jdGlvbih4LCB5LCBpZHgpIHtcblxuICAgIHZhciBmb3JjZTtcbiAgICB2YXIgaWQgPSBpZHggfHwgeCArIHkgKiAodGhpcy5zeCArIDIpO1xuXG4gICAgaWYgKHggPT09IDAgfHwgeSA9PT0gMCB8fCB4ID09PSB0aGlzLnN4IHx8IHkgPT09IHRoaXMuc3kpIHtcbiAgICAgIGZvcmNlID0gMC4wNiAqIHRoaXMuc2lnbjtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yY2UgPSAwO1xuICAgICAgdmFyIGNlbGwgPSB0aGlzLmdyaWRbaWRdO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIGJhbGw7XG4gICAgICB3aGlsZSAoYmFsbCA9IHRoaXMuYmFsbHNbaSsrXSkge1xuICAgICAgICBmb3JjZSArPSBiYWxsLnNpemUgKiBiYWxsLnNpemUgLyAoLTIgKiBjZWxsLnggKiBiYWxsLnBvcy54IC0gMiAqIGNlbGwueSAqIGJhbGwucG9zLnkgKyBiYWxsLnBvcy5tYWduaXR1ZGUgKyBjZWxsLm1hZ25pdHVkZSk7XG4gICAgICB9XG4gICAgICBmb3JjZSAqPSB0aGlzLnNpZ25cbiAgICB9XG4gICAgdGhpcy5ncmlkW2lkXS5mb3JjZSA9IGZvcmNlO1xuICAgIHJldHVybiBmb3JjZTtcbiAgfTtcblxuICAvLyBjb21wdXRlIGNlbGxcbiAgTGF2YUxhbXAucHJvdG90eXBlLm1hcmNoaW5nU3F1YXJlcyA9IGZ1bmN0aW9uKG5leHQpIHtcbiAgICB2YXIgeCA9IG5leHRbMF07XG4gICAgdmFyIHkgPSBuZXh0WzFdO1xuICAgIHZhciBwZGlyID0gbmV4dFsyXTtcbiAgICB2YXIgaWQgPSB4ICsgeSAqICh0aGlzLnN4ICsgMik7XG4gICAgaWYgKHRoaXMuZ3JpZFtpZF0uY29tcHV0ZWQgPT09IHRoaXMuaXRlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgZGlyLCBtc2Nhc2UgPSAwO1xuXG4gICAgLy8gbmVpZ2hib3JzIGZvcmNlXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIHZhciBpZG4gPSAoeCArIHRoaXMuaXhbaSArIDEyXSkgKyAoeSArIHRoaXMuaXhbaSArIDE2XSkgKiAodGhpcy5zeCArIDIpO1xuICAgICAgdmFyIGZvcmNlID0gdGhpcy5ncmlkW2lkbl0uZm9yY2U7XG4gICAgICBpZiAoKGZvcmNlID4gMCAmJiB0aGlzLnNpZ24gPCAwKSB8fCAoZm9yY2UgPCAwICYmIHRoaXMuc2lnbiA+IDApIHx8ICFmb3JjZSkge1xuICAgICAgICAvLyBjb21wdXRlIGZvcmNlIGlmIG5vdCBpbiBidWZmZXJcbiAgICAgICAgZm9yY2UgPSB0aGlzLmNvbXB1dGVGb3JjZShcbiAgICAgICAgICB4ICsgdGhpcy5peFtpICsgMTJdLFxuICAgICAgICAgIHkgKyB0aGlzLml4W2kgKyAxNl0sXG4gICAgICAgICAgaWRuXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoTWF0aC5hYnMoZm9yY2UpID4gMSkgbXNjYXNlICs9IE1hdGgucG93KDIsIGkpO1xuICAgIH1cbiAgICBpZiAobXNjYXNlID09PSAxNSkge1xuICAgICAgLy8gaW5zaWRlXG4gICAgICByZXR1cm4gW3gsIHkgLSAxLCBmYWxzZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFtYmlndW91cyBjYXNlc1xuICAgICAgaWYgKG1zY2FzZSA9PT0gNSkgZGlyID0gKHBkaXIgPT09IDIpID8gMyA6IDE7XG4gICAgICBlbHNlIGlmIChtc2Nhc2UgPT09IDEwKSBkaXIgPSAocGRpciA9PT0gMykgPyAwIDogMjtcbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBsb29rdXBcbiAgICAgICAgZGlyID0gdGhpcy5tc2Nhc2VzW21zY2FzZV07XG4gICAgICAgIHRoaXMuZ3JpZFtpZF0uY29tcHV0ZWQgPSB0aGlzLml0ZXI7XG4gICAgICB9XG4gICAgICAvLyBkcmF3IGxpbmVcbiAgICAgIHZhciBpeCA9IHRoaXMuc3RlcCAvIChcbiAgICAgICAgICBNYXRoLmFicyhNYXRoLmFicyh0aGlzLmdyaWRbKHggKyB0aGlzLnBseFs0ICogZGlyICsgMl0pICsgKHkgKyB0aGlzLnBseVs0ICogZGlyICsgMl0pICogKHRoaXMuc3ggKyAyKV0uZm9yY2UpIC0gMSkgL1xuICAgICAgICAgIE1hdGguYWJzKE1hdGguYWJzKHRoaXMuZ3JpZFsoeCArIHRoaXMucGx4WzQgKiBkaXIgKyAzXSkgKyAoeSArIHRoaXMucGx5WzQgKiBkaXIgKyAzXSkgKiAodGhpcy5zeCArIDIpXS5mb3JjZSkgLSAxKSArIDFcbiAgICAgICAgKTtcbiAgICAgIGN0eC5saW5lVG8oXG4gICAgICAgIHRoaXMuZ3JpZFsoeCArIHRoaXMucGx4WzQgKiBkaXJdKSArICh5ICsgdGhpcy5wbHlbNCAqIGRpcl0pICogKHRoaXMuc3ggKyAyKV0ueCArIHRoaXMuaXhbZGlyXSAqIGl4LFxuICAgICAgICB0aGlzLmdyaWRbKHggKyB0aGlzLnBseFs0ICogZGlyICsgMV0pICsgKHkgKyB0aGlzLnBseVs0ICogZGlyICsgMV0pICogKHRoaXMuc3ggKyAyKV0ueSArIHRoaXMuaXhbZGlyICsgNF0gKiBpeFxuICAgICAgKTtcbiAgICAgIHRoaXMucGFpbnQgPSB0cnVlO1xuICAgICAgLy8gbmV4dFxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgeCArIHRoaXMuaXhbZGlyICsgNF0sXG4gICAgICAgIHkgKyB0aGlzLml4W2RpciArIDhdLFxuICAgICAgICBkaXJcbiAgICAgIF07XG4gICAgfVxuICB9O1xuXG4gIExhdmFMYW1wLnByb3RvdHlwZS5yZW5kZXJNZXRhYmFsbHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaSA9IDAsIGJhbGw7XG4gICAgd2hpbGUgKGJhbGwgPSB0aGlzLmJhbGxzW2krK10pIGJhbGwubW92ZSgpO1xuICAgIC8vIHJlc2V0IGdyaWRcbiAgICB0aGlzLml0ZXIrKztcbiAgICB0aGlzLnNpZ24gPSAtdGhpcy5zaWduO1xuICAgIHRoaXMucGFpbnQgPSBmYWxzZTtcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5tZXRhRmlsbDtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgLy8gY29tcHV0ZSBtZXRhYmFsbHNcbiAgICBpID0gMDtcbiAgICAvL2N0eC5zaGFkb3dCbHVyID0gNTA7XG4gICAgLy9jdHguc2hhZG93Q29sb3IgPSBcImdyZWVuXCI7XG4gICAgd2hpbGUgKGJhbGwgPSB0aGlzLmJhbGxzW2krK10pIHtcbiAgICAgIC8vIGZpcnN0IGNlbGxcbiAgICAgIHZhciBuZXh0ID0gW1xuICAgICAgICBNYXRoLnJvdW5kKGJhbGwucG9zLnggLyB0aGlzLnN0ZXApLFxuICAgICAgICBNYXRoLnJvdW5kKGJhbGwucG9zLnkgLyB0aGlzLnN0ZXApLCBmYWxzZVxuICAgICAgXTtcbiAgICAgIC8vIG1hcmNoaW5nIHNxdWFyZXNcbiAgICAgIGRvIHtcbiAgICAgICAgbmV4dCA9IHRoaXMubWFyY2hpbmdTcXVhcmVzKG5leHQpO1xuICAgICAgfSB3aGlsZSAobmV4dCk7XG4gICAgICAvLyBmaWxsIGFuZCBjbG9zZSBwYXRoXG4gICAgICBpZiAodGhpcy5wYWludCkge1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5wYWludCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBncmFkaWVudHNcbiAgdmFyIGNyZWF0ZVJhZGlhbEdyYWRpZW50ID0gZnVuY3Rpb24odywgaCwgciwgYzAsIGMxKSB7XG4gICAgdmFyIGdyYWRpZW50ID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KFxuICAgICAgdyAvIDEsIGggLyAxLCAwLFxuICAgICAgdyAvIDEsIGggLyAxLCByXG4gICAgKTtcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgYzApO1xuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBjMSk7XG4gICAgcmV0dXJuIGdyYWRpZW50O1xuICB9O1xuXG4gIC8vIG1haW4gbG9vcFxuICB2YXIgcnVuID0gZnVuY3Rpb24oc3RhdGUpIHtcblxuICAgIGlmKHN0YXRlKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocnVuKTtcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgc2NyZWVuLndpZHRoLCBzY3JlZW4uaGVpZ2h0KTtcbiAgICAgIGxhdmEwLnJlbmRlck1ldGFiYWxscygpO1xuICAgIH1cbiAgfTtcblxuICAvLyBjYW52YXNcbiAgdmFyIHNjcmVlbiA9IGdlMWRvb3Quc2NyZWVuLmluaXQoXCJidWJibGVcIiwgbnVsbCwgdHJ1ZSksXG4gICAgICBjdHggPSBzY3JlZW4uY3R4O1xuICAgICAgc2NyZWVuLnJlc2l6ZSgpO1xuICAvLyBjcmVhdGUgTGF2YUxhbXBzXG4gIGxhdmEwID0gbmV3IExhdmFMYW1wKHNjcmVlbi53aWR0aCwgc2NyZWVuLmhlaWdodCwgMTAwLCBcIiNmNTEyYjVcIiwgXCIjNWYyNWI4XCIpO1xuXG4gICAgcnVuKGFuZ3VsYXIuZWxlbWVudCgnI2J1YmJsZScpLmlzKCc6dmlzaWJsZScpKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uKCl7XG4gICAgICBpZihhbmd1bGFyLmVsZW1lbnQoJyNidWJibGUnKS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICBsYXZhMCA9IG5ldyBMYXZhTGFtcChzY3JlZW4ud2lkdGgsIHNjcmVlbi5oZWlnaHQsIDEwMCwgXCIjZjUxMmI1XCIsIFwiIzVmMjViOFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL2J1YmJsZS5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICgkbG9nLCAkaHR0cCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICB0aGlzLmFwaUhvc3QgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9Td2lpcC9nZW5lcmF0b3ItZ3VscC1hbmd1bGFyJztcbiAgfVxuXG4gIGdldENvbnRyaWJ1dG9ycyhsaW1pdD0zMCkge1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCh0aGlzLmFwaUhvc3QgKyAnL2NvbnRyaWJ1dG9ycz9wZXJfcGFnZT0nICsgbGltaXQpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLiRsb2cuZXJyb3IoJ1hIUiBGYWlsZWQgZm9yIGdldENvbnRyaWJ1dG9ycy5cXG4nICsgYW5ndWxhci50b0pzb24oZXJyb3IuZGF0YSwgdHJ1ZSkpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwiZXhwb3J0IGNsYXNzIFdlYkRldlRlY1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuZGF0YSA9IFtcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0FuZ3VsYXJKUycsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9hbmd1bGFyanMub3JnLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdIVE1MIGVuaGFuY2VkIGZvciB3ZWIgYXBwcyEnLFxuICAgICAgICAnbG9nbyc6ICdhbmd1bGFyLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdCcm93c2VyU3luYycsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2Jyb3dzZXJzeW5jLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaW1lLXNhdmluZyBzeW5jaHJvbmlzZWQgYnJvd3NlciB0ZXN0aW5nLicsXG4gICAgICAgICdsb2dvJzogJ2Jyb3dzZXJzeW5jLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdHdWxwSlMnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9ndWxwanMuY29tLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc3RyZWFtaW5nIGJ1aWxkIHN5c3RlbS4nLFxuICAgICAgICAnbG9nbyc6ICdndWxwLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdKYXNtaW5lJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vamFzbWluZS5naXRodWIuaW8vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0JlaGF2aW9yLURyaXZlbiBKYXZhU2NyaXB0LicsXG4gICAgICAgICdsb2dvJzogJ2phc21pbmUucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0thcm1hJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8va2FybWEtcnVubmVyLmdpdGh1Yi5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnU3BlY3RhY3VsYXIgVGVzdCBSdW5uZXIgZm9yIEphdmFTY3JpcHQuJyxcbiAgICAgICAgJ2xvZ28nOiAna2FybWEucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ1Byb3RyYWN0b3InLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3Byb3RyYWN0b3InLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnRW5kIHRvIGVuZCB0ZXN0IGZyYW1ld29yayBmb3IgQW5ndWxhckpTIGFwcGxpY2F0aW9ucyBidWlsdCBvbiB0b3Agb2YgV2ViRHJpdmVySlMuJyxcbiAgICAgICAgJ2xvZ28nOiAncHJvdHJhY3Rvci5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQm9vdHN0cmFwJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQm9vdHN0cmFwIGlzIHRoZSBtb3N0IHBvcHVsYXIgSFRNTCwgQ1NTLCBhbmQgSlMgZnJhbWV3b3JrIGZvciBkZXZlbG9waW5nIHJlc3BvbnNpdmUsIG1vYmlsZSBmaXJzdCBwcm9qZWN0cyBvbiB0aGUgd2ViLicsXG4gICAgICAgICdsb2dvJzogJ2Jvb3RzdHJhcC5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQW5ndWxhciBVSSBCb290c3RyYXAnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9hbmd1bGFyLXVpLmdpdGh1Yi5pby9ib290c3RyYXAvJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0Jvb3RzdHJhcCBjb21wb25lbnRzIHdyaXR0ZW4gaW4gcHVyZSBBbmd1bGFySlMgYnkgdGhlIEFuZ3VsYXJVSSBUZWFtLicsXG4gICAgICAgICdsb2dvJzogJ3VpLWJvb3RzdHJhcC5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnU2FzcyAoTm9kZSknLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9zYXNzL25vZGUtc2FzcycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdOb2RlLmpzIGJpbmRpbmcgdG8gbGlic2FzcywgdGhlIEMgdmVyc2lvbiBvZiB0aGUgcG9wdWxhciBzdHlsZXNoZWV0IHByZXByb2Nlc3NvciwgU2Fzcy4nLFxuICAgICAgICAnbG9nbyc6ICdub2RlLXNhc3MucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0VTNiAoQmFiZWwgZm9ybWVybHkgNnRvNSknLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vYmFiZWxqcy5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVHVybnMgRVM2KyBjb2RlIGludG8gdmFuaWxsYSBFUzUsIHNvIHlvdSBjYW4gdXNlIG5leHQgZ2VuZXJhdGlvbiBmZWF0dXJlcyB0b2RheS4nLFxuICAgICAgICAnbG9nbyc6ICdiYWJlbC5wbmcnXG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIGdldFRlYygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvd2ViRGV2VGVjL3dlYkRldlRlYy5zZXJ2aWNlLmpzIiwiZXhwb3J0IGNsYXNzIFlvdVR1YmVBcGlLZXlTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuYXBpS2V5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJ0FJemFTeURhd3lQTGx0N05CM2U3WlNnMFRVRWtyMUEzRFNZQ2xDRSc7XG4gICAgfTsgXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9hcGlrZXlzL3lvdVR1YmVBcGlLZXkuc2VydmljZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBOYXZiYXJEaXJlY3RpdmUoKSB7XG4gICduZ0luamVjdCc7XG5cbiAgbGV0IGRpcmVjdGl2ZSA9IHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5odG1sJyxcbiAgICBzY29wZToge1xuICAgICAgICBjcmVhdGlvbkRhdGU6ICc9J1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogTmF2YmFyQ29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59XG5cbmNsYXNzIE5hdmJhckNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAobW9tZW50KSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIC8vIFwidGhpcy5jcmVhdGlvbkRhdGVcIiBpcyBhdmFpbGFibGUgYnkgZGlyZWN0aXZlIG9wdGlvbiBcImJpbmRUb0NvbnRyb2xsZXI6IHRydWVcIlxuICAgIHRoaXMucmVsYXRpdmVEYXRlID0gbW9tZW50KHRoaXMuY3JlYXRpb25EYXRlKS5mcm9tTm93KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBNYWxhcmtleURpcmVjdGl2ZShtYWxhcmtleSkge1xuICAnbmdJbmplY3QnO1xuXG4gIGxldCBkaXJlY3RpdmUgPSB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgICBleHRyYVZhbHVlczogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogJyZuYnNwOycsXG4gICAgbGluazogbGlua0Z1bmMsXG4gICAgY29udHJvbGxlcjogTWFsYXJrZXlDb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgZnVuY3Rpb24gbGlua0Z1bmMoc2NvcGUsIGVsLCBhdHRyLCB2bSkge1xuICAgIGxldCB3YXRjaGVyO1xuICAgIGxldCB0eXBpc3QgPSBtYWxhcmtleShlbFswXSwge1xuICAgICAgdHlwZVNwZWVkOiA0MCxcbiAgICAgIGRlbGV0ZVNwZWVkOiA0MCxcbiAgICAgIHBhdXNlRGVsYXk6IDgwMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBwb3N0Zml4OiAnICdcbiAgICB9KTtcblxuICAgIGVsLmFkZENsYXNzKCdhY21lLW1hbGFya2V5Jyk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuZXh0cmFWYWx1ZXMsICh2YWx1ZSkgPT4ge1xuICAgICAgdHlwaXN0LnR5cGUodmFsdWUpLnBhdXNlKCkuZGVsZXRlKCk7XG4gICAgfSk7XG5cbiAgICB3YXRjaGVyID0gc2NvcGUuJHdhdGNoKCd2bS5jb250cmlidXRvcnMnLCAoKSA9PiB7XG4gICAgICBhbmd1bGFyLmZvckVhY2godm0uY29udHJpYnV0b3JzLCAoY29udHJpYnV0b3IpID0+IHtcbiAgICAgICAgdHlwaXN0LnR5cGUoY29udHJpYnV0b3IubG9naW4pLnBhdXNlKCkuZGVsZXRlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICB3YXRjaGVyKCk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5jbGFzcyBNYWxhcmtleUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAoJGxvZywgZ2l0aHViQ29udHJpYnV0b3IpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB0aGlzLmNvbnRyaWJ1dG9ycyA9IFtdO1xuXG4gICAgdGhpcy5hY3RpdmF0ZShnaXRodWJDb250cmlidXRvcik7XG4gIH1cblxuICBhY3RpdmF0ZShnaXRodWJDb250cmlidXRvcikge1xuICAgIHJldHVybiB0aGlzLmdldENvbnRyaWJ1dG9ycyhnaXRodWJDb250cmlidXRvcikudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLiRsb2cuaW5mbygnQWN0aXZhdGVkIENvbnRyaWJ1dG9ycyBWaWV3Jyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDb250cmlidXRvcnMoZ2l0aHViQ29udHJpYnV0b3IpIHtcbiAgICByZXR1cm4gZ2l0aHViQ29udHJpYnV0b3IuZ2V0Q29udHJpYnV0b3JzKDEwKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLmNvbnRyaWJ1dG9ycyA9IGRhdGE7XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbnRyaWJ1dG9ycztcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL21hbGFya2V5L21hbGFya2V5LmRpcmVjdGl2ZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=