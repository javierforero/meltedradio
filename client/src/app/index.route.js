export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('sign_in', {
      url: '/sign_in',
      templateUrl: 'app/views/user_sessions/new.html',
      controller: 'SessionsCtrl as signin'
    })
    .state('sign_up', {
      url: '/sign_up',
      templateUrl: 'app/views/user_registrations/new.html',
      controller: 'RegistrationsCtrl as signup'
    })
    .state('home', {
      url: '/users/:id',
      templateUrl: 'app/views/home.html',
      controller: 'HomeCtrl as home'
    });

  $urlRouterProvider.otherwise('/');
}
