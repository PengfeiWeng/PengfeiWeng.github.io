var tripPlanner = angular.module('tripPlanner', ['ngRoute']);
tripPlanner.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainController',
    })
/*
    .when('/tours', {
      templateUrl: 'views/tours.html',
      controller: 'TourController',
    })
*/
    .otherwise({
      redirectTo: '/'
    });
}]);




