// 'use strict';
//
// /**
//  * @ngdoc function
//  * @name meltedRadioApp.controller:MainCtrl
//  * @description
//  * # MainCtrl
//  * Controller of the meltedRadio
//  */
// angular.module('meltedRadio')
//   .controller('NavCtrl', [
//     '$scope',
//     '$rootScope',
//     '$auth',
//     '$location',
//     'localStorageService',
//     '$http',
//     'ApiSync',
//      function ($scope, $rootScope, $auth, $location, localStorageService, $http, ApiSync) {
//
//        function changeNavColor(){
//          $('nav.nav-bar').css('color','black');
//          $('nav.nav-bar').css('background-color','white');
//          $('nav.nav-bar ul').css('background-color','white');
//          $('ul.nav-menu a').css('color','black');
//        }
//
//        $scope.is_open = false;
//
//        $scope.playlists = function() {
//          return ApiSync.getPlaylists();
//        };
//
//        this.pageRedirect = function() {
//
//          if($rootScope.user.id) {
//            $location.path('/users/'+ $rootScope.user.id);
//
//          } else {
//            $location.path('/');
//          }
//        };
//
//        $scope.signOut = function() {
//          $auth.signOut();
//        };
//
//        $rootScope.$on('auth:logout-success', function(ev) {
//          $scope.userSignedIn = null;
//          localStorageService.remove('currentUser');
//          changeNavColor();
//          $location.path('/');
//        });
//
//        $scope.toggleMenu = function(event, x_id) {
//
//          $('#mobile-ham-black').toggleClass('hide');
//          $('#mobile-ham-white').toggleClass('hide');
//          $('#mobile-x-black').toggleClass('display');
//          $('#mobile-x-white').toggleClass('display');
//          $('div#'+ x_id).toggleClass('display');
//
//        };
//
//    }]);
