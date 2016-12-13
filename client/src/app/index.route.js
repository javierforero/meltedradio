export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'app/templates/users.html',
      controller: 'UsersCtrl as users'
    });

  $urlRouterProvider.otherwise('/');
}
