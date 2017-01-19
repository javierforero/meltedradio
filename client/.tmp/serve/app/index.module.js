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
	
	angular.module('meltedRadio', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'ng-token-auth', 'rails']).constant('malarkey', malarkey).constant('moment', moment).config(_index.config).config(_index2.routerConfig).config(["$authProvider", function ($authProvider) {
	  $authProvider.configure({
	    apiUrl: 'http://localhost:3000'
	  });
	}]).run(_index3.runBlock).service('githubContributor', _githubContributor.GithubContributorService).service('webDevTec', _webDevTec.WebDevTecService).controller('MainController', _main.MainController).directive('acmeNavbar', _navbar.NavbarDirective).directive('acmeMalarkey', _malarkey.MalarkeyDirective).factory('Playlist', ["railsResourceFactory", function (railsResourceFactory) {
	  return railsResourceFactory({
	    url: 'http://localhost:3000/playlists',
	    name: 'playlist'
	  });
	}]).factory('User', ["railsResourceFactory", function (railsResourceFactory) {
	  return railsResourceFactory({
	    url: 'http://localhost:3000/users/{{userId}}/playlists/{{playlistId}}',
	    name: 'user'
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
	    url: '/home',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDZhZDJjMjBkYTM3ZjdiOTYzM2IiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9tYWxhcmtleS9tYWxhcmtleS5kaXJlY3RpdmUuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnN0YW50IiwibWFsYXJrZXkiLCJtb21lbnQiLCJjb25maWciLCIkYXV0aFByb3ZpZGVyIiwiY29uZmlndXJlIiwiYXBpVXJsIiwicnVuIiwic2VydmljZSIsImNvbnRyb2xsZXIiLCJkaXJlY3RpdmUiLCJmYWN0b3J5IiwicmFpbHNSZXNvdXJjZUZhY3RvcnkiLCJ1cmwiLCJuYW1lIiwiJGxvZ1Byb3ZpZGVyIiwidG9hc3RyQ29uZmlnIiwiZGVidWdFbmFibGVkIiwiYWxsb3dIdG1sIiwidGltZU91dCIsInBvc2l0aW9uQ2xhc3MiLCJwcmV2ZW50RHVwbGljYXRlcyIsInByb2dyZXNzQmFyIiwicm91dGVyQ29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJzdGF0ZSIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlckFzIiwib3RoZXJ3aXNlIiwicnVuQmxvY2siLCIkbG9nIiwiZGVidWciLCIkdGltZW91dCIsIndlYkRldlRlYyIsInRvYXN0ciIsImF3ZXNvbWVUaGluZ3MiLCJjbGFzc0FuaW1hdGlvbiIsImNyZWF0aW9uRGF0ZSIsImFjdGl2YXRlIiwiZ2V0V2ViRGV2VGVjIiwiZ2V0VGVjIiwiZm9yRWFjaCIsImF3ZXNvbWVUaGluZyIsInJhbmsiLCJNYXRoIiwicmFuZG9tIiwiaW5mbyIsIiRodHRwIiwiYXBpSG9zdCIsImxpbWl0IiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsImNhdGNoIiwiZXJyb3IiLCJ0b0pzb24iLCJXZWJEZXZUZWNTZXJ2aWNlIiwiTmF2YmFyRGlyZWN0aXZlIiwicmVzdHJpY3QiLCJzY29wZSIsIk5hdmJhckNvbnRyb2xsZXIiLCJiaW5kVG9Db250cm9sbGVyIiwicmVsYXRpdmVEYXRlIiwiZnJvbU5vdyIsIk1hbGFya2V5RGlyZWN0aXZlIiwiZXh0cmFWYWx1ZXMiLCJ0ZW1wbGF0ZSIsImxpbmsiLCJsaW5rRnVuYyIsIk1hbGFya2V5Q29udHJvbGxlciIsImVsIiwiYXR0ciIsInZtIiwid2F0Y2hlciIsInR5cGlzdCIsInR5cGVTcGVlZCIsImRlbGV0ZVNwZWVkIiwicGF1c2VEZWxheSIsImxvb3AiLCJwb3N0Zml4IiwiYWRkQ2xhc3MiLCJ2YWx1ZSIsInR5cGUiLCJwYXVzZSIsImRlbGV0ZSIsIiR3YXRjaCIsImNvbnRyaWJ1dG9ycyIsImNvbnRyaWJ1dG9yIiwibG9naW4iLCIkb24iLCJnaXRodWJDb250cmlidXRvciIsImdldENvbnRyaWJ1dG9ycyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FB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WUFBWSxZQUFNO09BQzFCaEI7Ozs7Ozs4REFpQitCO0dBVm5DLDRCQUFhNUMsTUFBTTZELG1CQUFtQjtLQUNwQzs7S0FEb0M7O0tBR3BDLEtBQUs3RCxPQUFPQTtLQUNaLEtBQUt5RCxlQUFlOztLQUVwQixLQUFLakQsU0FBU3FEOzs7R0FnQmhCLGFBQWEsb0JBQW9CLENBQUM7S0FDaEMsS0FBSztLQUNMLE9BQU8sU0FBUyxTQWZUQSxtQkFBbUI7T0FBQTs7T0FDMUIsT0FBTyxLQUFLQyxnQkFBZ0JELG1CQUFtQnhDLEtBQUssWUFBTTtTQUN4RCxNQUFLckIsS0FBS2dCLEtBQUs7OztNQW9CaEI7S0FDRCxLQUFLO0tBQ0wsT0FBTyxTQUFTLGdCQWxCRjZDLG1CQUFtQjtPQUFBOztPQUNqQyxPQUFPQSxrQkFBa0JDLGdCQUFnQixJQUFJekMsS0FBSyxVQUFDRSxNQUFTO1NBQzFELE9BQUtrQyxlQUFlbEM7O1NBRXBCLE9BQU8sT0FBS2tDOzs7OztHQXlCaEIsT0FBTyIsImZpbGUiOiJpbmRleC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0NmFkMmMyMGRhMzdmN2I5NjMzYiIsIi8qIGdsb2JhbCBtYWxhcmtleTpmYWxzZSwgbW9tZW50OmZhbHNlICovXG5cbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vaW5kZXguY29uZmlnJztcbmltcG9ydCB7IHJvdXRlckNvbmZpZyB9IGZyb20gJy4vaW5kZXgucm91dGUnO1xuaW1wb3J0IHsgcnVuQmxvY2sgfSBmcm9tICcuL2luZGV4LnJ1bic7XG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciB9IGZyb20gJy4vbWFpbi9tYWluLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvZ2l0aHViQ29udHJpYnV0b3IvZ2l0aHViQ29udHJpYnV0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBXZWJEZXZUZWNTZXJ2aWNlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvd2ViRGV2VGVjL3dlYkRldlRlYy5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdmJhckRpcmVjdGl2ZSB9IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hbGFya2V5RGlyZWN0aXZlIH0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlJztcblxuYW5ndWxhci5tb2R1bGUoJ21lbHRlZFJhZGlvJywgWyduZ0FuaW1hdGUnLCAnbmdDb29raWVzJywgJ25nVG91Y2gnLCAnbmdTYW5pdGl6ZScsICduZ01lc3NhZ2VzJywgJ25nQXJpYScsICduZ1Jlc291cmNlJywgJ3VpLnJvdXRlcicsICd1aS5ib290c3RyYXAnLCAndG9hc3RyJywgJ25nLXRva2VuLWF1dGgnLCAncmFpbHMnXSlcbiAgLmNvbnN0YW50KCdtYWxhcmtleScsIG1hbGFya2V5KVxuICAuY29uc3RhbnQoJ21vbWVudCcsIG1vbWVudClcbiAgLmNvbmZpZyhjb25maWcpXG4gIC5jb25maWcocm91dGVyQ29uZmlnKVxuICAuY29uZmlnKGZ1bmN0aW9uKCRhdXRoUHJvdmlkZXIpIHtcbiAgICAgJGF1dGhQcm92aWRlci5jb25maWd1cmUoe1xuICAgICAgICAgYXBpVXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJ1xuICAgICB9KTtcbiAgIH0pXG4gIC5ydW4ocnVuQmxvY2spXG4gIC5zZXJ2aWNlKCdnaXRodWJDb250cmlidXRvcicsIEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSlcbiAgLnNlcnZpY2UoJ3dlYkRldlRlYycsIFdlYkRldlRlY1NlcnZpY2UpXG4gIC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKVxuICAuZGlyZWN0aXZlKCdhY21lTmF2YmFyJywgTmF2YmFyRGlyZWN0aXZlKVxuICAuZGlyZWN0aXZlKCdhY21lTWFsYXJrZXknLCBNYWxhcmtleURpcmVjdGl2ZSlcbiAgLmZhY3RvcnkoJ1BsYXlsaXN0JywgcmFpbHNSZXNvdXJjZUZhY3RvcnkgPT4ge1xuICAgIHJldHVybiByYWlsc1Jlc291cmNlRmFjdG9yeSh7XG4gICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvcGxheWxpc3RzJyxcbiAgICAgIG5hbWU6ICdwbGF5bGlzdCdcbiAgICB9KTtcbiAgfSlcbiAgLmZhY3RvcnkoJ1VzZXInLGZ1bmN0aW9uKHJhaWxzUmVzb3VyY2VGYWN0b3J5KXtcbiAgICByZXR1cm4gcmFpbHNSZXNvdXJjZUZhY3Rvcnkoe1xuICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3VzZXJzL3t7dXNlcklkfX0vcGxheWxpc3RzL3t7cGxheWxpc3RJZH19JyxcbiAgICAgIG5hbWU6ICd1c2VyJ1xuICAgIH0pO1xuICB9KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXgubW9kdWxlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZyAoJGxvZ1Byb3ZpZGVyLCB0b2FzdHJDb25maWcpIHtcbiAgJ25nSW5qZWN0JztcbiAgLy8gRW5hYmxlIGxvZ1xuICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xuXG4gIC8vIFNldCBvcHRpb25zIHRoaXJkLXBhcnR5IGxpYlxuICB0b2FzdHJDb25maWcuYWxsb3dIdG1sID0gdHJ1ZTtcbiAgdG9hc3RyQ29uZmlnLnRpbWVPdXQgPSAzMDAwO1xuICB0b2FzdHJDb25maWcucG9zaXRpb25DbGFzcyA9ICd0b2FzdC10b3AtcmlnaHQnO1xuICB0b2FzdHJDb25maWcucHJldmVudER1cGxpY2F0ZXMgPSB0cnVlO1xuICB0b2FzdHJDb25maWcucHJvZ3Jlc3NCYXIgPSB0cnVlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJleHBvcnQgZnVuY3Rpb24gcm91dGVyQ29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICduZ0luamVjdCc7XG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdtYWluJywge1xuICAgICAgdXJsOiAnLycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9tYWluL21haW4uaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInLFxuICAgICAgY29udHJvbGxlckFzOiAnbWFpbidcbiAgICB9KVxuICAgIC5zdGF0ZSgnc2lnbl9pbicsIHtcbiAgICAgIHVybDogJy9zaWduX2luJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL3VzZXJfc2Vzc2lvbnMvbmV3Lmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1Nlc3Npb25zQ3RybCBhcyBzaWduaW4nXG4gICAgfSlcbiAgICAuc3RhdGUoJ3NpZ25fdXAnLCB7XG4gICAgICB1cmw6ICcvc2lnbl91cCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC92aWV3cy91c2VyX3JlZ2lzdHJhdGlvbnMvbmV3Lmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdHJhdGlvbnNDdHJsIGFzIHNpZ251cCdcbiAgICB9KVxuICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgIHVybDogJy9ob21lJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXdzL2hvbWUuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwgYXMgaG9tZSdcbiAgICB9KTtcblxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4LnJvdXRlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIHJ1bkJsb2NrICgkbG9nKSB7XG4gICduZ0luamVjdCc7XG4gICRsb2cuZGVidWcoJ3J1bkJsb2NrIGVuZCcpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5ydW4uanMiLCJleHBvcnQgY2xhc3MgTWFpbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAoJHRpbWVvdXQsIHdlYkRldlRlYywgdG9hc3RyKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuYXdlc29tZVRoaW5ncyA9IFtdO1xuICAgIHRoaXMuY2xhc3NBbmltYXRpb24gPSAnJztcbiAgICB0aGlzLmNyZWF0aW9uRGF0ZSA9IDE0ODE2Mzk3MDQxMDc7XG4gICAgdGhpcy50b2FzdHIgPSB0b2FzdHI7XG5cbiAgICB0aGlzLmFjdGl2YXRlKCR0aW1lb3V0LCB3ZWJEZXZUZWMpO1xuICB9XG5cbiAgYWN0aXZhdGUoJHRpbWVvdXQsIHdlYkRldlRlYykge1xuICAgIHRoaXMuZ2V0V2ViRGV2VGVjKHdlYkRldlRlYyk7XG4gICAgJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbGFzc0FuaW1hdGlvbiA9ICdydWJiZXJCYW5kJztcbiAgICB9LCA0MDAwKTtcbiAgfVxuXG4gIGdldFdlYkRldlRlYyh3ZWJEZXZUZWMpIHtcbiAgICB0aGlzLmF3ZXNvbWVUaGluZ3MgPSB3ZWJEZXZUZWMuZ2V0VGVjKCk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2godGhpcy5hd2Vzb21lVGhpbmdzLCAoYXdlc29tZVRoaW5nKSA9PiB7XG4gICAgICBhd2Vzb21lVGhpbmcucmFuayA9IE1hdGgucmFuZG9tKCk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93VG9hc3RyKCkge1xuICAgIHRoaXMudG9hc3RyLmluZm8oJ0ZvcmsgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9Td2lpcC9nZW5lcmF0b3ItZ3VscC1hbmd1bGFyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGI+Z2VuZXJhdG9yLWd1bHAtYW5ndWxhcjwvYj48L2E+Jyk7XG4gICAgdGhpcy5jbGFzc0FuaW1hdGlvbiA9ICcnO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICgkbG9nLCAkaHR0cCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICB0aGlzLmFwaUhvc3QgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9Td2lpcC9nZW5lcmF0b3ItZ3VscC1hbmd1bGFyJztcbiAgfVxuXG4gIGdldENvbnRyaWJ1dG9ycyhsaW1pdD0zMCkge1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCh0aGlzLmFwaUhvc3QgKyAnL2NvbnRyaWJ1dG9ycz9wZXJfcGFnZT0nICsgbGltaXQpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLiRsb2cuZXJyb3IoJ1hIUiBGYWlsZWQgZm9yIGdldENvbnRyaWJ1dG9ycy5cXG4nICsgYW5ndWxhci50b0pzb24oZXJyb3IuZGF0YSwgdHJ1ZSkpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwiZXhwb3J0IGNsYXNzIFdlYkRldlRlY1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuZGF0YSA9IFtcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0FuZ3VsYXJKUycsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9hbmd1bGFyanMub3JnLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdIVE1MIGVuaGFuY2VkIGZvciB3ZWIgYXBwcyEnLFxuICAgICAgICAnbG9nbyc6ICdhbmd1bGFyLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdCcm93c2VyU3luYycsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2Jyb3dzZXJzeW5jLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaW1lLXNhdmluZyBzeW5jaHJvbmlzZWQgYnJvd3NlciB0ZXN0aW5nLicsXG4gICAgICAgICdsb2dvJzogJ2Jyb3dzZXJzeW5jLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdHdWxwSlMnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9ndWxwanMuY29tLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc3RyZWFtaW5nIGJ1aWxkIHN5c3RlbS4nLFxuICAgICAgICAnbG9nbyc6ICdndWxwLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdKYXNtaW5lJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vamFzbWluZS5naXRodWIuaW8vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0JlaGF2aW9yLURyaXZlbiBKYXZhU2NyaXB0LicsXG4gICAgICAgICdsb2dvJzogJ2phc21pbmUucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0thcm1hJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8va2FybWEtcnVubmVyLmdpdGh1Yi5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnU3BlY3RhY3VsYXIgVGVzdCBSdW5uZXIgZm9yIEphdmFTY3JpcHQuJyxcbiAgICAgICAgJ2xvZ28nOiAna2FybWEucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ1Byb3RyYWN0b3InLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3Byb3RyYWN0b3InLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnRW5kIHRvIGVuZCB0ZXN0IGZyYW1ld29yayBmb3IgQW5ndWxhckpTIGFwcGxpY2F0aW9ucyBidWlsdCBvbiB0b3Agb2YgV2ViRHJpdmVySlMuJyxcbiAgICAgICAgJ2xvZ28nOiAncHJvdHJhY3Rvci5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQm9vdHN0cmFwJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQm9vdHN0cmFwIGlzIHRoZSBtb3N0IHBvcHVsYXIgSFRNTCwgQ1NTLCBhbmQgSlMgZnJhbWV3b3JrIGZvciBkZXZlbG9waW5nIHJlc3BvbnNpdmUsIG1vYmlsZSBmaXJzdCBwcm9qZWN0cyBvbiB0aGUgd2ViLicsXG4gICAgICAgICdsb2dvJzogJ2Jvb3RzdHJhcC5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQW5ndWxhciBVSSBCb290c3RyYXAnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9hbmd1bGFyLXVpLmdpdGh1Yi5pby9ib290c3RyYXAvJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0Jvb3RzdHJhcCBjb21wb25lbnRzIHdyaXR0ZW4gaW4gcHVyZSBBbmd1bGFySlMgYnkgdGhlIEFuZ3VsYXJVSSBUZWFtLicsXG4gICAgICAgICdsb2dvJzogJ3VpLWJvb3RzdHJhcC5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnU2FzcyAoTm9kZSknLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9zYXNzL25vZGUtc2FzcycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdOb2RlLmpzIGJpbmRpbmcgdG8gbGlic2FzcywgdGhlIEMgdmVyc2lvbiBvZiB0aGUgcG9wdWxhciBzdHlsZXNoZWV0IHByZXByb2Nlc3NvciwgU2Fzcy4nLFxuICAgICAgICAnbG9nbyc6ICdub2RlLXNhc3MucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0VTNiAoQmFiZWwgZm9ybWVybHkgNnRvNSknLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vYmFiZWxqcy5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVHVybnMgRVM2KyBjb2RlIGludG8gdmFuaWxsYSBFUzUsIHNvIHlvdSBjYW4gdXNlIG5leHQgZ2VuZXJhdGlvbiBmZWF0dXJlcyB0b2RheS4nLFxuICAgICAgICAnbG9nbyc6ICdiYWJlbC5wbmcnXG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIGdldFRlYygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvd2ViRGV2VGVjL3dlYkRldlRlYy5zZXJ2aWNlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIE5hdmJhckRpcmVjdGl2ZSgpIHtcbiAgJ25nSW5qZWN0JztcblxuICBsZXQgZGlyZWN0aXZlID0ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmh0bWwnLFxuICAgIHNjb3BlOiB7XG4gICAgICAgIGNyZWF0aW9uRGF0ZTogJz0nXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBOYXZiYXJDb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn1cblxuY2xhc3MgTmF2YmFyQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yIChtb21lbnQpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgLy8gXCJ0aGlzLmNyZWF0aW9uRGF0ZVwiIGlzIGF2YWlsYWJsZSBieSBkaXJlY3RpdmUgb3B0aW9uIFwiYmluZFRvQ29udHJvbGxlcjogdHJ1ZVwiXG4gICAgdGhpcy5yZWxhdGl2ZURhdGUgPSBtb21lbnQodGhpcy5jcmVhdGlvbkRhdGUpLmZyb21Ob3coKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIE1hbGFya2V5RGlyZWN0aXZlKG1hbGFya2V5KSB7XG4gICduZ0luamVjdCc7XG5cbiAgbGV0IGRpcmVjdGl2ZSA9IHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICAgIGV4dHJhVmFsdWVzOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiAnJm5ic3A7JyxcbiAgICBsaW5rOiBsaW5rRnVuYyxcbiAgICBjb250cm9sbGVyOiBNYWxhcmtleUNvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiAndm0nXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICBmdW5jdGlvbiBsaW5rRnVuYyhzY29wZSwgZWwsIGF0dHIsIHZtKSB7XG4gICAgbGV0IHdhdGNoZXI7XG4gICAgbGV0IHR5cGlzdCA9IG1hbGFya2V5KGVsWzBdLCB7XG4gICAgICB0eXBlU3BlZWQ6IDQwLFxuICAgICAgZGVsZXRlU3BlZWQ6IDQwLFxuICAgICAgcGF1c2VEZWxheTogODAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIHBvc3RmaXg6ICcgJ1xuICAgIH0pO1xuXG4gICAgZWwuYWRkQ2xhc3MoJ2FjbWUtbWFsYXJrZXknKTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5leHRyYVZhbHVlcywgKHZhbHVlKSA9PiB7XG4gICAgICB0eXBpc3QudHlwZSh2YWx1ZSkucGF1c2UoKS5kZWxldGUoKTtcbiAgICB9KTtcblxuICAgIHdhdGNoZXIgPSBzY29wZS4kd2F0Y2goJ3ZtLmNvbnRyaWJ1dG9ycycsICgpID0+IHtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2bS5jb250cmlidXRvcnMsIChjb250cmlidXRvcikgPT4ge1xuICAgICAgICB0eXBpc3QudHlwZShjb250cmlidXRvci5sb2dpbikucGF1c2UoKS5kZWxldGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgIHdhdGNoZXIoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmNsYXNzIE1hbGFya2V5Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yICgkbG9nLCBnaXRodWJDb250cmlidXRvcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIHRoaXMuY29udHJpYnV0b3JzID0gW107XG5cbiAgICB0aGlzLmFjdGl2YXRlKGdpdGh1YkNvbnRyaWJ1dG9yKTtcbiAgfVxuXG4gIGFjdGl2YXRlKGdpdGh1YkNvbnRyaWJ1dG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29udHJpYnV0b3JzKGdpdGh1YkNvbnRyaWJ1dG9yKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuJGxvZy5pbmZvKCdBY3RpdmF0ZWQgQ29udHJpYnV0b3JzIFZpZXcnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvbnRyaWJ1dG9ycyhnaXRodWJDb250cmlidXRvcikge1xuICAgIHJldHVybiBnaXRodWJDb250cmlidXRvci5nZXRDb250cmlidXRvcnMoMTApLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuY29udHJpYnV0b3JzID0gZGF0YTtcblxuICAgICAgcmV0dXJuIHRoaXMuY29udHJpYnV0b3JzO1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==