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

       $scope.submit = function() {
         if($scope.songTitle && $scope.songArtist && $scope.songUrl) {
           console.log($scope.songTitle, $scope.songArtist, $scope.songUrl);
         }

         $scope.newSong = '';
         $uibModalInstance.close();
       };
       $scope.dismiss = function() {
         $uibModalInstance.dismiss('cancel');
       };

    }]);
