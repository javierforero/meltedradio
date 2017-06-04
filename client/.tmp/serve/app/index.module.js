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

>>>>>>> deploy-ready
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
<<<<<<< HEAD

=======

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

>>>>>>> deploy-ready
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTAxZWVhODk0ZWExMzdjMjYwMDAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9tYWxhcmtleS9tYWxhcmtleS5kaXJlY3RpdmUuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnN0YW50IiwibWFsYXJrZXkiLCJtb21lbnQiLCJjb25maWciLCIkYXV0aFByb3ZpZGVyIiwiY29uZmlndXJlIiwiYXBpVXJsIiwibG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyIiwic2V0UHJlZml4IiwicmFpbHNTZXJpYWxpemVyUHJvdmlkZXIiLCJ1bmRlcnNjb3JlIiwiaWRlbnRpdHkiLCJjYW1lbGl6ZSIsInJ1biIsInNlcnZpY2UiLCJjb250cm9sbGVyIiwiZGlyZWN0aXZlIiwiJHRpbWVvdXQiLCJyZXN0cmljdCIsImxpbmsiLCJzY29wZSIsImVsZW1lbnQiLCJhdHRyIiwiJGxhc3QiLCIkZW1pdCIsIm9uRmluaXNoUmVuZGVyIiwiZmFjdG9yeSIsIkFwaVN5bmMiLCJzZXRQbGF5bGlzdHMiLCJvYmoiLCJwbGF5bGlzdHMiLCJzZXRTb25ncyIsInNvbmdzIiwiZ2V0UGxheWxpc3RzIiwiZ2V0U29uZ3MiLCJyYWlsc1Jlc291cmNlRmFjdG9yeSIsInVybCIsIm5hbWUiLCIkbG9nUHJvdmlkZXIiLCJ0b2FzdHJDb25maWciLCJkZWJ1Z0VuYWJsZWQiLCJhbGxvd0h0bWwiLCJ0aW1lT3V0IiwicG9zaXRpb25DbGFzcyIsInByZXZlbnREdXBsaWNhdGVzIiwicHJvZ3Jlc3NCYXIiLCJyb3V0ZXJDb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsInN0YXRlIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyQXMiLCJyZXNvbHZlIiwiYXV0aCIsIiRhdXRoIiwidmFsaWRhdGVVc2VyIiwib3RoZXJ3aXNlIiwicnVuQmxvY2siLCIkbG9nIiwiZGVidWciLCJ3ZWJEZXZUZWMiLCJ0b2FzdHIiLCJhd2Vzb21lVGhpbmdzIiwiY2xhc3NBbmltYXRpb24iLCJjcmVhdGlvbkRhdGUiLCJhY3RpdmF0ZSIsImdldFdlYkRldlRlYyIsImdldFRlYyIsImZvckVhY2giLCJhd2Vzb21lVGhpbmciLCJyYW5rIiwiTWF0aCIsInJhbmRvbSIsImluZm8iLCIkaHR0cCIsImFwaUhvc3QiLCJsaW1pdCIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImRhdGEiLCJjYXRjaCIsImVycm9yIiwidG9Kc29uIiwiV2ViRGV2VGVjU2VydmljZSIsIk5hdmJhckRpcmVjdGl2ZSIsIk5hdmJhckNvbnRyb2xsZXIiLCJiaW5kVG9Db250cm9sbGVyIiwicmVsYXRpdmVEYXRlIiwiZnJvbU5vdyIsIk1hbGFya2V5RGlyZWN0aXZlIiwiZXh0cmFWYWx1ZXMiLCJ0ZW1wbGF0ZSIsImxpbmtGdW5jIiwiTWFsYXJrZXlDb250cm9sbGVyIiwiZWwiLCJ2bSIsIndhdGNoZXIiLCJ0eXBpc3QiLCJ0eXBlU3BlZWQiLCJkZWxldGVTcGVlZCIsInBhdXNlRGVsYXkiLCJsb29wIiwicG9zdGZpeCIsImFkZENsYXNzIiwidmFsdWUiLCJ0eXBlIiwicGF1c2UiLCJkZWxldGUiLCIkd2F0Y2giLCJjb250cmlidXRvcnMiLCJjb250cmlidXRvciIsImxvZ2luIiwiJG9uIiwiZ2l0aHViQ29udHJpYnV0b3IiLCJnZXRDb250cmlidXRvcnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBSUFBLFNBQVFDLE9BQU8sZUFBZSxDQUFDLGFBQWEsYUFBYSxXQUFXLGNBQWMsY0FBYyxVQUFVLGNBQWMsYUFBYSxnQkFBZ0IsVUFBVSxpQkFBaUIsU0FBUyx1QkFDdExDLFNBQVMsWUFBWUMsVUFDckJELFNBQVMsVUFBVUUsUUFDbkJDLE9BSEgsZUFJR0EsT0FKSCxzQkFLR0EseUJBQU8sVUFBU0MsZUFBZTtHQUM3QkEsY0FBY0MsVUFBVTtLQUNwQkMsUUFBUTs7S0FHYkgsdUNBQU8sVUFBU0ksNkJBQTRCO0dBQzNDQSw0QkFBNEJDLFVBQVU7S0FFdkNMLG1DQUFPLFVBQVNNLHlCQUF3QjtHQUN2Q0Esd0JBQXdCQyxXQUFXWixRQUFRYSxVQUFVQyxTQUFTZCxRQUFRYTtLQUV4RUUsSUFoQkgsa0JBaUJHQyxRQUFRLHFCQWpCWCw2Q0FrQkdBLFFBQVEsYUFsQlgsNkJBbUJHQyxXQUFXLGtCQW5CZCxzQkFvQkdDLFVBQVUsY0FwQmIseUJBcUJHQSxVQUFVLGdCQXJCYiw2QkFzQkdBLFVBQVUsK0JBQWtCLFVBQVNDLFVBQVM7R0FDN0MsT0FBTztLQUNMQyxVQUFVO0tBQ1ZDLE1BQU0sY0FBVUMsT0FBT0MsU0FBU0MsTUFBTTtPQUNwQyxJ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T0FBT1EsS0FBS0ssWUFBWUMsT0FBT0wsUUFBUUM7Ozs7S0FJM0N4RixNQUFNNkYsSUFBSSxZQUFZLFlBQU07T0FDMUJoQjs7Ozs7OzhEQWlCK0I7R0FWbkMsNEJBQWF2QyxNQUFNd0QsbUJBQW1CO0tBQ3BDOztLQURvQzs7S0FHcEMsS0FBS3hELE9BQU9BO0tBQ1osS0FBS29ELGVBQWU7O0tBRXBCLEtBQUs3QyxTQUFTaUQ7OztHQWdCaEIsYUFBYSxvQkFBb0IsQ0FBQztLQUNoQyxLQUFLO0tBQ0wsT0FBTyxTQUFTLFNBZlRBLG1CQUFtQjtPQUFBOztPQUMxQixPQUFPLEtBQUtDLGdCQUFnQkQsbUJBQW1CcEMsS0FBSyxZQUFNO1NBQ3hELE1BQUtwQixLQUFLZSxLQUFLOzs7TUFvQmhCO0tBQ0QsS0FBSztLQUNMLE9BQU8sU0FBUyxnQkFsQkZ5QyxtQkFBbUI7T0FBQTs7T0FDakMsT0FBT0Esa0JBQWtCQyxnQkFBZ0IsSUFBSXJDLEtBQUssVUFBQ0UsTUFBUztTQUMxRCxPQUFLOEIsZUFBZTlCOztTQUVwQixPQUFPLE9BQUs4Qjs7Ozs7R0F5QmhCLE9BQU8iLCJmaWxlIjoiaW5kZXgubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTAxZWVhODk0ZWExMzdjMjYwMDAiLCIvKiBnbG9iYWwgbWFsYXJrZXk6ZmFsc2UsIG1vbWVudDpmYWxzZSAqL1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2luZGV4LmNvbmZpZyc7XG5pbXBvcnQgeyByb3V0ZXJDb25maWcgfSBmcm9tICcuL2luZGV4LnJvdXRlJztcbmltcG9ydCB7IHJ1bkJsb2NrIH0gZnJvbSAnLi9pbmRleC5ydW4nO1xuaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIgfSBmcm9tICcuL21haW4vbWFpbi5jb250cm9sbGVyJztcbmltcG9ydCB7IEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL2dpdGh1YkNvbnRyaWJ1dG9yL2dpdGh1YkNvbnRyaWJ1dG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2ViRGV2VGVjU2VydmljZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL3dlYkRldlRlYy93ZWJEZXZUZWMuc2VydmljZSc7XG5pbXBvcnQgeyBOYXZiYXJEaXJlY3RpdmUgfSBmcm9tICcuLi9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYWxhcmtleURpcmVjdGl2ZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL21hbGFya2V5L21hbGFya2V5LmRpcmVjdGl2ZSc7XG5cblxuXG5hbmd1bGFyLm1vZHVsZSgnbWVsdGVkUmFkaW8nLCBbJ25nQW5pbWF0ZScsICduZ0Nvb2tpZXMnLCAnbmdUb3VjaCcsICduZ1Nhbml0aXplJywgJ25nTWVzc2FnZXMnLCAnbmdBcmlhJywgJ25nUmVzb3VyY2UnLCAndWkucm91dGVyJywgJ3VpLmJvb3RzdHJhcCcsICd0b2FzdHInLCAnbmctdG9rZW4tYXV0aCcsICdyYWlscycsICdMb2NhbFN0b3JhZ2VNb2R1bGUnXSlcbiAgLmNvbnN0YW50KCdtYWxhcmtleScsIG1hbGFya2V5KVxuICAuY29uc3RhbnQoJ21vbWVudCcsIG1vbWVudClcbiAgLmNvbmZpZyhjb25maWcpXG4gIC5jb25maWcocm91dGVyQ29uZmlnKVxuICAuY29uZmlnKGZ1bmN0aW9uKCRhdXRoUHJvdmlkZXIpIHtcbiAgICAgJGF1dGhQcm92aWRlci5jb25maWd1cmUoe1xuICAgICAgICAgYXBpVXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJ1xuICAgICB9KTtcbiAgIH0pXG4gICAuY29uZmlnKGZ1bmN0aW9uKGxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlcil7XG4gICAgIGxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlci5zZXRQcmVmaXgoJ21lbHRlZFJhZGlvJyk7XG4gICB9KVxuICAgLmNvbmZpZyhmdW5jdGlvbihyYWlsc1NlcmlhbGl6ZXJQcm92aWRlcil7XG4gICAgIHJhaWxzU2VyaWFsaXplclByb3ZpZGVyLnVuZGVyc2NvcmUoYW5ndWxhci5pZGVudGl0eSkuY2FtZWxpemUoYW5ndWxhci5pZGVudGl0eSk7XG4gICB9KVxuICAucnVuKHJ1bkJsb2NrKVxuICAuc2VydmljZSgnZ2l0aHViQ29udHJpYnV0b3InLCBHaXRodWJDb250cmlidXRvclNlcnZpY2UpXG4gIC5zZXJ2aWNlKCd3ZWJEZXZUZWMnLCBXZWJEZXZUZWNTZXJ2aWNlKVxuICAuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcilcbiAgLmRpcmVjdGl2ZSgnYWNtZU5hdmJhcicsIE5hdmJhckRpcmVjdGl2ZSlcbiAgLmRpcmVjdGl2ZSgnYWNtZU1hbGFya2V5JywgTWFsYXJrZXlEaXJlY3RpdmUpXG4gIC5kaXJlY3RpdmUoJ29uRmluaXNoUmVuZGVyJywgZnVuY3Rpb24oJHRpbWVvdXQpe1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XG4gICAgICAgIGlmIChzY29wZS4kbGFzdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNjb3BlLiRlbWl0KGF0dHIub25GaW5pc2hSZW5kZXIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICB9O1xuXG4gIH0pXG4gIC5mYWN0b3J5KCdBcGlTeW5jJywgZnVuY3Rpb24oKXtcbiAgICB2YXIgQXBpU3luYyA9IHt9O1xuXG4gICAgQXBpU3luYy5zZXRQbGF5bGlzdHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgIEFwaVN5bmMucGxheWxpc3RzID0gb2JqO1xuICAgIH07XG5cbiAgICBBcGlTeW5jLnNldFNvbmdzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIEFwaVN5bmMuc29uZ3MgPSBvYmo7XG4gICAgfTtcblxuICAgIEFwaVN5bmMuZ2V0UGxheWxpc3RzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gQXBpU3luYy5wbGF5bGlzdHM7XG4gICAgfTtcblxuICAgIEFwaVN5bmMuZ2V0U29uZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBBcGlTeW5jLnNvbmdzO1xuICAgIH07XG5cbiAgICByZXR1cm4gQXBpU3luYztcbiAgfSlcbiAgLmZhY3RvcnkoJ1BsYXlsaXN0JywgZnVuY3Rpb24ocmFpbHNSZXNvdXJjZUZhY3RvcnkpIHtcbiAgICByZXR1cm4gcmFpbHNSZXNvdXJjZUZhY3Rvcnkoe1xuICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3BsYXlsaXN0cycsXG4gICAgICBuYW1lOiAncGxheWxpc3QnXG4gICAgfSk7XG4gIH0pXG4gIC5mYWN0b3J5KCdVc2VyJyxmdW5jdGlvbihyYWlsc1Jlc291cmNlRmFjdG9yeSl7XG4gICAgcmV0dXJuIHJhaWxzUmVzb3VyY2VGYWN0b3J5KHtcbiAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC91c2Vycy97e3VzZXJJZH19L3BsYXlsaXN0cycsXG4gICAgICBuYW1lOiAndXNlcidcbiAgICB9KTtcbiAgfSlcbiAgLmZhY3RvcnkoJ1NvbmcnLCBmdW5jdGlvbihyYWlsc1Jlc291cmNlRmFjdG9yeSl7XG4gICAgcmV0dXJuIHJhaWxzUmVzb3VyY2VGYWN0b3J5KHtcbiAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9wbGF5bGlzdHMve3twbGF5bGlzdElkfX0vc29uZ3MnLFxuICAgICAgbmFtZTogJ3NvbmcnXG4gICAgfSk7XG4gIH0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJleHBvcnQgZnVuY3Rpb24gY29uZmlnICgkbG9nUHJvdmlkZXIsIHRvYXN0ckNvbmZpZykge1xuICAnbmdJbmplY3QnO1xuICAvLyBFbmFibGUgbG9nXG4gICRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XG5cbiAgLy8gU2V0IG9wdGlvbnMgdGhpcmQtcGFydHkgbGliXG4gIHRvYXN0ckNvbmZpZy5hbGxvd0h0bWwgPSB0cnVlO1xuICB0b2FzdHJDb25maWcudGltZU91dCA9IDMwMDA7XG4gIHRvYXN0ckNvbmZpZy5wb3NpdGlvbkNsYXNzID0gJ3RvYXN0LXRvcC1yaWdodCc7XG4gIHRvYXN0ckNvbmZpZy5wcmV2ZW50RHVwbGljYXRlcyA9IHRydWU7XG4gIHRvYXN0ckNvbmZpZy5wcm9ncmVzc0JhciA9IHRydWU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4LmNvbmZpZy5qcyIsImV4cG9ydCBmdW5jdGlvbiByb3V0ZXJDb25maWcgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgJ25nSW5qZWN0JztcbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ21haW4nLCB7XG4gICAgICB1cmw6ICcvJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL21haW4vbWFpbi5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcicsXG4gICAgICBjb250cm9sbGVyQXM6ICdtYWluJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdzaWduX2luJywge1xuICAgICAgdXJsOiAnL3NpZ25faW4nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdmlld3MvdXNlcl9zZXNzaW9ucy9uZXcuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnU2Vzc2lvbnNDdHJsIGFzIHNpZ25pbidcbiAgICB9KVxuICAgIC5zdGF0ZSgnc2lnbl91cCcsIHtcbiAgICAgIHVybDogJy9zaWduX3VwJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL3VzZXJfcmVnaXN0cmF0aW9ucy9uZXcuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnUmVnaXN0cmF0aW9uc0N0cmwgYXMgc2lnbnVwJ1xuICAgIH0pXG4gICAgLnN0YXRlICAoJ2hvbWUnLCB7XG4gICAgICB1cmw6ICcvdXNlcnMvOmlkJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL2hvbWUuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwgYXMgaG9tZScsXG4gICAgICByZXNvbHZlOiB7XG4gICAgICAgICBhdXRoOiBmdW5jdGlvbigkYXV0aCkge1xuICAgICAgICAgICByZXR1cm4gJGF1dGgudmFsaWRhdGVVc2VyKCk7XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgIH0pO1xuXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXgucm91dGUuanMiLCJleHBvcnQgZnVuY3Rpb24gcnVuQmxvY2sgKCRsb2cpIHtcbiAgJ25nSW5qZWN0JztcbiAgJGxvZy5kZWJ1ZygncnVuQmxvY2sgZW5kJyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsImV4cG9ydCBjbGFzcyBNYWluQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yICgkdGltZW91dCwgd2ViRGV2VGVjLCB0b2FzdHIpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy5hd2Vzb21lVGhpbmdzID0gW107XG4gICAgdGhpcy5jbGFzc0FuaW1hdGlvbiA9ICcnO1xuICAgIHRoaXMuY3JlYXRpb25EYXRlID0gMTQ4MTYzOTcwNDEwNztcbiAgICB0aGlzLnRvYXN0ciA9IHRvYXN0cjtcblxuXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGltZW91dCwgd2ViRGV2VGVjKTtcbiAgfVxuXG4gIGFjdGl2YXRlKCR0aW1lb3V0LCB3ZWJEZXZUZWMpIHtcbiAgICB0aGlzLmdldFdlYkRldlRlYyh3ZWJEZXZUZWMpO1xuICAgICR0aW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xhc3NBbmltYXRpb24gPSAncnViYmVyQmFuZCc7XG4gICAgfSwgNDAwMCk7XG4gIH1cblxuICBnZXRXZWJEZXZUZWMod2ViRGV2VGVjKSB7XG4gICAgdGhpcy5hd2Vzb21lVGhpbmdzID0gd2ViRGV2VGVjLmdldFRlYygpO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuYXdlc29tZVRoaW5ncywgKGF3ZXNvbWVUaGluZykgPT4ge1xuICAgICAgYXdlc29tZVRoaW5nLnJhbmsgPSBNYXRoLnJhbmRvbSgpO1xuICAgIH0pO1xuICB9XG5cbiAgc2hvd1RvYXN0cigpIHtcbiAgICB0aGlzLnRvYXN0ci5pbmZvKCdGb3JrIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vU3dpaXAvZ2VuZXJhdG9yLWd1bHAtYW5ndWxhclwiIHRhcmdldD1cIl9ibGFua1wiPjxiPmdlbmVyYXRvci1ndWxwLWFuZ3VsYXI8L2I+PC9hPicpO1xuICAgIHRoaXMuY2xhc3NBbmltYXRpb24gPSAnJztcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9tYWluL21haW4uY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBHaXRodWJDb250cmlidXRvclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciAoJGxvZywgJGh0dHApIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgdGhpcy5hcGlIb3N0ID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvU3dpaXAvZ2VuZXJhdG9yLWd1bHAtYW5ndWxhcic7XG4gIH1cblxuICBnZXRDb250cmlidXRvcnMobGltaXQ9MzApIHtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQodGhpcy5hcGlIb3N0ICsgJy9jb250cmlidXRvcnM/cGVyX3BhZ2U9JyArIGxpbWl0KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy4kbG9nLmVycm9yKCdYSFIgRmFpbGVkIGZvciBnZXRDb250cmlidXRvcnMuXFxuJyArIGFuZ3VsYXIudG9Kc29uKGVycm9yLmRhdGEsIHRydWUpKTtcbiAgICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvZ2l0aHViQ29udHJpYnV0b3IvZ2l0aHViQ29udHJpYnV0b3Iuc2VydmljZS5qcyIsImV4cG9ydCBjbGFzcyBXZWJEZXZUZWNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLmRhdGEgPSBbXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdBbmd1bGFySlMnLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vYW5ndWxhcmpzLm9yZy8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnSFRNTCBlbmhhbmNlZCBmb3Igd2ViIGFwcHMhJyxcbiAgICAgICAgJ2xvZ28nOiAnYW5ndWxhci5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQnJvd3NlclN5bmMnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9icm93c2Vyc3luYy5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGltZS1zYXZpbmcgc3luY2hyb25pc2VkIGJyb3dzZXIgdGVzdGluZy4nLFxuICAgICAgICAnbG9nbyc6ICdicm93c2Vyc3luYy5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnR3VscEpTJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vZ3VscGpzLmNvbS8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHN0cmVhbWluZyBidWlsZCBzeXN0ZW0uJyxcbiAgICAgICAgJ2xvZ28nOiAnZ3VscC5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnSmFzbWluZScsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2phc21pbmUuZ2l0aHViLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdCZWhhdmlvci1Ecml2ZW4gSmF2YVNjcmlwdC4nLFxuICAgICAgICAnbG9nbyc6ICdqYXNtaW5lLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdLYXJtYScsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2thcm1hLXJ1bm5lci5naXRodWIuaW8vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1NwZWN0YWN1bGFyIFRlc3QgUnVubmVyIGZvciBKYXZhU2NyaXB0LicsXG4gICAgICAgICdsb2dvJzogJ2thcm1hLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdQcm90cmFjdG9yJyxcbiAgICAgICAgJ3VybCc6ICdodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9wcm90cmFjdG9yJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0VuZCB0byBlbmQgdGVzdCBmcmFtZXdvcmsgZm9yIEFuZ3VsYXJKUyBhcHBsaWNhdGlvbnMgYnVpbHQgb24gdG9wIG9mIFdlYkRyaXZlckpTLicsXG4gICAgICAgICdsb2dvJzogJ3Byb3RyYWN0b3IucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0Jvb3RzdHJhcCcsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2dldGJvb3RzdHJhcC5jb20vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0Jvb3RzdHJhcCBpcyB0aGUgbW9zdCBwb3B1bGFyIEhUTUwsIENTUywgYW5kIEpTIGZyYW1ld29yayBmb3IgZGV2ZWxvcGluZyByZXNwb25zaXZlLCBtb2JpbGUgZmlyc3QgcHJvamVjdHMgb24gdGhlIHdlYi4nLFxuICAgICAgICAnbG9nbyc6ICdib290c3RyYXAucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0FuZ3VsYXIgVUkgQm9vdHN0cmFwJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vYW5ndWxhci11aS5naXRodWIuaW8vYm9vdHN0cmFwLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdCb290c3RyYXAgY29tcG9uZW50cyB3cml0dGVuIGluIHB1cmUgQW5ndWxhckpTIGJ5IHRoZSBBbmd1bGFyVUkgVGVhbS4nLFxuICAgICAgICAnbG9nbyc6ICd1aS1ib290c3RyYXAucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ1Nhc3MgKE5vZGUpJyxcbiAgICAgICAgJ3VybCc6ICdodHRwczovL2dpdGh1Yi5jb20vc2Fzcy9ub2RlLXNhc3MnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnTm9kZS5qcyBiaW5kaW5nIHRvIGxpYnNhc3MsIHRoZSBDIHZlcnNpb24gb2YgdGhlIHBvcHVsYXIgc3R5bGVzaGVldCBwcmVwcm9jZXNzb3IsIFNhc3MuJyxcbiAgICAgICAgJ2xvZ28nOiAnbm9kZS1zYXNzLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdFUzYgKEJhYmVsIGZvcm1lcmx5IDZ0bzUpJyxcbiAgICAgICAgJ3VybCc6ICdodHRwczovL2JhYmVsanMuaW8vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1R1cm5zIEVTNisgY29kZSBpbnRvIHZhbmlsbGEgRVM1LCBzbyB5b3UgY2FuIHVzZSBuZXh0IGdlbmVyYXRpb24gZmVhdHVyZXMgdG9kYXkuJyxcbiAgICAgICAgJ2xvZ28nOiAnYmFiZWwucG5nJ1xuICAgICAgfVxuICAgIF07XG4gIH1cblxuICBnZXRUZWMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL3dlYkRldlRlYy93ZWJEZXZUZWMuc2VydmljZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBOYXZiYXJEaXJlY3RpdmUoKSB7XG4gICduZ0luamVjdCc7XG5cbiAgbGV0IGRpcmVjdGl2ZSA9IHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5odG1sJyxcbiAgICBzY29wZToge1xuICAgICAgICBjcmVhdGlvbkRhdGU6ICc9J1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogTmF2YmFyQ29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59XG5cbmNsYXNzIE5hdmJhckNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAobW9tZW50KSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIC8vIFwidGhpcy5jcmVhdGlvbkRhdGVcIiBpcyBhdmFpbGFibGUgYnkgZGlyZWN0aXZlIG9wdGlvbiBcImJpbmRUb0NvbnRyb2xsZXI6IHRydWVcIlxuICAgIHRoaXMucmVsYXRpdmVEYXRlID0gbW9tZW50KHRoaXMuY3JlYXRpb25EYXRlKS5mcm9tTm93KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBNYWxhcmtleURpcmVjdGl2ZShtYWxhcmtleSkge1xuICAnbmdJbmplY3QnO1xuXG4gIGxldCBkaXJlY3RpdmUgPSB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgICBleHRyYVZhbHVlczogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogJyZuYnNwOycsXG4gICAgbGluazogbGlua0Z1bmMsXG4gICAgY29udHJvbGxlcjogTWFsYXJrZXlDb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgZnVuY3Rpb24gbGlua0Z1bmMoc2NvcGUsIGVsLCBhdHRyLCB2bSkge1xuICAgIGxldCB3YXRjaGVyO1xuICAgIGxldCB0eXBpc3QgPSBtYWxhcmtleShlbFswXSwge1xuICAgICAgdHlwZVNwZWVkOiA0MCxcbiAgICAgIGRlbGV0ZVNwZWVkOiA0MCxcbiAgICAgIHBhdXNlRGVsYXk6IDgwMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBwb3N0Zml4OiAnICdcbiAgICB9KTtcblxuICAgIGVsLmFkZENsYXNzKCdhY21lLW1hbGFya2V5Jyk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuZXh0cmFWYWx1ZXMsICh2YWx1ZSkgPT4ge1xuICAgICAgdHlwaXN0LnR5cGUodmFsdWUpLnBhdXNlKCkuZGVsZXRlKCk7XG4gICAgfSk7XG5cbiAgICB3YXRjaGVyID0gc2NvcGUuJHdhdGNoKCd2bS5jb250cmlidXRvcnMnLCAoKSA9PiB7XG4gICAgICBhbmd1bGFyLmZvckVhY2godm0uY29udHJpYnV0b3JzLCAoY29udHJpYnV0b3IpID0+IHtcbiAgICAgICAgdHlwaXN0LnR5cGUoY29udHJpYnV0b3IubG9naW4pLnBhdXNlKCkuZGVsZXRlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICB3YXRjaGVyKCk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5jbGFzcyBNYWxhcmtleUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAoJGxvZywgZ2l0aHViQ29udHJpYnV0b3IpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICB0aGlzLmNvbnRyaWJ1dG9ycyA9IFtdO1xuXG4gICAgdGhpcy5hY3RpdmF0ZShnaXRodWJDb250cmlidXRvcik7XG4gIH1cblxuICBhY3RpdmF0ZShnaXRodWJDb250cmlidXRvcikge1xuICAgIHJldHVybiB0aGlzLmdldENvbnRyaWJ1dG9ycyhnaXRodWJDb250cmlidXRvcikudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLiRsb2cuaW5mbygnQWN0aXZhdGVkIENvbnRyaWJ1dG9ycyBWaWV3Jyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDb250cmlidXRvcnMoZ2l0aHViQ29udHJpYnV0b3IpIHtcbiAgICByZXR1cm4gZ2l0aHViQ29udHJpYnV0b3IuZ2V0Q29udHJpYnV0b3JzKDEwKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLmNvbnRyaWJ1dG9ycyA9IGRhdGE7XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbnRyaWJ1dG9ycztcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL21hbGFya2V5L21hbGFya2V5LmRpcmVjdGl2ZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=
