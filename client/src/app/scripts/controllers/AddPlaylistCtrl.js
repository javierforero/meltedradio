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
     function ($scope, $rootScope, $uibModalInstance, localStorageService, User) {

       var currentUser = localStorageService.get('currentUser');
       $scope.submit = function() {
         if($scope.text) {
           console.log($scope.text);
           console.log(currentUser.id);
           new User({

               userId: currentUser.id,
               title: $scope.text
           }).create({title: $scope.text});
           $scope.text = '';
           $uibModalInstance.close();
         }
       };

       $scope.dismiss = function() {
         $uibModalInstance.dismiss('cancel');
       };

    }]);
