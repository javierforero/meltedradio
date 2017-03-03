'use strict';

/**
 * @ngdoc function
 * @name meltedRadioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the meltedRadio
 */
angular.module('meltedRadio')
  .controller('NavCtrl', [
    '$scope',
    '$rootScope',
    '$auth',
    '$location',
    'localStorageService',
    '$http',
     function ($scope, $rootScope, $auth, $location, localStorageService, $http) {

       this.pageRedirect = function() {

         if($rootScope.user.id) {
           $location.path('/users/'+ $rootScope.user.id);

         } else {
           $location.path('/');
         }
       };

       $scope.signOut = function() {
         $auth.signOut();
       };

       $rootScope.$on('auth:logout-success', function(ev) {
         $scope.userSignedIn = null;
         localStorageService.remove('currentUser');
         $location.path('/');
       });

       $scope.getVideos = function () {

         if($scope.text) {
            var searchText = encodeURIComponent($scope.text).replace(/%20/g, '+');
            var myUrl =  'https://www.googleapis.com/youtube/v3/'+
                         'search?part=snippet'+
                         '&type=video'+
                         '&q='+
                         searchText+
                         '&key={api_key}';

          console.log(myUrl);
           $http({
             method: 'GET',
             url: myUrl

           }).then(function(response){
               console.log(response.data.items);

           },function(error){
             console.log(error);
           });
          }
       };

   }]);
