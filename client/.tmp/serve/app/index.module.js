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
	
	var _githubContributor = __webpack_require__(9);
	
	var _webDevTec = __webpack_require__(10);
	
	var _navbar = __webpack_require__(11);
	
	var _malarkey = __webpack_require__(12);
	
	/* global malarkey:false, moment:false */
	
	angular.module('meltedRadio', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'ng-token-auth', 'rails', 'LocalStorageModule']).constant('malarkey', malarkey).constant('moment', moment).config(_index.config).config(_index2.routerConfig).config(["$authProvider", function ($authProvider) {
	  $authProvider.configure({
	    apiUrl: 'http://localhost:3000'
	  });
	}]).config(["localStorageServiceProvider", function (localStorageServiceProvider) {
	  localStorageServiceProvider.setPrefix('meltedRadio');
	}]).config(["railsSerializerProvider", function (railsSerializerProvider) {
	  railsSerializerProvider.underscore(angular.identity).camelize(angular.identity);
	}]).run(_index3.runBlock).service('githubContributor', _githubContributor.GithubContributorService).service('webDevTec', _webDevTec.WebDevTecService).controller('MainController', _main.MainController).controller('HomeController', _home.HomeController).controller('NavController', _nav.NavController).controller('RegistrationsController', _registrations.RegistrationsController).controller('SessionsController', _sessions.SessionsController).directive('acmeNavbar', _navbar.NavbarDirective).directive('acmeMalarkey', _malarkey.MalarkeyDirective).directive('onFinishRender', ["$timeout", function ($timeout) {
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDEwYzQyZWVjYTgzYTRmODJmNmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9ob21lLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL25hdi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9yZWdpc3RyYXRpb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL3Nlc3Npb25zLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2dpdGh1YkNvbnRyaWJ1dG9yL2dpdGh1YkNvbnRyaWJ1dG9yLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL3dlYkRldlRlYy93ZWJEZXZUZWMuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL21hbGFya2V5L21hbGFya2V5LmRpcmVjdGl2ZS5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uc3RhbnQiLCJtYWxhcmtleSIsIm1vbWVudCIsImNvbmZpZyIsIiRhdXRoUHJvdmlkZXIiLCJjb25maWd1cmUiLCJhcGlVcmwiLCJsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIiLCJzZXRQcmVmaXgiLCJyYWlsc1NlcmlhbGl6ZXJQcm92aWRlciIsInVuZGVyc2NvcmUiLCJpZGVudGl0eSIsImNhbWVsaXplIiwicnVuIiwic2VydmljZSIsImNvbnRyb2xsZXIiLCJkaXJlY3RpdmUiLCIkdGltZW91dCIsInJlc3RyaWN0IiwibGluayIsInNjb3BlIiwiZWxlbWVudCIsImF0dHIiLCIkbGFzdCIsIiRlbWl0Iiwib25GaW5pc2hSZW5kZXIiLCJmYWN0b3J5IiwiQXBpU3luYyIsInNldFBsYXlsaXN0cyIsIm9iaiIsInBsYXlsaXN0cyIsInNldFNvbmdzIiwic29uZ3MiLCJnZXRQbGF5bGlzdHMiLCJnZXRTb25ncyIsInJhaWxzUmVzb3VyY2VGYWN0b3J5IiwidXJsIiwibmFtZSIsIiRsb2dQcm92aWRlciIsInRvYXN0ckNvbmZpZyIsImRlYnVnRW5hYmxlZCIsImFsbG93SHRtbCIsInRpbWVPdXQiLCJwb3NpdGlvbkNsYXNzIiwicHJldmVudER1cGxpY2F0ZXMiLCJwcm9ncmVzc0JhciIsInJvdXRlckNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwic3RhdGUiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXJBcyIsInJlc29sdmUiLCJhdXRoIiwiJGF1dGgiLCJ2YWxpZGF0ZVVzZXIiLCJvdGhlcndpc2UiLCJydW5CbG9jayIsIiRsb2ciLCJkZWJ1ZyIsIndlYkRldlRlYyIsInRvYXN0ciIsImF3ZXNvbWVUaGluZ3MiLCJjbGFzc0FuaW1hdGlvbiIsImNyZWF0aW9uRGF0ZSIsImFjdGl2YXRlIiwiZ2V0V2ViRGV2VGVjIiwiZ2V0VGVjIiwiZm9yRWFjaCIsImF3ZXNvbWVUaGluZyIsInJhbmsiLCJNYXRoIiwicmFuZG9tIiwiaW5mbyIsIkhvbWVDb250cm9sbGVyIiwiJHNjb3BlIiwiJHJvb3RTY29wZSIsIiRsb2NhdGlvbiIsIlVzZXIiLCJQbGF5bGlzdCIsImxvY2FsU3RvcmFnZVNlcnZpY2UiLCIkdWliTW9kYWwiLCJTb25nIiwiJGh0dHAiLCIkc2NlIiwiJHdpbmRvdyIsInVzZXJTaWduZWRJbiIsImdldCIsImN1cnJlbnRQbGF5bGlzdCIsImN1cnJlbnRTb25nIiwicHJldmlvdXNTb25nIiwiaXNQbGF5aW5nIiwicGxheWVyIiwidmlkQXJyYXkiLCJzZWFyY2hDdXJyZW50U29uZyIsImNoYW5nZU5hdkNvbG9yIiwiY3NzIiwicXVlcnkiLCJwbGF5bGlzdElkIiwidXNlcklkIiwiaWQiLCJ0aGVuIiwicmVzdWx0cyIsIm5ld1BsYXlsaXN0IiwibW9kYWxJbnN0YW5jZSIsIm9wZW4iLCJzdWJtaXQiLCJ0ZXh0IiwibWV0aG9kIiwiZGF0YSIsInRpdGxlIiwic2V0UGxheWxpc3QiLCJsZW5ndGgiLCJlcnJvciIsImNsb3NlIiwiZGlzbWlzcyIsInBsYXlsaXN0IiwicmVtb3ZlQ2xhc3MiLCJzZXQiLCJzb25nSWQiLCJnZXRWaWRlb1NvbmciLCJ2aWRlbyIsInZpZGVvSWQiLCJ0b2dnbGUiLCJnZXRWaWRlb0luZm9VcmwiLCJfX2VudiIsImFwaUtleSIsImFkZFZpZGVvVG9QbGF5bGlzdCIsIml0ZW1zIiwiY29udmVydER1cmF0aW9uIiwic3RyaW5nIiwiYXJyYXkiLCJtYXRjaCIsImZvcm1hdHRlZCIsIm1hcCIsIml0ZW0iLCJqb2luIiwic25pcHBldCIsImFydGlzdCIsImRlc2NyaXB0aW9uIiwiZHVyYXRpb24iLCJjb250ZW50RGV0YWlscyIsImRlbGV0ZVNvbmciLCJzb25nIiwicmVzcG9uc2UiLCJjdXJyZW50X3BsYXlsaXN0Iiwic2V0U2VhcmNoUmVzdWx0cyIsInZpZGVvcyIsImdldFZpZGVvcyIsInNlYXJjaFRleHQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJyZXBsYWNlIiwibXlVcmwiLCJnZXRVcmwiLCJ0cnVzdFNyYyIsInNyYyIsInRydXN0QXNSZXNvdXJjZVVybCIsInRvZ2dsZU1lbnUiLCJjcmVhdGVQbGF5ZXIiLCJpIiwidmlkUGxheWVyT2JqIiwiWVQiLCJQbGF5ZXIiLCJldmVudHMiLCJvblBsYXllclN0YXRlQ2hhbmdlIiwicHVzaCIsIiRvbiIsIm5nUmVwZWF0RmluaXNoZWRFdmVudCIsIm9uUGxheWVyUmVhZHkiLCJldmVudCIsInRhcmdldCIsInBsYXlWaWRlbyIsIlBsYXllclN0YXRlIiwiUExBWUlORyIsInNlYXJjaFZpZExvZ2ljIiwicGF1c2UiLCJwYXVzZVZpZGVvIiwic3RvcFZpZGVvIiwicGxheSIsInZpZEhlaWdodCIsImhlaWdodCIsInZpZFdpZHRoIiwid2lkdGgiLCJ2aWRQbGF5IiwibG9hZFZpZGVvQnlJZCIsInBsYXlpbmciLCJnZXRTb25nSW5kZXgiLCJpbmRleE9mIiwibmV4dCIsInNvbmdzQXJyYXkiLCJsYXN0SW5kZXgiLCJpbmRleE9mQ3VycmVudFNvbmciLCJzb25nVG9QbGF5IiwicHJldmlvdXMiLCJOYXZDb250cm9sbGVyIiwiaXNfb3BlbiIsInBhZ2VSZWRpcmVjdCIsInVzZXIiLCJwYXRoIiwic2lnbk91dCIsImV2IiwicmVtb3ZlIiwieF9pZCIsInRvZ2dsZUNsYXNzIiwiUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXIiLCJzZXRVc2VyIiwic3VibWl0UmVnaXN0cmF0aW9uIiwicmVnaXN0cmF0aW9uRm9ybSIsInN1Ym1pdExvZ2luIiwiZW1haWwiLCJwYXNzd29yZCIsIlNlc3Npb25zQ29udHJvbGxlciIsImxvZ2luRm9ybSIsInJlYXNvbiIsImVycm9ycyIsInVzZXJzIiwiYXBpSG9zdCIsImxpbWl0IiwiY2F0Y2giLCJ0b0pzb24iLCJXZWJEZXZUZWNTZXJ2aWNlIiwiTmF2YmFyRGlyZWN0aXZlIiwiTmF2YmFyQ29udHJvbGxlciIsImJpbmRUb0NvbnRyb2xsZXIiLCJyZWxhdGl2ZURhdGUiLCJmcm9tTm93IiwiTWFsYXJrZXlEaXJlY3RpdmUiLCJleHRyYVZhbHVlcyIsInRlbXBsYXRlIiwibGlua0Z1bmMiLCJNYWxhcmtleUNvbnRyb2xsZXIiLCJlbCIsInZtIiwid2F0Y2hlciIsInR5cGlzdCIsInR5cGVTcGVlZCIsImRlbGV0ZVNwZWVkIiwicGF1c2VEZWxheSIsImxvb3AiLCJwb3N0Zml4IiwiYWRkQ2xhc3MiLCJ2YWx1ZSIsInR5cGUiLCJkZWxldGUiLCIkd2F0Y2giLCJjb250cmlidXRvcnMiLCJjb250cmlidXRvciIsImxvZ2luIiwiZ2l0aHViQ29udHJpYnV0b3IiLCJnZXRDb250cmlidXRvcnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBSUFBLFNBQVFDLE9BQU8sZUFBZSxDQUFDLGFBQWEsYUFBYSxXQUFXLGNBQWMsY0FBYyxVQUFVLGNBQWMsYUFBYSxnQkFBZ0IsVUFBVSxpQkFBaUIsU0FBUyx1QkFDdExDLFNBQVMsWUFBWUMsVUFDckJELFNBQVMsVUFBVUUsUUFDbkJDLE9BSEgsZUFJR0EsT0FKSCxzQkFLR0EseUJBQU8sVUFBU0MsZUFBZTtHQUM3QkEsY0FBY0MsVUFBVTtLQUNwQkMsUUFBUTs7S0FHYkgsdUNBQU8sVUFBU0ksNkJBQTRCO0dBQzNDQSw0QkFBNEJDLFVBQVU7S0FFdkNMLG1DQUFPLFVBQVNNLHlCQUF3QjtHQUN2Q0Esd0JBQXdCQyxXQUFXWixRQUFRYSxVQUFVQyxTQUFTZCxRQUFRYTtLQUV4RUUsSUFoQkgsa0JBaUJHQyxRQUFRLHFCQWpCWCw2Q0FrQkdBLFFBQVEsYUFsQlgsNkJBbUJHQyxXQUFXLGtCQW5CZCxzQkFvQkdBLFdBQVcsa0JBcEJkLHNCQXFCR0EsV0FBVyxpQkFyQmQsb0JBc0JHQSxXQUFXLDJCQXRCZCx3Q0F1QkdBLFdBQVcsc0JBdkJkLDhC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LElBQUk7S0FDckMsSUFBSUM7S0FDSixJQUFJQyxTQUFTek8sU0FBU3NPLEdBQUcsSUFBSTtPQUMzQkksV0FBVztPQUNYQyxhQUFhO09BQ2JDLFlBQVk7T0FDWkMsTUFBTTtPQUNOQyxTQUFTOzs7S0FHWFIsR0FBR1MsU0FBUzs7S0FFWmxQLFFBQVFzRSxRQUFRaEQsTUFBTStNLGFBQWEsVUFBQ2MsT0FBVTtPQUM1Q1AsT0FBT1EsS0FBS0QsT0FBT2xFLFFBQVFvRTs7O0tBRzdCVixVQUFVck4sTUFBTWdPLE9BQU8sbUJBQW1CLFlBQU07T0FDOUN0UCxRQUFRc0UsUUFBUW9LLEdBQUdhLGNBQWMsVUFBQ0MsYUFBZ0I7U0FDaERaLE9BQU9RLEtBQUtJLFlBQVlDLE9BQU94RSxRQUFRb0U7Ozs7S0FJM0MvTixNQUFNa0osSUFBSSxZQUFZLFlBQU07T0FDMUJtRTs7Ozs7OzhEQWlCK0I7R0FWbkMsNEJBQWEvSyxNQUFNOEwsbUJBQW1CO0tBQ3BDOztLQURvQzs7S0FHcEMsS0FBSzlMLE9BQU9BO0tBQ1osS0FBSzJMLGVBQWU7O0tBRXBCLEtBQUtwTCxTQUFTdUw7OztHQWdCaEIsYUFBYSxvQkFBb0IsQ0FBQztLQUNoQyxLQUFLO0tBQ0wsT0FBTyxTQUFTLFNBZlRBLG1CQUFtQjtPQUFBOztPQUMxQixPQUFPLEtBQUtDLGdCQUFnQkQsbUJBQW1CbkosS0FBSyxZQUFNO1NBQ3hELE1BQUszQyxLQUFLZSxLQUFLOzs7TUFvQmhCO0tBQ0QsS0FBSztLQUNMLE9BQU8sU0FBUyxnQkFsQkYrSyxtQkFBbUI7T0FBQTs7T0FDakMsT0FBT0Esa0JBQWtCQyxnQkFBZ0IsSUFBSXBKLEtBQUssVUFBQ1EsTUFBUztTQUMxRCxPQUFLd0ksZUFBZXhJOztTQUVwQixPQUFPLE9BQUt3STs7Ozs7R0F5QmhCLE9BQU8iLCJmaWxlIjoiaW5kZXgubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDEwYzQyZWVjYTgzYTRmODJmNmYiLCIvKiBnbG9iYWwgbWFsYXJrZXk6ZmFsc2UsIG1vbWVudDpmYWxzZSAqL1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2luZGV4LmNvbmZpZyc7XG5pbXBvcnQgeyByb3V0ZXJDb25maWcgfSBmcm9tICcuL2luZGV4LnJvdXRlJztcbmltcG9ydCB7IHJ1bkJsb2NrIH0gZnJvbSAnLi9pbmRleC5ydW4nO1xuaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIgfSBmcm9tICcuL21haW4vbWFpbi5jb250cm9sbGVyJztcbmltcG9ydCB7IEhvbWVDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL2hvbWUuY29udHJvbGxlcic7XG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL25hdi5jb250cm9sbGVyJztcbmltcG9ydCB7IFJlZ2lzdHJhdGlvbnNDb250cm9sbGVyIH0gZnJvbSAnLi9zY3JpcHRzL2NvbnRyb2xsZXJzL3JlZ2lzdHJhdGlvbnMuY29udHJvbGxlcic7XG5pbXBvcnQgeyBTZXNzaW9uc0NvbnRyb2xsZXIgfSBmcm9tICcuL3NjcmlwdHMvY29udHJvbGxlcnMvc2Vzc2lvbnMuY29udHJvbGxlcic7XG5pbXBvcnQgeyBHaXRodWJDb250cmlidXRvclNlcnZpY2UgfSBmcm9tICcuLi9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYkRldlRlY1NlcnZpY2UgfSBmcm9tICcuLi9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmF2YmFyRGlyZWN0aXZlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWFsYXJrZXlEaXJlY3RpdmUgfSBmcm9tICcuLi9hcHAvY29tcG9uZW50cy9tYWxhcmtleS9tYWxhcmtleS5kaXJlY3RpdmUnO1xuXG5cblxuYW5ndWxhci5tb2R1bGUoJ21lbHRlZFJhZGlvJywgWyduZ0FuaW1hdGUnLCAnbmdDb29raWVzJywgJ25nVG91Y2gnLCAnbmdTYW5pdGl6ZScsICduZ01lc3NhZ2VzJywgJ25nQXJpYScsICduZ1Jlc291cmNlJywgJ3VpLnJvdXRlcicsICd1aS5ib290c3RyYXAnLCAndG9hc3RyJywgJ25nLXRva2VuLWF1dGgnLCAncmFpbHMnLCAnTG9jYWxTdG9yYWdlTW9kdWxlJ10pXG4gIC5jb25zdGFudCgnbWFsYXJrZXknLCBtYWxhcmtleSlcbiAgLmNvbnN0YW50KCdtb21lbnQnLCBtb21lbnQpXG4gIC5jb25maWcoY29uZmlnKVxuICAuY29uZmlnKHJvdXRlckNvbmZpZylcbiAgLmNvbmZpZyhmdW5jdGlvbigkYXV0aFByb3ZpZGVyKSB7XG4gICAgICRhdXRoUHJvdmlkZXIuY29uZmlndXJlKHtcbiAgICAgICAgIGFwaVVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCdcbiAgICAgfSk7XG4gICB9KVxuICAgLmNvbmZpZyhmdW5jdGlvbihsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIpe1xuICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlUHJvdmlkZXIuc2V0UHJlZml4KCdtZWx0ZWRSYWRpbycpO1xuICAgfSlcbiAgIC5jb25maWcoZnVuY3Rpb24ocmFpbHNTZXJpYWxpemVyUHJvdmlkZXIpe1xuICAgICByYWlsc1NlcmlhbGl6ZXJQcm92aWRlci51bmRlcnNjb3JlKGFuZ3VsYXIuaWRlbnRpdHkpLmNhbWVsaXplKGFuZ3VsYXIuaWRlbnRpdHkpO1xuICAgfSlcbiAgLnJ1bihydW5CbG9jaylcbiAgLnNlcnZpY2UoJ2dpdGh1YkNvbnRyaWJ1dG9yJywgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlKVxuICAuc2VydmljZSgnd2ViRGV2VGVjJywgV2ViRGV2VGVjU2VydmljZSlcbiAgLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIEhvbWVDb250cm9sbGVyKVxuICAuY29udHJvbGxlcignTmF2Q29udHJvbGxlcicsIE5hdkNvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdSZWdpc3RyYXRpb25zQ29udHJvbGxlcicsIFJlZ2lzdHJhdGlvbnNDb250cm9sbGVyKVxuICAuY29udHJvbGxlcignU2Vzc2lvbnNDb250cm9sbGVyJywgU2Vzc2lvbnNDb250cm9sbGVyKVxuICAuZGlyZWN0aXZlKCdhY21lTmF2YmFyJywgTmF2YmFyRGlyZWN0aXZlKVxuICAuZGlyZWN0aXZlKCdhY21lTWFsYXJrZXknLCBNYWxhcmtleURpcmVjdGl2ZSlcbiAgLmRpcmVjdGl2ZSgnb25GaW5pc2hSZW5kZXInLCBmdW5jdGlvbigkdGltZW91dCl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHIpIHtcbiAgICAgICAgaWYgKHNjb3BlLiRsYXN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuJGVtaXQoYXR0ci5vbkZpbmlzaFJlbmRlcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgIH07XG5cbiAgfSlcbiAgLmZhY3RvcnkoJ0FwaVN5bmMnLCBmdW5jdGlvbigpe1xuICAgIHZhciBBcGlTeW5jID0ge307XG5cbiAgICBBcGlTeW5jLnNldFBsYXlsaXN0cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgQXBpU3luYy5wbGF5bGlzdHMgPSBvYmo7XG4gICAgfTtcblxuICAgIEFwaVN5bmMuc2V0U29uZ3MgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgQXBpU3luYy5zb25ncyA9IG9iajtcbiAgICB9O1xuXG4gICAgQXBpU3luYy5nZXRQbGF5bGlzdHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBBcGlTeW5jLnBsYXlsaXN0cztcbiAgICB9O1xuXG4gICAgQXBpU3luYy5nZXRTb25ncyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEFwaVN5bmMuc29uZ3M7XG4gICAgfTtcblxuICAgIHJldHVybiBBcGlTeW5jO1xuICB9KVxuICAuZmFjdG9yeSgnUGxheWxpc3QnLCBmdW5jdGlvbihyYWlsc1Jlc291cmNlRmFjdG9yeSkge1xuICAgIHJldHVybiByYWlsc1Jlc291cmNlRmFjdG9yeSh7XG4gICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvcGxheWxpc3RzJyxcbiAgICAgIG5hbWU6ICdwbGF5bGlzdCdcbiAgICB9KTtcbiAgfSlcbiAgLmZhY3RvcnkoJ1VzZXInLGZ1bmN0aW9uKHJhaWxzUmVzb3VyY2VGYWN0b3J5KXtcbiAgICByZXR1cm4gcmFpbHNSZXNvdXJjZUZhY3Rvcnkoe1xuICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3VzZXJzL3t7dXNlcklkfX0vcGxheWxpc3RzJyxcbiAgICAgIG5hbWU6ICd1c2VyJ1xuICAgIH0pO1xuICB9KVxuICAuZmFjdG9yeSgnU29uZycsIGZ1bmN0aW9uKHJhaWxzUmVzb3VyY2VGYWN0b3J5KXtcbiAgICByZXR1cm4gcmFpbHNSZXNvdXJjZUZhY3Rvcnkoe1xuICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3BsYXlsaXN0cy97e3BsYXlsaXN0SWR9fS9zb25ncycsXG4gICAgICBuYW1lOiAnc29uZydcbiAgICB9KTtcbiAgfSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4Lm1vZHVsZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBjb25maWcgKCRsb2dQcm92aWRlciwgdG9hc3RyQ29uZmlnKSB7XG4gICduZ0luamVjdCc7XG4gIC8vIEVuYWJsZSBsb2dcbiAgJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCh0cnVlKTtcblxuICAvLyBTZXQgb3B0aW9ucyB0aGlyZC1wYXJ0eSBsaWJcbiAgdG9hc3RyQ29uZmlnLmFsbG93SHRtbCA9IHRydWU7XG4gIHRvYXN0ckNvbmZpZy50aW1lT3V0ID0gMzAwMDtcbiAgdG9hc3RyQ29uZmlnLnBvc2l0aW9uQ2xhc3MgPSAndG9hc3QtdG9wLXJpZ2h0JztcbiAgdG9hc3RyQ29uZmlnLnByZXZlbnREdXBsaWNhdGVzID0gdHJ1ZTtcbiAgdG9hc3RyQ29uZmlnLnByb2dyZXNzQmFyID0gdHJ1ZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXguY29uZmlnLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIHJvdXRlckNvbmZpZyAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAnbmdJbmplY3QnO1xuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnbWFpbicsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvbWFpbi9tYWluLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJyxcbiAgICAgIGNvbnRyb2xsZXJBczogJ21haW4nXG4gICAgfSlcbiAgICAuc3RhdGUoJ3NpZ25faW4nLCB7XG4gICAgICB1cmw6ICcvc2lnbl9pbicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC92aWV3cy91c2VyX3Nlc3Npb25zL25ldy5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdTZXNzaW9uc0NvbnRyb2xsZXIgYXMgc2lnbmluJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdzaWduX3VwJywge1xuICAgICAgdXJsOiAnL3NpZ25fdXAnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdmlld3MvdXNlcl9yZWdpc3RyYXRpb25zL25ldy5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RyYXRpb25zQ29udHJvbGxlciBhcyBzaWdudXAnXG4gICAgfSlcbiAgICAuc3RhdGUgICgnaG9tZScsIHtcbiAgICAgIHVybDogJy91c2Vycy86aWQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdmlld3MvaG9tZS5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlciBhcyBob21lJyxcbiAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgIGF1dGg6IGZ1bmN0aW9uKCRhdXRoKSB7XG4gICAgICAgICAgIHJldHVybiAkYXV0aC52YWxpZGF0ZVVzZXIoKTtcbiAgICAgICAgIH1cbiAgICAgICB9XG4gICAgfSk7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBydW5CbG9jayAoJGxvZykge1xuICAnbmdJbmplY3QnO1xuICAkbG9nLmRlYnVnKCdydW5CbG9jayBlbmQnKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXgucnVuLmpzIiwiZXhwb3J0IGNsYXNzIE1haW5Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKCR0aW1lb3V0LCB3ZWJEZXZUZWMsIHRvYXN0cikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLmF3ZXNvbWVUaGluZ3MgPSBbXTtcbiAgICB0aGlzLmNsYXNzQW5pbWF0aW9uID0gJyc7XG4gICAgdGhpcy5jcmVhdGlvbkRhdGUgPSAxNDgxNjM5NzA0MTA3O1xuICAgIHRoaXMudG9hc3RyID0gdG9hc3RyO1xuXG5cbiAgICB0aGlzLmFjdGl2YXRlKCR0aW1lb3V0LCB3ZWJEZXZUZWMpO1xuICB9XG5cbiAgYWN0aXZhdGUoJHRpbWVvdXQsIHdlYkRldlRlYykge1xuICAgIHRoaXMuZ2V0V2ViRGV2VGVjKHdlYkRldlRlYyk7XG4gICAgJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbGFzc0FuaW1hdGlvbiA9ICdydWJiZXJCYW5kJztcbiAgICB9LCA0MDAwKTtcbiAgfVxuXG4gIGdldFdlYkRldlRlYyh3ZWJEZXZUZWMpIHtcbiAgICB0aGlzLmF3ZXNvbWVUaGluZ3MgPSB3ZWJEZXZUZWMuZ2V0VGVjKCk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2godGhpcy5hd2Vzb21lVGhpbmdzLCAoYXdlc29tZVRoaW5nKSA9PiB7XG4gICAgICBhd2Vzb21lVGhpbmcucmFuayA9IE1hdGgucmFuZG9tKCk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93VG9hc3RyKCkge1xuICAgIHRoaXMudG9hc3RyLmluZm8oJ0ZvcmsgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9Td2lpcC9nZW5lcmF0b3ItZ3VscC1hbmd1bGFyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGI+Z2VuZXJhdG9yLWd1bHAtYW5ndWxhcjwvYj48L2E+Jyk7XG4gICAgdGhpcy5jbGFzc0FuaW1hdGlvbiA9ICcnO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIEhvbWVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKCRzY29wZSwgJHJvb3RTY29wZSwgJGF1dGgsICRsb2NhdGlvbiwgVXNlciwgUGxheWxpc3QsbG9jYWxTdG9yYWdlU2VydmljZSwgJHVpYk1vZGFsLCBTb25nLCBBcGlTeW5jLCAkaHR0cCwkc2NlLCAkd2luZG93LCAkbG9nKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICAkc2NvcGUudXNlclNpZ25lZEluID0gbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2N1cnJlbnRVc2VyJyk7XG4gICAgJHNjb3BlLmN1cnJlbnRQbGF5bGlzdCA9IG51bGw7XG4gICAgJHNjb3BlLnNvbmdzID0gbnVsbDtcbiAgICAkc2NvcGUuY3VycmVudFNvbmcgPSBudWxsO1xuICAgICRzY29wZS5wcmV2aW91c1NvbmcgPSBudWxsO1xuICAgICRzY29wZS5pc1BsYXlpbmcgPSAgZmFsc2U7XG4gICAgdmFyIHBsYXllcjtcbiAgICB2YXIgdmlkQXJyYXkgPSBbXTtcbiAgICB2YXIgc2VhcmNoQ3VycmVudFNvbmcgPSBudWxsO1xuXG4gICAgKGZ1bmN0aW9uIGNoYW5nZU5hdkNvbG9yKCl7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ25hdi5uYXYtYmFyJykuY3NzKCdjb2xvcicsJ3doaXRlJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ25hdi5uYXYtYmFyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywnYmxhY2snKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgndWwjZGVza3RvcC1uYXYtbWVudScpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ2JsYWNrJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsI21vYmlsZS1uYXYtbWVudS1ibGFjaycpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ2JsYWNrJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsLm5hdi1tZW51IGEnKS5jc3MoJ2NvbG9yJywnd2hpdGUnKTtcbiAgICB9KSgpO1xuXG5cbiAgICBVc2VyLnF1ZXJ5KHtwbGF5bGlzdElkOiAnJ30se3VzZXJJZDogJHNjb3BlLnVzZXJTaWduZWRJbi5pZH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0cyl7XG4gICAgICBBcGlTeW5jLnNldFBsYXlsaXN0cyhyZXN1bHRzKTtcbiAgICB9KTtcblxuXG4gICAgJHNjb3BlLnBsYXlsaXN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEFwaVN5bmMuZ2V0UGxheWxpc3RzKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5zb25ncyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICBBcGlTeW5jLmdldFNvbmdzKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5uZXdQbGF5bGlzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLm1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL2FkZHBsYXlsaXN0Lmh0bWwnLFxuICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYoJHNjb3BlLnRleHQpIHtcblxuICAgICAgICRodHRwKHtcbiAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3VzZXJzLycgKyAkc2NvcGUudXNlclNpZ25lZEluLmlkICsgJy9wbGF5bGlzdHMnLFxuICAgICAgICAgZGF0YToge1xuICAgICAgICAgICB0aXRsZTogJHNjb3BlLnRleHRcbiAgICAgICAgIH1cbiAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpe1xuXG4gICAgICAgICBBcGlTeW5jLnNldFBsYXlsaXN0cyhyZXN1bHRzLmRhdGEpO1xuICAgICAgICAgJHNjb3BlLnNldFBsYXlsaXN0KHJlc3VsdHMuZGF0YVtyZXN1bHRzLmRhdGEubGVuZ3RoIC0gMV0pO1xuXG4gICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS50ZXh0ID0gJyc7XG4gICAgICAgICRzY29wZS5tb2RhbEluc3RhbmNlLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5kaXNtaXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUubW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcbiAgICB9O1xuXG4gICAgJHJvb3RTY29wZS5zZXRQbGF5bGlzdCA9IGZ1bmN0aW9uKHBsYXlsaXN0KSB7XG5cbiAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ2Rpdi5wbGF5bGlzdC1jb250ZW50JykucmVtb3ZlQ2xhc3MoJ292ZXJmbG93Jyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdjdXJyZW50UGxheWxpc3QnLCBwbGF5bGlzdCk7XG4gICAgICAgICRzY29wZS5jdXJyZW50UGxheWxpc3QgPSAgbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2N1cnJlbnRQbGF5bGlzdCcpO1xuXG4gICAgICAgIGlmKCRzY29wZS5jdXJyZW50UGxheWxpc3QpIHtcblxuICAgICAgICAgIFNvbmcucXVlcnkoe3NvbmdJZDogJyd9LHtwbGF5bGlzdElkOiAkc2NvcGUuY3VycmVudFBsYXlsaXN0LmlkfSkudGhlbihmdW5jdGlvbihzb25ncyl7XG5cbiAgICAgICAgICAgICBBcGlTeW5jLnNldFNvbmdzKHNvbmdzKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldFZpZGVvU29uZyA9IGZ1bmN0aW9uKHBsYXlsaXN0LCB2aWRlbykge1xuXG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ3VsIycrdmlkZW8uaWQudmlkZW9JZCkudG9nZ2xlKFwic2xvd1wiKTtcblxuICAgICB2YXIgZ2V0VmlkZW9JbmZvVXJsID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvdmlkZW9zPycrXG4gICAgICAgICAgICAgICAgICAgJ2lkPScrXG4gICAgICAgICAgICAgICAgICAgdmlkZW8uaWQudmlkZW9JZCtcbiAgICAgICAgICAgICAgICAgICAnJmtleT0nK1xuICAgICAgICAgICAgICAgICAgICR3aW5kb3cuX19lbnYuYXBpS2V5K1xuICAgICAgICAgICAgICAgICAgICcmcGFydD1zbmlwcGV0LGNvbnRlbnREZXRhaWxzJztcbiAgICAgICAgICRodHRwKHtcblxuICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICB1cmw6IGdldFZpZGVvSW5mb1VybFxuXG4gICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpe1xuXG4gICAgICAgICAgIGFkZFZpZGVvVG9QbGF5bGlzdChwbGF5bGlzdCxyZXN1bHRzLmRhdGEuaXRlbXNbMF0pO1xuXG4gICAgICAgICB9LGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgJGxvZyhlcnJvcik7XG4gICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNvbnZlcnREdXJhdGlvbiA9IGZ1bmN0aW9uKHN0cmluZykge1xuXG4gICAgICAgIHZhciBhcnJheSA9IHN0cmluZy5tYXRjaCgvKFxcZCspKD89W01IU10pL2lnKXx8W107XG4gICAgICAgIHZhciBmb3JtYXR0ZWQgPSBhcnJheS5tYXAoZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgaWYoaXRlbS5sZW5ndGg8MikgcmV0dXJuICcwJytpdGVtO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pLmpvaW4oJzonKTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkO1xuXG4gICAgfTtcblxuICAgZnVuY3Rpb24gYWRkVmlkZW9Ub1BsYXlsaXN0KHBsYXlsaXN0LCB2aWRlbykge1xuICAgICAgICRodHRwKHtcbiAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3BsYXlsaXN0cy8nICsgcGxheWxpc3QuaWQgKycvc29uZ3MnLFxuICAgICAgICAgZGF0YToge1xuICAgICAgICAgICB0aXRsZTogdmlkZW8uc25pcHBldC50aXRsZSxcbiAgICAgICAgICAgYXJ0aXN0OiB2aWRlby5zbmlwcGV0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICB1cmw6IHZpZGVvLmlkLFxuICAgICAgICAgICBkdXJhdGlvbjogdmlkZW8uY29udGVudERldGFpbHMuZHVyYXRpb25cbiAgICAgICAgIH1cbiAgICAgICB9KS50aGVuKFxuICAgICAgICAgZnVuY3Rpb24ocmVzdWx0cyl7XG4gICAgICAgICAgIEFwaVN5bmMuc2V0U29uZ3MocmVzdWx0cy5kYXRhKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICRsb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVsZXRlU29uZyA9IGZ1bmN0aW9uKHNvbmcpIHtcblxuICAgICAgICRodHRwKHtcbiAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvcGxheWxpc3RzLycgKyAkc2NvcGUuY3VycmVudFBsYXlsaXN0LmlkICsnL3NvbmdzLycrIHNvbmcuaWRcbiAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcblxuICAgICAgICAgJHNjb3BlLnNldFBsYXlsaXN0KHJlc3BvbnNlLmRhdGEuY3VycmVudF9wbGF5bGlzdCk7XG4gICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgJGxvZyhlcnJvcik7XG4gICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBzZXRTZWFyY2hSZXN1bHRzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAkc2NvcGUudmlkZW9zID0gb2JqO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0VmlkZW9zID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICBpZigkc2NvcGUudGV4dCkge1xuXG4gICAgICAgICAkc2NvcGUuc2V0UGxheWxpc3QobnVsbCk7XG4gICAgICAgICB2YXIgc2VhcmNoVGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudCgkc2NvcGUudGV4dCkucmVwbGFjZSgvJTIwL2csICcrJyk7XG4gICAgICAgICB2YXIgbXlVcmwgPSAgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvJytcbiAgICAgICAgICAgICAgICAgICAgICAnc2VhcmNoP3BhcnQ9c25pcHBldCcrXG4gICAgICAgICAgICAgICAgICAgICAgJyZ0eXBlPXZpZGVvJytcbiAgICAgICAgICAgICAgICAgICAgICAnJnE9JytcbiAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hUZXh0K1xuICAgICAgICAgICAgICAgICAgICAgICcma2V5PScrXG4gICAgICAgICAgICAgICAgICAgICAgJHdpbmRvdy5fX2Vudi5hcGlLZXk7XG4gICAgICAgICRodHRwKHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogbXlVcmxcblxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcblxuICAgICAgICAgIHNldFNlYXJjaFJlc3VsdHMocmVzcG9uc2UuZGF0YS5pdGVtcyk7XG5cbiAgICAgICAgfSxmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgJGxvZyhlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldFVybCA9IGZ1bmN0aW9uKHZpZGVvKSB7XG4gICAgICByZXR1cm4gXCJodHRwOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL1wiK3ZpZGVvLmlkLnZpZGVvSWQrXCI/ZW5hYmxlanNhcGk9MVwiO1xuICAgIH07XG5cbiAgICAkc2NvcGUudHJ1c3RTcmMgPSBmdW5jdGlvbihzcmMpIHtcbiAgICAgIHJldHVybiAkc2NlLnRydXN0QXNSZXNvdXJjZVVybChzcmMpO1xuICAgIH07XG5cbiAgICAkc2NvcGUudG9nZ2xlTWVudSA9IGZ1bmN0aW9uKHZpZGVvSWQpIHtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgndWwjJyt2aWRlb0lkKS50b2dnbGUoXCJzbG93XCIpO1xuICAgIH07XG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVBsYXllcigpIHtcblxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgJHNjb3BlLnZpZGVvcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgdmFyIGlkID0gJ3ZpZC0nKyhpKzEpO1xuICAgICAgICAgIHZhciB2aWRQbGF5ZXJPYmogPSBuZXcgWVQuUGxheWVyKGlkLCB7XG4gICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAnb25TdGF0ZUNoYW5nZSc6ICRzY29wZS5vblBsYXllclN0YXRlQ2hhbmdlXG4gICAgICAgICAgICAgfVxuICAgICAgICAgICB9KTtcbiAgICAgICAgICAgdmlkQXJyYXkucHVzaCh2aWRQbGF5ZXJPYmopO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgJHNjb3BlLiRvbignbmdSZXBlYXRGaW5pc2hlZCcsIGZ1bmN0aW9uKG5nUmVwZWF0RmluaXNoZWRFdmVudCkge1xuXG4gICAgICAgY3JlYXRlUGxheWVyKCk7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUub25QbGF5ZXJSZWFkeSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgIGV2ZW50LnRhcmdldC5wbGF5VmlkZW8oKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLm9uUGxheWVyU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIGlmKGV2ZW50LmRhdGEgPT0gWVQuUGxheWVyU3RhdGUuUExBWUlORykge1xuICAgICAgICAgIHNlYXJjaFZpZExvZ2ljKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZWFyY2hWaWRMb2dpYyh2aWRlbykge1xuICAgICAgaWYoJHNjb3BlLmN1cnJlbnRTb25nICYmICRzY29wZS5pc1BsYXlpbmcpIHtcbiAgICAgICAgJHNjb3BlLnBhdXNlKCk7XG4gICAgICB9XG4gICAgICBpZihzZWFyY2hDdXJyZW50U29uZykge1xuICAgICAgICBzZWFyY2hDdXJyZW50U29uZy5wYXVzZVZpZGVvKCk7XG4gICAgICAgIHNlYXJjaEN1cnJlbnRTb25nID0gdmlkZW87XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2hDdXJyZW50U29uZyAgPSB2aWRlbztcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3BWaWRlbygpIHtcblxuICAgICAgcGxheWVyLnN0b3BWaWRlbygpO1xuICAgIH1cblxuICAgICRzY29wZS5wbGF5ID0gZnVuY3Rpb24oc29uZykge1xuXG4gICAgICAgIHZhciB2aWRIZWlnaHQgPSBhbmd1bGFyLmVsZW1lbnQoJ2Rpdi52aWRlbycpLmhlaWdodCgpO1xuICAgICAgICB2YXIgdmlkV2lkdGggPSBhbmd1bGFyLmVsZW1lbnQoJ2Rpdi52aWRlbycpLndpZHRoKCk7XG4gICAgICAgIHZhciB2aWRQbGF5ID0gc29uZyB8fCAkc2NvcGUuc29uZ3MoKVswXVxuXG4gICAgICAgIGlmKHNlYXJjaEN1cnJlbnRTb25nKSB7XG4gICAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcuc3RvcFZpZGVvKCk7XG4gICAgICAgICAgc2VhcmNoQ3VycmVudFNvbmcgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoISRzY29wZS5jdXJyZW50U29uZykge1xuXG4gICAgICAgICBwbGF5ZXIgPSBuZXcgWVQuUGxheWVyKCdpZnJhbWUtdXR1YmUtcGxheWVyJywge1xuICAgICAgICAgICBoZWlnaHQ6IHZpZEhlaWdodCxcbiAgICAgICAgICAgd2lkdGg6ICB2aWRXaWR0aCxcbiAgICAgICAgICAgdmlkZW9JZDogdmlkUGxheS51cmwsXG4gICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICdvblJlYWR5JzogJHNjb3BlLm9uUGxheWVyUmVhZHlcbiAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgICAgfSBlbHNlIGlmKCRzY29wZS5jdXJyZW50U29uZyAmJiAhc29uZykge1xuXG4gICAgICAgICAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwbGF5ZXIubG9hZFZpZGVvQnlJZCh7XG4gICAgICAgICAgICAndmlkZW9JZCc6IHZpZFBsYXkudXJsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkc2NvcGUuY3VycmVudFNvbmcucGxheWluZyA9IG51bGw7XG4gICAgICAgfVxuXG4gICAgICAgJHNjb3BlLmN1cnJlbnRTb25nID0gdmlkUGxheTtcbiAgICAgICAkc2NvcGUuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgICBzb25nLnBsYXlpbmcgPSB0cnVlO1xuICAgIH07XG5cbiAgICAkc2NvcGUucGF1c2UgPSBmdW5jdGlvbihzb25nKSB7XG5cbiAgICAgICAkc2NvcGUuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgcGxheWVyLnBhdXNlVmlkZW8oKTtcbiAgICAgICBpZihzb25nKXtcbiAgICAgICAgIHNvbmcucGxheWluZyA9IG51bGw7XG4gICAgICAgfSBlbHNlIHtcbiAgICAgICAgICRzY29wZS5jdXJyZW50U29uZy5wbGF5aW5nID0gbnVsbDtcbiAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFNvbmdJbmRleChzb25nKSB7XG4gICAgICByZXR1cm4gc29uZ3MoKS5pbmRleE9mKHNvbmcpO1xuICAgIH1cblxuICAgICRzY29wZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBzb25nc0FycmF5ID0gJHNjb3BlLnNvbmdzKCk7XG4gICAgICB2YXIgbGFzdEluZGV4ID0gc29uZ3NBcnJheS5sZW5ndGggLSAxO1xuICAgICAgdmFyIGluZGV4T2ZDdXJyZW50U29uZyA9IHNvbmdzQXJyYXkuaW5kZXhPZigkc2NvcGUuY3VycmVudFNvbmcpO1xuICAgICAgdmFyIHNvbmdUb1BsYXkgPSBudWxsO1xuXG4gICAgICBpZigkc2NvcGUuY3VycmVudFNvbmcpIHtcbiAgICAgICAgaWYoaW5kZXhPZkN1cnJlbnRTb25nIDwgbGFzdEluZGV4ICkge1xuXG4gICAgICAgICAgc29uZ1RvUGxheSAgPSBzb25nc0FycmF5W2luZGV4T2ZDdXJyZW50U29uZyArIDFdO1xuXG4gICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgIGluZGV4T2ZDdXJyZW50U29uZyA9IDA7XG4gICAgICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtpbmRleE9mQ3VycmVudFNvbmddO1xuICAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc29uZ1RvUGxheSAgPSBzb25nc0FycmF5WzBdO1xuICAgICAgfVxuXG4gICAgICAkc2NvcGUucGxheShzb25nVG9QbGF5KTtcbiAgIH07XG5cbiAgICRzY29wZS5wcmV2aW91cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgIHZhciBzb25nc0FycmF5ID0gJHNjb3BlLnNvbmdzKCk7XG4gICAgIHZhciBsYXN0SW5kZXggPSBzb25nc0FycmF5Lmxlbmd0aCAtIDE7XG4gICAgIHZhciBpbmRleE9mQ3VycmVudFNvbmcgPSBzb25nc0FycmF5LmluZGV4T2YoJHNjb3BlLmN1cnJlbnRTb25nKTtcbiAgICAgdmFyIHNvbmdUb1BsYXkgPSBudWxsO1xuXG4gICAgIGlmKCRzY29wZS5jdXJyZW50U29uZykge1xuICAgICAgIGlmKGluZGV4T2ZDdXJyZW50U29uZyA+IDAgKSB7XG5cbiAgICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtpbmRleE9mQ3VycmVudFNvbmcgLSAxXTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgaW5kZXhPZkN1cnJlbnRTb25nID0gbGFzdEluZGV4O1xuICAgICAgICAgIHNvbmdUb1BsYXkgID0gc29uZ3NBcnJheVtpbmRleE9mQ3VycmVudFNvbmddO1xuICAgICAgICB9XG4gICAgIH0gZWxzZSB7XG4gICAgICAgc29uZ1RvUGxheSAgPSBzb25nc0FycmF5W2xhc3RJbmRleF07XG4gICAgIH1cblxuICAgICAkc2NvcGUucGxheShzb25nVG9QbGF5KTtcbiAgICB9O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvaG9tZS5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIE5hdkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRyb290U2NvcGUsICRhdXRoLCAkbG9jYXRpb24sIGxvY2FsU3RvcmFnZVNlcnZpY2UsICRodHRwLCBBcGlTeW5jKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICBmdW5jdGlvbiBjaGFuZ2VOYXZDb2xvcigpe1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnY29sb3InLCdibGFjaycpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCduYXYubmF2LWJhcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJ3doaXRlJyk7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJ25hdi5uYXYtYmFyIHVsJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywnd2hpdGUnKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgndWwubmF2LW1lbnUgYScpLmNzcygnY29sb3InLCdibGFjaycpO1xuICAgIH1cblxuICAgICRzY29wZS5pc19vcGVuID0gZmFsc2U7XG5cbiAgICAkc2NvcGUucGxheWxpc3RzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gQXBpU3luYy5nZXRQbGF5bGlzdHMoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5wYWdlUmVkaXJlY3QgPSBmdW5jdGlvbigpIHtcblxuICAgICAgaWYoJHJvb3RTY29wZS51c2VyLmlkKSB7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvdXNlcnMvJysgJHJvb3RTY29wZS51c2VyLmlkKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLnNpZ25PdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICRhdXRoLnNpZ25PdXQoKTtcbiAgICB9O1xuXG4gICAgJHJvb3RTY29wZS4kb24oJ2F1dGg6bG9nb3V0LXN1Y2Nlc3MnLCBmdW5jdGlvbihldikge1xuICAgICAgJHNjb3BlLnVzZXJTaWduZWRJbiA9IG51bGw7XG4gICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZSgnY3VycmVudFVzZXInKTtcbiAgICAgIGNoYW5nZU5hdkNvbG9yKCk7XG4gICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLnRvZ2dsZU1lbnUgPSBmdW5jdGlvbihldmVudCwgeF9pZCkge1xuXG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJyNtb2JpbGUtaGFtLWJsYWNrJykudG9nZ2xlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI21vYmlsZS1oYW0td2hpdGUnKS50b2dnbGVDbGFzcygnaGlkZScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCcjbW9iaWxlLXgtYmxhY2snKS50b2dnbGVDbGFzcygnZGlzcGxheScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCcjbW9iaWxlLXgtd2hpdGUnKS50b2dnbGVDbGFzcygnZGlzcGxheScpO1xuICAgICAgYW5ndWxhci5lbGVtZW50KCdkaXYjJysgeF9pZCkudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXknKTtcblxuICAgIH07XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9uYXYuY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBSZWdpc3RyYXRpb25zQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGF1dGgsICRyb290U2NvcGUsICRsb2NhdGlvbiwgbG9jYWxTdG9yYWdlU2VydmljZSl7XG4gICAgJ25nSW5qZWN0JztcbiAgICBcbiAgICB2YXIgc2V0VXNlciA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdjdXJyZW50VXNlcicsIG9iaik7XG4gICAgfTtcblxuICAgICRzY29wZS5zdWJtaXRSZWdpc3RyYXRpb24gPSBmdW5jdGlvbihyZWdpc3RyYXRpb25Gb3JtKSB7XG5cbiAgICAgICRhdXRoLnN1Ym1pdFJlZ2lzdHJhdGlvbihyZWdpc3RyYXRpb25Gb3JtKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcblxuICAgICAgICAgICRhdXRoLnN1Ym1pdExvZ2luKHtcbiAgICAgICAgICAgIGVtYWlsOiByZWdpc3RyYXRpb25Gb3JtLmVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHJlZ2lzdHJhdGlvbkZvcm0ucGFzc3dvcmRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgJHJvb3RTY29wZS4kb24oJ2F1dGg6bG9naW4tc3VjY2VzcycsIGZ1bmN0aW9uKGV2LCB1c2VyKSB7XG5cbiAgICAgIHNldFVzZXIodXNlcik7XG4gICAgICAkbG9jYXRpb24ucGF0aCgnL3VzZXJzLycrIHVzZXIuaWQpO1xuXG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9yZWdpc3RyYXRpb25zLmNvbnRyb2xsZXIuanMiLCJleHBvcnQgY2xhc3MgU2Vzc2lvbnNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkYXV0aCwgJHJvb3RTY29wZSwgJGxvY2F0aW9uLCBVc2VyLCBQbGF5bGlzdCwgbG9jYWxTdG9yYWdlU2VydmljZSl7XG4gICAgJ25nSW5qZWN0JztcbiAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuXG4gICAgdmFyIHNldFVzZXIgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnY3VycmVudFVzZXInLCBvYmopO1xuICAgIH07XG5cblxuICAgJHNjb3BlLnN1Ym1pdExvZ2luID0gZnVuY3Rpb24obG9naW5Gb3JtKSB7XG4gICAgICRhdXRoLnN1Ym1pdExvZ2luKGxvZ2luRm9ybSkudGhlbihmdW5jdGlvbih1c2VyKSB7XG5cbiAgICAgICAgICAgICBzZXRVc2VyKHVzZXIpO1xuICAgICB9KTtcbiAgIH07XG5cbiAgICRyb290U2NvcGUuJG9uKCdhdXRoOmxvZ2luLXN1Y2Nlc3MnLCBmdW5jdGlvbihldiwgdXNlcikge1xuXG4gICAgICRsb2NhdGlvbi5wYXRoKCcvdXNlcnMvJysgdXNlci5pZCk7XG5cbiAgIH0pO1xuICAgJHJvb3RTY29wZS4kb24oJ2F1dGg6bG9naW4tZXJyb3InLCBmdW5jdGlvbihldiwgcmVhc29uKSB7XG4gICAgICRzY29wZS5lcnJvciA9IHJlYXNvbi5lcnJvcnNbMF07XG4gICB9KTtcblxuICAgVXNlci5xdWVyeSh7cGxheWxpc3RJZDogJyd9LHt1c2VySWQ6IDF9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpe1xuICAgICAkc2NvcGUudXNlcnMgPSByZXN1bHRzO1xuICAgfSk7XG5cblxuICAgJHNjb3BlLnNpZ25PdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgJGF1dGguc2lnbk91dCgpO1xuICAgfTtcblxuICAgJHJvb3RTY29wZS4kb24oJ2F1dGg6bG9nb3V0LXN1Y2Nlc3MnLCBmdW5jdGlvbihldikge1xuICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9zZXNzaW9ucy5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICgkbG9nLCAkaHR0cCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICB0aGlzLmFwaUhvc3QgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9Td2lpcC9nZW5lcmF0b3ItZ3VscC1hbmd1bGFyJztcbiAgfVxuXG4gIGdldENvbnRyaWJ1dG9ycyhsaW1pdD0zMCkge1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCh0aGlzLmFwaUhvc3QgKyAnL2NvbnRyaWJ1dG9ycz9wZXJfcGFnZT0nICsgbGltaXQpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLiRsb2cuZXJyb3IoJ1hIUiBGYWlsZWQgZm9yIGdldENvbnRyaWJ1dG9ycy5cXG4nICsgYW5ndWxhci50b0pzb24oZXJyb3IuZGF0YSwgdHJ1ZSkpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwiZXhwb3J0IGNsYXNzIFdlYkRldlRlY1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuZGF0YSA9IFtcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0FuZ3VsYXJKUycsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9hbmd1bGFyanMub3JnLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdIVE1MIGVuaGFuY2VkIGZvciB3ZWIgYXBwcyEnLFxuICAgICAgICAnbG9nbyc6ICdhbmd1bGFyLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdCcm93c2VyU3luYycsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2Jyb3dzZXJzeW5jLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaW1lLXNhdmluZyBzeW5jaHJvbmlzZWQgYnJvd3NlciB0ZXN0aW5nLicsXG4gICAgICAgICdsb2dvJzogJ2Jyb3dzZXJzeW5jLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdHdWxwSlMnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9ndWxwanMuY29tLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc3RyZWFtaW5nIGJ1aWxkIHN5c3RlbS4nLFxuICAgICAgICAnbG9nbyc6ICdndWxwLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdKYXNtaW5lJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vamFzbWluZS5naXRodWIuaW8vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0JlaGF2aW9yLURyaXZlbiBKYXZhU2NyaXB0LicsXG4gICAgICAgICdsb2dvJzogJ2phc21pbmUucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0thcm1hJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8va2FybWEtcnVubmVyLmdpdGh1Yi5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnU3BlY3RhY3VsYXIgVGVzdCBSdW5uZXIgZm9yIEphdmFTY3JpcHQuJyxcbiAgICAgICAgJ2xvZ28nOiAna2FybWEucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ1Byb3RyYWN0b3InLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3Byb3RyYWN0b3InLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnRW5kIHRvIGVuZCB0ZXN0IGZyYW1ld29yayBmb3IgQW5ndWxhckpTIGFwcGxpY2F0aW9ucyBidWlsdCBvbiB0b3Agb2YgV2ViRHJpdmVySlMuJyxcbiAgICAgICAgJ2xvZ28nOiAncHJvdHJhY3Rvci5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQm9vdHN0cmFwJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQm9vdHN0cmFwIGlzIHRoZSBtb3N0IHBvcHVsYXIgSFRNTCwgQ1NTLCBhbmQgSlMgZnJhbWV3b3JrIGZvciBkZXZlbG9waW5nIHJlc3BvbnNpdmUsIG1vYmlsZSBmaXJzdCBwcm9qZWN0cyBvbiB0aGUgd2ViLicsXG4gICAgICAgICdsb2dvJzogJ2Jvb3RzdHJhcC5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQW5ndWxhciBVSSBCb290c3RyYXAnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9hbmd1bGFyLXVpLmdpdGh1Yi5pby9ib290c3RyYXAvJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0Jvb3RzdHJhcCBjb21wb25lbnRzIHdyaXR0ZW4gaW4gcHVyZSBBbmd1bGFySlMgYnkgdGhlIEFuZ3VsYXJVSSBUZWFtLicsXG4gICAgICAgICdsb2dvJzogJ3VpLWJvb3RzdHJhcC5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnU2FzcyAoTm9kZSknLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9zYXNzL25vZGUtc2FzcycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdOb2RlLmpzIGJpbmRpbmcgdG8gbGlic2FzcywgdGhlIEMgdmVyc2lvbiBvZiB0aGUgcG9wdWxhciBzdHlsZXNoZWV0IHByZXByb2Nlc3NvciwgU2Fzcy4nLFxuICAgICAgICAnbG9nbyc6ICdub2RlLXNhc3MucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0VTNiAoQmFiZWwgZm9ybWVybHkgNnRvNSknLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vYmFiZWxqcy5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVHVybnMgRVM2KyBjb2RlIGludG8gdmFuaWxsYSBFUzUsIHNvIHlvdSBjYW4gdXNlIG5leHQgZ2VuZXJhdGlvbiBmZWF0dXJlcyB0b2RheS4nLFxuICAgICAgICAnbG9nbyc6ICdiYWJlbC5wbmcnXG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIGdldFRlYygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvd2ViRGV2VGVjL3dlYkRldlRlYy5zZXJ2aWNlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIE5hdmJhckRpcmVjdGl2ZSgpIHtcbiAgJ25nSW5qZWN0JztcblxuICBsZXQgZGlyZWN0aXZlID0ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmh0bWwnLFxuICAgIHNjb3BlOiB7XG4gICAgICAgIGNyZWF0aW9uRGF0ZTogJz0nXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBOYXZiYXJDb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn1cblxuY2xhc3MgTmF2YmFyQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yIChtb21lbnQpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgLy8gXCJ0aGlzLmNyZWF0aW9uRGF0ZVwiIGlzIGF2YWlsYWJsZSBieSBkaXJlY3RpdmUgb3B0aW9uIFwiYmluZFRvQ29udHJvbGxlcjogdHJ1ZVwiXG4gICAgdGhpcy5yZWxhdGl2ZURhdGUgPSBtb21lbnQodGhpcy5jcmVhdGlvbkRhdGUpLmZyb21Ob3coKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIE1hbGFya2V5RGlyZWN0aXZlKG1hbGFya2V5KSB7XG4gICduZ0luamVjdCc7XG5cbiAgbGV0IGRpcmVjdGl2ZSA9IHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICAgIGV4dHJhVmFsdWVzOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiAnJm5ic3A7JyxcbiAgICBsaW5rOiBsaW5rRnVuYyxcbiAgICBjb250cm9sbGVyOiBNYWxhcmtleUNvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiAndm0nXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICBmdW5jdGlvbiBsaW5rRnVuYyhzY29wZSwgZWwsIGF0dHIsIHZtKSB7XG4gICAgbGV0IHdhdGNoZXI7XG4gICAgbGV0IHR5cGlzdCA9IG1hbGFya2V5KGVsWzBdLCB7XG4gICAgICB0eXBlU3BlZWQ6IDQwLFxuICAgICAgZGVsZXRlU3BlZWQ6IDQwLFxuICAgICAgcGF1c2VEZWxheTogODAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIHBvc3RmaXg6ICcgJ1xuICAgIH0pO1xuXG4gICAgZWwuYWRkQ2xhc3MoJ2FjbWUtbWFsYXJrZXknKTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5leHRyYVZhbHVlcywgKHZhbHVlKSA9PiB7XG4gICAgICB0eXBpc3QudHlwZSh2YWx1ZSkucGF1c2UoKS5kZWxldGUoKTtcbiAgICB9KTtcblxuICAgIHdhdGNoZXIgPSBzY29wZS4kd2F0Y2goJ3ZtLmNvbnRyaWJ1dG9ycycsICgpID0+IHtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2bS5jb250cmlidXRvcnMsIChjb250cmlidXRvcikgPT4ge1xuICAgICAgICB0eXBpc3QudHlwZShjb250cmlidXRvci5sb2dpbikucGF1c2UoKS5kZWxldGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgIHdhdGNoZXIoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmNsYXNzIE1hbGFya2V5Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yICgkbG9nLCBnaXRodWJDb250cmlidXRvcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIHRoaXMuY29udHJpYnV0b3JzID0gW107XG5cbiAgICB0aGlzLmFjdGl2YXRlKGdpdGh1YkNvbnRyaWJ1dG9yKTtcbiAgfVxuXG4gIGFjdGl2YXRlKGdpdGh1YkNvbnRyaWJ1dG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29udHJpYnV0b3JzKGdpdGh1YkNvbnRyaWJ1dG9yKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuJGxvZy5pbmZvKCdBY3RpdmF0ZWQgQ29udHJpYnV0b3JzIFZpZXcnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvbnRyaWJ1dG9ycyhnaXRodWJDb250cmlidXRvcikge1xuICAgIHJldHVybiBnaXRodWJDb250cmlidXRvci5nZXRDb250cmlidXRvcnMoMTApLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuY29udHJpYnV0b3JzID0gZGF0YTtcblxuICAgICAgcmV0dXJuIHRoaXMuY29udHJpYnV0b3JzO1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==