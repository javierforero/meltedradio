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
	
	var _navbar = __webpack_require__(12);
	
	var _malarkey = __webpack_require__(13);
	
	angular.module('meltedRadio', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'ng-token-auth', 'rails', 'LocalStorageModule']).constant('malarkey', malarkey).constant('moment', moment).config(_index.config).config(_index2.routerConfig).config(["$authProvider", function ($authProvider) {
	  $authProvider.configure({
	    apiUrl: 'http://localhost:3000'
	  });
	}]).config(["localStorageServiceProvider", function (localStorageServiceProvider) {
	  localStorageServiceProvider.setPrefix('meltedRadio');
	}]).config(["railsSerializerProvider", function (railsSerializerProvider) {
	  railsSerializerProvider.underscore(angular.identity).camelize(angular.identity);
	}]).run(_index3.runBlock).service('githubContributor', _githubContributor.GithubContributorService).service('webDevTec', _webDevTec.WebDevTecService).controller('MainController', _main.MainController).controller('HomeController', _home.HomeController).controller('NavController', _nav.NavController).controller('RegistrationsController', _registrations.RegistrationsController).controller('SessionsController', _sessions.SessionsController).controller('BubbleController', _bubble.BubbleController).directive('acmeNavbar', _navbar.NavbarDirective).directive('acmeMalarkey', _malarkey.MalarkeyDirective).directive('onFinishRender', ["$timeout", function ($timeout) {
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
	}]); /* global malarkey:false, moment:false */

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
	
	var HomeController = exports.HomeController = ["$scope", "$rootScope", "$auth", "$location", "User", "Playlist", "localStorageService", "$uibModal", "Song", "ApiSync", "$http", "$sce", "$window", "$log", function HomeController($scope, $rootScope, $auth, $location, User, Playlist, localStorageService, $uibModal, Song, ApiSync, $http, $sce, $window, $log) {
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
	
	    var getVideoInfoUrl = 'https://www.googleapis.com/youtube/v3/videos?' + 'id=' + video.id.videoId + '&key=' + $window.__env.apiKey + '&part=snippet,contentDetails';
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
	      var myUrl = 'https://www.googleapis.com/youtube/v3/' + 'search?part=snippet' + '&type=video' + '&q=' + searchText + '&key=' + $window.__env.apiKey;
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
/* 13 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjMzYzY5NGViZDEyNGFlMzM5N2IiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9ob21lLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL25hdi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9yZWdpc3RyYXRpb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL3Nlc3Npb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL2J1YmJsZS5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9tYWxhcmtleS9tYWxhcmtleS5kaXJlY3RpdmUuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnN0YW50IiwibWFsYXJrZXkiLCJtb21lbnQiLCJjb25maWciLCIkYXV0aFByb3ZpZGVyIiwiY29uZmlndXJlIiwiYXBpVXJsIiwibG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyIiwic2V0UHJlZml4IiwicmFpbHNTZXJpYWxpemVyUHJvdmlkZXIiLCJ1bmRlcnNjb3JlIiwiaWRlbnRpdHkiLCJjYW1lbGl6ZSIsInJ1biIsInNlcnZpY2UiLCJjb250cm9sbGVyIiwiZGlyZWN0aXZlIiwiJHRpbWVvdXQiLCJyZXN0cmljdCIsImxpbmsiLCJzY29wZSIsImVsZW1lbnQiLCJhdHRyIiwiJGxhc3QiLCIkZW1pdCIsIm9uRmluaXNoUmVuZGVyIiwiZmFjdG9yeSIsIkFwaVN5bmMiLCJzZXRQbGF5bGlzdHMiLCJvYmoiLCJwbGF5bGlzdHMiLCJzZXRTb25ncyIsInNvbmdzIiwiZ2V0UGxheWxpc3RzIiwiZ2V0U29uZ3MiLCJyYWlsc1Jlc291cmNlRmFjdG9yeSIsInVybCIsIm5hbWUiLCIkbG9nUHJvdmlkZXIiLCJ0b2FzdHJDb25maWciLCJkZWJ1Z0VuYWJsZWQiLCJhbGxvd0h0bWwiLCJ0aW1lT3V0IiwicG9zaXRpb25DbGFzcyIsInByZXZlbnREdXBsaWNhdGVzIiwicHJvZ3Jlc3NCYXIiLCJyb3V0ZXJDb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsInN0YXRlIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyQXMiLCJyZXNvbHZlIiwiYXV0aCIsIiRhdXRoIiwidmFsaWRhdGVVc2VyIiwib3RoZXJ3aXNlIiwicnVuQmxvY2siLCIkbG9nIiwiZGVidWciLCJ3ZWJEZXZUZWMiLCJ0b2FzdHIiLCJhd2Vzb21lVGhpbmdzIiwiY2xhc3NBbmltYXRpb24iLCJjcmVhdGlvbkRhdGUiLCJhY3RpdmF0ZSIsImdldFdlYkRldlRlYyIsImdldFRlYyIsImZvckVhY2giLCJhd2Vzb21lVGhpbmciLCJyYW5rIiwiTWF0aCIsInJhbmRvbSIsImluZm8iLCJIb21lQ29udHJvbGxlciIsIiRzY29wZSIsIiRyb290U2NvcGUiLCIkbG9jYXRpb24iLCJVc2VyIiwiUGxheWxpc3QiLCJsb2NhbFN0b3JhZ2VTZXJ2aWNlIiwiJHVpYk1vZGFsIiwiU29uZyIsIiRodHRwIiwiJHNjZSIsIiR3aW5kb3ciLCJ1c2VyU2lnbmVkSW4iLCJnZXQiLCJjdXJyZW50UGxheWxpc3QiLCJjdXJyZW50U29uZyIsInByZXZpb3VzU29uZyIsImlzUGxheWluZyIsInBsYXllciIsInZpZEFycmF5Iiwic2VhcmNoQ3VycmVudFNvbmciLCJjaGFuZ2VOYXZDb2xvciIsImNzcyIsInF1ZXJ5IiwicGxheWxpc3RJZCIsInVzZXJJZCIsImlkIiwidGhlbiIsInJlc3VsdHMiLCJuZXdQbGF5bGlzdCIsIm1vZGFsSW5zdGFuY2UiLCJvcGVuIiwic3VibWl0IiwidGV4dCIsIm1ldGhvZCIsImRhdGEiLCJ0aXRsZSIsInNldFBsYXlsaXN0IiwibGVuZ3RoIiwiZXJyb3IiLCJjbG9zZSIsImRpc21pc3MiLCJwbGF5bGlzdCIsInJlbW92ZUNsYXNzIiwic2V0Iiwic29uZ0lkIiwiZ2V0VmlkZW9Tb25nIiwidmlkZW8iLCJ2aWRlb0lkIiwidG9nZ2xlIiwiZ2V0VmlkZW9JbmZvVXJsIiwiX19lbnYiLCJhcGlLZXkiLCJhZGRWaWRlb1RvUGxheWxpc3QiLCJpdGVtcyIsImNvbnZlcnREdXJhdGlvbiIsInN0cmluZyIsImFycmF5IiwibWF0Y2giLCJmb3JtYXR0ZWQiLCJtYXAiLCJpdGVtIiwiam9pbiIsInNuaXBwZXQiLCJhcnRpc3QiLCJkZXNjcmlwdGlvbiIsImR1cmF0aW9uIiwiY29udGVudERldGFpbHMiLCJkZWxldGVTb25nIiwic29uZyIsInJlc3BvbnNlIiwiY3VycmVudF9wbGF5bGlzdCIsInNldFNlYXJjaFJlc3VsdHMiLCJ2aWRlb3MiLCJnZXRWaWRlb3MiLCJzZWFyY2hUZXh0IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmVwbGFjZSIsIm15VXJsIiwiZ2V0VXJsIiwidHJ1c3RTcmMiLCJzcmMiLCJ0cnVzdEFzUmVzb3VyY2VVcmwiLCJ0b2dnbGVNZW51IiwiY3JlYXRlUGxheWVyIiwiaSIsInZpZFBsYXllck9iaiIsIllUIiwiUGxheWVyIiwiZXZlbnRzIiwib25QbGF5ZXJTdGF0ZUNoYW5nZSIsInB1c2giLCIkb24iLCJuZ1JlcGVhdEZpbmlzaGVkRXZlbnQiLCJvblBsYXllclJlYWR5IiwiZXZlbnQiLCJ0YXJnZXQiLCJwbGF5VmlkZW8iLCJQbGF5ZXJTdGF0ZSIsIlBMQVlJTkciLCJzZWFyY2hWaWRMb2dpYyIsInBhdXNlIiwicGF1c2VWaWRlbyIsInN0b3BWaWRlbyIsInBsYXkiLCJ2aWRIZWlnaHQiLCJoZWlnaHQiLCJ2aWRXaWR0aCIsIndpZHRoIiwidmlkUGxheSIsImxvYWRWaWRlb0J5SWQiLCJwbGF5aW5nIiwiZ2V0U29uZ0luZGV4IiwiaW5kZXhPZiIsIm5leHQiLCJzb25nc0FycmF5IiwibGFzdEluZGV4IiwiaW5kZXhPZkN1cnJlbnRTb25nIiwic29uZ1RvUGxheSIsInByZXZpb3VzIiwiTmF2Q29udHJvbGxlciIsImlzX29wZW4iLCJwYWdlUmVkaXJlY3QiLCJ1c2VyIiwicGF0aCIsInNpZ25PdXQiLCJldiIsInJlbW92ZSIsInhfaWQiLCJ0b2dnbGVDbGFzcyIsIlJlZ2lzdHJhdGlvbnNDb250cm9sbGVyIiwic2V0VXNlciIsInN1Ym1pdFJlZ2lzdHJhdGlvbiIsInJlZ2lzdHJhdGlvbkZvcm0iLCJzdWJtaXRMb2dpbiIsImVtYWlsIiwicGFzc3dvcmQiLCJTZXNzaW9uc0NvbnRyb2xsZXIiLCJsb2dpbkZvcm0iLCJyZWFzb24iLCJlcnJvcnMiLCJ1c2VycyIsIkJ1YmJsZUNvbnRyb2xsZXIiLCIkZG9jdW1lbnQiLCJsYXZhMCIsImdlMWRvb3QiLCJzY3JlZW4iLCJlbGVtIiwiY2FsbGJhY2siLCJjdHgiLCJsZWZ0IiwidG9wIiwiaW5pdCIsImluaXRSZXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidGFnTmFtZSIsImdldENvbnRleHQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIiwiYmluZCIsIm9uc2VsZWN0c3RhcnQiLCJvbmRyYWciLCJvIiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXRQYXJlbnQiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0VG9wIiwiUG9pbnQiLCJ4IiwieSIsIm1hZ25pdHVkZSIsImNvbXB1dGVkIiwiZm9yY2UiLCJwcm90b3R5cGUiLCJhZGQiLCJwIiwiQmFsbCIsInBhcmVudCIsIm1pbiIsIm1heCIsInZlbCIsInBvcyIsInNpemUiLCJ3aCIsIm1vdmUiLCJMYXZhTGFtcCIsIm51bUJhbGxzIiwiYzAiLCJjMSIsInN0ZXAiLCJzeCIsImZsb29yIiwic3kiLCJwYWludCIsIm1ldGFGaWxsIiwiY3JlYXRlUmFkaWFsR3JhZGllbnQiLCJwbHgiLCJwbHkiLCJtc2Nhc2VzIiwiaXgiLCJncmlkIiwiYmFsbHMiLCJpdGVyIiwic2lnbiIsImsiLCJjb21wdXRlRm9yY2UiLCJpZHgiLCJjZWxsIiwiYmFsbCIsIm1hcmNoaW5nU3F1YXJlcyIsInBkaXIiLCJkaXIiLCJtc2Nhc2UiLCJpZG4iLCJhYnMiLCJwb3ciLCJsaW5lVG8iLCJyZW5kZXJNZXRhYmFsbHMiLCJmaWxsU3R5bGUiLCJiZWdpblBhdGgiLCJyb3VuZCIsImZpbGwiLCJjbG9zZVBhdGgiLCJ3IiwiaCIsInIiLCJncmFkaWVudCIsImFkZENvbG9yU3RvcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNsZWFyUmVjdCIsImlzIiwiYXBpSG9zdCIsImxpbWl0IiwiY2F0Y2giLCJ0b0pzb24iLCJXZWJEZXZUZWNTZXJ2aWNlIiwiTmF2YmFyRGlyZWN0aXZlIiwiTmF2YmFyQ29udHJvbGxlciIsImJpbmRUb0NvbnRyb2xsZXIiLCJyZWxhdGl2ZURhdGUiLCJmcm9tTm93IiwiTWFsYXJrZXlEaXJlY3RpdmUiLCJleHRyYVZhbHVlcyIsInRlbXBsYXRlIiwibGlua0Z1bmMiLCJNYWxhcmtleUNvbnRyb2xsZXIiLCJlbCIsInZtIiwid2F0Y2hlciIsInR5cGlzdCIsInR5cGVTcGVlZCIsImRlbGV0ZVNwZWVkIiwicGF1c2VEZWxheSIsImxvb3AiLCJwb3N0Zml4IiwiYWRkQ2xhc3MiLCJ2YWx1ZSIsInR5cGUiLCJkZWxldGUiLCIkd2F0Y2giLCJjb250cmlidXRvcnMiLCJjb250cmlidXRvciIsImxvZ2luIiwiZ2l0aHViQ29udHJpYnV0b3IiLCJnZXRDb250cmlidXRvcnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUlBQSxTQUFRQyxPQUFPLGVBQWUsQ0FBQyxhQUFhLGFBQWEsV0FBVyxjQUFjLGNBQWMsVUFBVSxjQUFjLGFBQWEsZ0JBQWdCLFVBQVUsaUJBQWlCLFNBQVMsdUJBQ3RMQyxTQUFTLFlBQVlDLFVBQ3JCRCxTQUFTLFVBQVVFLFFBQ25CQyxPQUhILGVBSUdBLE9BSkgsc0JBS0dBLHlCQUFPLFVBQVNDLGVBQWU7R0FDN0JBLGNBQWNDLFVBQVU7S0FDcEJDLFFBQVE7O0tBR2JILHVDQUFPLFVBQVNJLDZCQUE0QjtHQUMzQ0EsNEJBQTRCQyxVQUFVO0tBRXZDTCxtQ0FBTyxVQUFTTSx5QkFBd0I7R0FDdkNBLHdCQUF3QkMsV0FBV1osUUFBUWEsVUFBVUMsU0FBU2QsUUFBUWE7S0FFeEVFLElBaEJILGtCQWlCR0MsUUFBUSxxQkFqQlgsNkNBa0JHQSxRQUFRLGFBbEJYLDZCQW1CR0MsV0FBVyxrQkFuQmQsc0JBb0JHQSxXQUFXLGtCQXBCZCxzQkFxQkdBLFdBQVcsaUJBckJkLG9CQXNCR0EsV0FBVywyQkF0QmQsd0NBdUJHQSxXQUFX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cEMsS0FBSzFSLE9BQU9BO0tBQ1osS0FBS3VSLGVBQWU7O0tBRXBCLEtBQUtoUixTQUFTbVI7OztHQWdCaEIsYUFBYSxvQkFBb0IsQ0FBQztLQUNoQyxLQUFLO0tBQ0wsT0FBTyxTQUFTLFNBZlRBLG1CQUFtQjtPQUFBOztPQUMxQixPQUFPLEtBQUtDLGdCQUFnQkQsbUJBQW1CL08sS0FBSyxZQUFNO1NBQ3hELE1BQUszQyxLQUFLZSxLQUFLOzs7TUFvQmhCO0tBQ0QsS0FBSztLQUNMLE9BQU8sU0FBUyxnQkFsQkYyUSxtQkFBbUI7T0FBQTs7T0FDakMsT0FBT0Esa0JBQWtCQyxnQkFBZ0IsSUFBSWhQLEtBQUssVUFBQ1EsTUFBUztTQUMxRCxPQUFLb08sZUFBZXBPOztTQUVwQixPQUFPLE9BQUtvTzs7Ozs7R0F5QmhCLE9BQU8iLCJmaWxlIjoiaW5kZXgubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjMzYzY5NGViZDEyNGFlMzM5N2IiLCIvKiBnbG9iYWwgbWFsYXJrZXk6ZmFsc2UsIG1vbWVudDpmYWxzZSAqL1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2luZGV4LmNvbmZpZyc7XG5pbXBvcnQgeyByb3V0ZXJDb25maWcgfSBmcm9tICcuL2luZGV4LnJvdXRlJztcbmltcG9ydCB7IHJ1bkJsb2NrIH0gZnJvbSAnLi9pbmRleC5ydW4nO1xuaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIgfSBmcm9tICcuL21haW4vbWFpbi5jb250cm9sbGVyJztcbmltcG9ydCB7IEhvbWVDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL2hvbWUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL25hdi5jb250cm9sbGVyJztcbmltcG9ydCB7IFJlZ2lzdHJhdGlvbnNDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL3JlZ2lzdHJhdGlvbnMuY29udHJvbGxlcic7XG5pbXBvcnQgeyBTZXNzaW9uc0NvbnRyb2xsZXIgfSBmcm9tICcuL3NjcmlwdHMvY29udHJvbGxlcnMvc2Vzc2lvbnMuY29udHJvbGxlcic7XG5pbXBvcnQgeyBCdWJibGVDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL2J1YmJsZS5jb250cm9sbGVyJztcbmltcG9ydCB7IEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL2dpdGh1YkNvbnRyaWJ1dG9yL2dpdGh1YkNvbnRyaWJ1dG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2ViRGV2VGVjU2VydmljZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL3dlYkRldlRlYy93ZWJEZXZUZWMuc2VydmljZSc7XG5pbXBvcnQgeyBOYXZiYXJEaXJlY3RpdmUgfSBmcm9tICcuLi9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYWxhcmtleURpcmVjdGl2ZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL21hbGFya2V5L21hbGFya2V5LmRpcmVjdGl2ZSc7XG5cblxuXG5hbmd1bGFyLm1vZHVsZSgnbWVsdGVkUmFkaW8nLCBbJ25nQW5pbWF0ZScsICduZ0Nvb2tpZXMnLCAnbmdUb3VjaCcsICduZ1Nhbml0aXplJywgJ25nTWVzc2FnZXMnLCAnbmdBcmlhJywgJ25nUmVzb3VyY2UnLCAndWkucm91dGVyJywgJ3VpLmJvb3RzdHJhcCcsICd0b2FzdHInLCAnbmctdG9rZW4tYXV0aCcsICdyYWlscycsICdMb2NhbFN0b3JhZ2VNb2R1bGUnXSlcbiAgLmNvbnN0YW50KCdtYWxhcmtleScsIG1hbGFya2V5KVxuICAuY29uc3RhbnQoJ21vbWVudCcsIG1vbWVudClcbiAgLmNvbmZpZyhjb25maWcpXG4gIC5jb25maWcocm91dGVyQ29uZmlnKVxuICAuY29uZmlnKGZ1bmN0aW9uKCRhdXRoUHJvdmlkZXIpIHtcbiAgICAgJGF1dGhQcm92aWRlci5jb25maWd1cmUoe1xuICAgICAgICAgYXBpVXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJ1xuICAgICB9KTtcbiAgIH0pXG4gICAuY29uZmlnKGZ1bmN0aW9uKGxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlcil7XG4gICAgIGxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlci5zZXRQcmVmaXgoJ21lbHRlZFJhZGlvJyk7XG4gICB9KVxuICAgLmNvbmZpZyhmdW5jdGlvbihyYWlsc1NlcmlhbGl6ZXJQcm92aWRlcil7XG4gICAgIHJhaWxzU2VyaWFsaXplclByb3ZpZGVyLnVuZGVyc2NvcmUoYW5ndWxhci5pZGVudGl0eSkuY2FtZWxpemUoYW5ndWxhci5pZGVudGl0eSk7XG4gICB9KVxuICAucnVuKHJ1bkJsb2NrKVxuICAuc2VydmljZSgnZ2l0aHViQ29udHJpYnV0b3InLCBHaXRodWJDb250cmlidXRvclNlcnZpY2UpXG4gIC5zZXJ2aWNlKCd3ZWJEZXZUZWMnLCBXZWJEZXZUZWNTZXJ2aWNlKVxuICAuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgSG9tZUNvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdOYXZDb250cm9sbGVyJywgTmF2Q29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ1JlZ2lzdHJhdGlvbnNDb250cm9sbGVyJywgUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdTZXNzaW9uc0NvbnRyb2xsZXInLCBTZXNzaW9uc0NvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdCdWJibGVDb250cm9sbGVyJywgQnViYmxlQ29udHJvbGxlcilcbiAgLmRpcmVjdGl2ZSgnYWNtZU5hdmJhcicsIE5hdmJhckRpcmVjdGl2ZSlcbiAgLmRpcmVjdGl2ZSgnYWNtZU1hbGFya2V5JywgTWFsYXJrZXlEaXJlY3RpdmUpXG4gIC5kaXJlY3RpdmUoJ29uRmluaXNoUmVuZGVyJywgZnVuY3Rpb24oJHRpbWVvdXQpe1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XG4gICAgICAgIGlmIChzY29wZS4kbGFzdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLiRlbWl0KGF0dHIub25GaW5pc2hSZW5kZXIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICB9O1xuXG4gIH0pXG4gIC5mYWN0b3J5KCdBcGlTeW5jJywgZnVuY3Rpb24oKXtcbiAgICB2YXIgQXBpU3luYyA9IHt9O1xuXG4gICAgQXBpU3luYy5zZXRQbGF5bGlzdHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgIEFwaVN5bmMucGxheWxpc3RzID0gb2JqO1xuICAgIH07XG5cbiAgICBBcGlTeW5jLnNldFNvbmdzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIEFwaVN5bmMuc29uZ3MgPSBvYmo7XG4gICAgfTtcblxuICAgIEFwaVN5bmMuZ2V0UGxheWxpc3RzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gQXBpU3luYy5wbGF5bGlzdHM7XG4gICAgfTtcblxuICAgIEFwaVN5bmMuZ2V0U29uZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBBcGlTeW5jLnNvbmdzO1xuICAgIH07XG5cbiAgICByZXR1cm4gQXBpU3luYztcbiAgfSlcbiAgLmZhY3RvcnkoJ1BsYXlsaXN0JywgZnVuY3Rpb24ocmFpbHNSZXNvdXJjZUZhY3RvcnkpIHtcbiAgICByZXR1cm4gcmFpbHNSZXNvdXJjZUZhY3Rvcnkoe1xuICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3BsYXlsaXN0cycsXG4gICAgICBuYW1lOiAncGxheWxpc3QnXG4gICAgfSk7XG4gIH0pXG4gIC5mYWN0b3J5KCdVc2VyJyxmdW5jdGlvbihyYWlsc1Jlc291cmNlRmFjdG9yeSl7XG4gICAgcmV0dXJuIHJhaWxzUmVzb3VyY2VGYWN0b3J5KHtcbiAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC91c2Vycy97e3VzZXJJZH19L3BsYXlsaXN0cycsXG4gICAgICBuYW1lOiAndXNlcidcbiAgICB9KTtcbiAgfSlcbiAgLmZhY3RvcnkoJ1NvbmcnLCBmdW5jdGlvbihyYWlsc1Jlc291cmNlRmFjdG9yeSl7XG4gICAgcmV0dXJuIHJhaWxzUmVzb3VyY2VGYWN0b3J5KHtcbiAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9wbGF5bGlzdHMve3twbGF5bGlzdElkfX0vc29uZ3MnLFxuICAgICAgbmFtZTogJ3NvbmcnXG4gICAgfSk7XG4gIH0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJleHBvcnQgZnVuY3Rpb24gY29uZmlnICgkbG9nUHJvdmlkZXIsIHRvYXN0ckNvbmZpZykge1xuICAnbmdJbmplY3QnO1xuICAvLyBFbmFibGUgbG9nXG4gICRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XG5cbiAgLy8gU2V0IG9wdGlvbnMgdGhpcmQtcGFydHkgbGliXG4gIHRvYXN0ckNvbmZpZy5hbGxvd0h0bWwgPSB0cnVlO1xuICB0b2FzdHJDb25maWcudGltZU91dCA9IDMwMDA7XG4gIHRvYXN0ckNvbmZpZy5wb3NpdGlvbkNsYXNzID0gJ3RvYXN0LXRvcC1yaWdodCc7XG4gIHRvYXN0ckNvbmZpZy5wcmV2ZW50RHVwbGljYXRlcyA9IHRydWU7XG4gIHRvYXN0ckNvbmZpZy5wcm9ncmVzc0JhciA9IHRydWU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4LmNvbmZpZy5qcyIsImV4cG9ydCBmdW5jdGlvbiByb3V0ZXJDb25maWcgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgJ25nSW5qZWN0JztcbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ21haW4nLCB7XG4gICAgICB1cmw6ICcvJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL21haW4vbWFpbi5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcicsXG4gICAgICBjb250cm9sbGVyQXM6ICdtYWluJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdzaWduX2luJywge1xuICAgICAgdXJsOiAnL3NpZ25faW4nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdmlld3MvdXNlcl9zZXNzaW9ucy9uZXcuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnU2Vzc2lvbnNDb250cm9sbGVyIGFzIHNpZ25pbidcbiAgICB9KVxuICAgIC5zdGF0ZSgnc2lnbl91cCcsIHtcbiAgICAgIHVybDogJy9zaWduX3VwJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL3VzZXJfcmVnaXN0cmF0aW9ucy9uZXcuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXIgYXMgc2lnbnVwJ1xuICAgIH0pXG4gICAgLnN0YXRlICAoJ2hvbWUnLCB7XG4gICAgICB1cmw6ICcvdXNlcnMvOmlkJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL2hvbWUuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXIgYXMgaG9tZScsXG4gICAgICByZXNvbHZlOiB7XG4gICAgICAgICBhdXRoOiBmdW5jdGlvbigkYXV0aCkge1xuICAgICAgICAgICByZXR1cm4gJGF1dGgudmFsaWRhdGVVc2VyKCk7XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgIH0pO1xuXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXgucm91dGUuanMiLCJleHBvcnQgZnVuY3Rpb24gcnVuQmxvY2sgKCRsb2cpIHtcbiAgJ25nSW5qZWN0JztcbiAgJGxvZy5kZWJ1ZygncnVuQmxvY2sgZW5kJyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsImV4cG9ydCBjbGFzcyBNYWluQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yICgkdGltZW91dCwgd2ViRGV2VGVjLCB0b2FzdHIpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy5hd2Vzb21lVGhpbmdzID0gW107XG4gICAgdGhpcy5jbGFzc0FuaW1hdGlvbiA9ICcnO1xuICAgIHRoaXMuY3JlYXRpb25EYXRlID0gMTQ4MTYzOTcwNDEwNztcbiAgICB0aGlzLnRvYXN0ciA9IHRvYXN0cjtcblxuXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGltZW91dCwgd2ViRGV2VGVjKTtcbiAgfVxuXG4gIGFjdGl2YXRlKCR0aW1lb3V0LCB3ZWJEZXZUZWMpIHtcbiAgICB0aGlzLmdldFdlYkRldlRlYyh3ZWJEZXZUZWMpO1xuICAgICR0aW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xhc3NBbmltYXRpb24gPSAncnViYmVyQmFuZCc7XG4gICAgfSwgNDAwMCk7XG4gIH1cblxuICBnZXRXZWJEZXZUZWMod2ViRGV2VGVjKSB7XG4gICAgdGhpcy5hd2Vzb21lVGhpbmdzID0gd2ViRGV2VGVjLmdldFRlYygpO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuYXdlc29tZVRoaW5ncywgKGF3ZXNvbWVUaGluZykgPT4ge1xuICAgICAgYXdlc29tZVRoaW5nLnJhbmsgPSBNYXRoLnJhbmRvbSgpO1xuICAgIH0pO1xuICB9XG5cbiAgc2hvd1RvYXN0cigpIHtcbiAgICB0aGlzLnRvYXN0ci5pbmZvKCdGb3JrIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vU3dpaXAvZ2VuZXJhdG9yLWd1bHAtYW5ndWxhclwiIHRhcmdldD1cIl9ibGFua1wiPjxiPmdlbmVyYXRvci1ndWxwLWFuZ3VsYXI8L2I+PC9hPicpO1xuICAgIHRoaXMuY2xhc3NBbmltYXRpb24gPSAnJztcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9tYWluL21haW4uY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBIb21lQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yICgkc2NvcGUsICRyb290U2NvcGUsICRhdXRoLCAkbG9jYXRpb24sIFVzZXIsIFBsYXlsaXN0LGxvY2FsU3RvcmFnZVNlcnZpY2UsICR1aWJNb2RhbCwgU29uZywgQXBpU3luYywgJGh0dHAsJHNjZSwgJHdpbmRvdywgJGxvZykge1xuICAgICduZ0luamVjdCc7XG4gICAgJHNjb3BlLnVzZXJTaWduZWRJbiA9IGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdjdXJyZW50VXNlcicpO1xuICAgICRzY29wZS5jdXJyZW50UGxheWxpc3QgPSBudWxsO1xuICAgICRzY29wZS5zb25ncyA9IG51bGw7XG4gICAgJHNjb3BlLmN1cnJlbnRTb25nID0gbnVsbDtcbiAgICAkc2NvcGUucHJldmlvdXNTb25nID0gbnVsbDtcbiAgICAkc2NvcGUuaXNQbGF5aW5nID0gIGZhbHNlO1xuICAgIHZhciBwbGF5ZXI7XG4gICAgdmFyIHZpZEFycmF5ID0gW107XG4gICAgdmFyIHNlYXJjaEN1cnJlbnRTb25nID0gbnVsbDtcblxuICAgIChmdW5jdGlvbiBjaGFuZ2VOYXZDb2xvcigpe1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnY29sb3InLCd3aGl0ZScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ2JsYWNrJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsI2Rlc2t0b3AtbmF2LW1lbnUnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCdibGFjaycpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCd1bCNtb2JpbGUtbmF2LW1lbnUtYmxhY2snKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCdibGFjaycpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCd1bC5uYXYtbWVudSBhJykuY3NzKCdjb2xvcicsJ3doaXRlJyk7XG4gICAgfSkoKTtcblxuXG4gICAgVXNlci5xdWVyeSh7cGxheWxpc3RJZDogJyd9LHt1c2VySWQ6ICRzY29wZS51c2VyU2lnbmVkSW4uaWR9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpe1xuICAgICAgQXBpU3luYy5zZXRQbGF5bGlzdHMocmVzdWx0cyk7XG4gICAgfSk7XG5cblxuICAgICRzY29wZS5wbGF5bGlzdHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBBcGlTeW5jLmdldFBsYXlsaXN0cygpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc29uZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAgQXBpU3luYy5nZXRTb25ncygpO1xuICAgIH07XG5cbiAgICAkc2NvcGUubmV3UGxheWxpc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5tb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC92aWV3cy9hZGRwbGF5bGlzdC5odG1sJyxcbiAgICAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmKCRzY29wZS50ZXh0KSB7XG5cbiAgICAgICAkaHR0cCh7XG4gICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC91c2Vycy8nICsgJHNjb3BlLnVzZXJTaWduZWRJbi5pZCArICcvcGxheWxpc3RzJyxcbiAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgdGl0bGU6ICRzY29wZS50ZXh0XG4gICAgICAgICB9XG4gICAgICAgfSkudGhlbihmdW5jdGlvbihyZXN1bHRzKXtcblxuICAgICAgICAgQXBpU3luYy5zZXRQbGF5bGlzdHMocmVzdWx0cy5kYXRhKTtcbiAgICAgICAgICRzY29wZS5zZXRQbGF5bGlzdChyZXN1bHRzLmRhdGFbcmVzdWx0cy5kYXRhLmxlbmd0aCAtIDFdKTtcblxuICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAkbG9nKGVycm9yKTtcbiAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUudGV4dCA9ICcnO1xuICAgICAgICAkc2NvcGUubW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuZGlzbWlzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLm1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgfTtcblxuICAgICRyb290U2NvcGUuc2V0UGxheWxpc3QgPSBmdW5jdGlvbihwbGF5bGlzdCkge1xuXG4gICAgICAgYW5ndWxhci5lbGVtZW50KCdkaXYucGxheWxpc3QtY29udGVudCcpLnJlbW92ZUNsYXNzKCdvdmVyZmxvdycpO1xuICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnY3VycmVudFBsYXlsaXN0JywgcGxheWxpc3QpO1xuICAgICAgICAkc2NvcGUuY3VycmVudFBsYXlsaXN0ID0gIGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdjdXJyZW50UGxheWxpc3QnKTtcblxuICAgICAgICBpZigkc2NvcGUuY3VycmVudFBsYXlsaXN0KSB7XG5cbiAgICAgICAgICBTb25nLnF1ZXJ5KHtzb25nSWQ6ICcnfSx7cGxheWxpc3RJZDogJHNjb3BlLmN1cnJlbnRQbGF5bGlzdC5pZH0pLnRoZW4oZnVuY3Rpb24oc29uZ3Mpe1xuXG4gICAgICAgICAgICAgQXBpU3luYy5zZXRTb25ncyhzb25ncyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5nZXRWaWRlb1NvbmcgPSBmdW5jdGlvbihwbGF5bGlzdCwgdmlkZW8pIHtcblxuICAgICAgYW5ndWxhci5lbGVtZW50KCd1bCMnK3ZpZGVvLmlkLnZpZGVvSWQpLnRvZ2dsZShcInNsb3dcIik7XG5cbiAgICAgdmFyIGdldFZpZGVvSW5mb1VybCA9ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3ZpZGVvcz8nK1xuICAgICAgICAgICAgICAgICAgICdpZD0nK1xuICAgICAgICAgICAgICAgICAgIHZpZGVvLmlkLnZpZGVvSWQrXG4gICAgICAgICAgICAgICAgICAgJyZrZXk9JytcbiAgICAgICAgICAgICAgICAgICAkd2luZG93Ll9fZW52LmFwaUtleStcbiAgICAgICAgICAgICAgICAgICAnJnBhcnQ9c25pcHBldCxjb250ZW50RGV0YWlscyc7XG4gICAgICAgICAkaHR0cCh7XG5cbiAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgdXJsOiBnZXRWaWRlb0luZm9VcmxcblxuICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXN1bHRzKXtcblxuICAgICAgICAgICBhZGRWaWRlb1RvUGxheWxpc3QocGxheWxpc3QscmVzdWx0cy5kYXRhLml0ZW1zWzBdKTtcblxuICAgICAgICAgfSxmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5jb252ZXJ0RHVyYXRpb24gPSBmdW5jdGlvbihzdHJpbmcpIHtcblxuICAgICAgICB2YXIgYXJyYXkgPSBzdHJpbmcubWF0Y2goLyhcXGQrKSg/PVtNSFNdKS9pZyl8fFtdO1xuICAgICAgICB2YXIgZm9ybWF0dGVkID0gYXJyYXkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgIGlmKGl0ZW0ubGVuZ3RoPDIpIHJldHVybiAnMCcraXRlbTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9KS5qb2luKCc6Jyk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZDtcblxuICAgIH07XG5cbiAgIGZ1bmN0aW9uIGFkZFZpZGVvVG9QbGF5bGlzdChwbGF5bGlzdCwgdmlkZW8pIHtcbiAgICAgICAkaHR0cCh7XG4gICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9wbGF5bGlzdHMvJyArIHBsYXlsaXN0LmlkICsnL3NvbmdzJyxcbiAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgdGl0bGU6IHZpZGVvLnNuaXBwZXQudGl0bGUsXG4gICAgICAgICAgIGFydGlzdDogdmlkZW8uc25pcHBldC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgdXJsOiB2aWRlby5pZCxcbiAgICAgICAgICAgZHVyYXRpb246IHZpZGVvLmNvbnRlbnREZXRhaWxzLmR1cmF0aW9uXG4gICAgICAgICB9XG4gICAgICAgfSkudGhlbihcbiAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdHMpe1xuICAgICAgICAgICBBcGlTeW5jLnNldFNvbmdzKHJlc3VsdHMuZGF0YSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAkbG9nKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmRlbGV0ZVNvbmcgPSBmdW5jdGlvbihzb25nKSB7XG5cbiAgICAgICAkaHR0cCh7XG4gICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3BsYXlsaXN0cy8nICsgJHNjb3BlLmN1cnJlbnRQbGF5bGlzdC5pZCArJy9zb25ncy8nKyBzb25nLmlkXG4gICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cbiAgICAgICAgICRzY29wZS5zZXRQbGF5bGlzdChyZXNwb25zZS5kYXRhLmN1cnJlbnRfcGxheWxpc3QpO1xuICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgc2V0U2VhcmNoUmVzdWx0cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgJHNjb3BlLnZpZGVvcyA9IG9iajtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldFZpZGVvcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgaWYoJHNjb3BlLnRleHQpIHtcblxuICAgICAgICAgJHNjb3BlLnNldFBsYXlsaXN0KG51bGwpO1xuICAgICAgICAgdmFyIHNlYXJjaFRleHQgPSBlbmNvZGVVUklDb21wb25lbnQoJHNjb3BlLnRleHQpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xuICAgICAgICAgdmFyIG15VXJsID0gICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzLycrXG4gICAgICAgICAgICAgICAgICAgICAgJ3NlYXJjaD9wYXJ0PXNuaXBwZXQnK1xuICAgICAgICAgICAgICAgICAgICAgICcmdHlwZT12aWRlbycrXG4gICAgICAgICAgICAgICAgICAgICAgJyZxPScrXG4gICAgICAgICAgICAgICAgICAgICAgc2VhcmNoVGV4dCtcbiAgICAgICAgICAgICAgICAgICAgICAnJmtleT0nK1xuICAgICAgICAgICAgICAgICAgICAgICR3aW5kb3cuX19lbnYuYXBpS2V5O1xuICAgICAgICAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG15VXJsXG5cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cbiAgICAgICAgICBzZXRTZWFyY2hSZXN1bHRzKHJlc3BvbnNlLmRhdGEuaXRlbXMpO1xuXG4gICAgICAgIH0sZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5nZXRVcmwgPSBmdW5jdGlvbih2aWRlbykge1xuICAgICAgcmV0dXJuIFwiaHR0cDovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9cIit2aWRlby5pZC52aWRlb0lkK1wiP2VuYWJsZWpzYXBpPTFcIjtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnRydXN0U3JjID0gZnVuY3Rpb24oc3JjKSB7XG4gICAgICByZXR1cm4gJHNjZS50cnVzdEFzUmVzb3VyY2VVcmwoc3JjKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnRvZ2dsZU1lbnUgPSBmdW5jdGlvbih2aWRlb0lkKSB7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsIycrdmlkZW9JZCkudG9nZ2xlKFwic2xvd1wiKTtcbiAgICB9O1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoKSB7XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8ICRzY29wZS52aWRlb3MubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgIHZhciBpZCA9ICd2aWQtJysoaSsxKTtcbiAgICAgICAgICB2YXIgdmlkUGxheWVyT2JqID0gbmV3IFlULlBsYXllcihpZCwge1xuICAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgJ29uU3RhdGVDaGFuZ2UnOiAkc2NvcGUub25QbGF5ZXJTdGF0ZUNoYW5nZVxuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSk7XG4gICAgICAgICAgIHZpZEFycmF5LnB1c2godmlkUGxheWVyT2JqKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICRzY29wZS4kb24oJ25nUmVwZWF0RmluaXNoZWQnLCBmdW5jdGlvbihuZ1JlcGVhdEZpbmlzaGVkRXZlbnQpIHtcblxuICAgICAgIGNyZWF0ZVBsYXllcigpO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLm9uUGxheWVyUmVhZHkgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICBldmVudC50YXJnZXQucGxheVZpZGVvKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5vblBsYXllclN0YXRlQ2hhbmdlID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICBpZihldmVudC5kYXRhID09IFlULlBsYXllclN0YXRlLlBMQVlJTkcpIHtcbiAgICAgICAgICBzZWFyY2hWaWRMb2dpYyhldmVudC50YXJnZXQpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2VhcmNoVmlkTG9naWModmlkZW8pIHtcbiAgICAgIGlmKCRzY29wZS5jdXJyZW50U29uZyAmJiAkc2NvcGUuaXNQbGF5aW5nKSB7XG4gICAgICAgICRzY29wZS5wYXVzZSgpO1xuICAgICAgfVxuICAgICAgaWYoc2VhcmNoQ3VycmVudFNvbmcpIHtcbiAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcucGF1c2VWaWRlbygpO1xuICAgICAgICBzZWFyY2hDdXJyZW50U29uZyA9IHZpZGVvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcgID0gdmlkZW87XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wVmlkZW8oKSB7XG5cbiAgICAgIHBsYXllci5zdG9wVmlkZW8oKTtcbiAgICB9XG5cbiAgICAkc2NvcGUucGxheSA9IGZ1bmN0aW9uKHNvbmcpIHtcblxuICAgICAgICB2YXIgdmlkSGVpZ2h0ID0gYW5ndWxhci5lbGVtZW50KCdkaXYudmlkZW8nKS5oZWlnaHQoKTtcbiAgICAgICAgdmFyIHZpZFdpZHRoID0gYW5ndWxhci5lbGVtZW50KCdkaXYudmlkZW8nKS53aWR0aCgpO1xuICAgICAgICB2YXIgdmlkUGxheSA9IHNvbmcgfHwgJHNjb3BlLnNvbmdzKClbMF1cblxuICAgICAgICBpZihzZWFyY2hDdXJyZW50U29uZykge1xuICAgICAgICAgIHNlYXJjaEN1cnJlbnRTb25nLnN0b3BWaWRlbygpO1xuICAgICAgICAgIHNlYXJjaEN1cnJlbnRTb25nID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCEkc2NvcGUuY3VycmVudFNvbmcpIHtcblxuICAgICAgICAgcGxheWVyID0gbmV3IFlULlBsYXllcignaWZyYW1lLXV0dWJlLXBsYXllcicsIHtcbiAgICAgICAgICAgaGVpZ2h0OiB2aWRIZWlnaHQsXG4gICAgICAgICAgIHdpZHRoOiAgdmlkV2lkdGgsXG4gICAgICAgICAgIHZpZGVvSWQ6IHZpZFBsYXkudXJsLFxuICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAnb25SZWFkeSc6ICRzY29wZS5vblBsYXllclJlYWR5XG4gICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgICAgIH0gZWxzZSBpZigkc2NvcGUuY3VycmVudFNvbmcgJiYgIXNvbmcpIHtcblxuICAgICAgICAgICAgcGxheWVyLnBsYXlWaWRlbygpO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGxheWVyLmxvYWRWaWRlb0J5SWQoe1xuICAgICAgICAgICAgJ3ZpZGVvSWQnOiB2aWRQbGF5LnVybFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJHNjb3BlLmN1cnJlbnRTb25nLnBsYXlpbmcgPSBudWxsO1xuICAgICAgIH1cblxuICAgICAgICRzY29wZS5jdXJyZW50U29uZyA9IHZpZFBsYXk7XG4gICAgICAgJHNjb3BlLmlzUGxheWluZyA9IHRydWU7XG4gICAgICAgc29uZy5wbGF5aW5nID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnBhdXNlID0gZnVuY3Rpb24oc29uZykge1xuXG4gICAgICAgJHNjb3BlLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICAgaWYoc29uZyl7XG4gICAgICAgICBzb25nLnBsYXlpbmcgPSBudWxsO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAkc2NvcGUuY3VycmVudFNvbmcucGxheWluZyA9IG51bGw7XG4gICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRTb25nSW5kZXgoc29uZykge1xuICAgICAgcmV0dXJuIHNvbmdzKCkuaW5kZXhPZihzb25nKTtcbiAgICB9XG5cbiAgICAkc2NvcGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgc29uZ3NBcnJheSA9ICRzY29wZS5zb25ncygpO1xuICAgICAgdmFyIGxhc3RJbmRleCA9IHNvbmdzQXJyYXkubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBpbmRleE9mQ3VycmVudFNvbmcgPSBzb25nc0FycmF5LmluZGV4T2YoJHNjb3BlLmN1cnJlbnRTb25nKTtcbiAgICAgIHZhciBzb25nVG9QbGF5ID0gbnVsbDtcblxuICAgICAgaWYoJHNjb3BlLmN1cnJlbnRTb25nKSB7XG4gICAgICAgIGlmKGluZGV4T2ZDdXJyZW50U29uZyA8IGxhc3RJbmRleCApIHtcblxuICAgICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtpbmRleE9mQ3VycmVudFNvbmcgKyAxXTtcblxuICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICBpbmRleE9mQ3VycmVudFNvbmcgPSAwO1xuICAgICAgICAgICBzb25nVG9QbGF5ICA9IHNvbmdzQXJyYXlbaW5kZXhPZkN1cnJlbnRTb25nXTtcbiAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVswXTtcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLnBsYXkoc29uZ1RvUGxheSk7XG4gICB9O1xuXG4gICAkc2NvcGUucHJldmlvdXMgPSBmdW5jdGlvbigpIHtcblxuICAgICB2YXIgc29uZ3NBcnJheSA9ICRzY29wZS5zb25ncygpO1xuICAgICB2YXIgbGFzdEluZGV4ID0gc29uZ3NBcnJheS5sZW5ndGggLSAxO1xuICAgICB2YXIgaW5kZXhPZkN1cnJlbnRTb25nID0gc29uZ3NBcnJheS5pbmRleE9mKCRzY29wZS5jdXJyZW50U29uZyk7XG4gICAgIHZhciBzb25nVG9QbGF5ID0gbnVsbDtcblxuICAgICBpZigkc2NvcGUuY3VycmVudFNvbmcpIHtcbiAgICAgICBpZihpbmRleE9mQ3VycmVudFNvbmcgPiAwICkge1xuXG4gICAgICAgICBzb25nVG9QbGF5ICA9IHNvbmdzQXJyYXlbaW5kZXhPZkN1cnJlbnRTb25nIC0gMV07XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIGluZGV4T2ZDdXJyZW50U29uZyA9IGxhc3RJbmRleDtcbiAgICAgICAgICBzb25nVG9QbGF5ICA9IHNvbmdzQXJyYXlbaW5kZXhPZkN1cnJlbnRTb25nXTtcbiAgICAgICAgfVxuICAgICB9IGVsc2Uge1xuICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtsYXN0SW5kZXhdO1xuICAgICB9XG5cbiAgICAgJHNjb3BlLnBsYXkoc29uZ1RvUGxheSk7XG4gICAgfTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL2hvbWUuY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBOYXZDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkcm9vdFNjb3BlLCAkYXV0aCwgJGxvY2F0aW9uLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlLCAkaHR0cCwgQXBpU3luYykge1xuICAgICduZ0luamVjdCc7XG4gICAgZnVuY3Rpb24gY2hhbmdlTmF2Q29sb3IoKXtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnbmF2Lm5hdi1iYXInKS5jc3MoJ2NvbG9yJywnYmxhY2snKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnbmF2Lm5hdi1iYXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCd3aGl0ZScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhciB1bCcpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ3doaXRlJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsLm5hdi1tZW51IGEnKS5jc3MoJ2NvbG9yJywnYmxhY2snKTtcbiAgICB9XG5cbiAgICAkc2NvcGUuaXNfb3BlbiA9IGZhbHNlO1xuXG4gICAgJHNjb3BlLnBsYXlsaXN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEFwaVN5bmMuZ2V0UGxheWxpc3RzKCk7XG4gICAgfTtcblxuICAgIHRoaXMucGFnZVJlZGlyZWN0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIGlmKCRyb290U2NvcGUudXNlci5pZCkge1xuICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3VzZXJzLycrICRyb290U2NvcGUudXNlci5pZCk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5zaWduT3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAkYXV0aC5zaWduT3V0KCk7XG4gICAgfTtcblxuICAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ291dC1zdWNjZXNzJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICRzY29wZS51c2VyU2lnbmVkSW4gPSBudWxsO1xuICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5yZW1vdmUoJ2N1cnJlbnRVc2VyJyk7XG4gICAgICBjaGFuZ2VOYXZDb2xvcigpO1xuICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICB9KTtcblxuICAgICRzY29wZS50b2dnbGVNZW51ID0gZnVuY3Rpb24oZXZlbnQsIHhfaWQpIHtcblxuICAgICAgYW5ndWxhci5lbGVtZW50KCcjbW9iaWxlLWhhbS1ibGFjaycpLnRvZ2dsZUNsYXNzKCdoaWRlJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJyNtb2JpbGUtaGFtLXdoaXRlJykudG9nZ2xlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI21vYmlsZS14LWJsYWNrJykudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXknKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI21vYmlsZS14LXdoaXRlJykudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXknKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnZGl2IycrIHhfaWQpLnRvZ2dsZUNsYXNzKCdkaXNwbGF5Jyk7XG5cbiAgICB9O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvbmF2LmNvbnRyb2xsZXIuanMiLCJleHBvcnQgY2xhc3MgUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRhdXRoLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sIGxvY2FsU3RvcmFnZVNlcnZpY2Upe1xuICAgICduZ0luamVjdCc7XG4gICAgXG4gICAgdmFyIHNldFVzZXIgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnY3VycmVudFVzZXInLCBvYmopO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc3VibWl0UmVnaXN0cmF0aW9uID0gZnVuY3Rpb24ocmVnaXN0cmF0aW9uRm9ybSkge1xuXG4gICAgICAkYXV0aC5zdWJtaXRSZWdpc3RyYXRpb24ocmVnaXN0cmF0aW9uRm9ybSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAkYXV0aC5zdWJtaXRMb2dpbih7XG4gICAgICAgICAgICBlbWFpbDogcmVnaXN0cmF0aW9uRm9ybS5lbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkOiByZWdpc3RyYXRpb25Gb3JtLnBhc3N3b3JkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ2luLXN1Y2Nlc3MnLCBmdW5jdGlvbihldiwgdXNlcikge1xuXG4gICAgICBzZXRVc2VyKHVzZXIpO1xuICAgICAgJGxvY2F0aW9uLnBhdGgoJy91c2Vycy8nKyB1c2VyLmlkKTtcblxuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvcmVnaXN0cmF0aW9ucy5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIFNlc3Npb25zQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGF1dGgsICRyb290U2NvcGUsICRsb2NhdGlvbiwgVXNlciwgUGxheWxpc3QsIGxvY2FsU3RvcmFnZVNlcnZpY2Upe1xuICAgICduZ0luamVjdCc7XG4gICAgJHNjb3BlLmVycm9yID0gbnVsbDtcblxuICAgIHZhciBzZXRVc2VyID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2N1cnJlbnRVc2VyJywgb2JqKTtcbiAgICB9O1xuXG5cbiAgICRzY29wZS5zdWJtaXRMb2dpbiA9IGZ1bmN0aW9uKGxvZ2luRm9ybSkge1xuICAgICAkYXV0aC5zdWJtaXRMb2dpbihsb2dpbkZvcm0pLnRoZW4oZnVuY3Rpb24odXNlcikge1xuXG4gICAgICAgICAgICAgc2V0VXNlcih1c2VyKTtcbiAgICAgfSk7XG4gICB9O1xuXG4gICAkcm9vdFNjb3BlLiRvbignYXV0aDpsb2dpbi1zdWNjZXNzJywgZnVuY3Rpb24oZXYsIHVzZXIpIHtcblxuICAgICAkbG9jYXRpb24ucGF0aCgnL3VzZXJzLycrIHVzZXIuaWQpO1xuXG4gICB9KTtcbiAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ2luLWVycm9yJywgZnVuY3Rpb24oZXYsIHJlYXNvbikge1xuICAgICAkc2NvcGUuZXJyb3IgPSByZWFzb24uZXJyb3JzWzBdO1xuICAgfSk7XG5cbiAgIFVzZXIucXVlcnkoe3BsYXlsaXN0SWQ6ICcnfSx7dXNlcklkOiAxfSkudGhlbihmdW5jdGlvbihyZXN1bHRzKXtcbiAgICAgJHNjb3BlLnVzZXJzID0gcmVzdWx0cztcbiAgIH0pO1xuXG5cbiAgICRzY29wZS5zaWduT3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICRhdXRoLnNpZ25PdXQoKTtcbiAgIH07XG5cbiAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ291dC1zdWNjZXNzJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvc2Vzc2lvbnMuY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBCdWJibGVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHJvb3RTY29wZSwkc2NvcGUsJHdpbmRvdywgJGRvY3VtZW50KSB7XG4gICduZ0luamVjdCc7XG4gIHZhciBsYXZhMDtcbiAgdmFyIGdlMWRvb3QgPSB7XG4gICAgc2NyZWVuOiB7XG4gICAgICBlbGVtOiAgICAgbnVsbCxcbiAgICAgIGNhbGxiYWNrOiBudWxsLFxuICAgICAgY3R4OiAgICAgIG51bGwsXG4gICAgICB3aWR0aDogICAgMCxcbiAgICAgIGhlaWdodDogICAwLFxuICAgICAgbGVmdDogICAgIDAsXG4gICAgICB0b3A6ICAgICAgMCxcbiAgICAgIGluaXQ6IGZ1bmN0aW9uIChpZCwgY2FsbGJhY2ssIGluaXRSZXMpIHtcbiAgICAgICAgdGhpcy5lbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2sgfHwgbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuZWxlbS50YWdOYW1lID09IFwiQ0FOVkFTXCIpIHRoaXMuY3R4ID0gdGhpcy5lbGVtLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICB9LmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5lbGVtLm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICB0aGlzLmVsZW0ub25kcmFnICAgICAgICA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIGluaXRSZXMgJiYgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuICAgICAgcmVzaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvID0gdGhpcy5lbGVtO1xuICAgICAgICB0aGlzLndpZHRoICA9IG8ub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gby5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGZvciAodGhpcy5sZWZ0ID0gMCwgdGhpcy50b3AgPSAwOyBvICE9IG51bGw7IG8gPSBvLm9mZnNldFBhcmVudCkge1xuICAgICAgICAgIHRoaXMubGVmdCArPSBvLm9mZnNldExlZnQ7XG4gICAgICAgICAgdGhpcy50b3AgICs9IG8ub2Zmc2V0VG9wO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN0eCkge1xuICAgICAgICAgIHRoaXMuZWxlbS53aWR0aCAgPSB0aGlzLndpZHRoO1xuICAgICAgICAgIHRoaXMuZWxlbS5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gUG9pbnQgY29uc3RydWN0b3JcbiAgdmFyIFBvaW50ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLm1hZ25pdHVkZSA9IHggKiB4ICsgeSAqIHk7XG4gICAgdGhpcy5jb21wdXRlZCA9IDA7XG4gICAgdGhpcy5mb3JjZSA9IDA7XG4gIH07XG4gIFBvaW50LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggKyBwLngsIHRoaXMueSArIHAueSk7XG4gIH07XG5cbiAgLy8gQmFsbCBjb25zdHJ1Y3RvclxuICB2YXIgQmFsbCA9IGZ1bmN0aW9uKHBhcmVudCkge1xuICAgIHZhciBtaW4gPSAuMTtcbiAgICB2YXIgbWF4ID0gMS41O1xuICAgIHRoaXMudmVsID0gbmV3IFBvaW50KFxuICAgICAgKE1hdGgucmFuZG9tKCkgPiAwLjUgPyAxIDogLTEpICogKDAuMiArIE1hdGgucmFuZG9tKCkgKiAwLjAyNSksIChNYXRoLnJhbmRvbSgpID4gMC41ID8gMSA6IC0xKSAqICgwLjIgKyBNYXRoLnJhbmRvbSgpKVxuICAgICk7XG4gICAgdGhpcy5wb3MgPSBuZXcgUG9pbnQoXG4gICAgICBwYXJlbnQud2lkdGggKiAwLjIgKyBNYXRoLnJhbmRvbSgpICogcGFyZW50LndpZHRoICogMC42LFxuICAgICAgcGFyZW50LmhlaWdodCAqIDAuMiArIE1hdGgucmFuZG9tKCkgKiBwYXJlbnQuaGVpZ2h0ICogMC42XG4gICAgKTtcbiAgICB0aGlzLnNpemUgPSAocGFyZW50LndoIC8gMTUpICsgKCBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4gKSAqIChwYXJlbnQud2ggLyAxNSk7XG4gICAgdGhpcy53aWR0aCA9IHBhcmVudC53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IHBhcmVudC5oZWlnaHQ7XG4gIH07XG5cbiAgLy8gbW92ZSBiYWxsc1xuICBCYWxsLnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBib3VuY2UgYm9yZGVyc1xuICAgIGlmICh0aGlzLnBvcy54ID49IHRoaXMud2lkdGggLSB0aGlzLnNpemUpIHtcbiAgICAgIGlmICh0aGlzLnZlbC54ID4gMCkgdGhpcy52ZWwueCA9IC10aGlzLnZlbC54O1xuICAgICAgdGhpcy5wb3MueCA9IHRoaXMud2lkdGggLSB0aGlzLnNpemU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBvcy54IDw9IHRoaXMuc2l6ZSkge1xuICAgICAgaWYgKHRoaXMudmVsLnggPCAwKSB0aGlzLnZlbC54ID0gLXRoaXMudmVsLng7XG4gICAgICB0aGlzLnBvcy54ID0gdGhpcy5zaXplO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBvcy55ID49IHRoaXMuaGVpZ2h0IC0gdGhpcy5zaXplKSB7XG4gICAgICBpZiAodGhpcy52ZWwueSA+IDApIHRoaXMudmVsLnkgPSAtdGhpcy52ZWwueTtcbiAgICAgIHRoaXMucG9zLnkgPSB0aGlzLmhlaWdodCAtIHRoaXMuc2l6ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9zLnkgPD0gdGhpcy5zaXplKSB7XG4gICAgICBpZiAodGhpcy52ZWwueSA8IDApIHRoaXMudmVsLnkgPSAtdGhpcy52ZWwueTtcbiAgICAgIHRoaXMucG9zLnkgPSB0aGlzLnNpemU7XG4gICAgfVxuXG4gICAgLy8gdmVsb2NpdHlcbiAgICB0aGlzLnBvcyA9IHRoaXMucG9zLmFkZCh0aGlzLnZlbCk7XG5cbiAgfTtcblxuICAvLyBsYXZhbGFtcCBjb25zdHJ1Y3RvclxuICB2YXIgTGF2YUxhbXAgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBudW1CYWxscywgYzAsIGMxKSB7XG4gICAgdGhpcy5zdGVwID0gNTtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy53aCA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuc3ggPSBNYXRoLmZsb29yKHRoaXMud2lkdGggLyB0aGlzLnN0ZXApO1xuICAgIHRoaXMuc3kgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0IC8gdGhpcy5zdGVwKTtcbiAgICB0aGlzLnBhaW50ID0gZmFsc2U7XG4gICAgdGhpcy5tZXRhRmlsbCA9IGNyZWF0ZVJhZGlhbEdyYWRpZW50KHdpZHRoLCBoZWlnaHQsIHdpZHRoLCBjMCwgYzEpO1xuICAgIHRoaXMucGx4ID0gWzAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDBdO1xuICAgIHRoaXMucGx5ID0gWzAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDEsIDEsIDAsIDEsIDAsIDFdO1xuICAgIHRoaXMubXNjYXNlcyA9IFswLCAzLCAwLCAzLCAxLCAzLCAwLCAzLCAyLCAyLCAwLCAyLCAxLCAxLCAwXTtcbiAgICB0aGlzLml4ID0gWzEsIDAsIC0xLCAwLCAwLCAxLCAwLCAtMSwgLTEsIDAsIDEsIDAsIDAsIDEsIDEsIDAsIDAsIDAsIDEsIDFdO1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgIHRoaXMuYmFsbHMgPSBbXTtcbiAgICB0aGlzLml0ZXIgPSAwO1xuICAgIHRoaXMuc2lnbiA9IDE7XG5cbiAgICAvLyBpbml0IGdyaWRcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8ICh0aGlzLnN4ICsgMikgKiAodGhpcy5zeSArIDIpOyBpKyspIHtcbiAgICAgIHRoaXMuZ3JpZFtpXSA9IG5ldyBQb2ludChcbiAgICAgICAgKGkgJSAodGhpcy5zeCArIDIpKSAqIHRoaXMuc3RlcCwgKE1hdGguZmxvb3IoaSAvICh0aGlzLnN4ICsgMikpKSAqIHRoaXMuc3RlcFxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBtZXRhYmFsbHNcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IDEwOyBrKyspIHtcbiAgICAgIHRoaXMuYmFsbHNba10gPSBuZXcgQmFsbCh0aGlzKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gY29tcHV0ZSBjZWxsIGZvcmNlXG4gIExhdmFMYW1wLnByb3RvdHlwZS5jb21wdXRlRm9yY2UgPSBmdW5jdGlvbih4LCB5LCBpZHgpIHtcblxuICAgIHZhciBmb3JjZTtcbiAgICB2YXIgaWQgPSBpZHggfHwgeCArIHkgKiAodGhpcy5zeCArIDIpO1xuXG4gICAgaWYgKHggPT09IDAgfHwgeSA9PT0gMCB8fCB4ID09PSB0aGlzLnN4IHx8IHkgPT09IHRoaXMuc3kpIHtcbiAgICAgIGZvcmNlID0gMC4wNiAqIHRoaXMuc2lnbjtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yY2UgPSAwO1xuICAgICAgdmFyIGNlbGwgPSB0aGlzLmdyaWRbaWRdO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIGJhbGw7XG4gICAgICB3aGlsZSAoYmFsbCA9IHRoaXMuYmFsbHNbaSsrXSkge1xuICAgICAgICBmb3JjZSArPSBiYWxsLnNpemUgKiBiYWxsLnNpemUgLyAoLTIgKiBjZWxsLnggKiBiYWxsLnBvcy54IC0gMiAqIGNlbGwueSAqIGJhbGwucG9zLnkgKyBiYWxsLnBvcy5tYWduaXR1ZGUgKyBjZWxsLm1hZ25pdHVkZSk7XG4gICAgICB9XG4gICAgICBmb3JjZSAqPSB0aGlzLnNpZ25cbiAgICB9XG4gICAgdGhpcy5ncmlkW2lkXS5mb3JjZSA9IGZvcmNlO1xuICAgIHJldHVybiBmb3JjZTtcbiAgfTtcblxuICAvLyBjb21wdXRlIGNlbGxcbiAgTGF2YUxhbXAucHJvdG90eXBlLm1hcmNoaW5nU3F1YXJlcyA9IGZ1bmN0aW9uKG5leHQpIHtcbiAgICB2YXIgeCA9IG5leHRbMF07XG4gICAgdmFyIHkgPSBuZXh0WzFdO1xuICAgIHZhciBwZGlyID0gbmV4dFsyXTtcbiAgICB2YXIgaWQgPSB4ICsgeSAqICh0aGlzLnN4ICsgMik7XG4gICAgaWYgKHRoaXMuZ3JpZFtpZF0uY29tcHV0ZWQgPT09IHRoaXMuaXRlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgZGlyLCBtc2Nhc2UgPSAwO1xuXG4gICAgLy8gbmVpZ2hib3JzIGZvcmNlXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIHZhciBpZG4gPSAoeCArIHRoaXMuaXhbaSArIDEyXSkgKyAoeSArIHRoaXMuaXhbaSArIDE2XSkgKiAodGhpcy5zeCArIDIpO1xuICAgICAgdmFyIGZvcmNlID0gdGhpcy5ncmlkW2lkbl0uZm9yY2U7XG4gICAgICBpZiAoKGZvcmNlID4gMCAmJiB0aGlzLnNpZ24gPCAwKSB8fCAoZm9yY2UgPCAwICYmIHRoaXMuc2lnbiA+IDApIHx8ICFmb3JjZSkge1xuICAgICAgICAvLyBjb21wdXRlIGZvcmNlIGlmIG5vdCBpbiBidWZmZXJcbiAgICAgICAgZm9yY2UgPSB0aGlzLmNvbXB1dGVGb3JjZShcbiAgICAgICAgICB4ICsgdGhpcy5peFtpICsgMTJdLFxuICAgICAgICAgIHkgKyB0aGlzLml4W2kgKyAxNl0sXG4gICAgICAgICAgaWRuXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoTWF0aC5hYnMoZm9yY2UpID4gMSkgbXNjYXNlICs9IE1hdGgucG93KDIsIGkpO1xuICAgIH1cbiAgICBpZiAobXNjYXNlID09PSAxNSkge1xuICAgICAgLy8gaW5zaWRlXG4gICAgICByZXR1cm4gW3gsIHkgLSAxLCBmYWxzZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFtYmlndW91cyBjYXNlc1xuICAgICAgaWYgKG1zY2FzZSA9PT0gNSkgZGlyID0gKHBkaXIgPT09IDIpID8gMyA6IDE7XG4gICAgICBlbHNlIGlmIChtc2Nhc2UgPT09IDEwKSBkaXIgPSAocGRpciA9PT0gMykgPyAwIDogMjtcbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBsb29rdXBcbiAgICAgICAgZGlyID0gdGhpcy5tc2Nhc2VzW21zY2FzZV07XG4gICAgICAgIHRoaXMuZ3JpZFtpZF0uY29tcHV0ZWQgPSB0aGlzLml0ZXI7XG4gICAgICB9XG4gICAgICAvLyBkcmF3IGxpbmVcbiAgICAgIHZhciBpeCA9IHRoaXMuc3RlcCAvIChcbiAgICAgICAgICBNYXRoLmFicyhNYXRoLmFicyh0aGlzLmdyaWRbKHggKyB0aGlzLnBseFs0ICogZGlyICsgMl0pICsgKHkgKyB0aGlzLnBseVs0ICogZGlyICsgMl0pICogKHRoaXMuc3ggKyAyKV0uZm9yY2UpIC0gMSkgL1xuICAgICAgICAgIE1hdGguYWJzKE1hdGguYWJzKHRoaXMuZ3JpZFsoeCArIHRoaXMucGx4WzQgKiBkaXIgKyAzXSkgKyAoeSArIHRoaXMucGx5WzQgKiBkaXIgKyAzXSkgKiAodGhpcy5zeCArIDIpXS5mb3JjZSkgLSAxKSArIDFcbiAgICAgICAgKTtcbiAgICAgIGN0eC5saW5lVG8oXG4gICAgICAgIHRoaXMuZ3JpZFsoeCArIHRoaXMucGx4WzQgKiBkaXJdKSArICh5ICsgdGhpcy5wbHlbNCAqIGRpcl0pICogKHRoaXMuc3ggKyAyKV0ueCArIHRoaXMuaXhbZGlyXSAqIGl4LFxuICAgICAgICB0aGlzLmdyaWRbKHggKyB0aGlzLnBseFs0ICogZGlyICsgMV0pICsgKHkgKyB0aGlzLnBseVs0ICogZGlyICsgMV0pICogKHRoaXMuc3ggKyAyKV0ueSArIHRoaXMuaXhbZGlyICsgNF0gKiBpeFxuICAgICAgKTtcbiAgICAgIHRoaXMucGFpbnQgPSB0cnVlO1xuICAgICAgLy8gbmV4dFxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgeCArIHRoaXMuaXhbZGlyICsgNF0sXG4gICAgICAgIHkgKyB0aGlzLml4W2RpciArIDhdLFxuICAgICAgICBkaXJcbiAgICAgIF07XG4gICAgfVxuICB9O1xuXG4gIExhdmFMYW1wLnByb3RvdHlwZS5yZW5kZXJNZXRhYmFsbHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaSA9IDAsIGJhbGw7XG4gICAgd2hpbGUgKGJhbGwgPSB0aGlzLmJhbGxzW2krK10pIGJhbGwubW92ZSgpO1xuICAgIC8vIHJlc2V0IGdyaWRcbiAgICB0aGlzLml0ZXIrKztcbiAgICB0aGlzLnNpZ24gPSAtdGhpcy5zaWduO1xuICAgIHRoaXMucGFpbnQgPSBmYWxzZTtcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5tZXRhRmlsbDtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgLy8gY29tcHV0ZSBtZXRhYmFsbHNcbiAgICBpID0gMDtcbiAgICAvL2N0eC5zaGFkb3dCbHVyID0gNTA7XG4gICAgLy9jdHguc2hhZG93Q29sb3IgPSBcImdyZWVuXCI7XG4gICAgd2hpbGUgKGJhbGwgPSB0aGlzLmJhbGxzW2krK10pIHtcbiAgICAgIC8vIGZpcnN0IGNlbGxcbiAgICAgIHZhciBuZXh0ID0gW1xuICAgICAgICBNYXRoLnJvdW5kKGJhbGwucG9zLnggLyB0aGlzLnN0ZXApLFxuICAgICAgICBNYXRoLnJvdW5kKGJhbGwucG9zLnkgLyB0aGlzLnN0ZXApLCBmYWxzZVxuICAgICAgXTtcbiAgICAgIC8vIG1hcmNoaW5nIHNxdWFyZXNcbiAgICAgIGRvIHtcbiAgICAgICAgbmV4dCA9IHRoaXMubWFyY2hpbmdTcXVhcmVzKG5leHQpO1xuICAgICAgfSB3aGlsZSAobmV4dCk7XG4gICAgICAvLyBmaWxsIGFuZCBjbG9zZSBwYXRoXG4gICAgICBpZiAodGhpcy5wYWludCkge1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5wYWludCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBncmFkaWVudHNcbiAgdmFyIGNyZWF0ZVJhZGlhbEdyYWRpZW50ID0gZnVuY3Rpb24odywgaCwgciwgYzAsIGMxKSB7XG4gICAgdmFyIGdyYWRpZW50ID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KFxuICAgICAgdyAvIDEsIGggLyAxLCAwLFxuICAgICAgdyAvIDEsIGggLyAxLCByXG4gICAgKTtcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgYzApO1xuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBjMSk7XG4gICAgcmV0dXJuIGdyYWRpZW50O1xuICB9O1xuXG4gIC8vIG1haW4gbG9vcFxuICB2YXIgcnVuID0gZnVuY3Rpb24oc3RhdGUpIHtcblxuICAgIGlmKHN0YXRlKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocnVuKTtcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgc2NyZWVuLndpZHRoLCBzY3JlZW4uaGVpZ2h0KTtcbiAgICAgIGxhdmEwLnJlbmRlck1ldGFiYWxscygpO1xuICAgIH1cbiAgfTtcblxuICAvLyBjYW52YXNcbiAgdmFyIHNjcmVlbiA9IGdlMWRvb3Quc2NyZWVuLmluaXQoXCJidWJibGVcIiwgbnVsbCwgdHJ1ZSksXG4gICAgICBjdHggPSBzY3JlZW4uY3R4O1xuICAgICAgc2NyZWVuLnJlc2l6ZSgpO1xuICAvLyBjcmVhdGUgTGF2YUxhbXBzXG4gIGxhdmEwID0gbmV3IExhdmFMYW1wKHNjcmVlbi53aWR0aCwgc2NyZWVuLmhlaWdodCwgMTAwLCBcIiNmNTEyYjVcIiwgXCIjNWYyNWI4XCIpO1xuXG4gICAgcnVuKGFuZ3VsYXIuZWxlbWVudCgnI2J1YmJsZScpLmlzKCc6dmlzaWJsZScpKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uKCl7XG4gICAgICBpZihhbmd1bGFyLmVsZW1lbnQoJyNidWJibGUnKS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICBsYXZhMCA9IG5ldyBMYXZhTGFtcChzY3JlZW4ud2lkdGgsIHNjcmVlbi5oZWlnaHQsIDEwMCwgXCIjZjUxMmI1XCIsIFwiIzVmMjViOFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL2J1YmJsZS5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICgkbG9nLCAkaHR0cCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICB0aGlzLmFwaUhvc3QgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9Td2lpcC9nZW5lcmF0b3ItZ3VscC1hbmd1bGFyJztcbiAgfVxuXG4gIGdldENvbnRyaWJ1dG9ycyhsaW1pdD0zMCkge1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCh0aGlzLmFwaUhvc3QgKyAnL2NvbnRyaWJ1dG9ycz9wZXJfcGFnZT0nICsgbGltaXQpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLiRsb2cuZXJyb3IoJ1hIUiBGYWlsZWQgZm9yIGdldENvbnRyaWJ1dG9ycy5cXG4nICsgYW5ndWxhci50b0pzb24oZXJyb3IuZGF0YSwgdHJ1ZSkpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwiZXhwb3J0IGNsYXNzIFdlYkRldlRlY1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuZGF0YSA9IFtcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0FuZ3VsYXJKUycsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9hbmd1bGFyanMub3JnLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdIVE1MIGVuaGFuY2VkIGZvciB3ZWIgYXBwcyEnLFxuICAgICAgICAnbG9nbyc6ICdhbmd1bGFyLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdCcm93c2VyU3luYycsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2Jyb3dzZXJzeW5jLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaW1lLXNhdmluZyBzeW5jaHJvbmlzZWQgYnJvd3NlciB0ZXN0aW5nLicsXG4gICAgICAgICdsb2dvJzogJ2Jyb3dzZXJzeW5jLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdHdWxwSlMnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9ndWxwanMuY29tLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc3RyZWFtaW5nIGJ1aWxkIHN5c3RlbS4nLFxuICAgICAgICAnbG9nbyc6ICdndWxwLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdKYXNtaW5lJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vamFzbWluZS5naXRodWIuaW8vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0JlaGF2aW9yLURyaXZlbiBKYXZhU2NyaXB0LicsXG4gICAgICAgICdsb2dvJzogJ2phc21pbmUucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0thcm1hJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8va2FybWEtcnVubmVyLmdpdGh1Yi5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnU3BlY3RhY3VsYXIgVGVzdCBSdW5uZXIgZm9yIEphdmFTY3JpcHQuJyxcbiAgICAgICAgJ2xvZ28nOiAna2FybWEucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ1Byb3RyYWN0b3InLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3Byb3RyYWN0b3InLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnRW5kIHRvIGVuZCB0ZXN0IGZyYW1ld29yayBmb3IgQW5ndWxhckpTIGFwcGxpY2F0aW9ucyBidWlsdCBvbiB0b3Agb2YgV2ViRHJpdmVySlMuJyxcbiAgICAgICAgJ2xvZ28nOiAncHJvdHJhY3Rvci5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQm9vdHN0cmFwJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQm9vdHN0cmFwIGlzIHRoZSBtb3N0IHBvcHVsYXIgSFRNTCwgQ1NTLCBhbmQgSlMgZnJhbWV3b3JrIGZvciBkZXZlbG9waW5nIHJlc3BvbnNpdmUsIG1vYmlsZSBmaXJzdCBwcm9qZWN0cyBvbiB0aGUgd2ViLicsXG4gICAgICAgICdsb2dvJzogJ2Jvb3RzdHJhcC5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQW5ndWxhciBVSSBCb290c3RyYXAnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9hbmd1bGFyLXVpLmdpdGh1Yi5pby9ib290c3RyYXAvJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0Jvb3RzdHJhcCBjb21wb25lbnRzIHdyaXR0ZW4gaW4gcHVyZSBBbmd1bGFySlMgYnkgdGhlIEFuZ3VsYXJVSSBUZWFtLicsXG4gICAgICAgICdsb2dvJzogJ3VpLWJvb3RzdHJhcC5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnU2FzcyAoTm9kZSknLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9zYXNzL25vZGUtc2FzcycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdOb2RlLmpzIGJpbmRpbmcgdG8gbGlic2FzcywgdGhlIEMgdmVyc2lvbiBvZiB0aGUgcG9wdWxhciBzdHlsZXNoZWV0IHByZXByb2Nlc3NvciwgU2Fzcy4nLFxuICAgICAgICAnbG9nbyc6ICdub2RlLXNhc3MucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0VTNiAoQmFiZWwgZm9ybWVybHkgNnRvNSknLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vYmFiZWxqcy5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVHVybnMgRVM2KyBjb2RlIGludG8gdmFuaWxsYSBFUzUsIHNvIHlvdSBjYW4gdXNlIG5leHQgZ2VuZXJhdGlvbiBmZWF0dXJlcyB0b2RheS4nLFxuICAgICAgICAnbG9nbyc6ICdiYWJlbC5wbmcnXG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIGdldFRlYygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvd2ViRGV2VGVjL3dlYkRldlRlYy5zZXJ2aWNlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIE5hdmJhckRpcmVjdGl2ZSgpIHtcbiAgJ25nSW5qZWN0JztcblxuICBsZXQgZGlyZWN0aXZlID0ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmh0bWwnLFxuICAgIHNjb3BlOiB7XG4gICAgICAgIGNyZWF0aW9uRGF0ZTogJz0nXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBOYXZiYXJDb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn1cblxuY2xhc3MgTmF2YmFyQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yIChtb21lbnQpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgLy8gXCJ0aGlzLmNyZWF0aW9uRGF0ZVwiIGlzIGF2YWlsYWJsZSBieSBkaXJlY3RpdmUgb3B0aW9uIFwiYmluZFRvQ29udHJvbGxlcjogdHJ1ZVwiXG4gICAgdGhpcy5yZWxhdGl2ZURhdGUgPSBtb21lbnQodGhpcy5jcmVhdGlvbkRhdGUpLmZyb21Ob3coKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIE1hbGFya2V5RGlyZWN0aXZlKG1hbGFya2V5KSB7XG4gICduZ0luamVjdCc7XG5cbiAgbGV0IGRpcmVjdGl2ZSA9IHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICAgIGV4dHJhVmFsdWVzOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiAnJm5ic3A7JyxcbiAgICBsaW5rOiBsaW5rRnVuYyxcbiAgICBjb250cm9sbGVyOiBNYWxhcmtleUNvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiAndm0nXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICBmdW5jdGlvbiBsaW5rRnVuYyhzY29wZSwgZWwsIGF0dHIsIHZtKSB7XG4gICAgbGV0IHdhdGNoZXI7XG4gICAgbGV0IHR5cGlzdCA9IG1hbGFya2V5KGVsWzBdLCB7XG4gICAgICB0eXBlU3BlZWQ6IDQwLFxuICAgICAgZGVsZXRlU3BlZWQ6IDQwLFxuICAgICAgcGF1c2VEZWxheTogODAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIHBvc3RmaXg6ICcgJ1xuICAgIH0pO1xuXG4gICAgZWwuYWRkQ2xhc3MoJ2FjbWUtbWFsYXJrZXknKTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5leHRyYVZhbHVlcywgKHZhbHVlKSA9PiB7XG4gICAgICB0eXBpc3QudHlwZSh2YWx1ZSkucGF1c2UoKS5kZWxldGUoKTtcbiAgICB9KTtcblxuICAgIHdhdGNoZXIgPSBzY29wZS4kd2F0Y2goJ3ZtLmNvbnRyaWJ1dG9ycycsICgpID0+IHtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2bS5jb250cmlidXRvcnMsIChjb250cmlidXRvcikgPT4ge1xuICAgICAgICB0eXBpc3QudHlwZShjb250cmlidXRvci5sb2dpbikucGF1c2UoKS5kZWxldGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgIHdhdGNoZXIoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmNsYXNzIE1hbGFya2V5Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yICgkbG9nLCBnaXRodWJDb250cmlidXRvcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIHRoaXMuY29udHJpYnV0b3JzID0gW107XG5cbiAgICB0aGlzLmFjdGl2YXRlKGdpdGh1YkNvbnRyaWJ1dG9yKTtcbiAgfVxuXG4gIGFjdGl2YXRlKGdpdGh1YkNvbnRyaWJ1dG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29udHJpYnV0b3JzKGdpdGh1YkNvbnRyaWJ1dG9yKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuJGxvZy5pbmZvKCdBY3RpdmF0ZWQgQ29udHJpYnV0b3JzIFZpZXcnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvbnRyaWJ1dG9ycyhnaXRodWJDb250cmlidXRvcikge1xuICAgIHJldHVybiBnaXRodWJDb250cmlidXRvci5nZXRDb250cmlidXRvcnMoMTApLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuY29udHJpYnV0b3JzID0gZGF0YTtcblxuICAgICAgcmV0dXJuIHRoaXMuY29udHJpYnV0b3JzO1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==