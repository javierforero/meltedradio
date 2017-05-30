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
	
	var _githubContributor = __webpack_require__(5);
	
	var _webDevTec = __webpack_require__(6);
	
	var _navbar = __webpack_require__(7);
	
	var _malarkey = __webpack_require__(8);
	
	/* global malarkey:false, moment:false */
	
	angular.module('meltedRadio', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'ng-token-auth', 'rails', 'LocalStorageModule']).constant('malarkey', malarkey).constant('moment', moment).config(_index.config).config(_index2.routerConfig).config(["$authProvider", function ($authProvider) {
	  $authProvider.configure({
	    apiUrl: 'http://localhost:3000'
	  });
	}]).config(["localStorageServiceProvider", function (localStorageServiceProvider) {
	  localStorageServiceProvider.setPrefix('meltedRadio');
	}]).config(["railsSerializerProvider", function (railsSerializerProvider) {
	  railsSerializerProvider.underscore(angular.identity).camelize(angular.identity);
	}]).run(_index3.runBlock).service('githubContributor', _githubContributor.GithubContributorService).service('webDevTec', _webDevTec.WebDevTecService).controller('MainController', _main.MainController).directive('acmeNavbar', _navbar.NavbarDirective).directive('acmeMalarkey', _malarkey.MalarkeyDirective).directive('onFinishRender', ["$timeout", function ($timeout) {
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
	    controller: 'SessionsCtrl as signin'
	  }).state('sign_up', {
	    url: '/sign_up',
	    templateUrl: 'app/views/user_registrations/new.html',
	    controller: 'RegistrationsCtrl as signup'
	  }).state('home', {
	    url: '/users/:id',
	    templateUrl: 'app/views/home.html',
	    controller: 'HomeCtrl as home'
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjI4OTUyM2IxYjYwMzI4M2Q5YjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9tYWxhcmtleS9tYWxhcmtleS5kaXJlY3RpdmUuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnN0YW50IiwibWFsYXJrZXkiLCJtb21lbnQiLCJjb25maWciLCIkYXV0aFByb3ZpZGVyIiwiY29uZmlndXJlIiwiYXBpVXJsIiwibG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyIiwic2V0UHJlZml4IiwicmFpbHNTZXJpYWxpemVyUHJvdmlkZXIiLCJ1bmRlcnNjb3JlIiwiaWRlbnRpdHkiLCJjYW1lbGl6ZSIsInJ1biIsInNlcnZpY2UiLCJjb250cm9sbGVyIiwiZGlyZWN0aXZlIiwiJHRpbWVvdXQiLCJyZXN0cmljdCIsImxpbmsiLCJzY29wZSIsImVsZW1lbnQiLCJhdHRyIiwiJGxhc3QiLCIkZW1pdCIsIm9uRmluaXNoUmVuZGVyIiwiZmFjdG9yeSIsIkFwaVN5bmMiLCJzZXRQbGF5bGlzdHMiLCJvYmoiLCJwbGF5bGlzdHMiLCJzZXRTb25ncyIsInNvbmdzIiwiZ2V0UGxheWxpc3RzIiwiZ2V0U29uZ3MiLCJyYWlsc1Jlc291cmNlRmFjdG9yeSIsInVybCIsIm5hbWUiLCIkbG9nUHJvdmlkZXIiLCJ0b2FzdHJDb25maWciLCJkZWJ1Z0VuYWJsZWQiLCJhbGxvd0h0bWwiLCJ0aW1lT3V0IiwicG9zaXRpb25DbGFzcyIsInByZXZlbnREdXBsaWNhdGVzIiwicHJvZ3Jlc3NCYXIiLCJyb3V0ZXJDb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsInN0YXRlIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyQXMiLCJvdGhlcndpc2UiLCJydW5CbG9jayIsIiRsb2ciLCJkZWJ1ZyIsIndlYkRldlRlYyIsInRvYXN0ciIsImF3ZXNvbWVUaGluZ3MiLCJjbGFzc0FuaW1hdGlvbiIsImNyZWF0aW9uRGF0ZSIsImFjdGl2YXRlIiwiZ2V0V2ViRGV2VGVjIiwiZ2V0VGVjIiwiZm9yRWFjaCIsImF3ZXNvbWVUaGluZyIsInJhbmsiLCJNYXRoIiwicmFuZG9tIiwiaW5mbyIsIiRodHRwIiwiYXBpSG9zdCIsImxpbWl0IiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsImNhdGNoIiwiZXJyb3IiLCJ0b0pzb24iLCJXZWJEZXZUZWNTZXJ2aWNlIiwiTmF2YmFyRGlyZWN0aXZlIiwiTmF2YmFyQ29udHJvbGxlciIsImJpbmRUb0NvbnRyb2xsZXIiLCJyZWxhdGl2ZURhdGUiLCJmcm9tTm93IiwiTWFsYXJrZXlEaXJlY3RpdmUiLCJleHRyYVZhbHVlcyIsInRlbXBsYXRlIiwibGlua0Z1bmMiLCJNYWxhcmtleUNvbnRyb2xsZXIiLCJlbCIsInZtIiwid2F0Y2hlciIsInR5cGlzdCIsInR5cGVTcGVlZCIsImRlbGV0ZVNwZWVkIiwicGF1c2VEZWxheSIsImxvb3AiLCJwb3N0Zml4IiwiYWRkQ2xhc3MiLCJ2YWx1ZSIsInR5cGUiLCJwYXVzZSIsImRlbGV0ZSIsIiR3YXRjaCIsImNvbnRyaWJ1dG9ycyIsImNvbnRyaWJ1dG9yIiwibG9naW4iLCIkb24iLCJnaXRodWJDb250cmlidXRvciIsImdldENvbnRyaWJ1dG9ycyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFJQUEsU0FBUUMsT0FBTyxlQUFlLENBQUMsYUFBYSxhQUFhLFdBQVcsY0FBYyxjQUFjLFVBQVUsY0FBYyxhQUFhLGdCQUFnQixVQUFVLGlCQUFpQixTQUFTLHVCQUN0TEMsU0FBUyxZQUFZQyxVQUNyQkQsU0FBUyxVQUFVRSxRQUNuQkMsT0FISCxlQUlHQSxPQUpILHNCQUtHQSx5QkFBTyxVQUFTQyxlQUFlO0dBQzdCQSxjQUFjQyxVQUFVO0tBQ3BCQyxRQUFROztLQUdiSCx1Q0FBTyxVQUFTSSw2QkFBNEI7R0FDM0NBLDRCQUE0QkMsVUFBVTtLQUV2Q0wsbUNBQU8sVUFBU00seUJBQXdCO0dBQ3ZDQSx3QkFBd0JDLFdBQVdaLFFBQVFhLFVBQVVDLFNBQVNkLFFBQVFhO0tBRXhFRSxJQWhCSCxrQkFpQkdDLFFBQVEscUJBakJYLDZDQWtCR0EsUUFBUSxhQWxCWCw2QkFtQkdDLFdBQVcsa0JBbkJkLHNCQW9CR0MsVUFBVSxjQXBCYix5QkFxQkdBLFVBQVUsZ0JBckJiLDZCQXNCR0EsVUFBVSwrQkFBa0IsVUFBU0MsVUFBUztHQUM3QyxPQUFPO0tBQ0xDLFVBQVU7S0FDVkMsTUFBTSxjQUFVQyxPQUFPQyxTQUFTQyxNQUFNO09BQ3BDLElBQUlGLE1BQU1HLFVBQVUsTUFBTTtTQUN4Qk4sU0FBUyxZQUFZO1dB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YXZDLE1BQU13RCxtQkFBbUI7S0FDcEM7O0tBRG9DOztLQUdwQyxLQUFLeEQsT0FBT0E7S0FDWixLQUFLb0QsZUFBZTs7S0FFcEIsS0FBSzdDLFNBQVNpRDs7O0dBZ0JoQixhQUFhLG9CQUFvQixDQUFDO0tBQ2hDLEtBQUs7S0FDTCxPQUFPLFNBQVMsU0FmVEEsbUJBQW1CO09BQUE7O09BQzFCLE9BQU8sS0FBS0MsZ0JBQWdCRCxtQkFBbUJwQyxLQUFLLFlBQU07U0FDeEQsTUFBS3BCLEtBQUtlLEtBQUs7OztNQW9CaEI7S0FDRCxLQUFLO0tBQ0wsT0FBTyxTQUFTLGdCQWxCRnlDLG1CQUFtQjtPQUFBOztPQUNqQyxPQUFPQSxrQkFBa0JDLGdCQUFnQixJQUFJckMsS0FBSyxVQUFDRSxNQUFTO1NBQzFELE9BQUs4QixlQUFlOUI7O1NBRXBCLE9BQU8sT0FBSzhCOzs7OztHQXlCaEIsT0FBTyIsImZpbGUiOiJpbmRleC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyMjg5NTIzYjFiNjAzMjgzZDliNCIsIi8qIGdsb2JhbCBtYWxhcmtleTpmYWxzZSwgbW9tZW50OmZhbHNlICovXG5cbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vaW5kZXguY29uZmlnJztcbmltcG9ydCB7IHJvdXRlckNvbmZpZyB9IGZyb20gJy4vaW5kZXgucm91dGUnO1xuaW1wb3J0IHsgcnVuQmxvY2sgfSBmcm9tICcuL2luZGV4LnJ1bic7XG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciB9IGZyb20gJy4vbWFpbi9tYWluLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvZ2l0aHViQ29udHJpYnV0b3IvZ2l0aHViQ29udHJpYnV0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBXZWJEZXZUZWNTZXJ2aWNlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvd2ViRGV2VGVjL3dlYkRldlRlYy5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdmJhckRpcmVjdGl2ZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hbGFya2V5RGlyZWN0aXZlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlJztcblxuXG5cbmFuZ3VsYXIubW9kdWxlKCdtZWx0ZWRSYWRpbycsIFsnbmdBbmltYXRlJywgJ25nQ29va2llcycsICduZ1RvdWNoJywgJ25nU2FuaXRpemUnLCAnbmdNZXNzYWdlcycsICduZ0FyaWEnLCAnbmdSZXNvdXJjZScsICd1aS5yb3V0ZXInLCAndWkuYm9vdHN0cmFwJywgJ3RvYXN0cicsICduZy10b2tlbi1hdXRoJywgJ3JhaWxzJywgJ0xvY2FsU3RvcmFnZU1vZHVsZSddKVxuICAuY29uc3RhbnQoJ21hbGFya2V5JywgbWFsYXJrZXkpXG4gIC5jb25zdGFudCgnbW9tZW50JywgbW9tZW50KVxuICAuY29uZmlnKGNvbmZpZylcbiAgLmNvbmZpZyhyb3V0ZXJDb25maWcpXG4gIC5jb25maWcoZnVuY3Rpb24oJGF1dGhQcm92aWRlcikge1xuICAgICAkYXV0aFByb3ZpZGVyLmNvbmZpZ3VyZSh7XG4gICAgICAgICBhcGlVcmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnXG4gICAgIH0pO1xuICAgfSlcbiAgIC5jb25maWcoZnVuY3Rpb24obG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyKXtcbiAgICAgbG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyLnNldFByZWZpeCgnbWVsdGVkUmFkaW8nKTtcbiAgIH0pXG4gICAuY29uZmlnKGZ1bmN0aW9uKHJhaWxzU2VyaWFsaXplclByb3ZpZGVyKXtcbiAgICAgcmFpbHNTZXJpYWxpemVyUHJvdmlkZXIudW5kZXJzY29yZShhbmd1bGFyLmlkZW50aXR5KS5jYW1lbGl6ZShhbmd1bGFyLmlkZW50aXR5KTtcbiAgIH0pXG4gIC5ydW4ocnVuQmxvY2spXG4gIC5zZXJ2aWNlKCdnaXRodWJDb250cmlidXRvcicsIEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSlcbiAgLnNlcnZpY2UoJ3dlYkRldlRlYycsIFdlYkRldlRlY1NlcnZpY2UpXG4gIC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKVxuICAuZGlyZWN0aXZlKCdhY21lTmF2YmFyJywgTmF2YmFyRGlyZWN0aXZlKVxuICAuZGlyZWN0aXZlKCdhY21lTWFsYXJrZXknLCBNYWxhcmtleURpcmVjdGl2ZSlcbiAgLmRpcmVjdGl2ZSgnb25GaW5pc2hSZW5kZXInLCBmdW5jdGlvbigkdGltZW91dCl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHIpIHtcbiAgICAgICAgaWYgKHNjb3BlLiRsYXN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2NvcGUuJGVtaXQoYXR0ci5vbkZpbmlzaFJlbmRlcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgIH07XG5cbiAgfSlcbiAgLmZhY3RvcnkoJ0FwaVN5bmMnLCBmdW5jdGlvbigpe1xuICAgIHZhciBBcGlTeW5jID0ge307XG5cbiAgICBBcGlTeW5jLnNldFBsYXlsaXN0cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgQXBpU3luYy5wbGF5bGlzdHMgPSBvYmo7XG4gICAgfTtcblxuICAgIEFwaVN5bmMuc2V0U29uZ3MgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgQXBpU3luYy5zb25ncyA9IG9iajtcbiAgICB9O1xuXG4gICAgQXBpU3luYy5nZXRQbGF5bGlzdHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBBcGlTeW5jLnBsYXlsaXN0cztcbiAgICB9O1xuXG4gICAgQXBpU3luYy5nZXRTb25ncyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEFwaVN5bmMuc29uZ3M7XG4gICAgfTtcblxuICAgIHJldHVybiBBcGlTeW5jO1xuICB9KVxuICAuZmFjdG9yeSgnUGxheWxpc3QnLCBmdW5jdGlvbihyYWlsc1Jlc291cmNlRmFjdG9yeSkge1xuICAgIHJldHVybiByYWlsc1Jlc291cmNlRmFjdG9yeSh7XG4gICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvcGxheWxpc3RzJyxcbiAgICAgIG5hbWU6ICdwbGF5bGlzdCdcbiAgICB9KTtcbiAgfSlcbiAgLmZhY3RvcnkoJ1VzZXInLGZ1bmN0aW9uKHJhaWxzUmVzb3VyY2VGYWN0b3J5KXtcbiAgICByZXR1cm4gcmFpbHNSZXNvdXJjZUZhY3Rvcnkoe1xuICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3VzZXJzL3t7dXNlcklkfX0vcGxheWxpc3RzJyxcbiAgICAgIG5hbWU6ICd1c2VyJ1xuICAgIH0pO1xuICB9KVxuICAuZmFjdG9yeSgnU29uZycsIGZ1bmN0aW9uKHJhaWxzUmVzb3VyY2VGYWN0b3J5KXtcbiAgICByZXR1cm4gcmFpbHNSZXNvdXJjZUZhY3Rvcnkoe1xuICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3BsYXlsaXN0cy97e3BsYXlsaXN0SWR9fS9zb25ncycsXG4gICAgICBuYW1lOiAnc29uZydcbiAgICB9KTtcbiAgfSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4Lm1vZHVsZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBjb25maWcgKCRsb2dQcm92aWRlciwgdG9hc3RyQ29uZmlnKSB7XG4gICduZ0luamVjdCc7XG4gIC8vIEVuYWJsZSBsb2dcbiAgJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCh0cnVlKTtcblxuICAvLyBTZXQgb3B0aW9ucyB0aGlyZC1wYXJ0eSBsaWJcbiAgdG9hc3RyQ29uZmlnLmFsbG93SHRtbCA9IHRydWU7XG4gIHRvYXN0ckNvbmZpZy50aW1lT3V0ID0gMzAwMDtcbiAgdG9hc3RyQ29uZmlnLnBvc2l0aW9uQ2xhc3MgPSAndG9hc3QtdG9wLXJpZ2h0JztcbiAgdG9hc3RyQ29uZmlnLnByZXZlbnREdXBsaWNhdGVzID0gdHJ1ZTtcbiAgdG9hc3RyQ29uZmlnLnByb2dyZXNzQmFyID0gdHJ1ZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXguY29uZmlnLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIHJvdXRlckNvbmZpZyAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAnbmdJbmplY3QnO1xuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnbWFpbicsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvbWFpbi9tYWluLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJyxcbiAgICAgIGNvbnRyb2xsZXJBczogJ21haW4nXG4gICAgfSlcbiAgICAuc3RhdGUoJ3NpZ25faW4nLCB7XG4gICAgICB1cmw6ICcvc2lnbl9pbicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC92aWV3cy91c2VyX3Nlc3Npb25zL25ldy5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdTZXNzaW9uc0N0cmwgYXMgc2lnbmluJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdzaWduX3VwJywge1xuICAgICAgdXJsOiAnL3NpZ25fdXAnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdmlld3MvdXNlcl9yZWdpc3RyYXRpb25zL25ldy5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RyYXRpb25zQ3RybCBhcyBzaWdudXAnXG4gICAgfSlcbiAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICB1cmw6ICcvdXNlcnMvOmlkJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL2hvbWUuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwgYXMgaG9tZSdcbiAgICB9KTtcblxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4LnJvdXRlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIHJ1bkJsb2NrICgkbG9nKSB7XG4gICduZ0luamVjdCc7XG4gICRsb2cuZGVidWcoJ3J1bkJsb2NrIGVuZCcpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5ydW4uanMiLCJleHBvcnQgY2xhc3MgTWFpbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAoJHRpbWVvdXQsIHdlYkRldlRlYywgdG9hc3RyKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuYXdlc29tZVRoaW5ncyA9IFtdO1xuICAgIHRoaXMuY2xhc3NBbmltYXRpb24gPSAnJztcbiAgICB0aGlzLmNyZWF0aW9uRGF0ZSA9IDE0ODE2Mzk3MDQxMDc7XG4gICAgdGhpcy50b2FzdHIgPSB0b2FzdHI7XG5cblxuICAgIHRoaXMuYWN0aXZhdGUoJHRpbWVvdXQsIHdlYkRldlRlYyk7XG4gIH1cblxuICBhY3RpdmF0ZSgkdGltZW91dCwgd2ViRGV2VGVjKSB7XG4gICAgdGhpcy5nZXRXZWJEZXZUZWMod2ViRGV2VGVjKTtcbiAgICAkdGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNsYXNzQW5pbWF0aW9uID0gJ3J1YmJlckJhbmQnO1xuICAgIH0sIDQwMDApO1xuICB9XG5cbiAgZ2V0V2ViRGV2VGVjKHdlYkRldlRlYykge1xuICAgIHRoaXMuYXdlc29tZVRoaW5ncyA9IHdlYkRldlRlYy5nZXRUZWMoKTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLmF3ZXNvbWVUaGluZ3MsIChhd2Vzb21lVGhpbmcpID0+IHtcbiAgICAgIGF3ZXNvbWVUaGluZy5yYW5rID0gTWF0aC5yYW5kb20oKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dUb2FzdHIoKSB7XG4gICAgdGhpcy50b2FzdHIuaW5mbygnRm9yayA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL1N3aWlwL2dlbmVyYXRvci1ndWxwLWFuZ3VsYXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj48Yj5nZW5lcmF0b3ItZ3VscC1hbmd1bGFyPC9iPjwvYT4nKTtcbiAgICB0aGlzLmNsYXNzQW5pbWF0aW9uID0gJyc7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvbWFpbi9tYWluLmNvbnRyb2xsZXIuanMiLCJleHBvcnQgY2xhc3MgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IgKCRsb2csICRodHRwKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgIHRoaXMuYXBpSG9zdCA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL1N3aWlwL2dlbmVyYXRvci1ndWxwLWFuZ3VsYXInO1xuICB9XG5cbiAgZ2V0Q29udHJpYnV0b3JzKGxpbWl0PTMwKSB7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KHRoaXMuYXBpSG9zdCArICcvY29udHJpYnV0b3JzP3Blcl9wYWdlPScgKyBsaW1pdClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuJGxvZy5lcnJvcignWEhSIEZhaWxlZCBmb3IgZ2V0Q29udHJpYnV0b3JzLlxcbicgKyBhbmd1bGFyLnRvSnNvbihlcnJvci5kYXRhLCB0cnVlKSk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL2dpdGh1YkNvbnRyaWJ1dG9yL2dpdGh1YkNvbnRyaWJ1dG9yLnNlcnZpY2UuanMiLCJleHBvcnQgY2xhc3MgV2ViRGV2VGVjU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy5kYXRhID0gW1xuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQW5ndWxhckpTJyxcbiAgICAgICAgJ3VybCc6ICdodHRwczovL2FuZ3VsYXJqcy5vcmcvJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0hUTUwgZW5oYW5jZWQgZm9yIHdlYiBhcHBzIScsXG4gICAgICAgICdsb2dvJzogJ2FuZ3VsYXIucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0Jyb3dzZXJTeW5jJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vYnJvd3NlcnN5bmMuaW8vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RpbWUtc2F2aW5nIHN5bmNocm9uaXNlZCBicm93c2VyIHRlc3RpbmcuJyxcbiAgICAgICAgJ2xvZ28nOiAnYnJvd3NlcnN5bmMucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0d1bHBKUycsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2d1bHBqcy5jb20vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBzdHJlYW1pbmcgYnVpbGQgc3lzdGVtLicsXG4gICAgICAgICdsb2dvJzogJ2d1bHAucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0phc21pbmUnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9qYXNtaW5lLmdpdGh1Yi5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQmVoYXZpb3ItRHJpdmVuIEphdmFTY3JpcHQuJyxcbiAgICAgICAgJ2xvZ28nOiAnamFzbWluZS5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnS2FybWEnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9rYXJtYS1ydW5uZXIuZ2l0aHViLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdTcGVjdGFjdWxhciBUZXN0IFJ1bm5lciBmb3IgSmF2YVNjcmlwdC4nLFxuICAgICAgICAnbG9nbyc6ICdrYXJtYS5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnUHJvdHJhY3RvcicsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvcHJvdHJhY3RvcicsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdFbmQgdG8gZW5kIHRlc3QgZnJhbWV3b3JrIGZvciBBbmd1bGFySlMgYXBwbGljYXRpb25zIGJ1aWx0IG9uIHRvcCBvZiBXZWJEcml2ZXJKUy4nLFxuICAgICAgICAnbG9nbyc6ICdwcm90cmFjdG9yLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdCb290c3RyYXAnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9nZXRib290c3RyYXAuY29tLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdCb290c3RyYXAgaXMgdGhlIG1vc3QgcG9wdWxhciBIVE1MLCBDU1MsIGFuZCBKUyBmcmFtZXdvcmsgZm9yIGRldmVsb3BpbmcgcmVzcG9uc2l2ZSwgbW9iaWxlIGZpcnN0IHByb2plY3RzIG9uIHRoZSB3ZWIuJyxcbiAgICAgICAgJ2xvZ28nOiAnYm9vdHN0cmFwLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdBbmd1bGFyIFVJIEJvb3RzdHJhcCcsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2FuZ3VsYXItdWkuZ2l0aHViLmlvL2Jvb3RzdHJhcC8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQm9vdHN0cmFwIGNvbXBvbmVudHMgd3JpdHRlbiBpbiBwdXJlIEFuZ3VsYXJKUyBieSB0aGUgQW5ndWxhclVJIFRlYW0uJyxcbiAgICAgICAgJ2xvZ28nOiAndWktYm9vdHN0cmFwLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdTYXNzIChOb2RlKScsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9naXRodWIuY29tL3Nhc3Mvbm9kZS1zYXNzJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ05vZGUuanMgYmluZGluZyB0byBsaWJzYXNzLCB0aGUgQyB2ZXJzaW9uIG9mIHRoZSBwb3B1bGFyIHN0eWxlc2hlZXQgcHJlcHJvY2Vzc29yLCBTYXNzLicsXG4gICAgICAgICdsb2dvJzogJ25vZGUtc2Fzcy5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnRVM2IChCYWJlbCBmb3JtZXJseSA2dG81KScsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9iYWJlbGpzLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUdXJucyBFUzYrIGNvZGUgaW50byB2YW5pbGxhIEVTNSwgc28geW91IGNhbiB1c2UgbmV4dCBnZW5lcmF0aW9uIGZlYXR1cmVzIHRvZGF5LicsXG4gICAgICAgICdsb2dvJzogJ2JhYmVsLnBuZydcbiAgICAgIH1cbiAgICBdO1xuICB9XG5cbiAgZ2V0VGVjKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCJleHBvcnQgZnVuY3Rpb24gTmF2YmFyRGlyZWN0aXZlKCkge1xuICAnbmdJbmplY3QnO1xuXG4gIGxldCBkaXJlY3RpdmUgPSB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuaHRtbCcsXG4gICAgc2NvcGU6IHtcbiAgICAgICAgY3JlYXRpb25EYXRlOiAnPSdcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IE5hdmJhckNvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufVxuXG5jbGFzcyBOYXZiYXJDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKG1vbWVudCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICAvLyBcInRoaXMuY3JlYXRpb25EYXRlXCIgaXMgYXZhaWxhYmxlIGJ5IGRpcmVjdGl2ZSBvcHRpb24gXCJiaW5kVG9Db250cm9sbGVyOiB0cnVlXCJcbiAgICB0aGlzLnJlbGF0aXZlRGF0ZSA9IG1vbWVudCh0aGlzLmNyZWF0aW9uRGF0ZSkuZnJvbU5vdygpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5kaXJlY3RpdmUuanMiLCJleHBvcnQgZnVuY3Rpb24gTWFsYXJrZXlEaXJlY3RpdmUobWFsYXJrZXkpIHtcbiAgJ25nSW5qZWN0JztcblxuICBsZXQgZGlyZWN0aXZlID0ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgICAgZXh0cmFWYWx1ZXM6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6ICcmbmJzcDsnLFxuICAgIGxpbms6IGxpbmtGdW5jLFxuICAgIGNvbnRyb2xsZXI6IE1hbGFya2V5Q29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xuXG4gIGZ1bmN0aW9uIGxpbmtGdW5jKHNjb3BlLCBlbCwgYXR0ciwgdm0pIHtcbiAgICBsZXQgd2F0Y2hlcjtcbiAgICBsZXQgdHlwaXN0ID0gbWFsYXJrZXkoZWxbMF0sIHtcbiAgICAgIHR5cGVTcGVlZDogNDAsXG4gICAgICBkZWxldGVTcGVlZDogNDAsXG4gICAgICBwYXVzZURlbGF5OiA4MDAsXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAgcG9zdGZpeDogJyAnXG4gICAgfSk7XG5cbiAgICBlbC5hZGRDbGFzcygnYWNtZS1tYWxhcmtleScpO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLmV4dHJhVmFsdWVzLCAodmFsdWUpID0+IHtcbiAgICAgIHR5cGlzdC50eXBlKHZhbHVlKS5wYXVzZSgpLmRlbGV0ZSgpO1xuICAgIH0pO1xuXG4gICAgd2F0Y2hlciA9IHNjb3BlLiR3YXRjaCgndm0uY29udHJpYnV0b3JzJywgKCkgPT4ge1xuICAgICAgYW5ndWxhci5mb3JFYWNoKHZtLmNvbnRyaWJ1dG9ycywgKGNvbnRyaWJ1dG9yKSA9PiB7XG4gICAgICAgIHR5cGlzdC50eXBlKGNvbnRyaWJ1dG9yLmxvZ2luKS5wYXVzZSgpLmRlbGV0ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgd2F0Y2hlcigpO1xuICAgIH0pO1xuICB9XG5cbn1cblxuY2xhc3MgTWFsYXJrZXlDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKCRsb2csIGdpdGh1YkNvbnRyaWJ1dG9yKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgdGhpcy5jb250cmlidXRvcnMgPSBbXTtcblxuICAgIHRoaXMuYWN0aXZhdGUoZ2l0aHViQ29udHJpYnV0b3IpO1xuICB9XG5cbiAgYWN0aXZhdGUoZ2l0aHViQ29udHJpYnV0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb250cmlidXRvcnMoZ2l0aHViQ29udHJpYnV0b3IpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy4kbG9nLmluZm8oJ0FjdGl2YXRlZCBDb250cmlidXRvcnMgVmlldycpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udHJpYnV0b3JzKGdpdGh1YkNvbnRyaWJ1dG9yKSB7XG4gICAgcmV0dXJuIGdpdGh1YkNvbnRyaWJ1dG9yLmdldENvbnRyaWJ1dG9ycygxMCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5jb250cmlidXRvcnMgPSBkYXRhO1xuXG4gICAgICByZXR1cm4gdGhpcy5jb250cmlidXRvcnM7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9tYWxhcmtleS9tYWxhcmtleS5kaXJlY3RpdmUuanMiXSwic291cmNlUm9vdCI6IiJ9