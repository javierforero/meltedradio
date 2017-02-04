'use strict';

/**
 * @ngdoc function
 * @name meltedRadioApp.controller:AddSongCtrl
 * @description
 * # AddSongCtrl
 * Controller of the meltedRadio
 */
angular.module('meltedRadio')
  .controller('AddSongCtrl', [
    '$scope',
    '$rootScope',
    '$auth',
    '$location',
    'User',
    'Playlist',
    'localStorageService',
    '$uibModalInstance',
    'ApiSync',
     function ($scope, $rootScope, $auth, $location, User, Playlist,localStorageService, $uibModalInstance, ApiSync) {


       $scope.dismiss = function() {
         $uibModalInstance.dismiss('cancel');
       };

    }]);
