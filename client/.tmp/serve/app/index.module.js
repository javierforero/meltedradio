/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

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
	      templateUrl: '/app/views/addplaylist.html',
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