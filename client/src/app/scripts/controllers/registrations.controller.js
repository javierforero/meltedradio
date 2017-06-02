export class RegistrationsController {
  constructor($scope, $auth, $rootScope, $location, localStorageService){
    'ngInject';
    
    var setUser = function(obj) {
       localStorageService.set('currentUser', obj);
    };

    $scope.submitRegistration = function(registrationForm) {

      $auth.submitRegistration(registrationForm)
        .then(function() {

          $auth.submitLogin({
            email: registrationForm.email,
            password: registrationForm.password
          });
        });
    };


    $rootScope.$on('auth:login-success', function(ev, user) {

      setUser(user);
      $location.path('/users/'+ user.id);

    });
  }
}
