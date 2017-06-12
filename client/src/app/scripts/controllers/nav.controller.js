export class NavController {
  constructor($scope, $rootScope, $auth, $location, localStorageService, $http, ApiSync, Song) {
    'ngInject';
    function changeNavColor(){
      angular.element('nav.nav-bar').css('color','black');
      angular.element('nav.nav-bar').css('background-color','white');
      angular.element('nav.nav-bar ul').css('background-color','white');
      angular.element('ul.nav-menu a').css('color','black');
    }

    $scope.is_open = false;

    $scope.playlists = function() {
      return ApiSync.getPlaylists();
    };

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
      changeNavColor();
      $location.path('/');
    });

    $scope.toggleMenu = function(event, x_id) {

      angular.element('#mobile-ham-black').toggleClass('hide');
      angular.element('#mobile-ham-white').toggleClass('hide');
      angular.element('#mobile-x-black').toggleClass('display');
      angular.element('#mobile-x-white').toggleClass('display');
      angular.element('div#'+ x_id).toggleClass('display');

    };
  }
}
