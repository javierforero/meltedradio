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
     function ($scope, $rootScope, $uibModalInstance, localStorageService, User, $http) {

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
            console.log(results);
            $scope.playlists = results.data;
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
