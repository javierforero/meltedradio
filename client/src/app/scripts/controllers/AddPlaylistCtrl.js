'use strict';

/**
 * @ngdoc function
 * @name meltedRadioApp.controller:AddPlaylistCtrl
 * @description
 * # AddPlaylistCtrl
 * Controller of the meltedRadio
 */
angular.module('meltedRadio')
  .controller('AddPlaylistCtrl', [
    '$scope',
    '$rootScope',
    '$uibModalInstance',
    'localStorageService',
    'User',
    '$http',
    'ApiSync',
     function ($scope, $rootScope, $uibModalInstance, localStorageService, User, $http, ApiSync) {

       var currentUser = localStorageService.get('currentUser');
       $scope.submit = function() {
         if($scope.text) {

          $http({
            method: 'POST',
            url: 'http://localhost:3000/users/' + currentUser.id + '/playlists',
            data: {
              title: $scope.text
            }
          }).then(function(results){
            ApiSync.setPlaylists(results.data);
          }, function(error) {
            console.log(error);
          });

           $scope.text = '';
           $uibModalInstance.close();
         }
       };

       $scope.dismiss = function() {
         $uibModalInstance.dismiss('cancel');
       };

    }]);
