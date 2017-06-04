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
      controller: 'SessionsController as signin'
    })
    .state('sign_up', {
      url: '/sign_up',
      templateUrl: 'app/views/user_registrations/new.html',
      controller: 'RegistrationsController as signup'
    })
    .state  ('home', {
      url: '/users/:id',
      templateUrl: 'app/views/home.html',
      controller: 'HomeController as home',
      resolve: {
         auth: function($auth) {
           return $auth.validateUser();
         }
       }
    });

  $urlRouterProvider.otherwise('/');
}
