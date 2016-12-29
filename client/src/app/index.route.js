export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('sign_in', {
      url: '/sign_in',
      templateUrl: 'app/templates/sign_in.html',
      controller: 'sign_in'
    })
    .state('sign_up', {
      url: '/sign_up',
      templateUrl: 'app/templates/sign_up.html',
      controller: 'sign_up'
    });

  $urlRouterProvider.otherwise('/');
}
